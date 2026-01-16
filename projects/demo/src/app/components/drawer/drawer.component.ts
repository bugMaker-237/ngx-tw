import { Component } from '@angular/core';
import {
  DrawerMenuSection,
  TwButton,
  TwDrawer,
  TwIcon,
  TwMenuModule,
} from 'ngx-tw';

@Component({
  selector: 'app-drawer-demo',
  standalone: true,
  imports: [TwDrawer, TwButton, TwIcon, TwMenuModule],
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerDemoComponent {
  menuSections: DrawerMenuSection[] = [
    {
      items: [
        {
          label: 'Dashboard',
          icon: `hero:home`,
          route: '/dashboard',
        },
        {
          label: 'Products',
          icon: `hero:cube-transparent`,
          children: [
            { label: 'All Products', route: '/products' },
            { label: 'Inventory', route: '/products/inventory' },
          ],
        },
      ],
    },
    {
      title: 'Settings',
      items: [
        {
          label: 'Account',
          icon: `hero:user-circle`,
          route: '/settings',
        },
      ],
    },
  ];
}
