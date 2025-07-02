import { ListKeyManager } from '@angular/cdk/a11y';
import { BACKSPACE, ENTER, SPACE } from '@angular/cdk/keycodes';
import {
  BlockScrollStrategy,
  CdkConnectedOverlay,
  ConnectedPosition,
  Overlay,
  OverlayRef,
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
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'tw-autocomplete',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CdkConnectedOverlay],
  templateUrl: './autocomplete.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TwAutocomplete),
      multi: true,
    },
  ],
})
export class TwAutocomplete implements OnInit, ControlValueAccessor {
  @ViewChild('input') input!: ElementRef;
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

  @Input() disabled: boolean = false;
  @Output() selectionChanged: EventEmitter<any[]> = new EventEmitter<any[]>();

  searchControl = new FormControl();
  filteredSuggestions: any[] = [];
  selectedItems: any[] = [];
  overlayRef!: OverlayRef;
  isOpen: boolean = false;
  keyManager!: ListKeyManager<any>;

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

    // Initialize the key manager
    this.keyManager = new ListKeyManager(
      this.filteredSuggestions
    ).withVerticalOrientation();
  }

  closeDropdown() {
    this.isOpen = false;
  }

  selectSuggestion(suggestion: any) {
    if (!this.selectedItems.find((item) => item === suggestion)) {
      this.selectedItems.push(suggestion);
      this.onChange(this.selectedItems);
      this.selectionChanged.emit(this.selectedItems); // Emit selection change
    }
    this.searchControl.setValue(''); // Clear the input field
    this.closeDropdown();
  }

  removeSelectedItem(index: number) {
    this.selectedItems.splice(index, 1);
    this.onChange(this.selectedItems);
    this.selectionChanged.emit(this.selectedItems); // Emit selection change
  }

  writeValue(value: any): void {
    this.selectedItems = value || [];
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  handleKeydown(event: KeyboardEvent) {
    if (!this.keyManager) return;

    if (event.keyCode === ENTER || event.keyCode === SPACE) {
      const activeOption = this.keyManager.activeItem;
      if (activeOption) {
        this.selectSuggestion(activeOption);
      }
    }
    if (event.keyCode === BACKSPACE && !this.searchControl.value) {
      this.removeSelectedItem(this.selectedItems.length - 1);
    }
    this.keyManager.onKeydown(event);
  }
}
