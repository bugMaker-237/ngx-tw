import { NgModule } from '@angular/core';
import {
  TwCellDefDirective,
  TwColumnDefDirective,
  TwHeaderCellDefDirective,
  TwRowDefDirective,
  TwTableColumnRowDefinitions,
} from './column-definitions.directive';
import { TwTable } from './table.component';

@NgModule({
  declarations: [],
  imports: [TwTable, TwTableColumnRowDefinitions],
  exports: [TwTable, TwTableColumnRowDefinitions],
  providers: [],
})
export class TwTableModule {}

export {
  TwCellDefDirective,
  TwColumnDefDirective,
  TwHeaderCellDefDirective,
  TwRowDefDirective,
  TwTable,
  TwTableColumnRowDefinitions,
};
