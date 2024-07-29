import { ArrayDataSource } from '@angular/cdk/collections';
import { CdkTableModule, DataSource } from '@angular/cdk/table';
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
import { TwButton } from '../button/button.component';
import { TwIcon } from '../icon/icon.component';
import { TwOption } from '../select/option/option.component';
import { TwSelect } from '../select/select.component';
import {
  TwColumnDefDirective,
  TwRowDefDirective,
} from './column-definitions.directive';

@Component({
  standalone: true,
  imports: [
    TwIcon,
    TwButton,
    NgIf,
    NgFor,
    NgTemplateOutlet,
    TwSelect,
    TwOption,
    CdkTableModule,
    RouterLink,
  ],
  selector: 'tw-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TwTable<T> {
  private _dataSource?: T[];
  get dataSource(): T[] {
    return this._dataSource || [];
  }

  @Input() set dataSource(value: T[]) {
    this._dataSource = value;
    this.internalSource = value ? new ArrayDataSource(value) : void 0;
  }

  @Input() displayCheckbox: boolean = true;

  @Input() displayPagination: boolean = true;
  @Input() displayEmptyTemplate: boolean = false;

  @Input() totalItemsCount: number = 0;
  @Input() pageSizes: number[] = [10, 20, 50, 100];

  @Output() itemClick = new EventEmitter<T>();
  @Output() addItemClick = new EventEmitter<T>();
  @Output() clearSearchClick = new EventEmitter<T>();

  @ContentChildren(TwColumnDefDirective)
  columnDefs?: QueryList<TwColumnDefDirective<T>>;

  @ContentChild(TwRowDefDirective)
  rowDef?: TwRowDefDirective<T>;

  defaultPageSize = 10;

  internalSource?: DataSource<T>;

  get displayColumns() {
    const cols = this.rowDef?.displayColumns || [];
    return this.displayCheckbox ? ['checkbox', ...cols] : cols;
  }

  get columns() {
    return this.columnDefs?.toArray() || [];
  }

  get totalPagesCount() {
    return Math.ceil(this.totalItemsCount / this.defaultPageSize);
  }
  constructor() {}
}
