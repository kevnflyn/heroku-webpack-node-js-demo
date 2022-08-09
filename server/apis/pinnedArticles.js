
const chalk = require('chalk')
const debug = require('debug')
const { body } = require('express-validator')

const defaultDatabase = require('../../db/defaultDatabase')
const auth = require('../middleware/auth')
const removeSensitiveUserData = require('../serverUtils/removeSensitiveUserData')

const debugRegWatch = debug('pinnedArticles')

module.exports = router => {
  router.route('/compliance/pinned-articles')
    .get(
      auth,
      async (req, res, next) => {
        debugRegWatch(chalk.green(
          "Request to get user's pinned articles received."
        ))

        const db = await defaultDatabase.getClient()

        try {
          debugRegWatch(chalk.green('Select pinned articles from DB.'))

          const { rows } = await defaultDatabase.query(`
            SELECT *
            FROM pinned_articles
            WHERE user_id = $1
          `, [
            req.user.id
          ])

          debugRegWatch(chalk.green(
            'DB operation successful. Returning response.'
          ))

          res.send(removeSensitiveUserData(rows[0], ['userId']))
        } catch (error) {
          debugRegWatch(chalk.red('Error getting pinned articles.'))

          next(error)
        } finally {
          db.release()
        }
      })

  router.route('/compliance/pinned-articles')
    .put(
      auth,
      body('pinnedArticles').isArray().optional({ nullable: false }),
      async (req, res, next) => {
        debugRegWatch(chalk.green(
          "Request to update user's pinned articles received."
        ))

        const db = await defaultDatabase.getClient()

        try {
          debugRegWatch(chalk.green('Put pinned articles.'))

          const { rows } = await defaultDatabase.query(`
            UPDATE pinned_articles
            SET pinned_articles = $1
            WHERE user_id = $2
            RETURNING *
          `, [
            req.body.pinnedArticles,
            req.user.id
          ])

          debugRegWatch(chalk.green(
            'DB operation successful. Returning response.'
          ))

          res.send(removeSensitiveUserData(rows[0], ['userId']))
        } catch (error) {
          debugRegWatch(chalk.red('Error inserting pinned articles.'))

          next(error)
        } finally {
          db.release()
        }
      })
}
