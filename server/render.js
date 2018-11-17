import React from 'react'
import { renderToString } from 'react-dom/server'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import { Provider } from 'react-redux'
import Helmet from 'react-helmet'

import App from '../src/pages/App'
import serverStore from './serverStore'

export default function render({ clientStats }) {
  return async function(req, res) {
    const store = await serverStore(req, res)
    const appString = ssrApp(store)
    const helmet = Helmet.renderStatic()
    const chunkNames = flushChunkNames()
    const { js, styles, cssHash } = flushChunks(clientStats, {
      chunkNames
    })

    const {
      title, meta, link, htmlAttributes, bodyAttributes
    } = helmet

    const reduxState = JSON.stringify(store.getState())
    res.render('../_client/render.ejs', {
      title,
      meta,
      link,
      htmlAttributes,
      bodyAttributes,
      appString,
      js,
      styles,
      cssHash,
      reduxState: `<script>window.REDUX_STATE=${reduxState}</script>`
    })
  }
}

const ssrApp = store => renderToString(
  <Provider store={store}>
    <App />
  </Provider>
)
