import { CdkAccordionItem } from '@angular/cdk/accordion';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { TwButtonIcon } from '../button/button-icon.component';
import { TwExpanderContent } from './expander-content.component';
import { TwExpanderGroup } from './expander-group.component';
import { TwExpanderHeader } from './expander-header.component';

@Component({
    selector: 'tw-expander',
    imports: [CdkAccordionItem, TwButtonIcon, NgTemplateOutlet, NgClass],
    template: `
    <div
      #expander="cdkAccordionItem"
      cdkAccordionItem
      [expanded]="expanded"
      [(expanded)]="expanded"
      (opened)="opened.emit()"
      (closed)="closed.emit()"
      [ngClass]="{
        'divide-y divide-solid dark:divide-slate-500': !header.hideDivider
      }"
    >
      <h2
        class="flex items-center text-xl cursor-pointer"
        [class.pb-2]="!header.hideDivider"
        (click)="expander.toggle()"
      >
        @if(header.showIcon){
        <tw-button-icon
          [svgIcon]="
            expander.expanded ? 'hero:chevron-down' : 'hero:chevron-right'
          "
        />
        } @if(header){
        <div class="w-full">
          <ng-container [ngTemplateOutlet]="header.content!"></ng-container>
        </div>
        }
      </h2>
      <div
        class="w-full overflow-y-hidden"
        [style.height]="
          !expander.expanded || !content.content
            ? '0'
            : calculateHeight(contentContainer)
        "
        style="transition: height 300ms;"
      >
        <div class="w-full" #contentContainer>
          <ng-container [ngTemplateOutlet]="content.content!"></ng-container>
        </div>
      </div>
    </div>
  `
})
export class TwExpanderItem implements AfterContentInit {
  @Input() expanded = false;
  @Output('expanded') expandedChange = new EventEmitter();
  @Output() opened = new EventEmitter();
  @Output() closed = new EventEmitter();

  @ContentChild(TwExpanderHeader) header!: TwExpanderHeader;
  @ContentChild(TwExpanderContent)
  content!: TwExpanderContent;
  @ViewChild(CdkAccordionItem, { static: true })
  expanderItem?: CdkAccordionItem;
  private _parent?: TwExpanderGroup;

  ngAfterContentInit(): void {}

  set parent(value: TwExpanderGroup | undefined) {
    if (this.expanderItem && value?.expanderGroup)
      this.expanderItem.accordion = value.expanderGroup!;

    this._parent = value;
  }
  get parent() {
    return this._parent;
  }

  calculateHeight(elt: HTMLElement) {
    return elt.offsetHeight + 16 + 'px';
  }
}
