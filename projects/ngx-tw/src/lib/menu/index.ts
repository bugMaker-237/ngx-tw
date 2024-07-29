import { PARENT_OR_NEW_MENU_STACK_PROVIDER } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TwMenuItemDirective } from './menu-item.directive';
import { TwMenuTriggerDirective } from './menu-trigger.directive';
import { TwMenu } from './menu.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, TwMenuTriggerDirective, TwMenu, TwMenuItemDirective],
  exports: [TwMenuTriggerDirective, TwMenu, TwMenuItemDirective],
  providers: [PARENT_OR_NEW_MENU_STACK_PROVIDER],
})
export class TwMenuModule {}
