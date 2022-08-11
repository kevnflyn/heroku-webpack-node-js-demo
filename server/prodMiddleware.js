const fs = require('fs')
const path = require('path')

const express = require('express')

const commonMiddlware = require('./commonMiddleware.js')

const PORT = process.env.PORT || 3000

module.exports = app => {
  // the __dirname is the current directory from where the script is // running
  app.use(express.static(path.resolve(__dirname,  '..', 'dist',))); 

  commonMiddlware(app)

  // send the user to index html page inspite of the url
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
  }); 

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
  })
}
