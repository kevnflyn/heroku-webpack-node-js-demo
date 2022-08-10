const { PostgresDatabase, defaultPoolSetup } = require('./PostgresDatabase')

const cleanDatabase = new PostgresDatabase({
  ...defaultPoolSetup,
  database: 'cleandb'
})

module.exports = cleanDatabase
