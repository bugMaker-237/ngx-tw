import { TwExpanderContent } from './expander-content.component';
import { TwExpanderGroup } from './expander-group.component';
import { TwExpanderHeader } from './expander-header.component';
import { TwExpanderItem } from './expander-item.component';

import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [
    TwExpanderItem,
    TwExpanderContent,
    TwExpanderHeader,
    TwExpanderGroup,
  ],
  exports: [
    TwExpanderItem,
    TwExpanderContent,
    TwExpanderHeader,
    TwExpanderGroup,
  ],
  providers: [],
})
export class TwExpanderModule {}

export { TwExpanderContent, TwExpanderGroup, TwExpanderHeader, TwExpanderItem };
