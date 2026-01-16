import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TwButton, TwMenuModule } from 'ngx-tw';

@Component({
  selector: 'app-drawer-demo',
  standalone: true,
  imports: [RouterLink, TwButton, TwMenuModule],
  template: `<h2 class="text-2xl font-bold mt-8 mb-4">Drawer Demo</h2>
    <tw-button routerLink="/shell">Go to Drawer Demo</tw-button>`,
})
export class DrawerDemoComponent {}
