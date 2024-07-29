import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'tw-tab',
  standalone: true,
  template: `<ng-template>
    <ng-content></ng-content>
  </ng-template>`,
})
export class TwTabItem {
  @Input() label?: string;
  @Input() route?: {
    path: string[];
    extras?: NavigationExtras;
  };
  @ViewChild(TemplateRef, { static: true }) content?: TemplateRef<any>;
  constructor() {}
}
