import { NgTemplateOutlet } from '@angular/common';
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
    imports: [NgTemplateOutlet],
    selector: 'tw-btn-group',
    template: ` <div class="tw-button-group {{ orientation }}">
      @for (item of children; track item; let i = $index) {
        <button
          class="tw-button-group-item"
          [disabled]="item.disabled"
          [class.selected-item]="selectedIndex === i"
          (click)="changeSelection(i, item.value)"
          >
          <ng-container [ngTemplateOutlet]="item.content"></ng-container>
        </button>
      }
    </div>`
})
export class TwButtonGroup implements AfterViewInit {
  @ContentChildren(TwButtonGroupItem)
  children?: QueryList<TwButtonGroupItem>;

  @Output() selectedIndexChange = new EventEmitter<number>();

  @Output() itemSelected = new EventEmitter<{
    selectedIndex: number;
    selectedValue: any;
  }>();
  @Input() selectedIndex: number = -1;

  @Input() orientation: 'vertical' | 'horizontal' = 'horizontal';

  constructor() {}

  ngAfterViewInit(): void {
  }

  changeSelection(index: number, value: any): void {
    this.itemSelected.emit({
      selectedIndex: index,
      selectedValue: value,
    });
    this.selectedIndexChange.emit(index);
    this.selectedIndex = index;
  }
}
