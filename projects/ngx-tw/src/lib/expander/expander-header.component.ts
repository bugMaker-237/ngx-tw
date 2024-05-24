import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'tw-expander-header',
  standalone: true,
  template: `<ng-template>
    <ng-content></ng-content>
  </ng-template>`,
})
export class TwExpanderHeaderComponent {
  @Input() showIcon = true;
  @ViewChild(TemplateRef, { static: true }) content?: TemplateRef<any>;
}
