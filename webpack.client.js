const path = require('path')
const webpack = require('webpack')
const slash = require('slash')
const WriteFilePlugin =  require('write-file-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const webpackMerge = require('webpack-merge')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const { InjectManifest } = require('workbox-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const base = require('./webpack.base')
const mode = process.env.NODE_ENV || 'development'
const isDev = mode === 'development'
let devEntry = []

if (isDev) {
  devEntry = [
    'react-hot-loader/patch',
    'webpack/hot/only-dev-server',
    'webpack-hot-middleware/client?__webpack_hmr&reload=true&overlay=true'
  ]
}

const webpackConfig = {
  mode,
  devtool: isDev ? 'eval' : 'source-map',
  name: 'client',
  context: __dirname,
  entry: [
    ...devEntry,
    slash(path.join(__dirname, 'src')),
  ],
  output: {
    path: path.resolve(__dirname, '_client'),
    publicPath: '/static/',
    filename: `[name]${isDev ? '' : '.[hash]'}.js`
  },
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: [ 
            ExtractCssChunks.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]--[hash:base64:5]'
              }
            },
            'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      template: `!!raw-loader!${path.join(__dirname, 'server/template.ejs')}`,
      filename: 'render.ejs',
      chunks: []
    }),
    new WriteFilePlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      IS_SERVER: JSON.stringify(false),
      'process.env': {
        NODE_ENV: JSON.stringify(mode || 'development')
      }
    }),
    new ExtractCssChunks({
      filename: `[name]${isDev ? '' : '.[hash]'}.css`,
      chunkFilename: '[name].[chunkhash].css',
      hot: true,
      reloadAll: true,
      cssModules: true
    }),
  ]
}

  if (isDev) {
    webpackConfig.performance = {
      hints: false
    }
  }
  else {
    webpackConfig.plugins.push(new InjectManifest({
      swDest: 'unstatic/service-worker.js', // It helps me get the worker in / instead of /static directory
      swSrc: path.join(__dirname, 'src', 'service-worker.js'),
      include: [
        /vendor.*/,
        /bootstrap.*/,
        /main.*/,
        /Home.*/,
        /App.*/,
        /logo\.*/,
        /Offline.*/,
        /\**\/*.ico/
      ]
    }))

    webpackConfig.optimization = {
      runtimeChunk: {
        name: 'bootstrap'
      },
      splitChunks: {
        chunks: 'initial',
        cacheGroups: {
          vendors: {
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor'
          }
        }
      },
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: false,
              ascii_only: true
            },
            compress: {
              comparisons: false
            }
          }
        })
      ]
    }
  }

module.exports = webpackMerge.smart(base, webpackConfig);

