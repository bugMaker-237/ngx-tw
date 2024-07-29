import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'tw-expander-header',
  standalone: true,
  template: `<ng-template>
    <ng-content></ng-content>
  </ng-template>`,
})
export class TwExpanderHeader {
  @Input() showIcon = true;
  @Input() hideDivider = false;
  @ViewChild(TemplateRef, { static: true }) content?: TemplateRef<any>;
}
