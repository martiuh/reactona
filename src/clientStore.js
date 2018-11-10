import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import REDUX_THUNK from 'redux-thunk'
import { connectRoutes } from 'redux-first-router'

import routesMap from './routesMap'
import * as reducers from './reducers'

export default function clientStore(serverState = {}, options = {}) {

  if (!IS_SERVER) {
  }

  const { reducer, middleware, enhancer, thunk } = connectRoutes(
    routesMap,
    options
  )
  
  const rootReducer = combineReducers({
    ...reducers,
    location: reducer
  })

  const middlewares = applyMiddleware(middleware)
  const reduxThunk = applyMiddleware(REDUX_THUNK)
  const enhancers = compose(
    enhancer,
    middlewares,
    reduxThunk,
  )
  
  const initialState = {
    ...serverState,
    catalog: [{
      name: 'Playera Gon',
      sku: 'aflkjasdf09u'
    }]
  }

  const store = createStore(rootReducer, initialState, enhancers)
  return { store, thunk }
}