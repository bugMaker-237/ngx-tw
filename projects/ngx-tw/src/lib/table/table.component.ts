import { ArrayDataSource } from '@angular/cdk/collections';
import { CdkTableModule, DataSource } from '@angular/cdk/table';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { TwButton } from '../button/button.component';
import { TwIcon } from '../icon/icon.component';
import { TwOption } from '../select/option/option.component';
import { TwSelect } from '../select/select.component';
import { TwSpinner } from '../spinner/spinner.component';
import {
  TwColumnDefDirective,
  TwRowDefDirective,
} from './column-definitions.directive';

export interface ITableQueryChange {
  pageIndex: number;
  pageSize: number;
  searchTerm?: string;
}

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
    TwSpinner,
    FormsModule,
  ],
  selector: 'tw-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TwTable<T> implements OnDestroy, AfterViewInit {
  private _dataSource?: T[];
  get dataSource(): T[] {
    return this._dataSource || [];
  }

  @Input() set dataSource(value: T[]) {
    this._dataSource = value;
    this.internalSource = value ? new ArrayDataSource(value) : void 0;
  }

  @Input() dataLoading?: boolean;

  @Input() displayCheckbox: boolean = true;

  @Input() displayPagination: boolean = true;
  @Input() displayEmptyTemplate: boolean = false;

  @Input() totalItemsCount: number = 0;
  @Input() pageSizes: number[] = [10, 20, 50, 100];

  @Output() itemClick = new EventEmitter<T>();
  @Output() queryChange = new EventEmitter<ITableQueryChange>();

  @ContentChildren(TwColumnDefDirective)
  columnDefs?: QueryList<TwColumnDefDirective<T>>;

  @ContentChild(TwRowDefDirective)
  rowDef?: TwRowDefDirective<T>;

  _selectedPageSize = this.pageSizes[0] || 10;

  @Input()
  get selectedPageSize() {
    return this._selectedPageSize;
  }
  set selectedPageSize(value: number) {
    if (!this.pageSizes.includes(value) || this._selectedPageSize === value)
      return;
    this._selectedPageSize = value;

    if (this._initializedParams) this.queryChange.emit(this.querySnapshot);
  }

  internalSource?: DataSource<T>;

  private _pageNumber = 1;

  get displayColumns() {
    const cols = this.rowDef?.displayColumns || [];
    return this.displayCheckbox ? ['checkbox', ...cols] : cols;
  }

  get columns() {
    return this.columnDefs?.toArray() || [];
  }

  get totalPagesCount() {
    return Math.ceil(this.totalItemsCount / this.selectedPageSize);
  }

  get pageNumber() {
    return this._pageNumber;
  }

  private set pageNumber(value: number) {
    this._pageNumber = value <= 1 ? 1 : value;
  }

  get querySnapshot(): ITableQueryChange {
    return {
      pageIndex: this.pageNumber - 1,
      pageSize: this.selectedPageSize,
      searchTerm: this._currentSearchTerm,
    };
  }
  private _queryParamSubscription$$?: Subscription;
  private _currentSearchTerm?: string;
  private _initializedParams: boolean = false;

  constructor(private readonly _route: ActivatedRoute) {}

  ngAfterViewInit(): void {
    this._queryParamSubscription$$ = this._route.queryParamMap.subscribe(
      (params) => {
        this.pageNumber = +(params.get('pageNumber') || 1);
        const pageSize = +(params.get('pageSize') || this.pageSizes[0]);
        this._selectedPageSize = this.pageSizes.includes(pageSize)
          ? pageSize
          : this._selectedPageSize;
        this._currentSearchTerm = params.get('searchTerm') || '';
        this.queryChange.emit(this.querySnapshot);

        this._initializedParams = true;
      }
    );
  }

  ngOnDestroy(): void {
    this._queryParamSubscription$$?.unsubscribe();
  }

  moveNext() {
    this.pageNumber++;
    this.queryChange.emit(this.querySnapshot);
  }

  movePrevious() {
    this.pageNumber--;
    this.queryChange.emit(this.querySnapshot);
  }

  changePageSize() {
    this.queryChange.emit(this.querySnapshot);
  }
}
