import { Component } from '@angular/core';
import { ButtonsComponent } from './buttons/buttons.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { ExpanderComponent } from './expander/expander.component';
import { InputsComponent } from './inupts/inputs.component';
import { MenuComponent } from './menu/menu.component';
import { SelectComponent } from './select/select.component';
import { TablesComponent } from './tables/tables.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ButtonsComponent,
    TablesComponent,
    SelectComponent,
    DragDropComponent,
    ExpanderComponent,
    MenuComponent,
    InputsComponent,
  ],
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss'],
})
export class ComponentsComponent {}
