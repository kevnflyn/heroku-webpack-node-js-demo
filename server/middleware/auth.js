const chalk = require('chalk')
const debug = require('debug')

const { signJWT, verifyJWT } = require('../serverUtils/jwtUtils')
const { getSession } = require('../services/session')

const debugAuth = debug('auth')

module.exports = (req, res, next) => {
  debugAuth(chalk.green('Check token exists'))

  const token = req.cookies.accessToken

  if (!token) {
    debugAuth(chalk.red('Auth error. No access token.'))

    return res
      .status(401)
      .json({ message: 'Auth error. No access token.' })
  }

  debugAuth(chalk.green('Verify token'))

  const { payload: user, expired } = verifyJWT(token, 'ACCESS_TOKEN_SECRET')

  if (user) {
    debugAuth(chalk.green('Token verified'))

    req.user = user

    return next()
  }

  debugAuth(chalk.green('Check refresh token exists'))

  const refreshToken = req.cookies.refreshToken

  if (!refreshToken) {
    debugAuth(chalk.red('Auth error. No refresh token.'))

    return res
      .status(401)
      .json({ message: 'Auth error. No refresh token.' })
  }

  debugAuth(chalk.green('Verify refresh token'))

  const { payload: refresh } = expired && refreshToken
    ? verifyJWT(refreshToken, 'REFRESH_TOKEN_SECRET')
    : { payload: null }

  if (!refresh) {
    debugAuth(chalk.red('Auth error. No refresh token.'))

    return res
      .status(401)
      .json({ message: 'Auth error. No refresh token.' })
  }

  debugAuth(chalk.green(`Find valid session, ${refresh.sessionId}`))

  const session = getSession(refresh.sessionId)

  if (!session) {
    debugAuth(chalk.red('Auth error. Session invalid.'))

    return res
      .status(401)
      .json({ message: 'Auth error. Session invalid.' })
  }

  debugAuth(chalk.green('Add new access token'))

  const newAccessToken = signJWT(session, 'ACCESS_TOKEN_SECRET', '5s')

  res.cookie('accessToken', newAccessToken, {
    maxAge: 10 * 1000, // 5 minutes
    httpOnly: true
  })

  // @ts-ignore
  req.user = verifyJWT(newAccessToken).payload

  return next()
}
