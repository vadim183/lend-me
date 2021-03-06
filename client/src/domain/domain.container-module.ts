import { ContainerModule, interfaces } from 'inversify';

import { ItemsService } from './items/items.service';

export const DomainContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind<ItemsService>(ItemsService)
      .toSelf()
      .inSingletonScope();
  }
);
