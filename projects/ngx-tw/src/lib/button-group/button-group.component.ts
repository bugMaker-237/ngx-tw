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
  template: ` <div class="tw-button-group {{ orientation }}">
    <button
      *ngFor="let item of children; let i = index"
      class="tw-button-group-item"
      [disabled]="item.disabled"
      [class.selected-item]="selectedIndex === i"
      (click)="changeSelection(i, item.value)"
    >
      <ng-container [ngTemplateOutlet]="item.content"></ng-container>
    </button>
  </div>`,
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
    this.children!.forEach((element) => {
      console.log(element.disabled);
    });
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
