import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { rootReducer } from './root-reducer';
import { rootEpics } from './root-epics';

import { itemsApiService } from './store.composition-root';
import { StoreState } from './store-state.models';

interface WindowWithRedux extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
}

declare const window: WindowWithRedux;

const epicMiddleware = createEpicMiddleware<any, any, StoreState, any>({
  dependencies: {
    itemsApiService
  }
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware))
  );

  epicMiddleware.run(rootEpics);

  return store;
};
