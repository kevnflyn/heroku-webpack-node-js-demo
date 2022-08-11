const chalk = require('chalk')
const debug = require('debug')
const morgan = require('morgan')

const express = require('express')

const api = require('./api')

const debugCommonMiddleware = debug('commonMiddleware')

module.exports = app => {
  app.use(express.static(path.resolve(__dirname,  '..', 'assets'))); 

  debugCommonMiddleware(chalk.green('Use output information with express...'))
  app.use(
    morgan('tiny') // combined gives you more info. Read the docs https://www.npmjs.com/package/morgan
  )

  debugCommonMiddleware(chalk.green('Use api module with express...'))
  app.use('/api', api)

  return app
}
