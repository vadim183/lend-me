import { ItemViewModel } from '@domain/items';

import { WorkStatus } from '@shared/index';

export type ItemsData = { [itemId: string]: ItemViewModel };

export interface ItemsState {
  data: ItemsData;
  status: WorkStatus;
  selectedItemId: string | null;
}
