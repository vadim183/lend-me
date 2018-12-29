import { ContainerModule, interfaces } from 'inversify';

import { CollectionAdapter } from '../core';
import { ITEMS_REPOSITORY_TOKEN, itemSchema, ItemDTO } from './item-dto';

export const domainContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind<CollectionAdapter<ItemDTO>>(ITEMS_REPOSITORY_TOKEN).toConstantValue(
      new CollectionAdapter('Item', itemSchema)
    );
  }
);
