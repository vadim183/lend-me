import { Container } from 'inversify';

import { CoreContainerModule, MongoDbProvider, Logger } from './core';
import { itemListContainerModule, ItemListEngine } from './list';
import { domainContainerModule } from './domain';

const resolvesContainer = new Container();

resolvesContainer.load(
  CoreContainerModule,
  itemListContainerModule,
  domainContainerModule
);

export const itemsEngine = resolvesContainer.resolve(ItemListEngine);
export const dbProvider = resolvesContainer.resolve(MongoDbProvider);
export const logger = resolvesContainer.resolve(Logger);
