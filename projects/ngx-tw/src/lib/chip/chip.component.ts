import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TwIcon } from '../icon/icon.component';
import { TwChipInterface } from './chip-interface';

@Component({
  selector: 'tw-chip',
  standalone: true,
  imports: [TwIcon],
  template: `
    <div class="tw-chip {{ twClass }}">
      @if(image){
      <img [src]="image" alt="Image Description" />
      }
      <div class="label">
        {{ label }}
      </div>
      @if(isDeletable){
      <div class="icon">
        <tw-icon
          (click)="deleteItem.emit()"
          svgIcon="hero:x-mark"
          [size]="12"
        />
      </div>
      }
    </div>
  `,
})
export class TwChip implements TwChipInterface {
  @Input({ required: true }) label!: string;
  @Input() image?: string | undefined;
  @Input() isDeletable?: boolean | undefined;
  @Input() twClass?: string;
  @Output() deleteItem = new EventEmitter();
}
