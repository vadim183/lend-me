import { ItemsQueryInput } from '@lend-me/api';

import { ItemsContext } from './items.context';

interface ItemsQueryArgs {
  input: ItemsQueryInput;
}

export const itemsResolvers = {
  Query: {
    items: (
      _: unknown,
      args: ItemsQueryArgs,
      context: ItemsContext,
      __: unknown
    ) => {
      return context.itemListEngine.getItems(args.input);
    }
  }
};
