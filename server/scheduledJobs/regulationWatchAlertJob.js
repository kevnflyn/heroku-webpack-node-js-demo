/**
 * What should the regulation watch email alert job do?
 *
 * 1. It should start the regulation job with a schedule that triggers sends
 *    email alerts out every minute.
 *
 * 2. It should query the regulation watch table for entries that have a
 *    alerting time of 'now', contained inside the column `daily_alert_times`
 *    and who have enabled email alerts, the column has_email_alerts:boolean.
 *
 * 3. After finding regulation watches with an alerting time set to 'now', the
 *    latest news should be requested using the filter belonging to the
 *    regulation watch and then an email generated using the news data.
 */

const chalk = require('chalk')
const debug = require('debug')
const cron = require('node-cron')
const queryString = require('query-string')

const defaultDatabase = require('../../db/defaultDatabase')
const sendRegulationWatchAlertEmail = require('../email/sendRegulationWatchAlertEmail')
const { getHostname } = require('../serverUtils/getHostname')
const internalFetch = require('../serverUtils/internalFetch')

const debugRegulationWatchAlertJob = debug('regulation_watch_alert_job')

/** Scheduling parameters */
const scheduled = true
const timezone = 'Europe/Luxembourg'
const schedule = '0 */1 * * * *'

/** Email parameters */
const hostname = getHostname()

const fetchRecentNewsItems = async (
  filter,
  recentNewsStartPublishedIsoStringDate,
  recentNewsToPublishedIsoStringDate
) => {
  const filterQuery = queryString.stringify(filter)
  const fromQ = `fromPublishedDate=${encodeURIComponent(recentNewsStartPublishedIsoStringDate)}`
  const toQ = `toPublishedDate=${encodeURIComponent(recentNewsToPublishedIsoStringDate)}`
  const query = `${filterQuery}&${fromQ}&${toQ}`
  const newsApi = `${hostname}/api/internal/compliance/news`

  debugRegulationWatchAlertJob(chalk.green(`
    Fetch news from ${newsApi} with query ${query}.
  `))

  const response = await internalFetch(newsApi, query)
  const results = await response.json()

  debugRegulationWatchAlertJob(chalk.green(`
    Return ${results.news.length} news items.
  `))

  return results
}

const regulationWatchAlertTimeColumns = [
  'alertTimeSunday',
  'alertTimeMonday',
  'alertTimeTuesday',
  'alertTimeWednesday',
  'alertTimeThursday',
  'alertTimeFriday',
  'alertTimeSaturday'
]

// Uncomment for testing
// const dateNow = new Date('2022-02-08 17:57:00+01')
// const dayToday = dateNow.getDay()

// const fromPublishedDate = new Date(dateNow)
// fromPublishedDate.setDate(dateNow.getDate() - 1)
// fromPublishedDate.setHours(0, 0, 0, 0)

// const toPublishedDate = new Date(dateNow)

const sendRegulationWatchAlert = async () => {
  const defaultDbClient = await defaultDatabase.getClient()
  try {
    debugRegulationWatchAlertJob(chalk.green(`
      Find regulation watches with alerts activated and a time set to 'now'
    `))

    const dateNow = new Date()
    const dayToday = dateNow.getDay()

    const fromPublishedDate = new Date(dateNow)
    fromPublishedDate.setDate(dateNow.getDate() - 1)
    fromPublishedDate.setHours(0, 0, 0, 0)

    const toPublishedDate = new Date(dateNow)

    const resultsForDifferentTimeZones = await Promise.all(
      [
        // '-11', '-10', '-09', '-08', '-07', '-06',
        // '-05', '-04', '-03', '-02', '-01', '-00',
        // '+01', '+02', '+03', '+04', '+05', '+06',
        // '+07', '+08', '+09', '+10', '+11', '+12'
        '+01'
      ].map(async timezone => {
        const query = {
          hasAlertsEnabled: true,
          [regulationWatchAlertTimeColumns[dayToday]]: `
            ${dateNow.getHours()}:${dateNow.getMinutes()} ${timezone}
          `.trim()
        }

        const queryStringified = queryString.stringify(query)

        const response = await internalFetch(
          `${hostname}/api/internal/compliance/watch`,
          queryStringified
        )
        const regulationWatches = await response.json()

        return regulationWatches
      })
    )

    const [centralEuropeanTimeRegulationWatches] = resultsForDifferentTimeZones

    if (centralEuropeanTimeRegulationWatches.length === 0) {
      return
    }

    const userIds = centralEuropeanTimeRegulationWatches
      .map(({ userId }) => userId)

    const uniqueUsers = userIds.filter((item, i, ar) => ar.indexOf(item) === i)

    const query = queryString.stringify(
      { ids: uniqueUsers },
      { arrayFormat: 'bracket' }
    )

    const response = await internalFetch(
      `${hostname}/api/internal/users`,
      query
    )

    const userInfo = await response.json()

    const userInfoMap = userInfo.reduce((users, userInfo) => ({
      ...users,
      [userInfo.id]: userInfo
    }), {})

    resultsForDifferentTimeZones.forEach(regulationWatches => {
      regulationWatches.forEach(async ({
        name,
        userId,
        filter,
        regulationWatchId,
        ...watch
      }) => {
        debugRegulationWatchAlertJob(chalk.green('Fetch latest news'))

        const { news } = await fetchRecentNewsItems(
          filter,
          fromPublishedDate.toISOString(),
          toPublishedDate.toISOString()
        )

        const { email } = userInfoMap[userId]

        if (news.length > 0) {
          debugRegulationWatchAlertJob(chalk.green(`Send news to ${email}`))

          sendRegulationWatchAlertEmail(
            email,
            hostname,
            name,
            regulationWatchId,
            watch[regulationWatchAlertTimeColumns[dayToday]],
            news
          )
        }
      })
    })
  } catch (error) {
    debugRegulationWatchAlertJob(chalk.red(`
      Oops, error in regulationWatchAlertJob(): ${error}
    `))
  } finally {
    debugRegulationWatchAlertJob(chalk.green('db released'))

    defaultDbClient.release()
  }
}

const regulationWatchAlertJob = (scheduleParam = schedule) => {
  debugRegulationWatchAlertJob(chalk.green('Start job regulationWatchAlertJob'))

  return cron.schedule(scheduleParam, sendRegulationWatchAlert, {
    scheduled,
    timezone
  })
}

module.exports = {
  regulationWatchAlertJob,
  sendRegulationWatchAlert,
  fetchRecentNewsItems
}
