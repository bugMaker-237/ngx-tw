import { TextFieldModule } from '@angular/cdk/text-field';
import { NgClass } from '@angular/common';
import { Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';
import { ColorTypes } from '../color-types';
import { TwIcon } from '../icon/icon.component';
import { InputField, InputTypes } from './input-field-interface';

@Component({
    imports: [TwIcon, NgClass, FormsModule, TextFieldModule],
    selector: 'tw-input-field',
    host: {
        class: 'tw-input-wrapper',
    },
    templateUrl: './input-field.component.html',
    providers: []
})
export class TwInputField implements ControlValueAccessor, InputField {
  @Input() iconSuffix?: string;
  @Input() iconSuffixClass?: string;
  @Input() iconPrefix?: string;
  @Input() iconPrefixClass?: string;
  @Input() twClass?: string;
  @Input() name: string = '';
  @Input() label: string = '';

  @Input() value?: string = '';
  @Input() maxLength?: number;
  @Input() minLength?: number;
  @Input() required: string | boolean = false;
  @Input() pattern: string | RegExp = '';
  @Input() placeholder: string = '';
  @Input() disabled = false;
  @Input() inputType: InputTypes = 'text';
  @Input() color?: ColorTypes;
  @Input() showLabel: boolean = true;
  @Input() multiline: boolean = false;

  private _onChangeFns: any[] = [];
  private _onTouchedFns: any[] = [];

  get errors() {
    return this._ngControl?.dirty && this._ngControl?.errors
      ? Object.keys(this._ngControl.errors)
          .filter((e) => e !== 'required')
          .join('.\n')
      : null;
  }

  constructor(@Self() @Optional() private readonly _ngControl?: NgControl) {
    if (this._ngControl) {
      this._ngControl.valueAccessor = this;
    }
  }
  writeValue(obj: any): void {
    this.value = obj || '';
  }
  registerOnChange(fn: any): void {
    if (fn) this._onChangeFns.push(fn);
  }
  registerOnTouched(fn: any): void {
    if (fn) this._onTouchedFns.push(fn);
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit(): void {}

  onChange(event: Event) {
    const value = (event as any).target.value;
    this._onChangeFns?.forEach((fn) => fn(value));
    this._onTouchedFns?.forEach((fn) => fn(value));
  }
}
