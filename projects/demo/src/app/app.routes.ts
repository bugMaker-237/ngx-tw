import { Routes } from '@angular/router';
import { AppShellComponent } from './app-shell/app-shell.component';
import { ComponentsComponent } from './components/components.component';

export const routes: Routes = [
  {
    path: 'products/inventory',
    component: AppShellComponent,
  },
  {
    path: '',
    component: ComponentsComponent,
  },
];
