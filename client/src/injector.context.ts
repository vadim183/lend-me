import * as React from 'react';
import { Container } from 'inversify';

import { CoreContainerModule } from '@core/core.container-module';
import { ScrollingDefinitionCreator } from '@core/events';

let appContainer = new Container();

appContainer.load(CoreContainerModule);

export interface IInjectorContext {
  scrollingDefinitionCreator: ScrollingDefinitionCreator;
}

export const injectorContextValue = {
  scrollingDefinitionCreator: appContainer.resolve(ScrollingDefinitionCreator)
};

export const InjectorContext = React.createContext<IInjectorContext>(
  injectorContextValue
);
