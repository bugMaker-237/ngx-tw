import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'tw-btn-group-item',
  standalone: true,
  template: `<ng-template>
    <ng-content></ng-content>
  </ng-template>`,
})
export class TwButtonGroupItem {
  @Input() value: any;
  @Input() disabled: boolean = false;
  @ViewChild(TemplateRef, { static: true }) content: TemplateRef<any> | null =
    null;
  constructor() {}
}
