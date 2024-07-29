import { EventEmitter } from '@angular/core';
import { HTML_EVENTS } from './html-events';

export class TwElement {
  bindEvents(element: HTMLElement, component: any) {
    HTML_EVENTS.forEach((ev) => {
      if (component[ev] && component[ev] instanceof EventEmitter) {
        element.addEventListener(ev, (event) => component[ev].emit(event));
      }
    });
  }
}
