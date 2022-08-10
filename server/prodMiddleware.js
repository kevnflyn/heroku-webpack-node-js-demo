const fs = require('fs')
// const http = require('http')
// const https = require('https')
const path = require('path')

const chalk = require('chalk')
const debug = require('debug')
const express = require('express')
// const fs = require('fs')

const commonMiddlware = require('./commonMiddleware.js')

const debugProd = debug('prodMiddlware')

const port = 3000
// const httpsPort = 4000

module.exports = app => {
  app.use(express.static('dist'))

  commonMiddlware(app)

  app.get('/home|/login|/register|/password-reset-request|/password-reset|/app|/app/*', (req, res) => {
    res.sendFile(path.resolve('dist', 'index.html'))
  })

  // const sslOptions = {
  //   key: fs.readFileSync('138.68.64.50+3-key.pem'),
  //   cert: fs.readFileSync('138.68.64.50+3.pem')
  // }

  app.listen(port)

  // https.createServer(sslOptions, app).listen(httpsPort, () => {
  //   debugProd(chalk.green(`prod server is running on port ${chalk.green(httpsPort)}`))
  // })
}
