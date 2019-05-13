import React from 'react';
import { renderToString } from 'react-dom/server';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';

import App from '../src/pages/App';
import serverStore from './serverStore';

export default function webpackRender({ clientStats }) {
  return async function render(req, res) {
    const store = await serverStore(req, res);
    const appString = htmlApp(store);
    const helmet = Helmet.renderStatic();
    const chunkNames = flushChunkNames();
    const { js, styles, cssHash } = flushChunks(clientStats, {
      chunkNames
    });

    const { title, meta, link, htmlAttributes, bodyAttributes } = helmet;
    const rawReduxState = JSON.stringify(store.getState());
    const reduxState = serialize(rawReduxState, { isJSON: true });
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
    });
  };
}

const htmlApp = store =>
  renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );
