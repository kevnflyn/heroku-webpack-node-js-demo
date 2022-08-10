const fs = require('fs')
const path = require('path')

const chalk = require('chalk')
const debug = require('debug')('database')
const { isEmpty } = require('lodash')
const { Pool } = require('pg')

const toCamelCaseObjectList = require('./toCamelCaseObjectList')

const defaultPoolSetup = {
  host: 'db-postgresql-fra1-main-do-user-8400259-0.b.db.ondigitalocean.com',
  user: 'doadmin',
  password: 'gedj3a5zzozdlisa',
  port: '25060',
  max: 20,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 2000,
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync(path.resolve(process.cwd(), 'db/db-postgresql-fra1-main-ca-certificate.crt')).toString()
  }
}

class PostgresDatabase {
  constructor (options) {
    this.db = new Pool(options)
  }

  async query (text, params, isFormattedCamelCase = true) {
    debug(chalk.green('arguments, ', JSON.stringify(arguments)))
    const start = Date.now()
    const res = await this.db.query(text, params)
    const duration = Date.now() - start
    debug(chalk.green('executed query ', `
      ${text}
      ${duration}
      ${JSON.stringify({ rows: res.rowCount })}
    `))

    if (isEmpty(res)) {
      return res
    }
    return {
      ...res,
      rows: isFormattedCamelCase ? toCamelCaseObjectList(res.rows) : res.rows
    }
  }

  async getClient () {
    const client = await this.db.connect()
    const originalQuery = client.query
    const release = client.release
    // set a timeout of 5 seconds, after which we will log this client's last query
    const timeout = setTimeout(() => {
      debug(chalk.red('A client has been checked out for more than 5 seconds!'))
      debug(chalk.red(`The last executed query on this client was: ${client.lastQuery}`))
    }, 5000)
    // monkey patch the query method to keep track of the last query executed
    client.query = (...args) => {
      client.lastQuery = args
      return this.query.apply(client, args)
    }
    client.release = () => {
      // clear our timeout
      clearTimeout(timeout)
      // set the methods back to their old un-monkey-patched version
      client.query = originalQuery
      client.release = release
      return release.apply(client)
    }
    return client
  }
}

module.exports = {
  PostgresDatabase,
  defaultPoolSetup
}
