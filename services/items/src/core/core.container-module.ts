import { ContainerModule, interfaces } from 'inversify';

import { HttpClient } from './http/http-client';
import { MongoDbProvider } from './mongo/mongo-db-provider';

export const CoreContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind<HttpClient>(HttpClient)
      .toSelf()
      .inSingletonScope();

    bind<MongoDbProvider>(MongoDbProvider)
      .toSelf()
      .inSingletonScope();
  }
);
