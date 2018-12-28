import { Container } from 'inversify';

import { CoreContainerModule, MongoDbProvider } from './core';
import { DomainContainerModule, ItemsEngine } from './domain';

const resolvesContainer = new Container();

resolvesContainer.load(CoreContainerModule, DomainContainerModule);

export const itemsEngine = resolvesContainer.resolve(ItemsEngine);
export const dbProvider = resolvesContainer.resolve(MongoDbProvider);
