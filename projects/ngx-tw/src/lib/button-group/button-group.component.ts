import { NgFor, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Output,
  QueryList,
} from '@angular/core';
import { TwButtonGroupItemComponent } from './button-group-Item.component';

@Component({
  imports: [NgFor, NgTemplateOutlet],
  selector: 'tw-btn-group',
  standalone: true,
  template: `
    <div class="tw-button-group">
      <button
        *ngFor="let item of children; let i = index"
        class="tw-button-group-item"
        [class.selected-item]="selectedIndex === i"
        (click)="selectedIndex = i; selectionChanged.emit(i)"
      >
        <ng-container [ngTemplateOutlet]="item.content"></ng-container>
      </button>
    </div>
  `,
})
export class TwButtonGroupComponent implements AfterViewInit {
  @ContentChildren(TwButtonGroupItemComponent)
  children?: QueryList<TwButtonGroupItemComponent>;

  @Output() selectionChanged = new EventEmitter<number>();
  selectedIndex = 0;
  constructor() {}

  ngAfterViewInit(): void {}
}
