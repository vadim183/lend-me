import { injectable } from 'inversify';
import { Subscription, fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

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

    let eventSubscription: Subscription;

    return {
      setup: () => {
        eventSubscription = fromEvent(scrollingElement, SCROLL_EVENT)
          .pipe(throttleTime(250))
          .subscribe(eventCallback);
      },
      destroy: () => {
        eventSubscription.unsubscribe();
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
