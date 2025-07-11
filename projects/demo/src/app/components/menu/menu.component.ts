import { Component } from '@angular/core';
import { TwButton, TwButtonIcon, TwIcon, TwMenuModule } from 'ngx-tw';

@Component({
  selector: 'app-menu',
  imports: [TwMenuModule, TwButton, TwButtonIcon, TwIcon],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {}
