import {
  BlockScrollStrategy,
  CdkConnectedOverlay,
  Overlay,
} from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { fromEvent, Observable, switchMap } from 'rxjs';
import { AutoCompleteManager } from '../autocomplete/autocomplete-manager';
import { ColorTypes } from '../color-types';
import { TwIcon } from '../icon/icon.component';
import { OverlayPositions } from '../TwElement';
import { TwChipInterface } from './chip-interface';
import { TwChipItem } from './chip-item-maker.component';
import { TwChip } from './chip.component';

@Component({
  selector: 'tw-chip-list',
  standalone: true,
  imports: [TwChip, TwIcon, NgTemplateOutlet, CdkConnectedOverlay],
  templateUrl: './chip-list.component.html',
})
export class TwChipList implements AfterViewInit, ControlValueAccessor {
  @ContentChildren(TwChipItem) children?: QueryList<TwChipItem>;

  @Input() iconSuffix?: string;
  @Input() iconSuffixClass?: string;
  @Input() iconPrefix?: string;
  @Input() iconPrefixClass?: string;
  @Input() color?: ColorTypes;
  @Input() keyCodeSeperator?: string = 'Enter';
  @Input() isEditable: boolean = false;
  @Input() allowUnknownItemInsertion: boolean = true;
  @Input() placeholder = 'Type item';

  @Input() newContentTransformer: (text: string) => TwChipInterface = (
    txt
  ) => ({
    label: txt,
    isDeletable: this.isEditable,
  });
  @Output() itemRemoved = new EventEmitter<{
    chip: TwChipInterface;
    index: number;
  }>();

  @ViewChild('newItemContent') newItemContent?: ElementRef<HTMLDivElement>;

  @Input() autoCompleteKeyFactory:
    | ((item: any) => { key: string; value: string })
    | undefined;

  @Input() autoCompleteOptionTemplate: TemplateRef<any> | null = null;

  @Input() autoCompleteFilterFn:
    | ((value: string, item: any) => boolean)
    | undefined;

  @Input() autoCompleteSuggestions?: any[] | Observable<any[]>;

  positions = OverlayPositions;
  chipItems: TwChipItem[] = [];

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  autoCompleteManager?: AutoCompleteManager<any>;

  blockScrollStrategy: BlockScrollStrategy;

  get filteredSuggestions() {
    return this.autoCompleteManager?.filteredSuggestions;
  }

  constructor(
    public elementRef: ElementRef,
    private _cd: ChangeDetectorRef,
    overlay: Overlay
  ) {
    this.blockScrollStrategy = overlay.scrollStrategies.block();
  }

  ngAfterViewInit(): void {
    if (this.autoCompleteSuggestions) {
      this.autoCompleteManager = new AutoCompleteManager(
        fromEvent(this.newItemContent!.nativeElement, 'input').pipe(
          switchMap((ev) => (ev.target as HTMLDivElement).innerHTML)
        )
      );

      this.autoCompleteManager.suggestions = this.autoCompleteSuggestions;

      if (this.autoCompleteKeyFactory)
        this.autoCompleteManager.keyFactory = this.autoCompleteKeyFactory;

      if (this.autoCompleteFilterFn)
        this.autoCompleteManager.filterFn = this.autoCompleteFilterFn;

      this.autoCompleteManager.init();
    }

    this.chipItems = this.children?.toArray() || [];
    this._cd.detectChanges();
    this.children?.changes.subscribe((newValue) => {
      this.writeValue(newValue);
    });
  }

  contentKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') event.preventDefault();

    if (
      event.key === 'Backspace' &&
      !this.newItemContent?.nativeElement.innerHTML
    ) {
      if (this.chipItems.length > 0 && this.isEditable) {
        this.removeItem(this.chipItems.length - 1);
      }
      return;
    }

    if (event.key === 'Escape') {
      this.newItemContent?.nativeElement.blur();
      return;
    }

    if (
      event.key !== this.keyCodeSeperator ||
      !this.newItemContent ||
      !this.allowUnknownItemInsertion
    )
      return;

    const newContent = this.newItemContent.nativeElement.innerHTML;
    this.newItemContent.nativeElement.innerHTML = '';
    const chip = this.newContentTransformer(newContent);
    this.chipItems.push({
      label: chip.label,
      isDeletable: chip.isDeletable,
    });
    this.onChange(this.chipItems);
    this.newItemContent.nativeElement.focus();
  }

  removeItem(index: number) {
    if (!this.isEditable) return;

    const [chip] = this.chipItems.splice(index, 1);
    this.itemRemoved.emit({ index, chip });
    this.onChange(this.chipItems);
  }

  selectSuggestion(suggestion: any) {
    if (!this.autoCompleteManager?.selectSuggestion(suggestion)) {
      return;
    }
    const value = this.autoCompleteManager.getDisplayText(suggestion);
    this.chipItems.push({
      label: value,
      isDeletable: true,
    });

    if (this.newItemContent) {
      this.newItemContent.nativeElement.innerHTML = '';
      this.newItemContent.nativeElement.focus();
    }
    this.onChange(this.chipItems);
  }

  writeValue(value: any): void {
    value = Array.isArray(value) ? value : [value];

    this.chipItems = value.map((v: any) => ({
      label: v.label,
      image: v.image,
      isDeletable: v.isDeletable,
    }));
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
