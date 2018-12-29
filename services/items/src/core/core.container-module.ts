import { ContainerModule, interfaces } from 'inversify';

import { HttpClient } from './http/http-client';
import { MongoDbProvider } from './mongo/mongo-db-provider';
import { Logger } from './logger';

export const CoreContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind<HttpClient>(HttpClient)
      .toSelf()
      .inSingletonScope();

    bind<MongoDbProvider>(MongoDbProvider)
      .toSelf()
      .inSingletonScope();

    bind<Logger>(Logger)
      .toSelf()
      .inSingletonScope();
  }
);
