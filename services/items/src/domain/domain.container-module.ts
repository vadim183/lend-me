import { ContainerModule, interfaces } from 'inversify';

import { ItemsEngine } from './items.engine';

export const DomainContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind<ItemsEngine>(ItemsEngine)
      .toSelf()
      .inSingletonScope();
  }
);
