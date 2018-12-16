import { combineEpics } from 'redux-observable';

import { getItemsEpic } from './epics';

export * from './reducer';
export * from './actions';
export * from './selectors';

export const itemsEpics = combineEpics(getItemsEpic);
