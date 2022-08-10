const path = require('path')

// const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [
    path.resolve(process.cwd(), 'src/index.js')
  ],
  resolve: {
    alias: {
      Src: path.resolve(__dirname, '..', 'src'),
      Assets: path.resolve(__dirname, '..', 'assets'),
      I18n: path.resolve(__dirname, '..', 'i18n')
    },
    modules: [
      'node_modules',
      'src'
    ],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.less', '.css']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    // new CopyPlugin({
    //   patterns: [
    //     { from: 'assets/images', to: 'assets/images' },
    //     { from: 'assets/translations', to: 'assets/translations' }
    //   ],
    //   options: {
    //     concurrency: 100
    //   }
    // })
  ]
}
