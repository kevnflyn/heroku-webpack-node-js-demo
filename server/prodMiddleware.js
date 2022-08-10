const fs = require('fs')
const path = require('path')

const commonMiddlware = require('./commonMiddleware.js')

const PORT = process.env.PORT || 3000

module.exports = app => {
  commonMiddlware(app)

  app.get('*', (req, res) => {
    res.sendFile(path.resolve('dist', 'index.html'))
  });

  app.listen(PORT, () => {
}
