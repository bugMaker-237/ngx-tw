import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ColorTypes } from '../color-types';
import { TwIcon } from '../icon/icon.component';
import { TwChipInterface } from './chip-interface';
import { TwChip } from './chip.component';

@Component({
  selector: 'tw-chip-list',
  standalone: true,
  imports: [TwChip, TwIcon],
  templateUrl: './chip-list.component.html',
})
export class TwChipList {
  @Input() iconSuffix?: string;
  @Input() iconSuffixClass?: string;
  @Input() iconPrefix?: string;
  @Input() iconPrefixClass?: string;
  @Input() chips: TwChipInterface[] = [];
  @Input() color?: ColorTypes;
  @Input() keyCodeSeperator?: string = 'Enter';
  @Input() isEditable: boolean = false;
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

  contentKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') event.preventDefault();

    if (event.key !== this.keyCodeSeperator || !this.newItemContent) return;

    const newContent = this.newItemContent.nativeElement.innerHTML;
    this.newItemContent.nativeElement.innerHTML = '';
    const chip = this.newContentTransformer(newContent);
    this.chips.push(chip);
  }

  removeItem(index: number) {
    if (!this.isEditable) return;

    const [chip] = this.chips.splice(index, 1);
    this.itemRemoved.emit({ index, chip });
  }
}
