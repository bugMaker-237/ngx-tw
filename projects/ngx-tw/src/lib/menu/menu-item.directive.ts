import { Directive, Input, TemplateRef } from '@angular/core';
import { TwMenuComponent } from './menu.component';

@Directive({
  selector: '[twMenuItem]',
  standalone: true,
  // imports: [],
})
export class TwMenuItemDirective {
  @Input({ required: false, alias: 'twMenuItem' })
  menu?: TwMenuComponent | string;
  type: 'check' | 'radio' | 'classic' = 'classic';

  get triggerMenu() {
    return (this.menu as TwMenuComponent)?.menuTemplate;
  }

  constructor(public template: TemplateRef<any>) {}
}
