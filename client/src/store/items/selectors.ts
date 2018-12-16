import { createSelector } from 'reselect';

import { StoreState } from '../store-state.models';

export const selectItemsData = createSelector(
  (storeState: StoreState) => storeState,
  (storeState: StoreState) => {
    let itemsData = storeState.items.data;
    return Object.keys(itemsData).map(itemId => itemsData[itemId]);
  }
);

export const selectItemsStatus = createSelector(
  (storeState: StoreState) => storeState,
  (storeState: StoreState) => storeState.items.status
);

export const selectItem = createSelector(
  (storeState: StoreState) => storeState,
  (storeState: StoreState) => {
    let itemId = storeState.items.selectedItemId;
    return itemId ? storeState.items.data[itemId] : null;
  }
);
