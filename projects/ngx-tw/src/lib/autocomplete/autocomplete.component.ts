import {
  BlockScrollStrategy,
  CdkConnectedOverlay,
  ConnectedPosition,
  Overlay,
} from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Self,
  TemplateRef,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NgControl,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { ColorTypes } from '../color-types';
import { InputField, InputTypes } from '../input-field/input-field-interface';
import { TwInputField } from '../input-field/input-field.component';
import { TwSpinner } from '../spinner/spinner.component';
import { OverlayPositions } from '../TwElement';
import { AutoCompleteManager, SuggestionsType } from './autocomplete-manager';

@Component({
  selector: 'tw-autocomplete',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CdkConnectedOverlay,
    TwInputField,
    TwSpinner,
  ],
  templateUrl: './autocomplete.component.html',
})
export class TwAutocomplete<T = any>
  implements
    OnInit,
    AfterViewInit,
    OnDestroy,
    ControlValueAccessor,
    Validator,
    InputField
{
  @Input() iconSuffix?: string;
  @Input() iconSuffixClass?: string;
  @Input() iconPrefix?: string;
  @Input() iconPrefixClass?: string;
  @Input() twClass?: string;
  @Input() name: string = '';
  @Input() label: string = '';

  @Input() set maxLength(value: number | undefined) {
    this._maxLength = value;
    if (this.searchControl) {
      this.updateValidators();
    }
  }
  get maxLength() {
    return this._maxLength;
  }
  private _maxLength?: number;

  @Input() set minLength(value: number | undefined) {
    this._minLength = value;
    if (this.searchControl) {
      this.updateValidators();
    }
  }
  get minLength() {
    return this._minLength;
  }
  private _minLength?: number;
  @Input() set required(value: string | boolean) {
    this._required = value;
    if (this.searchControl) {
      this.updateValidators();
    }
  }
  get required() {
    return this._required;
  }
  private _required: string | boolean = false;

  @Input() set pattern(value: string | RegExp) {
    this._pattern = value;
    if (this.searchControl) {
      this.updateValidators();
    }
  }
  get pattern() {
    return this._pattern;
  }
  private _pattern: string | RegExp = '';
  @Input() placeholder: string = '';
  @Input() set disabled(value: boolean) {
    if (value) this.searchControl.disable();
    else this.searchControl.enable();
  }
  get disabled() {
    return this.searchControl.disabled;
  }
  @Input() inputType: InputTypes = 'text';
  @Input() color?: ColorTypes;
  @Input() showLabel: boolean = true;
  multiline = false;

  _value?: T;
  @Input() get value() {
    return this._value;
  }

  set value(val: T | undefined) {
    this._value = val;
    this.searchControl.setValue(this.autoCompleteManager.getDisplayText(val), {
      emitEvent: false,
    });
  }

  private _minFieldSize: number = 0;
  private resizeObserver?: ResizeObserver;

  @Input() set suggestions(value: SuggestionsType<T>) {
    this.autoCompleteManager.suggestions = value;
  }
  get suggestions() {
    return this.autoCompleteManager.suggestions;
  }

  get suggestionsLoading() {
    return this.autoCompleteManager.suggestionsLoading;
  }

  @Input() set displayFactory(
    value: ((item: any) => { key: string; text: string }) | undefined
  ) {
    this.autoCompleteManager.displayFactory = value;
  }

  get displayFactory() {
    return this.autoCompleteManager.displayFactory;
  }

  @Input() optionTemplate: TemplateRef<any> | null = null;

  @Input() set filterFn(fn: (value: string, item: any) => boolean) {
    this.autoCompleteManager.filterFn = fn;
  }

  get filterFn() {
    return this.autoCompleteManager.filterFn;
  }

  get minFieldSize() {
    return this._minFieldSize;
  }

  @Output() selectionChanged: EventEmitter<any> = new EventEmitter<any>();

  searchControl = new FormControl<string>('');
  get filteredSuggestions() {
    return this.autoCompleteManager.filteredSuggestions;
  }

  blockScrollStrategy: BlockScrollStrategy;

  positions: ConnectedPosition[] = OverlayPositions;

  onChange: ((value: any) => void)[] = [];
  onTouched: (() => void)[] = [];

  autoCompleteManager = new AutoCompleteManager<T>(
    this.searchControl.valueChanges
  );

  constructor(
    public elementRef: ElementRef,
    private overlay: Overlay,
    private cdr: ChangeDetectorRef,
    @Self() @Optional() private readonly _ngControl?: NgControl
  ) {
    this.blockScrollStrategy = this.overlay.scrollStrategies.block();
    if (this._ngControl) {
      this._ngControl.valueAccessor = this;
    }
  }

  ngOnInit(): void {
    this.autoCompleteManager.init();
    this.updateValidators();
  }

  ngAfterViewInit(): void {
    // Initialize the offset width
    this._minFieldSize = this.elementRef.nativeElement.offsetWidth;

    // Set up ResizeObserver to watch for size changes
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          this._minFieldSize = entry.contentRect.width;
          this.cdr.detectChanges();
        }
      });
      this.resizeObserver.observe(this.elementRef.nativeElement);
    }
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  updateValidators(): void {
    const validators = [];

    if (this.required) {
      validators.push(Validators.required);
    }

    if (this.minLength !== undefined) {
      validators.push(Validators.minLength(this.minLength));
    }

    if (this.maxLength !== undefined) {
      validators.push(Validators.maxLength(this.maxLength));
    }

    if (this.pattern) {
      validators.push(Validators.pattern(this.pattern));
    }

    this.searchControl.setValidators(validators);
    this.searchControl.updateValueAndValidity();
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.searchControl) {
      return null;
    }

    // If the component is disabled, it's valid
    if (this.disabled) {
      return null;
    }

    // Return the validation errors from the internal search control
    return this.searchControl.errors;
  }

  selectSuggestion(suggestion: any) {
    const value = this.autoCompleteManager.getDisplayText(suggestion);
    this.searchControl.setValue(value, {
      emitEvent: false,
    });
    this.propagateOnchange(suggestion);
    this.autoCompleteManager.closeDropdown();
  }

  writeValue(value: any): void {
    this._value = value;
    this.searchControl.setValue(
      this.autoCompleteManager.getDisplayText(value),
      {
        emitEvent: false,
      }
    );
  }

  propagateOnchange(value: any) {
    this.onChange.forEach((fn) => fn(value));
    this.selectionChanged.emit(value);
  }

  registerOnChange(fn: any): void {
    this.onChange.push(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched.push(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
