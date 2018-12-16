import { ContainerModule, interfaces } from 'inversify';

import { HttpClient } from './http/http-client';

export const CoreContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind<HttpClient>(HttpClient)
      .toSelf()
      .inSingletonScope();
  }
);
