import { Component, Input } from '@angular/core';
import { TwButtonIconComponent } from '@com/button/button-icon.component';
import { TwButtonComponent } from '@com/button/button.component';
import { TwIconComponent } from '@com/icon/icon.component';
import { TwStickyContentHeaderComponent } from '@com/sticky-content-header/sticky-content-header.component';

@Component({
  selector: 'tw-toolbar',
  templateUrl: './toolbar.component.html',
  imports: [
    TwStickyContentHeaderComponent,
    TwIconComponent,
    TwButtonIconComponent,
    TwButtonComponent,
  ],
  standalone: true,
})
export class TwToolbarComponent {
  @Input() header?: string;
  constructor() {}
}
