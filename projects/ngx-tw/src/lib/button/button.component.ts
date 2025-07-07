import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ColorTypes } from '../color-types';
import {
  ButtonType,
  RoundedTypes,
  TwButtonInterface,
} from './button-interface';

@Component({
    imports: [NgClass],
    selector: 'tw-button',
    host: {
        role: 'button',
        '[attr.type]': 'isSubmit ? "submit" : "button"',
        class: 'inline-block w-fit',
    },
    template: `
    <button
      class="tw-button w-fit {{ twClass }} {{ type }} rounded-{{ rounded }} {{
        color
      }}"
      [type]="isSubmit ? 'submit' : 'button'"
      [disabled]="disabled"
    >
      <ng-content></ng-content>
    </button>
  `
})
export class TwButton implements TwButtonInterface {
  @Input() type?: ButtonType = 'basic';
  @Input() isSubmit?: boolean;
  @Input() rounded?: RoundedTypes = 'md';
  @Input() disabled?: boolean;
  @Input() color?: ColorTypes;
  @Input() twClass?: string;
  @Input() title?: string;
}
