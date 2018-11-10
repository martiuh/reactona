import React from 'react'
import { renderToString } from 'react-dom/server'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import { Provider } from 'react-redux'

import App from '../src/pages/App'
import serverStore from './serverStore'

export default function render({ clientStats }) {
  return async function(req, res) {
    const store = await serverStore(req, res)
    const appString = ssrApp(store)
    const chunkNames = flushChunkNames()
    const { js, styles } = flushChunks(clientStats, {
      chunkNames
    })

    const reduxState = JSON.stringify(store.getState())
    res.render('../_client/render.ejs', {
      appString,
      js,
      styles,
      reduxState: `<script>window.REDUX_STATE=${reduxState}</script>`
    })
  }
}

const ssrApp = store => renderToString(
  <Provider store={store}>
    <App />
  </Provider>
)
