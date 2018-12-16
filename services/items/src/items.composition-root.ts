import { Container } from 'inversify';

import { CoreContainerModule } from './core/index';
import { DomainContainerModule, ItemsService } from './domain/index';

const resolvesContainer = new Container();

resolvesContainer.load(CoreContainerModule, DomainContainerModule);

export const itemsApiService = resolvesContainer.resolve(ItemsService);
