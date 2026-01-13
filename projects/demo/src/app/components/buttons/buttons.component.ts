import { Component } from '@angular/core';
import { TwButton, TwButtonIcon, TwButtonGroup, TwButtonGroupItem } from 'ngx-tw';

@Component({
  selector: 'app-buttons',
  imports: [TwButton, TwButtonIcon, TwButtonGroup, TwButtonGroupItem],
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
})
export class ButtonsComponent {}
