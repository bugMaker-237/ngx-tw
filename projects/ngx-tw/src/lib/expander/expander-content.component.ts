import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'tw-expander-content',
  standalone: true,
  template: `<ng-template>
    <ng-content></ng-content>
  </ng-template>`,
})
export class TwExpanderContentComponent {
  @ViewChild(TemplateRef, { static: true }) content?: TemplateRef<any>;
}
