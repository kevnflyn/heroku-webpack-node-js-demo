const express = require('express')
const fs = require('fs')
const path = require('path')

const chalk = require('chalk')
const debug = require('debug')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const WebpackHotMiddleware = require('webpack-hot-middleware')

const config = require('../build/webpack.config.dev')
const commonMiddlware = require('./commonMiddleware.js')

const debugDevMiddleware = debug('devMiddleware')

const PORT = process.env.PORT || 3000

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

  commonMiddlware(app)

  app.use(express.static(compiler.outputPath))

  app.get('*', (req, res) => {
    const indexFile = path.resolve(compiler.outputPath, 'index.html')

    compiler.outputFileSystem.readFile(indexFile, (error, file) => {
      if (error) {
        res.sendStatus(404)
      } else {
        res.end(file)
      }
    })
  })

  app.listen(PORT)
}
