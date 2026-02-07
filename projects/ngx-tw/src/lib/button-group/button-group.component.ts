import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  inject,
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
        [class.selected-item]="
          selectedIndex === i || selectedValue === item.value
        "
        type="button"
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

  @Input() color?: ColorTypes = 'primary';

  @Input() orientation: 'vertical' | 'horizontal' = 'horizontal';

  @Input() selectedValue: any;
  @Input() disabled: boolean = false;

  onChange: any;
  onTouch: any;

  private readonly _cd = inject(ChangeDetectorRef);

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

  ngAfterViewInit(): void {
    if (this.selectedValue) {
      this.selectedIndex = this.children
        ? this.children
            .toArray()
            .findIndex((c) => c.value === this.selectedValue)
        : -1;
      this._cd.detectChanges();
    }
  }

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
