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
    extensions: ['.js', '.jsx']
  }
}

module.exports = baseConfig