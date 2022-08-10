const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { merge } = require('webpack-merge')

const commonRules = require('./webpack.rules')
const webpackConfig = require('./webpackConfig')

const {
  jsRule,
  cssRule,
  lessRule,
  moduleLessRule,
  svgRule,
  fontRule,
  imgRule
} = commonRules

module.exports = merge(webpackConfig, {
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  optimization: {
    minimize: true
  },
  module: {
    rules: [
      jsRule,
      cssRule,
      lessRule,
      moduleLessRule,
      svgRule,
      fontRule,
      imgRule
    ]
  },
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin()
  ]
})
