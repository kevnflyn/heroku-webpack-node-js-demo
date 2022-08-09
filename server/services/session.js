
const chalk = require('chalk')
const debug = require('debug')

const debugSession = debug('session')

const sessions = {}

const getSession = (sessionId) => {
  const session = sessions[sessionId]

  return session && session.valid ? session : null
}

const invalidateSession = (sessionId) => {
  const session = sessions[sessionId]

  if (session) {
    sessions[sessionId].valid = false
  }

  return sessions[sessionId]
}

const createSession = (id, email, firstname, lastname) => {
  debugSession(chalk.green('Create Sesssion with createSession()'))
  const sessionId = String(Object.keys(sessions).length + 1)

  const session = { sessionId, id, email, firstname, lastname, valid: true }

  sessions[sessionId] = session

  return session
}

module.exports = {
  getSession,
  invalidateSession,
  createSession
}
