import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ColorTypes } from '@com/color-types';
import { ButtonType, RoundedTypes, TwButton } from './button-interface';

@Component({
  standalone: true,
  imports: [NgClass],
  selector: 'tw-button',
  template: `
    <button
      class="tw-button {{ twClass }} {{ type }} rounded-{{ rounded }} {{
        color
      }}"
      [type]="isSubmit ? 'submit' : 'button'"
      [disabled]="disabled"
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class TwButtonComponent implements TwButton {
  @Input() type?: ButtonType = 'basic';
  @Input() isSubmit?: boolean;
  @Input() rounded?: RoundedTypes = 'md';
  @Input() disabled?: boolean;
  @Input() color?: ColorTypes;
  @Input() twClass?: string;
  @Input() title?: string;
}
