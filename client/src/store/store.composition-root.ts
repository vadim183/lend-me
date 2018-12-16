import { Container } from 'inversify';

import { CoreContainerModule } from '@core/index';
import { DomainContainerModule, ItemsService } from '@domain/index';

const storeContainer = new Container();

storeContainer.load(CoreContainerModule, DomainContainerModule);

export const itemsApiService = storeContainer.resolve(ItemsService);
