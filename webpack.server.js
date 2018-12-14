const path = require('path')
const WriteFilePlugin = require('write-file-webpack-plugin')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const fs = require('fs')

const base = require('./webpack.base')

const externals = (
  fs.readdirSync(path.resolve(__dirname, 'node_modules'))
  .filter(
    x =>
      !/\.bin|react-universal-component|require-universal-module|webpack-flush-chunks/.test(
        x
      )
  )
  .reduce((externals, mod) => {
    externals[mod] = `commonjs ${mod}`
    return externals
  }, {})
)

externals['react-dom/server'] = 'commonjs react-dom/server'
const mode = process.env.NODE_ENV || 'development'
const webpackServer = {
  mode,
  name: 'server',
  target: 'node',
  devtool: 'source-map',
  entry: ['regenerator-runtime/runtime.js', path.join(__dirname, 'server', 'render')],
  output: {
    path: path.join(__dirname, '_server'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'css-loader/locals',
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
  externals,
  plugins: [
    new WriteFilePlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new webpack.DefinePlugin({
      IS_SERVER: JSON.stringify(true),
      'process.env': {
        NODE_ENV: JSON.stringify(mode)
      }
    })
  ]
}

module.exports = webpackMerge.smart(base, webpackServer);
