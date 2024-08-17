import { Directive, Input, TemplateRef } from '@angular/core';
import { TwMenu } from './menu.component';

@Directive({
  selector: '[twMenuItem]',
  standalone: true,
  // imports: [],
})
export class TwMenuItemDirective {
  @Input({ required: false, alias: 'twMenuItem' })
  menu?: TwMenu | string;

  @Input({ required: false, alias: 'twMenuItemDisabled' })
  disabled: boolean = false;
  type: 'check' | 'radio' | 'classic' = 'classic';

  get triggerMenu() {
    return (this.menu as TwMenu)?.menuTemplate;
  }

  constructor(public template: TemplateRef<any>) {}
}
