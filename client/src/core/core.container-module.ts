import { ContainerModule, interfaces } from 'inversify';

import { GraphqlClient } from './graphql';
import { ScrollingDefinitionCreator } from './events';

export const CoreContainerModule = new ContainerModule(
  (bind: interfaces.Bind) => {
    bind<GraphqlClient>(GraphqlClient)
      .toSelf()
      .inSingletonScope();

    bind<ScrollingDefinitionCreator>(ScrollingDefinitionCreator)
      .toSelf()
      .inSingletonScope();
  }
);
