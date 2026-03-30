import type { Meta, StoryObj } from '@storybook/angular';
import { TwToolbar } from './toolbar.component';

const meta: Meta<TwToolbar> = {
  title: 'Components/Toolbar',
  component: TwToolbar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A page toolbar built on `TwStickyContentHeader`. Displays a rounded icon badge, a page title via `[header]`, and a strip of action buttons (previous/next/overflow/save). Use `[toolbarIcon]` to set the badge icon, `[hideActions]="true"` to suppress the button strip, and project a `[subHeader]` element for secondary info below the title.',
      },
    },
  },
  argTypes: {
    header: { control: 'text', description: 'Page or section title shown in the toolbar' },
    toolbarIcon: { control: 'text', description: 'Icon shown in the leading circle badge' },
    hideActions: { control: 'boolean', description: 'Hide the action buttons on the right' },
  },
  args: {
    header: 'Dashboard',
    toolbarIcon: 'hero:shopping-bag',
    hideActions: false,
  },
};

export default meta;
type Story = StoryObj<TwToolbar>;

export const Default: Story = {
  parameters: {
    docs: { description: { story: 'Toolbar with icon badge, title, and the full action button strip (back, forward, overflow, save).' } },
  },
};

export const NoActions: Story = {
  parameters: {
    docs: { description: { story: 'Setting `[hideActions]="true"` removes the action button strip, leaving only the icon badge and title.' } },
  },
  args: {
    header: 'Read-only View',
    toolbarIcon: 'hero:document-text',
    hideActions: true,
  },
};

export const WithSubHeader: Story = {
  parameters: {
    docs: { description: { story: 'Project a secondary line of text below the title using the `[subHeader]` content slot.' } },
  },
  render: (args) => ({
    props: args,
    imports: [TwToolbar],
    template: `
      <tw-toolbar [header]="header" [toolbarIcon]="toolbarIcon" [hideActions]="hideActions">
        <span subHeader class="text-sm text-gray-400">Last updated 5 minutes ago</span>
      </tw-toolbar>
    `,
  }),
  args: {
    header: 'Analytics',
    toolbarIcon: 'hero:chart-bar',
    hideActions: false,
  },
};

export const AllVariants: Story = {
  parameters: {
    docs: { description: { story: 'Three toolbar instances demonstrating different icons, hidden actions, and a subheader slot.' } },
  },
  render: () => ({
    imports: [TwToolbar],
    template: `
      <div class="space-y-4">
        <tw-toolbar header="Users" toolbarIcon="hero:user-group" />
        <tw-toolbar header="Settings" toolbarIcon="hero:cog-6-tooth" [hideActions]="true" />
        <tw-toolbar header="Orders" toolbarIcon="hero:shopping-cart">
          <span subHeader class="text-xs text-gray-400">42 pending</span>
        </tw-toolbar>
      </div>
    `,
  }),
};
