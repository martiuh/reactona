const path = require('path');

module.exports = {
  output: {
    path: path.resolve(__dirname, '_client'),
    publicPath: '/static/'
  },
  metadata: {
    title: 'Great e-commerce',
    description: 'Build an awesome e-commerce site'
  }
}