import { combineReducers } from 'redux';

import { itemsStateReducer } from './items';

export const rootReducer = combineReducers({
  items: itemsStateReducer
});
