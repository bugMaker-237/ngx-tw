import { Component } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { TwTabGroup } from './tab-group/tab-group.component';
import { TwTabItem } from './tab-item-maker.component';

@Component({
  selector: 'sb-tab-demo',
  imports: [TwTabGroup, TwTabItem],
  template: `
    <div class="flex flex-col gap-12">
      <div>
        <p class="mb-2 text-sm font-medium text-gray-600">Primary color</p>
        <tw-tab-group color="primary">
          <tw-tab label="Overview">
            <div class="p-4">Overview tab content</div>
          </tw-tab>
          <tw-tab label="Details">
            <div class="p-4">Details tab content</div>
          </tw-tab>
          <tw-tab label="Settings">
            <div class="p-4">Settings tab content</div>
          </tw-tab>
        </tw-tab-group>
      </div>

      <div>
        <p class="mb-2 text-sm font-medium text-gray-600">Accent color</p>
        <tw-tab-group color="accent">
          <tw-tab label="Tab A">
            <div class="p-4">Content A</div>
          </tw-tab>
          <tw-tab label="Tab B">
            <div class="p-4">Content B</div>
          </tw-tab>
          <tw-tab label="Tab C">
            <div class="p-4">Content C</div>
          </tw-tab>
        </tw-tab-group>
      </div>
    </div>
  `,
})
class TabDemoComponent {}

const meta: Meta<TabDemoComponent> = {
  title: 'Components/Tabs',
  component: TabDemoComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A tabbed content container using `tw-tab-group` and `tw-tab` child elements. Set `[color]` to `primary` or `accent` to style the active indicator. Each `tw-tab` receives a `[label]` attribute and projects its body content into the tab panel.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<TabDemoComponent>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Two tab groups side by side — one styled with `primary` and one with `accent` color. Click tabs to switch active panels.',
      },
    },
  },
};
