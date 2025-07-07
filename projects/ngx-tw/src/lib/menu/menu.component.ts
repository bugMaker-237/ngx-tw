import {
  CdkMenu,
  CdkMenuItem,
  CdkMenuItemCheckbox,
  CdkMenuItemRadio,
  CdkMenuTrigger,
} from '@angular/cdk/menu';
import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TwMenuItemDirective } from './menu-item.directive';

@Component({
    selector: 'tw-menu',
    imports: [
        CdkMenu,
        CdkMenuTrigger,
        NgTemplateOutlet,
        CdkMenuItem,
        CdkMenuItemCheckbox,
        CdkMenuItemRadio,
    ],
    template: `
    <ng-template>
      <div
        class="bg-white dark:bg-slate-700 dark:text-white border border-gray-200 rounded-lg shadow-lg  w-full"
        [style.width]="panelWidth"
        cdkMenu
      >
        @for(item of menuItems; track $index){ @switch(item.type) { @case
        ('check') {
        <div
          cdkMenuItemCheckbox
          [cdkMenuItemChecked]="false"
          [cdkMenuTriggerFor]="item.triggerMenu"
          class="w-full tw-dropdown-menu-item"
          [class.disabled]="item.disabled"
        >
          <ng-container *ngTemplateOutlet="item.template"></ng-container>
        </div>

        } @case ('radio') {
        <div
          cdkMenuItemRadio
          [cdkMenuTriggerFor]="item.triggerMenu"
          class="w-full tw-dropdown-menu-item"
          [class.disabled]="item.disabled"
        >
          <ng-container *ngTemplateOutlet="item.template"></ng-container>
        </div>
        } @default {
        <div
          cdkMenuItem
          [cdkMenuTriggerFor]="item.triggerMenu"
          class="w-full tw-dropdown-menu-item"
          [class.disabled]="item.disabled"
        >
          <ng-container *ngTemplateOutlet="item.template"></ng-container>
        </div>
        } } }
      </div>
    </ng-template>
  `
})
export class TwMenu {
  @ViewChild(TemplateRef, { static: true }) menuTemplate?: TemplateRef<unknown>;
  @ContentChildren(TwMenuItemDirective)
  menuItems?: QueryList<TwMenuItemDirective>;

  @Input()
  panelWidth?: string;
}
