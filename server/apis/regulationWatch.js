
const chalk = require('chalk')
const debug = require('debug')
const { body } = require('express-validator')
const { isEmpty } = require('lodash')

const defaultDatabase = require('../../db/defaultDatabase')
const auth = require('../middleware/auth')
const internalAuth = require('../middleware/internalAuth')
const { handleDbResponse } = require('../serverUtils/handleDbResponse')

const debugRegWatch = debug('regwatch')

const constructRegulationWatchesQuery = req => {
  debugRegWatch('Extra query from request.')

  const {
    name,
    isPrivate,
    hasAlertsEnabled,
    regulationWatchId,
    alertTimeMonday,
    alertTimeTuesday,
    alertTimeWednesday,
    alertTimeThursday,
    alertTimeFriday,
    alertTimeSaturday,
    alertTimeSunday
  } = req.query

  debugRegWatch('Prepare queries.')

  const queries = {
    regulation_watch_id: regulationWatchId,
    name: name,
    is_private: isPrivate,
    has_alerts_enabled: hasAlertsEnabled,
    alert_time_monday: alertTimeMonday,
    alert_time_tuesday: alertTimeTuesday,
    alert_time_wednesday: alertTimeWednesday,
    alert_time_thursday: alertTimeThursday,
    alert_time_friday: alertTimeFriday,
    alert_time_saturday: alertTimeSaturday,
    alert_time_sunday: alertTimeSunday
  }

  debugRegWatch('Prepare queryString.')

  const queryString = Object
    .keys(queries)
    .filter(key => queries[key] !== undefined)
    .map(key => {
      const value = queries[key]
      if (typeof value === 'boolean') {
        return `${key} = ${value.toString().toUpperCase()}`
      }

      if (typeof value === 'string') {
        return `${key} = '${value}'`
      }

      if (typeof value === 'number') {
        return `${key} = ${value}`
      }

      return ''
    })
    .filter(query => query !== '')
    .join(' AND ')

  return queryString
}

