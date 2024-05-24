import { CdkAccordion } from '@angular/cdk/accordion';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  QueryList,
  ViewChild,
} from '@angular/core';
import { TwExpanderItemComponent } from './expander-item.component';

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
export class TwExpanderGroupComponent implements AfterContentInit {
  @Input() multi = false;

  @ViewChild(CdkAccordion, { static: true }) expanderGroup?: CdkAccordion;

  @ContentChildren(TwExpanderItemComponent)
  expanderItems?: QueryList<TwExpanderItemComponent>;

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
