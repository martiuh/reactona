import React from 'react';
import { hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from './pages/App';
import clientStore from './clientStore';
import { isProduction } from './utils';

let serverStore = {};
if (!IS_SERVER) {
  // eslint-disable-next-line no-eval
  serverStore = eval(`(${window.REDUX_STATE})`);
  delete window.REDUX_STATE;
  if (isProduction) {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        // navigator.serviceWorker.register('/service-worker.js')
      });
    }
  }
}

const { store } = clientStore(serverStore);

const startApp = Application =>
  hydrate(
    <AppContainer>
      <Provider store={store}>
        <Application />
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  );

if (module.hot && !isProduction) {
  module.hot.accept('./pages/App', () => {
    // eslint-disable-next-line global-require
    const NewApp = require('./pages/App').default;
    startApp(NewApp);
  });
}

startApp(App);
