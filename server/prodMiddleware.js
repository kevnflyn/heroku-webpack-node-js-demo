const fs = require('fs')
const path = require('path')

const chalk = require('chalk')
const debug = require('debug')
const express = require('express')

const commonMiddlware = require('./commonMiddleware.js')

const port = process.env.PORT || 3000

module.exports = app => {
  commonMiddlware(app)

  app.get('/home|/login|/register|/password-reset-request|/password-reset|/app|/app/*', (req, res) => {
    res.sendFile(path.resolve('dist', 'index.html'))
  })

  app.listen(port)
}
