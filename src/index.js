import React from 'react'
import { hydrate } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from './App'

const startApp = Application => (
  hydrate(
    <AppContainer>
      <Application />
    </AppContainer>,
    document.getElementById('__refiro__'))
)

if (module.hot) {
  module.hot.accept('./App', () => {
    const NewApp = require('./App').default
    startApp(NewApp)
  })
}

startApp(App)
