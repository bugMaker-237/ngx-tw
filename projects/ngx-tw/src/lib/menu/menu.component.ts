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
  QueryList,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TwMenuItemDirective } from './menu-item.directive';

@Component({
  selector: 'tw-menu',
  standalone: true,
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
        class="bg-white dark:bg-slate-700 dark:text-white shadow-md rounded-lg w-full"
        cdkMenu
      >
        @for(item of menuItems; track $index){ @switch(item.type) { @case
        (item.type ==='check') {
        <div
          cdkMenuItemCheckbox
          [cdkMenuItemChecked]="false"
          [cdkMenuTriggerFor]="item.triggerMenu"
          class="w-full tw-dropdown-menu-item"
        >
          <ng-container *ngTemplateOutlet="item.template"></ng-container>
        </div>

        } @case (item.type ==='radio') {
        <div
          cdkMenuItemRadio
          [cdkMenuTriggerFor]="item.triggerMenu"
          class="w-full tw-dropdown-menu-item"
        >
          <ng-container *ngTemplateOutlet="item.template"></ng-container>
        </div>
        } @default {
        <div
          cdkMenuItem
          [cdkMenuTriggerFor]="item.triggerMenu"
          class="w-full tw-dropdown-menu-item"
        >
          <ng-container *ngTemplateOutlet="item.template"></ng-container>
        </div>
        } } }
      </div>
    </ng-template>
  `,
})
export class TwMenuComponent {
  @ViewChild(TemplateRef, { static: true }) menuTemplate?: TemplateRef<unknown>;
  @ContentChildren(TwMenuItemDirective)
  menuItems?: QueryList<TwMenuItemDirective>;
}
