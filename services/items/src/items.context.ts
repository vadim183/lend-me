import { ItemsService } from './domain/items/items.service';

import { itemsApiService } from './items.composition-root';

export interface ItemsContext {
  itemsApiService: ItemsService;
}

export const itemsContext: ItemsContext = {
  itemsApiService
};
