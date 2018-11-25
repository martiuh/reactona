const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const baseConfig = {
  module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader'
        },
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
            {
              loader: 'sass-loader'
            }
          ]
        }
      ]
    },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss', '.sass']
  },
  plugins: [
    new ExtractCssChunks({
      filename: `[name]${isDev ? '' : '-[chunkhash]'}.css`,
      chunkFilename: '[id].css',
      hot: true,
      reloadAll: true,
      cssModules: true
    }),
  ]
}

module.exports = baseConfig