const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  cssRule: {
    test: /\.css$/,
    use: [
      { loader: MiniCssExtractPlugin.loader },
      { loader: 'css-loader' }
    ]
  },

  lessRule: {
    test: /^((?!\.module).)*less$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader
        // options: {
        //   hmr: process.env.NODE_ENV === 'development',
        //   reloadAll: true,
        // },
      },
      { loader: 'css-loader' },
      {
        loader: 'less-loader',
        options: {
          lessOptions: { javascriptEnabled: true }
        }
      }
    ]
  },

  moduleLessRule: {
    test: /\.module.less$/,
    use: [
      { loader: MiniCssExtractPlugin.loader },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          modules: {
            localIdentName: '[local]___[hash:base64:5]'
          }
        }
      },
      {
        loader: 'less-loader',
        options: {
          lessOptions: { javascriptEnabled: true }
        }
      }
    ]
  },

  jsRule: {
    test: /\.(js|ts)x?$/,
    exclude: /(node_modules)/,
    use: [{
      loader: 'babel-loader'
    }]
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
