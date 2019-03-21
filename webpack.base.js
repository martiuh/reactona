const FriendlyErrors = require('friendly-errors-webpack-plugin');

const baseConfig = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'react-hot-loader/webpack']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss', '.sass']
  },
  plugins: [new FriendlyErrors()]
};

module.exports = baseConfig;
