import { Component, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'tw-expander-content',
  standalone: true,
  template: `<ng-template>
    <ng-content></ng-content>
  </ng-template>`,
})
export class TwExpanderContent {
  @ViewChild(TemplateRef, { static: true }) content?: TemplateRef<any>;
}
