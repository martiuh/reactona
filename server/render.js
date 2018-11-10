import React from 'react'
import { renderToString } from 'react-dom/server'
import { clearChunks } from 'react-universal-component/server'

import flushChunks from 'webpack-flush-chunks'

import App from '../src/App'
export default function render({ clientStats }) {
  return function(req, res) {
    const appString = renderToString(<App />)
    const {js, styles } = flushChunks(clientStats, {
      chunkNames: clearChunks()
    })

    res.render('../_client/render.ejs', {
      appString,
      js,
      styles
    });
  }
}
