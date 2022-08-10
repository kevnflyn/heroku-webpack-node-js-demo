const chalk = require('chalk')
const debug = require('debug')
const { body } = require('express-validator')

const defaultDatabase = require('../../db/defaultDatabase')
const auth = require('../middleware/auth')
const { handleDbResponse } = require('../serverUtils/handleDbResponse')
const removeSensitiveUserData = require('../serverUtils/removeSensitiveUserData')

const debugNewsRead = debug('newsRead')

module.exports = router => {
  router.route('/compliance/read')
    .get(
      auth,
      async (req, res, next) => {
        debugNewsRead(chalk.green("Request to get user's read articles."))

        const db = await defaultDatabase.getClient()

        try {
          debugNewsRead(chalk.green('Select read articles from DB., ', JSON.stringify(req.query)))

          const dbResponse = await defaultDatabase.query(`
            SELECT *
            FROM news_read
            WHERE user_id = $1
            ${req.query.articleIds && req.query.articleIds.length > 0
              ? ` AND article_id IN (${req.query.articleIds.join(', ')})`
              : ''}
          `, [
            req.user.id
          ])

          debugNewsRead(chalk.green(
            'DB operation successful. Returning response.'
          ))

          res.send(
            handleDbResponse(dbResponse, ['userId']).rows
          )
        } catch (error) {
          debugNewsRead(chalk.red('Error getting read articles.'))

          next(error)
        } finally {
          db.release()
        }
      })

  router.route('/compliance/read')
    .post(
      auth,
      body('articleId').isNumeric().optional({ nullable: false }),
      async (req, res, next) => {
        debugNewsRead(chalk.green('Request to add read compliance entry.'))

        const db = await defaultDatabase.getClient()

        try {
          debugNewsRead(chalk.green('Update read articles table.'))

          const { rows: [existingEntry] } = await defaultDatabase.query(`
            SELECT *
            FROM news_read
            WHERE user_id = $1 AND article_id = $2
          `, [
            req.user.id,
            req.body.articleId
          ])

          if (existingEntry) {
            return res
              .status(409)
              .json({ message: 'The entry already exists.' })
          }

          const { rows } = await defaultDatabase.query(`
            INSERT INTO news_read (article_id, user_id)
            VALUES($1, $2)
            RETURNING *
          `, [
            req.body.articleId,
            req.user.id
          ])

          debugNewsRead(chalk.green(
            'DB operation successful. Returning response.'
          ))

          res.send(removeSensitiveUserData(rows[0], ['userId']))
        } catch (error) {
          debugNewsRead(chalk.red('Error adding read article.'))

          next(error)
        } finally {
          db.release()
        }
      })
}
