const path = require('path')

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const WebpackHotMiddleware = require('webpack-hot-middleware')

const config = require('../build/webpack.config.dev')
const commonMiddlware = require('./commonMiddleware.js')

const PORT = process.env.PORT || 3000

module.exports = app => {
  const compiler = webpack(config)

  const middleware = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
  })

  app.use(middleware)

  app.use(
    WebpackHotMiddleware(compiler)
  )

  commonMiddlware(app)

  app.get('*', (req, res) => {
    res.sendFile(path.join(compiler.outputPath, 'index.html'))
  })

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
  })
}
