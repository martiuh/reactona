const express = require('express');
const path = require('path');
const compression = require('compression');
const report = require('yurnalist');

const siteConfig = require('../site-config');

const { publicPath } = siteConfig.output;
const outputPath = siteConfig.output.path;

const { NODE_ENV } = process.env;
const isDev = NODE_ENV !== 'production';
let PORT = isDev ? 3030 : 8080;
PORT = process.env.PORT || PORT;

const app = express();
app.set('view engine', 'ejs');
/* eslint-disable global-require */
app.use('/api', (req, res, next) => require('./api')(req, res, next));
/* eslint-enable global-require */

// Production only
if (!isDev) {
  app.use(compression());
}

app.use(publicPath, express.static(outputPath));
app.use('/', express.static(path.resolve(__dirname, '../_client/unstatic')));

app.Start = () => {
  app.listen(PORT, () => report.success(`universal app running on localhost:${PORT}`));
};

module.exports = app;
