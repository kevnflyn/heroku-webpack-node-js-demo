const fs = require('fs')
const http = require('http')
const https = require('https')
const path = require('path')
const express = require('express')

const chalk = require('chalk')
const debug = require('debug')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const WebpackHotMiddleware = require('webpack-hot-middleware')

const config = require('../build/webpack.config.dev')
const commonMiddlware = require('./commonMiddleware.js')

const debugDevMiddleware = debug('devMiddleware')

const httpPort = 3000
const httpsPort = 4000

module.exports = app => {
  debugDevMiddleware(chalk.green('Compiling bundle...'))

  const compiler = webpack(config)

  debugDevMiddleware(chalk.green('Initialising webpackDevMiddleware...'))
  const middleware = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  })

  app.use(middleware)

  app.use(
    WebpackHotMiddleware(compiler)
  )

  app.use(express.static('assets'))

  commonMiddlware(app)

  app.get('*', (req, res) => {
    res.sendFile(path.join(compiler.outputPath, 'index.html'));
  });

  // app.get('/home|/login|/register|/password-reset-request|/password-reset|/app|/app/*', (req, res) => {
  //   const indexFile = path.resolve(compiler.outputPath, 'index.html')

  //   compiler.outputFileSystem.readFile(indexFile, (error, file) => {
  //     if (error) {
  //       res.sendStatus(404)
  //     } else {
  //       res.end(file)
  //     }
  //   })
  // })

  // const sslOptions = {
  //   key: fs.readFileSync('138.68.64.50+3-key.pem'),
  //   cert: fs.readFileSync('138.68.64.50+3.pem')
  // }

  http.createServer(app).listen(httpPort)

  // https.createServer(sslOptions, app).listen(httpsPort, () => {
  //   debug(`Dev server is running on port ${chalk.green(httpsPort)}`)
  // })
}
