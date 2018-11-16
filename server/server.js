require('colors')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const hotServerMiddleware = require('webpack-hot-server-middleware')

const clientConfig = require('../webpack.client')
const serverConfig = require('../webpack.server')

const { publicPath } = clientConfig.output
const outputPath = clientConfig.output.path
const { NODE_ENV } = process.env
const isDev = NODE_ENV !== 'production'
let PORT = isDev ? 3030 : 8080
PORT = process.env.PORT || PORT

let isDone = false

const app = express()
app.set('view engine', 'ejs')

app.use(clientConfig.output.publicPath, express.static(outputPath))

const Start = () => {
  isDone = true
  app.listen(PORT, () => console.log(`App lista en ${PORT}`.magenta))
}

if (isDev) {
  const devCompiler = webpack([clientConfig, serverConfig])
  const devMiddleware = webpackDevMiddleware(devCompiler, {
    stats: {
      colors: true
    },
    publicPath
  })
  app.use(devMiddleware)
  const cilentCompiler = devCompiler.compilers[0]
  app.use(hotMiddleware(cilentCompiler, {
    log: false,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000,
  }))
  
  app.use(hotServerMiddleware(devCompiler))
  devMiddleware.waitUntilValid(Start)
}
else {
  webpack([clientConfig, serverConfig]).run((err, stats) => {
    if (err) {
      throw new Error(`Error en webpack:\n${err}`)
    }
    
    const clientStats = stats.toJson().children[0]
    const serverRender = require('../_server/main.js').default
    app.use(publicPath, express.static(outputPath))
    app.use(serverRender({ clientStats }))
    Start()
  })
}
