import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'tw-tab-item',
  template: `
    <div
      class="tw-tab-item"
      [class.selected-item]="isSelected"
      (click)="selected.emit()"
    >
      {{ label }}
    </div>
  `,
})
export class __TwTabItem {
  @Output() selected = new EventEmitter();
  @Input() label?: string;
  @Input() isSelected?: boolean;
}
