import 'colors'
import express from 'express'
import React from 'react'
import path from 'path'
import webpack from 'webpack'
import webpackdevMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'
import hotServerMiddleware from 'webpack-hot-server-middleware'

import clientConfig from '../webpack.client'
import serverConfig from '../webpack.server'

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
  const devMiddleware = webpackdevMiddleware(devCompiler, {
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
  const ServerRender = require('../_server/main').default
  app.use(ServerRender())
  Start()
}
