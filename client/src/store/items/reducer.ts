import { ItemViewModel } from '@domain/items';
import { WorkStatus } from '@shared/index';

import { ItemsState, ItemsData } from './items-state.model';
import { SelectItemAction } from './actions';

import {
  ItemsActions,
  GetItemsAction,
  GetItemsSuccessAction,
  GetItemsErrorAction
} from './actions';

const ITEMS_INITIAL_STATE: ItemsState = {
  data: {},
  status: WorkStatus.Idle,
  selectedItemId: null
};

type Actions =
  | GetItemsAction
  | GetItemsSuccessAction
  | GetItemsErrorAction
  | SelectItemAction;

export function itemsStateReducer(
  state = ITEMS_INITIAL_STATE,
  action: Actions
) {
  switch (action.type) {
    case ItemsActions.GET:
      return {
        ...state,
        status: WorkStatus.InProgress
      };

    case ItemsActions.GET_SUCCESS:
      let newData = mapToData(action.payload);

      return {
        ...state,
        data: {
          ...state.data,
          ...newData
        },
        status: WorkStatus.Success
      };

    case ItemsActions.GET_ERROR:
      return {
        ...ITEMS_INITIAL_STATE,
        status: WorkStatus.Error
      };

    case ItemsActions.SELECT:
      return {
        ...state,
        selectedItemId: action.payload
      };

    default:
      return state;
  }
}

function mapToData(items: ItemViewModel[]): ItemsData {
  return items.reduce<ItemsData>((data, item) => {
    return {
      ...data,
      [item.id]: item
    };
  }, {});
}