module.exports = router => {
  router.route('/compliance/watch')
    .post(
      body('regulationNewsId').isNumeric(),
      auth,
      async (req, res, next) => {
        debugRegWatch(chalk.green('News watch request received.'))

        const db = await defaultDatabase.getClient()

        try {
          const {
            body: {
              filter,
              name
            },
            user: { id }
          } = req

          debugRegWatch(chalk.green('Insert regulation watch entry.'))

          const { rows } = await defaultDatabase.query(`
            INSERT INTO regulation_watch (name, user_id, filter, is_private)
            VALUES($1, $2, $3, $4)
            RETURNING *
          `, [
            name,
            id,
            filter,
            true
          ])

          debugRegWatch(chalk.green(
            'DB operation successful. Returning response.'
          ))

          res.send(rows[0])
        } catch (error) {
          debugRegWatch(chalk.red('Error inserting regulation watch entry.'))

          next(error)
        } finally {
          db.release()
        }
      })

  router.route('/compliance/watch')
    .get(
      auth,
      async (req, res, next) => {
        debugRegWatch(chalk.green('Regulation watches request received.'))

        const db = await defaultDatabase.getClient()

        try {
          debugRegWatch(chalk.green('Select regulation watches from DB.'))

          /**
           * * The following columns ARE supported by the GET API for making
           * queries:
           *
           * - regulationWatchId,
           * - name,
           * - isPrivate,
           * - hasAlertsEnabled
           *
           * The following columns ARE NOT supported by the GET API for making
           * queries:
           *
           * - filter
           * - starredRegulations
           * - dailyAlertTimes
           */

          const queryString = constructRegulationWatchesQuery(req)

          const response = await defaultDatabase.query(`
            SELECT *
            FROM regulation_watch
            WHERE user_id = $1
            ${queryString === '' ? '' : `AND ${queryString}`}
            ORDER BY creation_datetime ASC
          `, [
            req.user.id
          ])

          debugRegWatch(chalk.green('DB operation successful. Return rows.'))

          res.send(
            handleDbResponse(response, ['user_id']).rows
          )
        } catch (error) {
          debugRegWatch(chalk.red('Error selecting regulation watches.'))

          next(error)
        } finally {
          db.release()
        }
      }
    )

  router.route('/internal/compliance/watch')
    .get(
      internalAuth,
      async (req, res, next) => {
        debugRegWatch(chalk.green(
          'Regulation watches internally request received.'
        ))

        const db = await defaultDatabase.getClient()

        try {
          debugRegWatch(chalk.green('Select regulation watches from DB.'))

          /**
           * * The following columns ARE supported by the GET API for making
           * queries:
           *
           * - regulationWatchId,
           * - name,
           * - isPrivate,
           * - hasAlertsEnabled
           *
           * The following columns ARE NOT supported by the GET API for making
           * queries:
           *
           * - filter
           * - starredRegulations
           * - dailyAlertTimes
           */

          const queryString = constructRegulationWatchesQuery(req)

          const response = await defaultDatabase.query(`
            SELECT *
            FROM regulation_watch
            ${queryString === '' ? '' : `WHERE ${queryString}`}
            ORDER BY creation_datetime ASC
          `)

          debugRegWatch(chalk.green('DB operation successful. Return rows.'))

          res.send(response.rows)
        } catch (error) {
          debugRegWatch(chalk.red('Error selecting regulation watches.'))

          next(error)
        } finally {
          db.release()
        }
      }
    )

  router.route('/compliance/watch/:regulationWatchId')
    .delete(
      auth,
      async (req, res, next) => {
        debugRegWatch(chalk.green('Regulation watch delete request received.'))

        const db = await defaultDatabase.getClient()

        try {
          debugRegWatch(chalk.green('Delete regulation watch from DB.'))

          const { rows } = await defaultDatabase.query(`
            DELETE
            FROM regulation_watch
            WHERE regulation_watch_id = $1
            RETURNING *
          `, [
            req.params.regulationWatchId
          ])

          debugRegWatch(chalk.green('DB operation successful. Return rows.'))

          res.send(rows[0])
        } catch (error) {
          debugRegWatch(chalk.red('Error deleting regulation watch.'))

          next(error)
        } finally {
          db.release()
        }
      })

  router.route('/compliance/watch/:regulationWatchId/regulations/starred')
    .put(
      auth,
      body('regulationNewsId').isArray(),
      async (req, res, next) => {
        debugRegWatch(chalk.green(
          'Request to add starred regulation received.'
        ))

        const db = await defaultDatabase.getClient()

        try {
          debugRegWatch(chalk.green('Insert starred regulation entry.'))

          const { rows } = await defaultDatabase.query(`
            UPDATE regulation_watch
            SET starred_regulations = $1
            WHERE regulation_watch_id = $2
            RETURNING *
          `, [
            req.body.starredRegulations,
            req.params.regulationWatchId
          ])

          debugRegWatch(chalk.green(
            'DB operation successful. Returning response.'
          ))

          res.send(rows[0])
        } catch (error) {
          debugRegWatch(chalk.red('Error inserting starred regulation entry.'))

          next(error)
        } finally {
          db.release()
        }
      })

  router.route('/compliance/watch/:regulationWatchId')
    .put(
      auth,
      body('name').isString().optional({ nullable: true }),
      body('filter').isJSON().optional({ nullable: true }),
      body('isPrivate').isBoolean().optional({ nullable: true }),
      body('hasAlertsEnabled').isBoolean().optional({ nullable: true }),
      body('starredRegulations').isArray().optional({ nullable: true }),
      async (req, res, next) => {
        debugRegWatch(chalk.green(
          'Request to update regulation watch.'
        ))

        const db = await defaultDatabase.getClient()

        try {
          debugRegWatch(chalk.green('Updating watch with new data.'))

          const { rows: [existingEntry] } = await defaultDatabase.query(`
              SELECT *
              FROM regulation_watch
              WHERE regulation_watch_id = $1
            `, [
            req.params.regulationWatchId
          ])

          if (!existingEntry) {
            return res.status(404).json({
              message: 'Entry not found.'
            })
          }

          const {
            name,
            filter,
            isPrivate,
            hasAlertsEnabled,
            starredRegulations
          } = {
            ...existingEntry,
            ...req.body
          }

          const { rows } = await defaultDatabase.query(`
              UPDATE regulation_watch
              SET name = $1,
                filter = $2,
                is_private = $3,
                has_alerts_enabled = $4,
                starred_regulations = $5
              WHERE regulation_watch_id = $6
              RETURNING *
            `, [
            name,
            filter,
            isPrivate,
            hasAlertsEnabled,
            starredRegulations,
            req.params.regulationWatchId
          ])

          debugRegWatch(chalk.green(
            'DB operation successful. Returning response.'
          ))

          res.send(rows[0])
        } catch (error) {
          debugRegWatch(chalk.red('Error updating watch.'))

          next(error)
        } finally {
          db.release()
        }
      })

  router.route('/compliance/watch/:regulationWatchId/name')
    .put(
      auth,
      body('name').isString(),
      async (req, res, next) => {
        debugRegWatch(chalk.green(
          'Request to rename regulation watch.'
        ))

        const db = await defaultDatabase.getClient()

        try {
          debugRegWatch(chalk.green('Update regulation watch with new name.'))

          const { rows } = await defaultDatabase.query(`
            UPDATE regulation_watch
            SET name = $1
            WHERE regulation_watch_id = $2
            RETURNING *
          `, [
            req.body.name,
            req.params.regulationWatchId
          ])

          debugRegWatch(chalk.green(
            'DB operation successful. Returning response.'
          ))

          res.send(rows[0])
        } catch (error) {
          debugRegWatch(chalk.red('Error updating watch with new name.'))

          next(error)
        } finally {
          db.release()
        }
      })

  router.route('/compliance/watch/:regulationWatchId/daily-alert-times')
    .put(
      auth,
      body('alertTimeMonday').isDate().optional({ nullable: true }),
      body('alertTimeTuesday').isDate().optional({ nullable: true }),
      body('alertTimeWednesday').isDate().optional({ nullable: true }),
      body('alertTimeThursday').isDate().optional({ nullable: true }),
      body('alertTimeFriday').isDate().optional({ nullable: true }),
      body('alertTimeSaturday').isDate().optional({ nullable: true }),
      body('alertTimeSunday').isDate().optional({ nullable: true }),
      async (req, res) => {
        debugRegWatch(chalk.green(
          'Request to replace daily alert times received.'
        ))

        const db = await defaultDatabase.getClient()

        try {
          if (isEmpty(req.body)) {
            res.status(400).json({
              message: 'No payload received.'
            })
          }

          const {
            alertTimeMonday,
            alertTimeTuesday,
            alertTimeWednesday,
            alertTimeThursday,
            alertTimeFriday,
            alertTimeSaturday,
            alertTimeSunday
          } = req.body

          const jsQuery = {
            alert_time_monday: alertTimeMonday,
            alert_time_tuesday: alertTimeTuesday,
            alert_time_wednesday: alertTimeWednesday,
            alert_time_thursday: alertTimeThursday,
            alert_time_friday: alertTimeFriday,
            alert_time_saturday: alertTimeSaturday,
            alert_time_sunday: alertTimeSunday
          }

          const sqlQuery = Object
            .keys(jsQuery)
            .filter(key => jsQuery[key] !== undefined)
            .map(key => {
              const value = jsQuery[key]
              if (typeof value === 'string') {
                return `${key} = '${value}'`
              }

              if (value === null) {
                return `${key} = NULL`
              }

              throw new Error(
                'Alert time should be of type time-string instead it is of type ',
                typeof value
              )
            })
            .join(', ')

          debugRegWatch(chalk.green('Update regulation watch with new times.'))

          const { rows } = await defaultDatabase.query(`
            UPDATE regulation_watch
            SET ${sqlQuery}
            WHERE regulation_watch_id = $1
            RETURNING *
          `, [
            req.params.regulationWatchId
          ])

          debugRegWatch(chalk.green(
            'DB operation successful. Returning response.'
          ))

          res.send(rows[0])
        } catch (error) {
          debugRegWatch(chalk.red('Error updating watch with new times.'))

          res.status(500).json({ message: error.message })
        } finally {
          db.release()
        }
      })

  router.route('/compliance/watch/:regulationWatchId/has-alerts-enabled')
    .put(
      auth,
      body('hasAlertsEnabled').isBoolean(),
      async (req, res, next) => {
        debugRegWatch(chalk.green(
          'Request to enable daily alert times received.'
        ))

        const db = await defaultDatabase.getClient()

        try {
          debugRegWatch(chalk.green('Update DB alerts setting.'))

          const { rows } = await defaultDatabase.query(`
              UPDATE regulation_watch
              SET has_alerts_enabled = $1
              WHERE regulation_watch_id = $2
              RETURNING *
            `, [
            req.body.hasAlertsEnabled,
            req.params.regulationWatchId
          ])

          debugRegWatch(chalk.green(
            'DB operation successful. Returning response.'
          ))

          res.send(rows[0])
        } catch (error) {
          debugRegWatch(chalk.red('Error updating DB alerts setting.'))

          next(error)
        } finally {
          db.release()
        }
      })
}
