import { combineEpics } from 'redux-observable';

import { itemsEpics } from '@store/items';

export const rootEpics = combineEpics(itemsEpics);
