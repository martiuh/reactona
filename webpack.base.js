const baseConfig = {
  module: {
      rules: [
        {
          test: /\.jsx?$/,
	  exclude: /node_modules/,
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
