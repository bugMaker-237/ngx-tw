import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { ColorTypes } from '@com/color-types';
import { TwTabItemComponent } from '../tab-item-maker.component';
import { __TwTabItemComponent } from '../tab.component';

@Component({
  imports: [__TwTabItemComponent, NgFor, NgTemplateOutlet, NgIf],
  standalone: true,
  selector: 'tw-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
})
export class TwTabGroupComponent implements AfterViewInit {
  @ContentChildren(TwTabItemComponent)
  children?: QueryList<TwTabItemComponent>;
  selectedIndex = 0;
  @Input() color?: ColorTypes = 'primary';

  @Output() selectionChanged = new EventEmitter<number>();

  get currentContent(): TemplateRef<any> | null {
    return this.children?.get(this.selectedIndex)?.content || null;
  }

  constructor(private readonly _cd: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this._cd.detectChanges();
  }
}
