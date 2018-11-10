import React from 'react'
import { hydrate } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import App from './pages/App'
import clientStore from './clientStore'

let serverState = {}
if (!IS_SERVER) {
  serverState = window.REDUX_STATE
  delete window.REDUX_STATE
}

const { store } = clientStore(serverState)
const startApp = Application => (
  hydrate(
    <AppContainer>
      <Provider store={store}>      
       <Application />
      </Provider>
    </AppContainer>,
    document.getElementById('__refiro__'))
)

if (module.hot) {
  module.hot.accept('./pages/App', () => {
    const NewApp = require('./pages/App').default
    startApp(NewApp)
  })
}

startApp(App)
