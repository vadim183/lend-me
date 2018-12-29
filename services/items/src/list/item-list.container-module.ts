import { ContainerModule, interfaces } from 'inversify';

import { ItemListEngine } from './item-list.engine';

export const itemListContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind<ItemListEngine>(ItemListEngine)
      .toSelf()
      .inSingletonScope();
  }
);
