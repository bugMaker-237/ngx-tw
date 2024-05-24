import { PARENT_OR_NEW_MENU_STACK_PROVIDER } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TwMenuItemDirective } from './menu-item.directive';
import { TwMenuTriggerDirective } from './menu-trigger.directive';
import { TwMenuComponent } from './menu.component';

@NgModule({
  declarations: [],
  imports: [
    TwMenuTriggerDirective,
    TwMenuComponent,
    TwMenuItemDirective,
    CommonModule,
  ],
  exports: [
    TwMenuTriggerDirective,
    TwMenuComponent,
    TwMenuItemDirective,
    CommonModule,
  ],
  providers: [PARENT_OR_NEW_MENU_STACK_PROVIDER],
})
export class TwMenuModule {}
