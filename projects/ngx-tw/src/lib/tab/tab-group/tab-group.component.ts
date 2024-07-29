import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationExtras,
  Router,
  RouterOutlet,
} from '@angular/router';
import { ColorTypes } from '../../color-types';
import { TwTabItem } from '../tab-item-maker.component';
import { __TwTabItem } from '../tab.component';

@Component({
  imports: [__TwTabItem, NgFor, NgTemplateOutlet, NgIf, RouterOutlet],
  standalone: true,
  selector: 'tw-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
})
export class TwTabGroup implements AfterViewInit {
  @ContentChildren(TwTabItem)
  children?: QueryList<TwTabItem>;
  selectedIndex = 0;
  @Input() color?: ColorTypes = 'primary';
  @Input() behavior?: 'default' | 'router' = 'default';

  @Output() selectionChanged = new EventEmitter<number>();

  get currentContent(): TemplateRef<any> | null {
    return this.children?.get(this.selectedIndex)?.content || null;
  }

  constructor(
    private readonly _cd: ChangeDetectorRef,
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    if (!this.children) return;

    let found = false;
    for (let i = 0; i < this.children.length; i++) {
      const c = this.children.get(i);
      const path = '/' + c?.route?.path?.join('/');
      if (path === this._router.url) {
        this.selectedIndex = i;
        found = true;
      }
    }
    if (!found) this.navigate(this.children?.get(this.selectedIndex)?.route);
    this._cd.detectChanges();
  }

  navigate(route?: { path: string[]; extras?: NavigationExtras }) {
    if (this.behavior != 'router' || !route) return;
    this._router.navigate(route.path, {
      ...(route.extras || {}),
    });
  }
}
