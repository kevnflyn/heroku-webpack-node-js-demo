const chalk = require('chalk')
const debug = require('debug')
const cron = require('node-cron')

const defaultDatabase = require('../../db/defaultDatabase')
const sendComplianceNewsEmail = require('../email/sendComplianceNewsEmail')
const { getHostname } = require('../serverUtils/getHostname')
const internalFetch = require('../serverUtils/internalFetch')

const debugComplianceNewsEmailJob = debug('compliance_news_email')

/** Scheduling parameters */
const scheduled = true
const timezone = 'Europe/Luxembourg'
const scheduledHour = 8
const scheduledMin = 10
const schedule = `0 ${scheduledMin} ${scheduledHour} * * *`

/** Email parameters */
const hostname = getHostname()
const queryStringAlertsActivation = '' // may be ?alerts=true one day
// const newsItemsLimit = 3 // query would be `?size=${newsItemsLimit}`

// For testing:
// const scheduledHour = 22 // 8am
// const schedule = `35 13 ${scheduledHour} * * *`
// const fromPublishedDate = new Date((new Date()).setFullYear((new Date()).getFullYear() - 1))
// const toPublishedDate = new Date((new Date()).setHours(0, 8, 0, 0))

const fetchRecentNewsItems = async (
  complianceAuthorities,
  countriesOperating,
  recentNewsStartPublishedIsoStringDate,
  recentNewsToPublishedIsoStringDate
) => {
  const complianceQ = complianceAuthorities
    .map(authority => `sources=${authority}`)
    .join('&')
  const countriesQ = countriesOperating
    .map(authority => `countries=${authority}`)
    .join('&')
  const fromQ = `fromPublishedDate=${encodeURIComponent(recentNewsStartPublishedIsoStringDate)}`
  const toQ = `toPublishedDate=${encodeURIComponent(recentNewsToPublishedIsoStringDate)}`
  const query = `?${complianceQ}&${countriesQ}&${fromQ}&${toQ}`
  const newsApi = `${hostname}/api/internal/compliance/news`
  debugComplianceNewsEmailJob(chalk.green(`
    internalFetch(${newsApi}, ${query})
  `))
  const response = await internalFetch(newsApi, query)
  const results = await response.json()
  debugComplianceNewsEmailJob(chalk.green(`
    returning ${results.news.length} news items
  `))
  return results
}

/**
 *
 * @param {Object} users
 * @param {String} users.email
 * @param {String[]} users.complianceAuthorities
 * @param {String[]} users.countriesOperating
 *
 */
const sendUsersAlertsForLatestNews = users => {
  debugComplianceNewsEmailJob('sendUsersAlertsForLatestNews()')
  try {
    users.forEach(async ({
      email,
      complianceAuthorities,
      countriesOperating
    }) => {
      const fromPublishedDate = new Date()
      fromPublishedDate.setDate((new Date()).getDate() - 1)
      fromPublishedDate.setHours(0, 0, 0, 0)

      const toPublishedDate = new Date()
      toPublishedDate.setHours(0, 0, 0, 0)

      const { news } = await fetchRecentNewsItems(
        complianceAuthorities,
        countriesOperating,
        fromPublishedDate.toISOString(),
        toPublishedDate.toISOString()
      )

      if (news.length > 0) {
        debugComplianceNewsEmailJob(chalk.green(`send news to ${email}`))
        sendComplianceNewsEmail(
          email,
          hostname,
          queryStringAlertsActivation,
          news,
          toPublishedDate
        )
      }
    })
  } catch (error) {
    debugComplianceNewsEmailJob(chalk.red(`
      Oops, error in sendUsersAlertsForLatestNews(): ${error}`))
  }
}

const sendEmailAlertsToOptInUsers = async () => {
  const defaultDbClient = await defaultDatabase.getClient()
  try {
    debugComplianceNewsEmailJob(chalk.green('internalFetch()'))

    const query = `${hostname}/api/internal/user/alerts/optedin`
    const response = await internalFetch(query)

    debugComplianceNewsEmailJob(chalk.green(`
      sendUsersAlertsForLatestNews(usersOptedIntoAlerts)`))

    const json = await response.json()
    sendUsersAlertsForLatestNews(json.usersOptedIntoAlerts)
  } catch (error) {
    debugComplianceNewsEmailJob(chalk.red(`
      Oops, error in complianceNewsEmailJob(): ${error}
    `))
  } finally {
    debugComplianceNewsEmailJob(chalk.green('db released'))

    defaultDbClient.release()
  }
}

const complianceNewsEmailJob = (scheduleParam = schedule) => {
  debugComplianceNewsEmailJob(chalk.green('complianceNewsEmailJob()'))
  return cron.schedule(scheduleParam, sendEmailAlertsToOptInUsers, {
    scheduled,
    timezone
  })
}

/**
 * What happens when the function complianceNewsEmailJob() is called?
 *
 * 1. A cron job is started, which triggers sendEmailAlertsToOptInUsers() at a
 *    specific time e.g. 8:45am.
 *
 * 2. sendEmailAlertsToOptInUsers() tries to fetch users who opted into alerts.
 *    Then it calls sendUsersAlertsForLatestNews() passing those users.
 *
 * 3. sendUsersAlertsForLatestNews() loops over the users expecting alerts to
 *    fetch the user's news using their profile settings (complianceAuthorities,
 *    countriesOperating) to call generateAndSendEmail() with the latest news (
 *    from today). The number of news articles is limited by the integer value
 *    newsItemsLimit e.g. 3. If there are more than 0 items, then
 *    sendComplianceNewsEmail() will be called with the user's email, the
 *    return hostname, the queryStringAlertsActivation and the news items to
 *    generate the email content.
 */

module.exports = {
  complianceNewsEmailJob,
  sendEmailAlertsToOptInUsers,
  fetchRecentNewsItems
}
