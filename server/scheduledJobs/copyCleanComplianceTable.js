
const chalk = require('chalk')
const debug = require('debug')
const cron = require('node-cron')

const defaultDatabase = require('../../db/defaultDatabase')

const debugCopyComplianceTable = debug('compliance_news_email')

/** Scheduling parameters */
const scheduled = true
const timezone = 'Europe/Luxembourg'
const scheduledHour = 6 // 6am
const schedule = `* * ${scheduledHour} * * *`

const copyComplianceTable = () => {
  debugCopyComplianceTable(chalk.green('started copyComplianceTable()'))
  return cron.schedule(schedule, async () => {
    const defaultDbClient = await defaultDatabase.getClient()
    try {
      debugCopyComplianceTable(chalk.green('copying into clean_compliance_search from clean_compliance '))
      const response = await defaultDatabase.query(`
        INSERT INTO clean_compliance_search
        SELECT *
        FROM clean_compliance
        WHERE published BETWEEN CURRENT_DATE - 1 AND CURRENT_DATE
      `)

      debugCopyComplianceTable(chalk.green(`
        copy to clean_compliance_search complete
        ${JSON.stringify(response)}
      `))
    } catch (error) {
      debugCopyComplianceTable(chalk.red(`Oops, error in copyComplianceTable(): ${error}`))
    } finally {
      debugCopyComplianceTable(chalk.green('db released'))
      defaultDbClient.release()
    }
  }, {
    scheduled,
    timezone
  })
}

module.exports = copyComplianceTable
