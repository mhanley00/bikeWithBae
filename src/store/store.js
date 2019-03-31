import { createStore, applyMiddleware, compose } from 'redux';

import reducer from 'reducers/app';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Configure middleware used by redux
const middlewares = [];

// Environment specific middlewares configuration - constant from webpack.DefinePlugin
if (ENV === 'development') { // eslint-disable-line no-undef
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middlewares)),
);

export default store;
