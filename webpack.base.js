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
    extensions: ['.js', '.jsx', '.css', '.scss', '.sass']
  }
}

module.exports = baseConfig