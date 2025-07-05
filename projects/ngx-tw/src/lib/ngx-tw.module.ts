import { NgModule } from '@angular/core';
import { TwAlertService } from './alerts/alert.service';
import { TwAlerts } from './alerts/alerts.component';
import { TwAutocomplete } from './autocomplete/autocomplete.component';
import { TwButtonGroup } from './button-group/button-group.component';
import { TwButton } from './button/button.component';
import { TwChipItem } from './chip/chip-item-maker.component';
import { TwChipList } from './chip/chip-list.component';
import { TwChip } from './chip/chip.component';
import { TwDialog } from './dialog/dialog';
import { TwExpanderModule } from './expander';
import { TwInputField } from './input-field/input-field.component';
import { TwMenuModule } from './menu';
import { TwOption } from './select/option/option.component';
import { TwSelect } from './select/select.component';
import { TwSkeletonComponent } from './skeleton/skeleton.component';
import { TwSkeletonDirective } from './skeleton/skeleton.directive';
import { TwSpinner } from './spinner/spinner.component';
import { TwStickyContentHeader } from './sticky-content-header/sticky-content-header.component';
import { TwSwitch } from './switch/switch.component';
import { TwTabGroup } from './tab/tab-group/tab-group.component';
import { TwTabItem } from './tab/tab-item-maker.component';
import { TwTableModule } from './table';
import { TwToolbar } from './toolbar/toolbar.component';

@NgModule({
  declarations: [],
  imports: [
    TwButton,
    TwButtonGroup,
    TwExpanderModule,
    TwStickyContentHeader,
    TwInputField,
    TwMenuModule,
    TwSelect,
    TwStickyContentHeader,
    TwTabGroup,
    TwTabItem,
    TwTableModule,
    TwToolbar,
    TwSwitch,
    TwOption,
    TwChip,
    TwChipList,
    TwSpinner,
    TwAlerts,
    TwSkeletonComponent,
    TwSkeletonDirective,
    TwAutocomplete,
    TwChipItem,
  ],
  providers: [TwDialog, TwAlertService],
  exports: [
    TwButton,
    TwButtonGroup,
    TwExpanderModule,
    TwStickyContentHeader,
    TwInputField,
    TwMenuModule,
    TwSelect,
    TwStickyContentHeader,
    TwTabGroup,
    TwTabItem,
    TwTableModule,
    TwToolbar,
    TwSwitch,
    TwOption,
    TwChip,
    TwChipList,
    TwSpinner,
    TwAlerts,
    TwSkeletonComponent,
    TwSkeletonDirective,
    TwAutocomplete,
    TwChipItem,
  ],
})
export class NgxTwModule {}
