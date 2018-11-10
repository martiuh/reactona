const path = require('path')
const webpack = require('webpack')
const slash = require('slash')
const WriteFilePlugin =  require('write-file-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const webpackMerge = require('webpack-merge')

const base = require('./webpack.base')

const webpackConfig = {
  mode: 'development',
  name: 'client',
  context: __dirname,
  entry: [
      slash(path.join(__dirname, 'src')),
      `webpack-hot-middleware/client?__webpack_hmr&reload=true&overlay=false`
  ],
  output: {
    path: path.resolve(__dirname, '_client'),
    publicPath: '/static/',
  },
  stats: {
    all: true
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
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
}

module.exports = webpackMerge(base, webpackConfig);
