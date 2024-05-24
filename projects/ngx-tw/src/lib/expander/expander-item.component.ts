import { CdkAccordionItem } from '@angular/cdk/accordion';
import { NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { TwButtonIconComponent } from '@com/button/button-icon.component';
import { TwExpanderContentComponent } from './expander-content.component';
import { TwExpanderGroupComponent } from './expander-group.component';
import { TwExpanderHeaderComponent } from './expander-header.component';

@Component({
  selector: 'tw-expander',
  imports: [CdkAccordionItem, TwButtonIconComponent, NgTemplateOutlet],
  standalone: true,
  template: `
    <div
      #expander="cdkAccordionItem"
      cdkAccordionItem
      [expanded]="expanded"
      [(expanded)]="expanded"
      (opened)="opened.emit()"
      (closed)="closed.emit()"
      class="divide-y divide-solid dark:divide-slate-500"
    >
      <h2
        class="flex items-center text-xl pb-4 cursor-pointer"
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
      <div class="w-full">
        @if(expander.expanded && content){
        <ng-container [ngTemplateOutlet]="content.content!"></ng-container>
        }
      </div>
    </div>
  `,
})
export class TwExpanderItemComponent implements AfterContentInit {
  @Input() expanded = false;
  @Output('expanded') expandedChange = new EventEmitter();
  @Output() opened = new EventEmitter();
  @Output() closed = new EventEmitter();

  @ContentChild(TwExpanderHeaderComponent) header!: TwExpanderHeaderComponent;
  @ContentChild(TwExpanderContentComponent)
  content!: TwExpanderContentComponent;
  @ViewChild(CdkAccordionItem, { static: true })
  expanderItem?: CdkAccordionItem;
  private _parent?: TwExpanderGroupComponent;

  ngAfterContentInit(): void {}

  set parent(value: TwExpanderGroupComponent | undefined) {
    if (this.expanderItem && value?.expanderGroup)
      this.expanderItem.accordion = value.expanderGroup!;

    this._parent = value;
  }
  get parent() {
    return this._parent;
  }
}
