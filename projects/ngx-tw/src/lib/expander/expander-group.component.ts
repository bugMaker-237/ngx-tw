import { CdkAccordion } from '@angular/cdk/accordion';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  QueryList,
  ViewChild,
} from '@angular/core';
import { TwExpanderItem } from './expander-item.component';

@Component({
  selector: 'tw-expander-group',
  standalone: true,
  imports: [CdkAccordion],
  template: `
    <div cdkAccordion [multi]="multi" class="flex gap-4 flex-col">
      <ng-content></ng-content>
    </div>
  `,
})
export class TwExpanderGroup implements AfterContentInit {
  @Input() multi = false;

  @ViewChild(CdkAccordion, { static: true }) expanderGroup?: CdkAccordion;

  @ContentChildren(TwExpanderItem)
  expanderItems?: QueryList<TwExpanderItem>;

  ngAfterContentInit(): void {
    this.expanderItems?.forEach((i) => (i.parent = this));
  }
  closeAll() {
    this.expanderGroup?.closeAll();
  }

  openAll() {
    this.expanderGroup?.openAll();
  }
}
