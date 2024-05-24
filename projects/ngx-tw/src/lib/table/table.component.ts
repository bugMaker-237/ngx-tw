import { CdkTableModule } from '@angular/cdk/table';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TwButtonComponent } from '@com/button/button.component';
import { TwIconComponent } from '@com/icon/icon.component';
import { TwOptionComponent } from '@com/select/option/option.component';
import { TwSelectComponent } from '@com/select/select.component';
import {
  __TwColumnDefDirective,
  __TwRowDefDirective,
} from './column-definitions.directive';

@Component({
  standalone: true,
  imports: [
    TwIconComponent,
    TwButtonComponent,
    NgIf,
    NgFor,
    NgTemplateOutlet,
    TwSelectComponent,
    TwOptionComponent,
    CdkTableModule,
    RouterLink,
  ],
  selector: 'tw-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TwTableComponent<T> {
  @Input() dataSource: T[] = [];

  @Input() displayCheckbox: boolean = true;

  @Input() displayPagination: boolean = true;

  @Input() pageSizes: number[] = [10, 20, 50, 100];

  @Output() itemClick = new EventEmitter<T>();

  @ContentChildren(__TwColumnDefDirective)
  columnDefs?: QueryList<__TwColumnDefDirective>;

  @ContentChild(__TwRowDefDirective)
  rowDef?: __TwRowDefDirective;

  defaultPageSize = 10;
  get displayColumns() {
    const cols = this.rowDef?.displayColumns || [];
    return this.displayCheckbox ? ['checkbox', ...cols] : cols;
  }

  get columns() {
    return this.columnDefs?.toArray() || [];
  }

  constructor() {}
}
