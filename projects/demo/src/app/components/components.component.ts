import { Component } from '@angular/core';
import { AlertsComponent } from './alerts/alerts.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { DrawerDemoComponent } from './drawer/drawer.component';
import { ExpanderComponent } from './expander/expander.component';
import { InputsComponent } from './inupts/inputs.component';
import { MenuComponent } from './menu/menu.component';
import { SelectComponent } from './select/select.component';
import { TablesComponent } from './tables/tables.component';

@Component({
  selector: 'app-components',
  imports: [
    ButtonsComponent,
    TablesComponent,
    SelectComponent,
    DragDropComponent,
    ExpanderComponent,
    MenuComponent,
    InputsComponent,
    AlertsComponent,
    DrawerDemoComponent,
  ],
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss'],
})
export class ComponentsComponent {}
