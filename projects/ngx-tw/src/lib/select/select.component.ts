import { ActiveDescendantKeyManager, LiveAnnouncer } from '@angular/cdk/a11y';
import {
  DOWN_ARROW,
  ENTER,
  SPACE,
  UP_ARROW,
  hasModifierKey,
} from '@angular/cdk/keycodes';
import {
  BlockScrollStrategy,
  CdkConnectedOverlay,
  ConnectedPosition,
  Overlay,
} from '@angular/cdk/overlay';
import { NgClass } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  NgZone,
  OnInit,
  QueryList,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, defer, merge, startWith, switchMap, take } from 'rxjs';
import { ColorTypes } from '../color-types';
import { OptionSelectionChange, TwOption } from './option/option.component';

/**
 * IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
let _uniqueIdCounter = 0;

@Component({
    selector: 'tw-select',
    imports: [NgClass, CdkConnectedOverlay],
    templateUrl: './select.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[attr.tabindex]': '0',
        '[attr.role]': 'combobox',
        '[attr.aria-autocomplete]': 'none',
        '[attr.id]': 'id',
        '[attr.aria-controls]': 'isOpen ? id + "-panel" : null',
        '[attr.aria-expanded]': 'isOpen',
        '[attr.aria-disabled]': 'disabled.toString()',
        '[attr.aria-haspopup]': '"listbox"',
        '[attr.aria-labelledby]': '"listbox-label"',
        '(keydown)': 'handleKeydown($event)',
        '(click)': 'openPanel()',
        '[class]': '"tw-select " + (color || "") + (twClass ? " " + twClass : "")',
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TwSelect),
            multi: true,
        },
    ]
})
export class TwSelect
  implements ControlValueAccessor, OnInit, AfterContentInit
{
  @Input() public placeholder: string = 'Select an option';
  @Input() public disabled: boolean = false;
  @Input() public id: string = `tw-select-${_uniqueIdCounter++}`;
  @Input() public compareWith: (o1: any, o2: any) => boolean = (
    o1: any,
    o2: any
  ) => o1 === o2;
  @Input()
  get value(): any {
    return this.innerValue;
  }
  set value(newValue: any) {
    this.selectOption(newValue, null, false);
  }

  @ViewChild('arrowContainer', { static: true })
  public arrowContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('inputContainer', { static: true })
  public inputContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('trigger', { static: true }) public trigger!: ElementRef;
  @ContentChildren(TwOption, { descendants: true })
  public options!: QueryList<TwOption>;

  @Input() color?: ColorTypes;
  @Input() twClass?: string;

  @Input() inputSticky = true;

  public get htmlValue(): string | null {
    //
    // Validate inner value
    if (!this.innerValue && !this._keyManager.activeItem) return null;
    else return this._keyManager.activeItem?.getInnerHTML() || null;
  }

  public onChange = (value: any) => {};
  public onTouched = () => {};

  public innerValue: any = null;

  public wasTouched: boolean = false;
  public isOpen: boolean = false;
  public overlayWidth!: string;

  private _keyManager!: ActiveDescendantKeyManager<TwOption>;
  public _scrollStrategy: BlockScrollStrategy;

  public positions: ConnectedPosition[] = [
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

  /** Combined stream of all of the child options' change events. */
  readonly optionSelectionChanges: Observable<OptionSelectionChange> = defer(
    () => {
      const options = this.options;

      if (options) {
        return options.changes.pipe(
          startWith(options),
          switchMap(() =>
            merge(...options.map((option) => option.onSelectionChange))
          )
        );
      }

      return this.zone.onStable.pipe(
        take(1),
        switchMap(() => this.optionSelectionChanges)
      );
    }
  ) as Observable<OptionSelectionChange>;

  constructor(
    public cdr: ChangeDetectorRef,
    public elementRef: ElementRef,
    public overlay: Overlay,
    private readonly zone: NgZone,
    private readonly liveAnnouncer: LiveAnnouncer
  ) {
    this._scrollStrategy = this.overlay.scrollStrategies.block();
  }

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    this._initKeyManager();

    this.optionSelectionChanges.subscribe((event) => {
      this.onSelect(event.source, event.isUserInput, event.innerHTML);
      this.cdr.markForCheck();
    });

    this.options.changes.pipe(startWith(null)).subscribe(() => {
      // Defer setting the value in order to avoid the "Expression
      // has changed after it was checked" errors from Angular.
      Promise.resolve().then(() => {
        this.selectOption(this.innerValue, null, false, true);
      });
    });
  }

  writeValue(value: any) {
    this.selectOption(value, null, false);
    this.cdr.markForCheck();
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.wasTouched) {
      this.onTouched();
      this.wasTouched = true;
    }
  }

  setDisabledState(isDisabled: boolean) {
    //
    // Set disabled
    this.disabled = isDisabled;

    //
    // Set aria-disabled
    this.trigger?.nativeElement.setAttribute(
      'aria-disabled',
      isDisabled.toString()
    );
  }

  openPanel() {
    //
    // Validate disabled
    if (this.disabled === true) return;

    //
    // open panel
    this.isOpen = true;

    //
    // Scroll if we have an active item
    if (this._keyManager.activeItem)
      this._keyManager.activeItem.setActiveStylesWithDelay();
  }

  closePanel() {
    //
    // Update manager active item
    if (this.innerValue) this._updateKeyManagerActiveItem(this.innerValue);

    // close
    this.isOpen = false;
  }

  backdropClick() {
    this.closePanel();
  }

  selectOption(
    newValue: any,
    innerHTML: string | null,
    touched: boolean,
    forceUpdate = false
  ) {
    //
    // Do nothing if selected is the same as the current value
    if (this.compareWith(this.innerValue, newValue) && forceUpdate === false) {
      return;
    }

    //
    // Set new value
    this.innerValue = newValue;

    //
    // On change event
    this.onChange(newValue);
    // mark as touched if this was made by a user interaction
    if (touched === true) this.markAsTouched();

    //
    // Skip if we don't have options
    if (!this.options) return;

    //
    // Update manager active item
    this._updateKeyManagerActiveItem(newValue);
  }

  onSelect(source: TwOption, isUserInput: boolean, innerHTML: string | null) {
    //
    // Validate value is different
    if (this.innerValue === source.value) return this.closePanel();

    //
    // Loop options and deselect all except the selected one
    this.options.forEach((option) => {
      if (option.selected === true && option.id !== source.id) {
        option.deselect();
      }
    });

    //
    // Select option
    this.selectOption(source.value, innerHTML, true);

    //
    // Close
    this.closePanel();
  }

  handleKeydown(event: KeyboardEvent) {
    if (!this.disabled) {
      this.isOpen === true
        ? this._handleOpenKeydown(event)
        : this._handleClosedKeydown(event);
    }
  }

  private _handleClosedKeydown(event: KeyboardEvent): void {
    const manager = this._keyManager;

    manager.onKeydown(event);
  }

  /** Handles keyboard events when the selected is open. */
  private _handleOpenKeydown(event: KeyboardEvent): void {
    const manager = this._keyManager;
    const keyCode = event.keyCode;
    const isArrowKey = keyCode === DOWN_ARROW || keyCode === UP_ARROW;
    const isTyping = manager.isTyping();

    if (isArrowKey && event.altKey) {
      // Close the select on ALT + arrow key to match the native <select>
      event.preventDefault();
      this.closePanel();
      // Don't do anything in this case if the user is typing,
      // because the typing sequence can include the space key.
    } else if (
      !isTyping &&
      (keyCode === ENTER || keyCode === SPACE) &&
      manager.activeItem &&
      !hasModifierKey(event)
    ) {
      event.preventDefault();
      manager.activeItem.selectViaInteraction();
    } else {
      manager.onKeydown(event);

      // // We set a duration on the live announcement, because we want the live element to be
      // // cleared after a while so that users can't navigate to it using the arrow keys.
      // this.liveAnnouncer.announce((manager.activeItem as TwOption)?.contentElement?.nativeElement?.innerHTML, 10000);
    }
  }

  private _initKeyManager() {
    this._keyManager = new ActiveDescendantKeyManager<TwOption>(this.options)
      .withTypeAhead()
      .withVerticalOrientation()
      .withHomeAndEnd()
      .withWrap()
      .withAllowedModifierKeys(['shiftKey']);

    this._keyManager.change.pipe().subscribe(() => {
      if (!this.isOpen && this._keyManager.activeItem) {
        this._keyManager.activeItem.selectViaInteraction();
      }
    });
  }

  private _updateKeyManagerActiveItem(value: any) {
    //
    // Set key manager
    const manager = this._keyManager;

    //
    // Update focus for different values
    if (!this.compareWith(manager.activeItem?.value, value)) {
      //
      // Deselect current active item(which is the old one and will be changed ahead)
      if (manager.activeItem?.selected === true) manager.activeItem?.deselect();

      //
      // Find selected option index
      const correspondingOption = this.options.find((option: TwOption) => {
        return option.value != null && this.compareWith(option.value, value);
      });
      // validate and update active item
      if (correspondingOption) manager.setActiveItem(correspondingOption);
      else manager.setActiveItem(-1);
    }
  }
}
