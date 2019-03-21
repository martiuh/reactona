const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const hotServerMiddleware = require('webpack-hot-server-middleware');
const chokidar = require('chokidar');
const report = require('yurnalist');

const clientConfig = require('../webpack.client');
const serverConfig = require('../webpack.server');
const app = require('./server');

const { publicPath } = clientConfig.output;
const { NODE_ENV } = process.env;
const isDev = NODE_ENV !== 'production';
let PORT = isDev ? 3030 : 8080;
PORT = process.env.PORT || PORT;

// Development only
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
    heartbeat: 2000
  })
);

app.use(hotServerMiddleware(devCompiler));
devMiddleware.waitUntilValid(app.Start);
