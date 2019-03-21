const app = require('./server');

/* eslint-disable global-require, import/no-unresolved */
const clientStats = require('../_client/stats.json');
const serverRender = require('../_server/main.js').default;
/* eslint-enable global-require, import/no-unresolved */
app.use(serverRender({ clientStats }));
app.Start();
