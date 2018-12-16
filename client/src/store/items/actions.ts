import { Action } from 'redux';

import { ItemViewModel } from '@domain/items';

export enum ItemsActions {
  GET = 'GET_ITEMS',
  GET_SUCCESS = 'GET_ITEMS_SUCCESS',
  GET_ERROR = 'GET_ITEMS_ERROR',
  SELECT = 'SELECT_ITEM'
}

export interface GetItemsAction extends Action<ItemsActions.GET> {}

export const createGetItemsAction = (): GetItemsAction => {
  return {
    type: ItemsActions.GET
  };
};

export interface GetItemsSuccessAction
  extends Action<ItemsActions.GET_SUCCESS> {
  payload: ItemViewModel[];
}

export const createGetItemsSuccessAction = (
  items: ItemViewModel[]
): GetItemsSuccessAction => {
  return {
    payload: items,
    type: ItemsActions.GET_SUCCESS
  };
};

export interface GetItemsErrorAction extends Action<ItemsActions.GET_ERROR> {
  payload: Error;
}

export const createGetItemsErrorAction = (
  error: Error
): GetItemsErrorAction => {
  return {
    payload: error,
    type: ItemsActions.GET_ERROR
  };
};

export interface SelectItemAction extends Action<ItemsActions.SELECT> {
  payload: number;
}

export const createSelectItemAction = (itemId: number): SelectItemAction => {
  return {
    payload: itemId,
    type: ItemsActions.SELECT
  };
};
