import { NgFor, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { TwButtonGroupItem } from './button-group-Item.component';

@Component({
  imports: [NgFor, NgTemplateOutlet],
  selector: 'tw-btn-group',
  standalone: true,
  template: `
    <div class="tw-button-group {{ orientation }}">
      <button
        *ngFor="let item of children; let i = index"
        class="tw-button-group-item"
        [class.selected-item]="selectedIndex === i"
        (click)="selectedIndex = i; selectedIndexChange.emit(i)"
      >
        <ng-container [ngTemplateOutlet]="item.content"></ng-container>
      </button>
    </div>
  `,
})
export class TwButtonGroup implements AfterViewInit {
  @ContentChildren(TwButtonGroupItem)
  children?: QueryList<TwButtonGroupItem>;

  @Output() selectedIndexChange = new EventEmitter<number>();
  @Input() selectedIndex: number = 0;

  @Input() orientation: 'vertical' | 'horizontal' = 'horizontal';

  constructor() {}

  ngAfterViewInit(): void {}
}
