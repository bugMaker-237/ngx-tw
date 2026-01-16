import { Component } from '@angular/core';
import {
  DrawerMenuSection,
  TwButton,
  TwButtonIcon,
  TwDrawer,
  TwIcon,
  TwMenuModule,
} from 'ngx-tw';

@Component({
  selector: 'app-drawer-demo',
  standalone: true,
  imports: [TwDrawer, TwButton, TwIcon, TwMenuModule, TwButtonIcon],
  templateUrl: './app-shell.component.html',
})
export class AppShellComponent {
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
            { label: 'Inventory', route: ['/products', 'inventory'] },
          ],
        },

        {
          label: 'Orders',
          icon: `hero:cube-transparent`,
          children: [
            { label: 'All Orders', route: '/orders' },
            { label: 'Pending', route: ['/orders', 'pending'] },
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
