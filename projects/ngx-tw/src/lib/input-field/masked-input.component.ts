import { NgClass, NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Optional,
  Self,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NgControl } from '@angular/forms';
import { ColorTypes } from '../color-types';
import { TwIcon } from '../icon/icon.component';
import { InputTypes } from './input-field-interface';
import { MaskConfig, MaskedInputField } from './masked-input-field-interface';

@Component({
    imports: [TwIcon, NgClass, FormsModule, NgIf],
    selector: 'tw-masked-input',
    host: {
        class: 'tw-masked-input-wrapper',
    },
    templateUrl: './masked-input.component.html',
    providers: []
})
export class TwMaskedInput
  implements ControlValueAccessor, MaskedInputField, OnInit
{
  @Input() multiline: boolean = false;
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

  // Mask specific inputs
  @Input() maskConfig!: MaskConfig;
  @Input() allowAlphanumeric = false;
  @Input() validator?: (rawValue: string) => boolean | string;

  @ViewChild('inputElement') inputElement!: ElementRef;

  private _onChangeFns: any[] = [];
  private _onTouchedFns: any[] = [];
  private _maskedValue: string = '';
  private _validationError: string | null = null;

  get errors() {
    if (this._validationError) {
      return this._validationError;
    }

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

  ngOnInit(): void {
    if (
      !this.maskConfig ||
      (!this.maskConfig.mask && !Array.isArray(this.maskConfig.mask))
    ) {
      console.warn('Masked input requires a mask configuration');
    }
  }

  writeValue(obj: any): void {
    this.value = obj || '';
    if (this.value) {
      this._maskedValue = this.applyMask(this.value);
    }
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

  onChange(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    const rawValue = this.extractRawValue(inputValue);
    const maskedValue = this.applyMask(rawValue);

    // Apply custom validator if provided
    if (this.validator && rawValue) {
      const validationResult = this.validator(maskedValue);

      if (typeof validationResult === 'string') {
        this._validationError = validationResult;
      } else if (validationResult === false) {
        this._validationError = 'Invalid input format';
      } else {
        this._validationError = null;
      }
    } else {
      this._validationError = null;
    }

    this._maskedValue = maskedValue;

    // Update the input field with masked value if it's different
    if ((event.target as HTMLInputElement).value !== maskedValue) {
      (event.target as HTMLInputElement).value = maskedValue;
    }

    this._onChangeFns?.forEach((fn) => fn(maskedValue));
    this._onTouchedFns?.forEach((fn) => fn());
  }

  /**
   * Extracts the raw value from the masked input
   */
  private extractRawValue(maskedValue: string): string {
    if (!maskedValue) return '';

    // If mask is a regular expression array, extract only valid characters
    if (Array.isArray(this.maskConfig.mask)) {
      return maskedValue
        .split('')
        .filter((char, index) => {
          const maskChar = this.maskConfig.mask[index];
          if (!maskChar) return false;

          if (typeof maskChar === 'object' && maskChar instanceof RegExp) {
            return maskChar.test(char);
          }
          return char !== this.maskConfig.placeholderChar;
        })
        .join('');
    }

    // If mask is a string pattern and allowAlphanumeric is false, remove non-numeric characters
    if (!this.allowAlphanumeric) {
      return maskedValue.replace(/[^0-9]/g, '');
    }

    // If allowAlphanumeric is true, preserve both letters and numbers but remove special chars
    if (this.allowAlphanumeric) {
      return maskedValue.replace(/[^A-Za-z0-9]/g, '');
    }

    return maskedValue;
  }

  /**
   * Applies the mask to the input value
   */
  private applyMask(value: string): string {
    if (!value) return '';

    // Simple implementation for common mask patterns
    if (typeof this.maskConfig.mask === 'string') {
      let result = '';
      let valueIndex = 0;

      // Process each character in the mask pattern
      for (
        let i = 0;
        i < this.maskConfig.mask.length && valueIndex < value.length;
        i++
      ) {
        const maskChar = this.maskConfig.mask[i];

        if (maskChar === '9') {
          // Only allow digits
          while (valueIndex < value.length) {
            const char = value[valueIndex++];
            if (/[0-9]/.test(char)) {
              result += char;
              break;
            }
          }
        } else if (maskChar === 'A') {
          // Only allow letters
          while (valueIndex < value.length) {
            const char = value[valueIndex++];
            if (/[A-Za-z]/.test(char)) {
              result += char;
              break;
            }
          }
        } else if (maskChar === 'A') {
          // Only allow letters
          while (valueIndex < value.length) {
            const char = value[valueIndex++];
            if (/[A-Za-z]/.test(char)) {
              result += char;
              break;
            }
          }
        } else if (maskChar === '*') {
          // Allow any character
          if (valueIndex < value.length) {
            result += value[valueIndex++];
          }
        } else {
          // Add the mask character as is
          result += maskChar;

          // Skip the corresponding value character if it matches the mask character
          if (valueIndex < value.length && value[valueIndex] === maskChar) {
            valueIndex++;
          }
        }
      }

      return result;
    }

    // Implementation for RegExp array masks
    if (Array.isArray(this.maskConfig.mask)) {
      let result = '';
      let valueIndex = 0;

      for (
        let i = 0;
        i < this.maskConfig.mask.length && valueIndex < value.length;
        i++
      ) {
        const maskElement = this.maskConfig.mask[i];

        if (maskElement instanceof RegExp) {
          // Find the next character that matches the RegExp
          while (valueIndex < value.length) {
            const char = value[valueIndex++];
            if (maskElement.test(char)) {
              result += char;
              break;
            }
          }
        } else if (typeof maskElement === 'string') {
          // Add the static mask character
          result += maskElement;

          // Skip the corresponding value character if it matches
          if (valueIndex < value.length && value[valueIndex] === maskElement) {
            valueIndex++;
          }
        }
      }

      return result;
    }

    return value;
  }
}
