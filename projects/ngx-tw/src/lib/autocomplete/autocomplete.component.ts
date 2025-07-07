import {
  BlockScrollStrategy,
  CdkConnectedOverlay,
  ConnectedPosition,
  Overlay,
} from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { ColorTypes } from '../color-types';
import { InputField, InputTypes } from '../input-field/input-field-interface';
import { TwInputField } from '../input-field/input-field.component';
import { OverlayPositions } from '../TwElement';
import { AutoCompleteManager } from './autocomplete-manager';

@Component({
    selector: 'tw-autocomplete',
    imports: [
        ReactiveFormsModule,
        CommonModule,
        CdkConnectedOverlay,
        TwInputField,
    ],
    templateUrl: './autocomplete.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TwAutocomplete),
            multi: true,
        },
    ]
})
export class TwAutocomplete
  implements OnInit, ControlValueAccessor, InputField
{
  @Input() iconSuffix?: string;
  @Input() iconSuffixClass?: string;
  @Input() iconPrefix?: string;
  @Input() iconPrefixClass?: string;
  @Input() twClass?: string;
  @Input() name: string = '';
  @Input() label: string = '';

  @Input() maxLength?: number;
  @Input() minLength?: number;
  @Input() required: string | boolean = false;
  @Input() pattern: string | RegExp = '';
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

  @Input() set suggestions(value: any[] | Observable<any[]>) {
    this.autoCompleteManager.suggestions = value;
  }
  get suggestions() {
    return this.autoCompleteManager.suggestions;
  }

  @Input() set keyFactory(
    value: ((item: any) => { key: string; value: string }) | undefined
  ) {
    this.autoCompleteManager.keyFactory = value;
  }

  get keyFactory() {
    return this.autoCompleteManager.keyFactory;
  }

  @Input() optionTemplate: TemplateRef<any> | null = null;

  @Input() set filterFn(fn: (value: string, item: any) => boolean) {
    this.autoCompleteManager.filterFn = fn;
  }

  get filterFn() {
    return this.autoCompleteManager.filterFn;
  }

  @Output() selectionChanged: EventEmitter<any> = new EventEmitter<any>();

  searchControl = new FormControl();
  get filteredSuggestions() {
    return this.autoCompleteManager.filteredSuggestions;
  }

  blockScrollStrategy: BlockScrollStrategy;

  positions: ConnectedPosition[] = OverlayPositions;

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  autoCompleteManager = new AutoCompleteManager(
    this.searchControl.valueChanges
  );

  constructor(public elementRef: ElementRef, private overlay: Overlay) {
    this.blockScrollStrategy = this.overlay.scrollStrategies.block();
  }

  ngOnInit(): void {
    this.autoCompleteManager.init();
  }

  selectSuggestion(suggestion: any) {
    if (!this.autoCompleteManager.selectSuggestion(suggestion)) {
      return;
    }
    const value = this.autoCompleteManager.getDisplayText(suggestion);
    this.searchControl.setValue(value);
    this.onChange(value);
  }

  writeValue(value: any): void {
    this.searchControl.setValue(this.autoCompleteManager.getDisplayText(value));
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
