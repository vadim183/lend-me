import { ItemListEngine } from './list/item-list.engine';

import { itemsEngine } from './items.composition-root';

export interface ItemsContext {
  itemListEngine: ItemListEngine;
}

export const enginesContext: ItemsContext = {
  itemListEngine: itemsEngine
};
