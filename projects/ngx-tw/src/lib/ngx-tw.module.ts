import { NgModule } from '@angular/core';
import { TwButtonGroupComponent } from './button-group/button-group.component';
import { TwButtonComponent } from './button/button.component';
import { TwExpanderModule } from './expander';
import { TwInputFieldComponent } from './input-field/input-field.component';
import { TwMenuModule } from './menu';
import { TwSelectComponent } from './select/select.component';
import { TwStickyContentHeaderComponent } from './sticky-content-header/sticky-content-header.component';
import { TwTabGroupComponent } from './tab/tab-group/tab-group.component';
import { TwTabItemComponent } from './tab/tab-item-maker.component';
import { __TwTabItemComponent } from './tab/tab.component';
import { TwTableColumnRowDefinitions } from './table/column-definitions.directive';
import { TwTableComponent } from './table/table.component';
import { TwToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [],
  imports: [
    TwButtonComponent,
    TwButtonGroupComponent,
    TwExpanderModule,
    TwStickyContentHeaderComponent,
    TwInputFieldComponent,
    TwMenuModule,
    TwSelectComponent,
    TwStickyContentHeaderComponent,
    TwTabGroupComponent,
    TwTabItemComponent,
    __TwTabItemComponent,
    TwTableComponent,
    TwTableColumnRowDefinitions,
    TwToolbarComponent,
  ],
  exports: [
    TwButtonComponent,
    TwButtonGroupComponent,
    TwExpanderModule,
    TwStickyContentHeaderComponent,
    TwInputFieldComponent,
    TwMenuModule,
    TwSelectComponent,
    TwStickyContentHeaderComponent,
    TwTabGroupComponent,
    TwTabItemComponent,
    __TwTabItemComponent,
    TwTableComponent,
    TwTableColumnRowDefinitions,
    TwToolbarComponent,
  ],
})
export class NgxTwModule {}
