import { NgClass, NgIf } from '@angular/common';
import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { ColorTypes } from '@com/color-types';
import { TwIconComponent } from '@com/icon/icon.component';

type InputTypes =
  | 'text'
  | 'password'
  | 'email'
  | 'color'
  | 'date'
  | 'email'
  | 'number'
  | 'month'
  | 'search'
  | 'tel'
  | 'time'
  | 'url'
  | 'week';

@Component({
  imports: [TwIconComponent, NgClass, FormsModule, NgIf],
  standalone: true,
  selector: 'tw-input-field',
  templateUrl: './input-field.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TwInputFieldComponent),
      multi: true,
    },
  ],
})
export class TwInputFieldComponent implements ControlValueAccessor {
  @Input() iconSuffix?: string;
  @Input() iconSuffixClass?: string;
  @Input() iconPrefix?: string;
  @Input() iconPrefixClass?: string;

  @Input() value?: string;
  @Input() maxLength?: number;
  @Input() minLength?: number;
  @Input() required: string | boolean = false;
  @Input() pattern: string | RegExp = '';
  @Input() placeholder?: string;
  @Input() disabled = false;
  @Input() inputType: InputTypes = 'text';
  @Input() color?: ColorTypes;

  private _onChangeFns: any[] = [];

  constructor() {}
  writeValue(obj: any): void {
    console.log(obj);
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    console.log(fn);
    if (fn) this._onChangeFns.push(fn);
  }
  registerOnTouched(fn: any): void {
    throw new Error('Not implemented');
  }
  setDisabledState?(isDisabled: boolean): void {
    console.log(isDisabled);
    this.disabled = isDisabled;
  }

  ngOnInit(): void {}

  onChange(event: Event) {
    this._onChangeFns?.forEach((fn) => fn(event));
  }
}
