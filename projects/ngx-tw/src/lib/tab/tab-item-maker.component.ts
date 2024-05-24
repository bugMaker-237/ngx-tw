import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'tw-tab',
  standalone: true,
  template: `<ng-template>
    <ng-content></ng-content>
  </ng-template>`,
})
export class TwTabItemComponent {
  @Input() label?: string;
  @ViewChild(TemplateRef, { static: true }) content?: TemplateRef<any>;
  constructor() {}
}
