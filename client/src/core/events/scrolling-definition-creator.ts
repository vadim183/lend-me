import { injectable } from 'inversify';

import { EventDefinition } from './event-definition.model';

const SCROLL_DIFF = 20;

const SCROLL_EVENT = 'scroll';

@injectable()
export class ScrollingDefinitionCreator {
  public createScrollingDefinition(
    scrollingElement: Element,
    action: () => void
  ): EventDefinition {
    let wrappedElement = scrollingElement.firstChild as Element;
    let eventCallback = () => this.trackScrolling(wrappedElement, action);

    return {
      setup: () => {
        scrollingElement.addEventListener(SCROLL_EVENT, eventCallback);
      },
      destroy: () => {
        scrollingElement.removeEventListener(SCROLL_EVENT, eventCallback);
      }
    };
  }

  private trackScrolling(wrappedElement: Element, action: () => void): void {
    if (this.isBottom(wrappedElement)) {
      action();
    }
  }

  private isBottom(wrappedElement: Element): boolean {
    return (
      wrappedElement.getBoundingClientRect().bottom <=
      window.innerHeight + SCROLL_DIFF
    );
  }
}
