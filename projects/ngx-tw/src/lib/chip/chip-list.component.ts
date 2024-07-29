import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ColorTypes } from '../color-types';
import { TwChipInterface } from './chip-interface';
import { TwChip } from './chip.component';

@Component({
  selector: 'tw-chip-list',
  standalone: true,
  imports: [TwChip],
  template: `
    <div class="flex tw-chip-list items-center gap-2 {{ color }}">
      @for(chip of chips; track $index){
      <tw-chip
        twClass="max-w-32"
        [label]="chip.label"
        [image]="chip.image"
        (deleteItem)="removeItem($index)"
        [isDeletable]="isEditable && chip.isDeletable"
      />
      } @if(isEditable){
      <div
        (keydown)="contentKeydown($event)"
        #newItemContent
        contentEditable
        class="flex items-center border-0 flex-grow outline-0"
      ></div>
      }
    </div>
  `,
})
export class TwChipList {
  @Input() chips: TwChipInterface[] = [];
  @Input() color?: ColorTypes;
  @Input() keyCodeSeperator?: string = 'Enter';
  @Input() isEditable: boolean = false;

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

    console.log(event.key, this.keyCodeSeperator);
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
