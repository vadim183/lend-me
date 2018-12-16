import { ActionsObservable, ofType, StateObservable } from 'redux-observable';

import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';

import { ItemsQueryInput } from '@lend-me/api';
import { ItemsService } from '@domain/index';
import { StoreState } from '@store/store-state.models';

import {
  GetItemsAction,
  ItemsActions,
  createGetItemsSuccessAction,
  createGetItemsErrorAction
} from '../actions';
import { ItemsState } from '../items-state.model';

const ITEMS_BATCH_SIZE = 18;

interface EpicDependency {
  itemsApiService: ItemsService;
}

export const getItemsEpic = (
  action$: ActionsObservable<GetItemsAction>,
  state$: StateObservable<StoreState>,
  { itemsApiService }: EpicDependency
) =>
  action$.pipe(
    ofType(ItemsActions.GET),
    withLatestFrom(state$),
    switchMap(([_, state]: [any, StoreState]) => {
      let input = getQueryInput(state.items);

      return itemsApiService.getItems(input).pipe(
        map(createGetItemsSuccessAction),
        catchError(error => of(createGetItemsErrorAction(error)))
      );
    })
  );

function getQueryInput(items: ItemsState): ItemsQueryInput {
  let fromIndex = Object.keys(items.data).length;

  return {
    fromIndex,
    toIndex: fromIndex + ITEMS_BATCH_SIZE
  };
}
