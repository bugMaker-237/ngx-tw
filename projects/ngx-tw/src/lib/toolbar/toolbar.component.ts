import { Component, Input } from '@angular/core';
import { TwButtonIcon } from '../button/button-icon.component';
import { TwButton } from '../button/button.component';
import { TwIcon } from '../icon/icon.component';
import { TwStickyContentHeader } from '../sticky-content-header/sticky-content-header.component';

@Component({
    selector: 'tw-toolbar',
    templateUrl: './toolbar.component.html',
    imports: [TwStickyContentHeader, TwIcon, TwButtonIcon, TwButton]
})
export class TwToolbar {
  @Input() header?: string;
  @Input() toolbarIcon?: string = 'hero:shopping-bag';
  @Input() hideActions = false;
  constructor() {}
}
