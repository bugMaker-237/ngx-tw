import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TwIconComponent } from '@com/icon/icon.component';
import { ColorTypes } from '../color-types';
import { ButtonType, TwButton } from './button-interface';

@Component({
  standalone: true,
  imports: [NgClass, TwIconComponent],
  selector: 'tw-button-icon',
  template: `
    <button
      class="tw-button-icon {{ twClass }} {{ type }} {{ color }}"
      [type]="isSubmit ? 'submit' : 'button'"
      [title]="title"
      [disabled]="disabled"
    >
      <tw-icon [svgIcon]="svgIcon" />
    </button>
  `,
})
export class TwButtonIconComponent implements OnInit, TwButton {
  @Input() type?: ButtonType = 'basic';
  @Input() color?: ColorTypes;
  @Input() isSubmit?: boolean;
  @Input() twClass?: string;
  @Input() disabled?: boolean;
  @Input() title?: string;
  @Input() svgIcon?: string;
  constructor() {}

  ngOnInit(): void {}
}
