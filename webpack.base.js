const baseConfig = {
  module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader'
        }
      ]
    },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss', '.sass'],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  }
}

module.exports = baseConfig