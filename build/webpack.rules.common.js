const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  jsRule: {
    test: /\.(js|ts)x?$/,
    exclude: /(node_modules)/,
    use: [{
      loader: 'babel-loader'
    }]
  },

  cssRule: {
    exclude: /(node_modules)/,
    test: /\.css$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader'],
    sideEffects: true
  },

  svgRule: {
    include: [
      path.resolve(process.cwd(), 'assets/images')
    ],
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      { loader: 'babel-loader' },
      {
        loader: '@svgr/webpack',
        options: {
          babel: false,
          icon: true
        }
      }
    ]
  },

  fontRule: {
    test: /\.(woff(2)?|ttf|eot)$/,
    use: 'file-loader'
  },

  imgRule: {
    test: /\.(png|jpe?g|gif)$/i,
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: 'images/',
      publicPath: 'images/'
    }
  }
}
