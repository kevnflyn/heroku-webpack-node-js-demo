const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: [
    path.resolve(process.cwd(), 'src/index.js') // ToDo: add src/App.jsx
  ],
  resolve: {
    modules: [
      path.resolve(process.cwd(), 'node_modules'),
      path.resolve(process.cwd(), 'src'),
      path.resolve(process.cwd(), 'assetLocations')
    ],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.less', '.css']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body'
    }),
    // new CopyPlugin({
    //   patterns: [
    //     { from: 'assets/images', to: 'assets/images' },
    //     { from: 'i18n/translations', to: 'assets/translations' }
    //   ],
    //   options: {
    //     concurrency: 100
    //   }
    // })
  ]
}
