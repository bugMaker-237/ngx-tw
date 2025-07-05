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
  ViewChild,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable, isObservable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { ColorTypes } from '../color-types';
import { InputField, InputTypes } from '../input-field/input-field-interface';
import { TwInputField } from '../input-field/input-field.component';

@Component({
  selector: 'tw-autocomplete',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CdkConnectedOverlay,
    TwInputField,
  ],
  standalone: true,
  templateUrl: './autocomplete.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TwAutocomplete),
      multi: true,
    },
  ],
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

  @ViewChild('suggestions') suggestionsTemplate!: TemplateRef<any>;

  @Input() suggestions$: Observable<any[]> | null = null;
  @Input() suggestions: any[] | null = null;
  @Input() keyFactory: ((item: any) => { key: string; value: string }) | null =
    null;
  @Input() optionTemplate: TemplateRef<any> | null = null;

  @Input() filterFn: (value: string, item: any) => boolean = (
    value: string,
    item: any
  ) => this.getDisplayText(item).toLowerCase().includes(value.toLowerCase());
  @Output() selectionChanged: EventEmitter<any> = new EventEmitter<any>();

  searchControl = new FormControl();
  filteredSuggestions: any[] = [];
  isOpen: boolean = false;

  blockScrollStrategy: BlockScrollStrategy;

  positions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: 8,
    },
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
      offsetY: 8,
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetY: -8,
    },
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom',
      offsetY: -8,
    },
  ];

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  constructor(public elementRef: ElementRef, private overlay: Overlay) {
    this.blockScrollStrategy = this.overlay.scrollStrategies.block();
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        tap(
          (v) => (
            console.log(v), v.length === 0 ? this.closeDropdown() : void 0
          )
        ),
        filter((value) => value.length >= 1),
        map((value) => this.filterSuggestions(value))
      )
      .subscribe((filtered) => {
        this.filteredSuggestions = filtered;
        this.openDropdown();
      });
  }

  filterSuggestions(value: string): any[] {
    const suggestionsArray$ = isObservable(this.suggestions$)
      ? this.suggestions$
      : of(this.suggestions || []);

    let filtered: any[] = [];

    suggestionsArray$.subscribe((suggestions) => {
      filtered = suggestions.filter((suggestion) =>
        this.filterFn(value, suggestion)
      );
    });

    return filtered;
  }

  getDisplayText(item: any): string {
    if (this.keyFactory) {
      return this.keyFactory(item).value;
    }
    return typeof item === 'string' ? item : JSON.stringify(item);
  }

  openDropdown() {
    if (this.disabled === true) return;

    this.isOpen = true;
  }

  closeDropdown() {
    this.isOpen = false;
  }

  selectSuggestion(suggestion: any) {
    if (!this.filteredSuggestions.find((item) => item === suggestion)) {
      return;
    }
    this.onChange(suggestion);
    this.selectionChanged.emit(suggestion); // Emit selection change
    this.searchControl.setValue(this.getDisplayText(suggestion)); // Clear the input field
    this.closeDropdown();
  }

  writeValue(value: any): void {
    this.searchControl.setValue(this.getDisplayText(value));
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
