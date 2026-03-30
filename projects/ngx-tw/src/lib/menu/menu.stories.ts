import { Component } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { TwButtonIcon } from '../button/button-icon.component';
import { TwButton } from '../button/button.component';
import { TwIcon } from '../icon/icon.component';
import { TwMenuModule } from './index';

@Component({
  selector: 'sb-menu-demo',
  imports: [TwMenuModule, TwButton, TwButtonIcon, TwIcon],
  template: `
    <div class="flex flex-wrap gap-16 items-start p-8 min-h-64">
      <div>
        <p class="mb-2 text-sm font-medium text-gray-600">Button trigger</p>
        <tw-button type="filled" color="primary" [twMenuTriggerFor]="menu1">Open Menu</tw-button>

        <tw-menu #menu1>
          <button *twMenuItem>Action 1</button>
          <button *twMenuItem>Action 2</button>
          <button *twMenuItem>Action 3</button>
        </tw-menu>
      </div>

      <div>
        <p class="mb-2 text-sm font-medium text-gray-600">Icon button trigger</p>
        <tw-button-icon type="filled" color="accent" svgIcon="hero:ellipsis-horizontal" [twMenuTriggerFor]="menu2"></tw-button-icon>

        <tw-menu #menu2>
          <button *twMenuItem>Edit</button>
          <button *twMenuItem>Duplicate</button>
          <button *twMenuItem>Delete</button>
        </tw-menu>
      </div>

      <div>
        <p class="mb-2 text-sm font-medium text-gray-600">With submenus</p>
        <tw-button type="filled" color="primary" [twMenuTriggerFor]="menu3">Nested Menu</tw-button>

        <tw-menu #menu3>
          <button *twMenuItem>Action 1</button>
          <button *twMenuItem="subMenu" class="flex items-center justify-between gap-4">
            More options
            <tw-icon [size]="16" svgIcon="hero:chevron-right"></tw-icon>
          </button>
          <button *twMenuItem>Action 3</button>
        </tw-menu>

        <tw-menu #subMenu>
          <button *twMenuItem>Sub Action 1</button>
          <button *twMenuItem>Sub Action 2</button>
        </tw-menu>
      </div>
    </div>
  `,
})
class MenuDemoComponent {}

const meta: Meta<MenuDemoComponent> = {
  title: 'Components/Menu',
  component: MenuDemoComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A contextual dropdown menu. Attach `[twMenuTriggerFor]="menuRef"` to any element to make it the trigger, then declare menu items with the `*twMenuItem` structural directive. Pass another `tw-menu` reference to `*twMenuItem` to create nested sub-menus.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<MenuDemoComponent>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Three trigger variants: a filled button trigger, an icon-button trigger, and a button that opens a multi-level nested menu.',
      },
    },
  },
};
