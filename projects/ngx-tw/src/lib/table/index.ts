import { NgModule } from '@angular/core';
import {
  TwCellDefDirective,
  TwColumnDefDirective,
  TwHeaderCellDefDirective,
  TwRowDefDirective,
  TwTableColumnRowDefinitions,
} from './column-definitions.directive';
import { ITableQueryChange, TwTable } from './table.component';

@NgModule({
  declarations: [],
  imports: [TwTable, TwTableColumnRowDefinitions],
  exports: [TwTable, TwTableColumnRowDefinitions],
  providers: [],
})
export class TwTableModule {}

export {
  ITableQueryChange,
  TwCellDefDirective,
  TwColumnDefDirective,
  TwHeaderCellDefDirective,
  TwRowDefDirective,
  TwTable,
  TwTableColumnRowDefinitions,
};
