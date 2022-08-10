const chalk = require('chalk')
const debug = require('debug')

const debugInternalAuth = debug('internalAuth')

module.exports = (req, res, next) => {
  const token = req.query.internalToken || ''

  debugInternalAuth(chalk.green(`check token, ${token}`))

  if (!token) {
    debugInternalAuth(chalk.red('No such value as internal auth token.'))

    return res
      .status(401)
      .json({ message: 'Auth Error' })
  }
  try {
    debugInternalAuth(chalk.green('verify token'))

    if (token !== process.env.INTERNAL_API_AUTH) {
      debugInternalAuth(chalk.red('Couldn\'t verify JWT is INTERNAL_API_AUTH'))
      return res.sendStatus(403)
    }

    debugInternalAuth(chalk.green('token verified'))

    next()
  } catch (error) {
    debugInternalAuth(chalk.red(`auth error caught: ${error}`))

    res
      .status(500)
      .send({ message: 'Invalid Token' })
  }
}
