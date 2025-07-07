import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ColorTypes } from '../color-types';
import { TwIcon } from '../icon/icon.component';
import { ButtonType, TwButtonInterface } from './button-interface';

@Component({
    imports: [NgClass, TwIcon],
    selector: 'tw-button-icon',
    template: `
    @if(href){
    <a
      class="tw-button-icon {{ twClass }} {{ type }} {{ color }}"
      [href]="href"
      [target]="target"
      [attr.title]="title"
      [ariaDisabled]="disabled"
    >
      <tw-icon [svgIcon]="svgIcon" [size]="svgIconSize" />
    </a>

    }@else {
    <button
      class="tw-button-icon {{ twClass }} {{ type }} {{ color }}"
      [type]="isSubmit ? 'submit' : 'button'"
      [attr.title]="title"
      [disabled]="disabled"
      [ariaDisabled]="disabled"
    >
      <tw-icon [svgIcon]="svgIcon" [size]="svgIconSize" />
    </button>

    }
  `
})
export class TwButtonIcon implements OnInit, TwButtonInterface {
  @Input() type?: ButtonType = 'basic';
  @Input() color?: ColorTypes;
  @Input() isSubmit?: boolean;
  @Input({ alias: 'class' }) twClass?: string;
  @Input() disabled?: boolean;
  @Input() title?: string = '';
  @Input() svgIcon?: string;
  @Input() svgIconSize = 20;
  @Input() href?: string;
  @Input() target?: string;
  constructor() {}

  ngOnInit(): void {}
}
