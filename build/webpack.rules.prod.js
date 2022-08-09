const path = require('path')

module.exports = {
  lessRule: {
    exclude: /(node_modules)/,
    test: /^((?!\.module).)*less$/,
    use: [
      { loader: 'style-loader' },
      { loader: 'css-loader' },
      {
        loader: 'less-loader',
        options: {
          lessOptions: {
            include: path.resolve(__dirname),
            javascriptEnabled: true
          }
        }
      }
    ],
    sideEffects: true
  },

  lessModulesRule: {
    test: /\.module.less$/,
    use: [
      { loader: 'style-loader' },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          modules: {
            localIdentName: '[name]__[local]__[hash:base64:5]'
          }
        }
      },
      {
        loader: 'less-loader',
        options: {
          lessOptions: {
            javascriptEnabled: true
          }
        }
      }
    ],
    sideEffects: true
  }
}
