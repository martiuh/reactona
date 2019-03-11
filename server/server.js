const express = require('express');
const path = require('path');
const noFavicon = require('express-no-favicons');
const webpack = require('webpack');
const compression = require('compression');
const webpackDevMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const hotServerMiddleware = require('webpack-hot-server-middleware');
const chokidar = require('chokidar');
const report = require('yurnalist');

const clientConfig = require('../webpack.client');
const serverConfig = require('../webpack.server');

const { publicPath } = clientConfig.output;
const outputPath = clientConfig.output.path;
const { NODE_ENV } = process.env;
const isDev = NODE_ENV !== 'production';
let PORT = isDev ? 3030 : 8080;
PORT = process.env.PORT || PORT;

const app = express();
app.use(noFavicon());
app.set('view engine', 'ejs');
/* eslint-disable global-require */
app.use('/api', (req, res, next) => require('./api')(req, res, next));
/* eslint-enable global-require */

// Production only
if (!isDev) {
  app.use(compression());
}
app.use(clientConfig.output.publicPath, express.static(outputPath));
app.use('/', express.static(path.resolve(__dirname, '../_client/unstatic')));

const Start = () => {
  app.listen(PORT, () => report.success(`universal app running on localhost:${PORT}`));
};

// Development only
if (isDev) {
  const watcher = chokidar.watch('./server');
  watcher.on('ready', () => {
    watcher.on('all', () => {
      report.info('removing module cache');
      Object.keys(require.cache).forEach(id => {
        if (/\/\\server\/\\/.test(id)) delete require.cache[id];
      });
    });
  });

  const devCompiler = webpack([clientConfig, serverConfig]);
  const devMiddleware = webpackDevMiddleware(devCompiler, {
    stats: {
      colors: true
    },
    publicPath
  });
  app.use(devMiddleware);
  const cilentCompiler = devCompiler.compilers[0];
  app.use(
    hotMiddleware(cilentCompiler, {
      log: false,
      path: '/__webpack_hmr',
      heartbeat: 2000,
      serverSideRender: true
    })
  );

  app.use(hotServerMiddleware(devCompiler));
  devMiddleware.waitUntilValid(Start);
}
else {
  /* eslint-disable global-require, import/no-unresolved */
  const clientStats = require('../_client/stats.json');
  const serverRender = require('../_server/main.js').default;
  /* eslint-enable global-require, import/no-unresolved */
  app.use(publicPath, express.static(outputPath));
  app.use(serverRender({ clientStats }));
  Start();
}
