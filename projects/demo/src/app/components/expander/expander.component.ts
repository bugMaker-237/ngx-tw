import { Component } from '@angular/core';
import { TwExpanderModule } from 'ngx-tw';

@Component({
  selector: 'app-expander',
  standalone: true,
  imports: [TwExpanderModule],
  templateUrl: './expander.component.html',
  styleUrl: './expander.component.scss',
})
export class ExpanderComponent {}