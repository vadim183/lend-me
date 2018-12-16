import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { App } from './app/App';

import { InjectorContext, injectorContextValue } from './injector.context';

import { configureStore } from '@store/index';

const store = configureStore();

export const Root = () => (
  <InjectorContext.Provider value={injectorContextValue}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </InjectorContext.Provider>
);
