import { Component, OnInit } from '@angular/core';
import { TwIconComponent } from '@com/icon/icon.component';

@Component({
  imports: [TwIconComponent],
  standalone: true,
  selector: 'tw-selected-app',
  templateUrl: './selected-app.component.html',
  styleUrls: ['./selected-app.component.scss'],
})
export class SelectedAppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
