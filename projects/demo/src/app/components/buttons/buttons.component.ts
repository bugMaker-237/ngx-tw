import { Component } from '@angular/core';
import { TwButton, TwButtonIcon } from 'ngx-tw';

@Component({
    selector: 'app-buttons',
    imports: [TwButton, TwButtonIcon],
    templateUrl: './buttons.component.html',
    styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {}
