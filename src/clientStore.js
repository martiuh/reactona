import {
  createStore, combineReducers, applyMiddleware, compose
} from 'redux';
import REDUX_THUNK from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { connectRoutes } from 'redux-first-router';

import { isProduction } from './utils';
import routesMap from './routesMap';
import * as reducers from './reducers';
import * as actionCreators from './actions';

const composeEnhancers = (...args) => !IS_SERVER
  ? composeWithDevTools({ actionCreators })(...args)
  : compose(...args);

export default function clientStore(serverState = {}, options = {}) {
  const {
    reducer, middleware, enhancer, thunk
  } = connectRoutes(
    routesMap,
    options
  );

  const rootReducer = combineReducers({
    ...reducers,
    location: reducer
  });

  const middlewares = applyMiddleware(middleware);
  const reduxThunk = applyMiddleware(REDUX_THUNK);
  const enhancers = composeEnhancers(
    enhancer,
    middlewares,
    reduxThunk
  );

  const initialState = {
    ...serverState
  };

  const store = createStore(rootReducer, initialState, enhancers);

  if (module.hot && !isProduction) {
    module.hot.accept('./reducers/index', () => {
      const reducers = require('./reducers/index'); // eslint-disable-line global-require
      const rootReducer = combineReducers({ ...reducers, location: reducer });
      store.replaceReducer(rootReducer);
    });
  }

  return { store, thunk };
}
