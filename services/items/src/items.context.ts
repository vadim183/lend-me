import { ItemsEngine } from './domain/items.engine';

import { itemsEngine } from './items.composition-root';

export interface ItemsContext {
  itemsEngine: ItemsEngine;
}

export const itemsContext: ItemsContext = {
  itemsEngine
};
