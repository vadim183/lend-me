import { ItemsQueryInput } from '@lend-me/api';

import { ItemsContext } from './items.context';

interface ItemsQueryArgs {
  input: ItemsQueryInput;
}

export const ItemsResolvers = {
  Query: {
    items: (
      _: unknown,
      args: ItemsQueryArgs,
      context: ItemsContext,
      __: unknown
    ) => {
      return context.itemsEngine.getItems(args.input);
    }
  }
};
