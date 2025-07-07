import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { ColorTypes } from '../color-types';

@Component({
    selector: 'tw-switch',
    template: `
    <span class="tw-switch {{ twClass }}">
      <span class="mr-2">{{ label }}</span>
      <input
        id="one"
        #chkbox
        (change)="onChange($event)"
        [class]="color"
        type="checkbox"
        [disabled]="disabled"
        [checked]="value"
      />
    </span>
  `,
    imports: [FormsModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TwSwitch),
            multi: true,
        },
    ]
})
export class TwSwitch implements ControlValueAccessor {
  @Input() label?: string;
  @Input() twClass?: string;
  @Output() toggleChange = new EventEmitter<boolean>();
  @Input() disabled = false;
  @Input() color?: ColorTypes;

  @Input() value: boolean = false;

  private _alternateValues: { [x: string]: boolean } = {
    '1': true,
    TRUE: true,
    FALSE: false,
    '0': false,
  };

  private _onChangeFns: any[] = [];
  private _onTouchedFns: any[] = [];

  constructor() {}
  writeValue(obj: any): void {
    if (typeof obj === 'boolean') this.value = obj.valueOf();
    else if (obj) {
      this.value = this._alternateValues[obj.toString()] || false;
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

  ngOnInit(): void {}
  onChange(event: Event) {
    const value = (event.target as any).checked;
    this.toggleChange.emit(value);
    this.value = value;
    this._onChangeFns?.forEach((fn) => fn(value));
    this._onTouchedFns?.forEach((fn) => fn(value));
  }
}
