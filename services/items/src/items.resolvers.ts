import { ItemsQueryInput } from '../../../contracts/items';

import { ItemsContext } from './items.context';

interface ItemsQueryArgs {
  input: ItemsQueryInput;
}

export const ItemsResolveres = {
  Query: {
    items: (
      _: unknown,
      args: ItemsQueryArgs,
      context: ItemsContext,
      __: unknown
    ) => {
      return context.itemsApiService.getItems(args.input);
    }
  }
};
