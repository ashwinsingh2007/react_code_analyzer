import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import sagas from '../sagas';
import reducers from '../reducers';

export default function (initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();

  const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

  const enchancer = composeEnhancers(applyMiddleware(/*其他中间件, */sagaMiddleware));
  const store = createStore(reducers, initialState, enchancer);
  sagaMiddleware.run(sagas);

  return store;
}
