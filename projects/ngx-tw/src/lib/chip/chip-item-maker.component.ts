import { Component, Input } from '@angular/core';
import { TwChipInterface } from './chip-interface';

@Component({
  selector: 'tw-chip-item',
  standalone: true,
  template: ``,
})
export class TwChipItem implements TwChipInterface {
  @Input({ required: true }) label!: string;
  @Input() image?: string | undefined;
  @Input() isDeletable?: boolean | undefined;
}
