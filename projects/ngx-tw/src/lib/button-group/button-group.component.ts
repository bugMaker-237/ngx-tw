import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ColorTypes } from '../color-types';
import { TwButtonGroupItem } from './button-group-Item.component';

@Component({
  imports: [NgTemplateOutlet],
  selector: 'tw-btn-group',
  template: ` <div class="tw-button-group {{ orientation }}">
    @for (item of children; track item; let i = $index) {
    <button
      class="tw-button-group-item  {{ item.color || color }}"
      [disabled]="disabled || item.disabled"
      [class.selected-item]="selectedIndex === i"
      (click)="changeSelection(i, item.value)"
    >
      <ng-container [ngTemplateOutlet]="item.content"></ng-container>
    </button>
    }
  </div>`,

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TwButtonGroup),
      multi: true,
    },
  ],
})
export class TwButtonGroup implements ControlValueAccessor, AfterViewInit {
  @ContentChildren(TwButtonGroupItem)
  children?: QueryList<TwButtonGroupItem>;

  @Output() selectedIndexChange = new EventEmitter<number>();
  @Output() selectedValueChange = new EventEmitter<any>();

  @Output() itemSelected = new EventEmitter<{
    selectedIndex: number;
    selectedValue: any;
  }>();
  @Input() selectedIndex: number = -1;

  @Input() color?: ColorTypes;

  @Input() orientation: 'vertical' | 'horizontal' = 'horizontal';

  @Input() selectedValue: any;
  @Input() disabled: boolean = false;

  onChange: any;
  onTouch: any;

  constructor() {}
  writeValue(obj: any): void {
    this.selectedValue = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngAfterViewInit(): void {}

  changeSelection(index: number, value: any): void {
    this.itemSelected.emit({
      selectedIndex: index,
      selectedValue: value,
    });
    this.selectedValue = value;
    this.selectedIndex = index;
    this.selectedIndexChange.emit(index);
    this.selectedValueChange.emit(value);
    this.onChange?.(value);
    this.onTouch?.();
  }
}
