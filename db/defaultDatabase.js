const { PostgresDatabase, defaultPoolSetup } = require('./PostgresDatabase')

const defaultDatabase = new PostgresDatabase({
  ...defaultPoolSetup,
  database: 'defaultdb'
})

module.exports = defaultDatabase
