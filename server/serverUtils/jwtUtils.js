const chalk = require('chalk')
const debug = require('debug')
const jwt = require('jsonwebtoken')
const debugAuth = debug('jwtUtils')

const verifyJWT = (token, privateTokenName) => {
  debugAuth(chalk.green('Verify JWT'))

  try {
    const decoded = jwt.verify(token, process.env[privateTokenName])

    debugAuth(chalk.green('Return decoded JWT'))

    return { payload: decoded, expired: false }
  } catch (error) {
    debugAuth(chalk.red(`
      Couldn't verify JWT is ACCESS_TOKEN_SECRET. Error: ${error.message}
    `))

    return { payload: null, expired: error.message }
  }
}

const signJWT = (payload, privateTokenName, expiresIn) => {
  debugAuth(chalk.green('Sign JWT'))

  return jwt.sign(
    payload,
    process.env[privateTokenName],
    { expiresIn }
  )
}

module.exports = {
  verifyJWT,
  signJWT
}
