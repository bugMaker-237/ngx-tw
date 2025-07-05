import { ConnectedPosition } from '@angular/cdk/overlay';
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

export const OverlayPositions: ConnectedPosition[] = [
  {
    originX: 'start',
    originY: 'bottom',
    overlayX: 'start',
    overlayY: 'top',
    offsetY: 8,
  },
  {
    originX: 'end',
    originY: 'bottom',
    overlayX: 'end',
    overlayY: 'top',
    offsetY: 8,
  },
  {
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'bottom',
    offsetY: -8,
  },
  {
    originX: 'end',
    originY: 'top',
    overlayX: 'end',
    overlayY: 'bottom',
    offsetY: -8,
  },
];
