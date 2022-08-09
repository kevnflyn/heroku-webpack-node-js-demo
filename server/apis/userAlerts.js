const chalk = require('chalk')
const debug = require('debug')
const { body, validationResult } = require('express-validator')

const defaultDatabase = require('../../db/defaultDatabase')
const auth = require('../middleware/auth')
// const response = require('../serverUtils/response')
const internalAuth = require('../middleware/internalAuth')
const removeSensitiveUserData = require('../serverUtils/removeSensitiveUserData')

const debugAlerts = debug('alerts')

const handleDbResponse = (dbRes = {}) => {
  const rows = (
    dbRes.rows &&
    dbRes.rows.map(row => removeSensitiveUserData(row, ['id', 'pswrd']))
  )
  return { rows }
}

const alertsRoute = '/user/alerts'

module.exports = router => {
  router.route(`/internal${alertsRoute}/optedin`)
    .get(
      internalAuth,
      async (req, res) => {
        const defaultDbClient = await defaultDatabase.getClient()
        try {
          debugAlerts(chalk.green('selecting all rows in user_alerts '))
          const response = await defaultDatabase.query(`
            SELECT
              users.email,
              user_alerts.has_opted_for_compliance_alerts,
              user_company.completed_onboarding_timestamp,
              user_company.compliance_authorities,
              user_company.countries_operating
            FROM users
            INNER JOIN user_alerts ON users.id=user_alerts.user_id
            INNER JOIN user_company ON users.id=user_company.user_id;
          `)

          debugAlerts(chalk.green(`
            filtering response for users with alerts,
            ${JSON.stringify(response)}
          `))

          const usersOptedIntoAlerts = response.rows
            .filter(({ hasOptedForComplianceAlerts, completedOnboardingTimestamp }) => (
              hasOptedForComplianceAlerts && completedOnboardingTimestamp
            ))
          res
            .status(200)
            .json({ usersOptedIntoAlerts })
        } catch (error) {
          const message = 'Exception getting users opted into alerts'
          res
            .status(500)
            .json({
              error,
              message
            })
          debugAlerts(chalk.red(`Oops, error in getOptedUsers(): ${error}`))
        } finally {
          debugAlerts(chalk.green('db released'))
          defaultDbClient.release()
        }
      }
    )

  router.route(alertsRoute)
    .put(
      auth,
      body('hasOptedForComplianceAlerts').isBoolean(),
      async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
          debugAlerts(chalk.red('error validating'))
          return res
            .status(400)
            .json({
              messages: errors.array().map(({ param, msg }) => ({
                message: `${msg} ${param}`
              }))
            })
        }

        const db = await defaultDatabase.getClient()
        try {
          const { hasOptedForComplianceAlerts } = req.body
          debugAlerts(chalk.green(`update user_alerts with ${JSON.stringify({
            hasOptedForComplianceAlerts
          })}`))
          const dbRes = await defaultDatabase.query(`
            UPDATE user_alerts
            SET has_opted_for_compliance_alerts = $1
            WHERE user_id = $2
            RETURNING *
          `, [
            hasOptedForComplianceAlerts,
            req.user.id
          ])
          debugAlerts(chalk.green(`updateed user_alerts and returning ${JSON.stringify({
            dbRes
          })}`))
          const { rows: [userAlerts] } = handleDbResponse(dbRes)
          res
            .status(200)
            .json({ userAlerts })
        } catch (error) {
          const message = 'Exception adding user alerts'
          debugAlerts(chalk.red(message, error))
          res
            .status(500)
            .json({
              message,
              error
            })
        } finally {
          db.release()
        }
      })

  router.route(alertsRoute)
    .get(
      auth,
      async (req, res, next) => {
        const db = await defaultDatabase.getClient()
        try {
          debugAlerts(chalk.green(`make request for alerts where user = ${req.user.id}`))
          const dbRes = await defaultDatabase.query(`
            SELECT *
            FROM user_alerts
            WHERE user_id = $1
          `, [
            req.user.id
          ])
          const { rows: [userAlerts] } = handleDbResponse(dbRes)
          debugAlerts(chalk.green(`returning userAlerts ${userAlerts}`))
          res
            .status(200)
            .json({ userAlerts })
        } catch (error) {
          const message = `Exception getting user alerts, ${error}`
          debugAlerts(chalk.red(message))
          next(message)
        } finally {
          db.release()
        }
      })
}
