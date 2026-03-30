import { Component } from '@angular/core';
import { provideRouter } from '@angular/router';
import { applicationConfig, type Meta, type StoryObj } from '@storybook/angular';
import { TwDrawer } from './drawer.component';
import { DrawerMenuSection } from './drawer.interface';

const meta: Meta = {
  title: 'Components/Drawer',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A sidebar navigation panel. Pass `DrawerMenuSection[]` via `[sections]` to populate navigation items with icons, labels, and routes. Set `[useAsAppShell]="true"` to wrap the full page layout. On mobile, the sidebar renders as an animated overlay; on desktop it can be collapsed.',
      },
    },
  },
  decorators: [
    applicationConfig({
      providers: [provideRouter([])],
    }),
  ],
};

export default meta;

const sections: DrawerMenuSection[] = [
  {
    items: [
      { label: 'Dashboard', icon: 'hero:home', route: '/' },
      { label: 'Orders', icon: 'hero:shopping-cart', route: '/orders' },
      { label: 'Products', icon: 'hero:cube', route: '/products' },
    ],
  },
  {
    title: 'Management',
    items: [
      {
        label: 'Users',
        icon: 'hero:user-group',
        children: [
          { label: 'All Users', route: '/users' },
          { label: 'Roles', route: '/users/roles' },
        ],
      },
      { label: 'Settings', icon: 'hero:cog-6-tooth', route: '/settings' },
    ],
  },
];

// ── Standalone Panel ──────────────────────────────────────────────────────────

@Component({
  selector: 'story-drawer-standalone',
  standalone: true,
  imports: [TwDrawer],
  template: `
    <div class="flex h-[600px] overflow-hidden border border-gray-200 rounded-lg">
      <tw-drawer [sections]="sections" />
      <div class="flex-1 bg-gray-50 p-6 text-gray-500 text-sm">
        Main content area
      </div>
    </div>
  `,
})
class DrawerStandaloneStory {
  sections = sections;
}

export const Standalone: StoryObj = {
  parameters: {
    docs: { description: { story: 'Sidebar panel alongside a content area — the standard desktop side-navigation layout.' } },
  },
  render: () => ({
    moduleMetadata: { imports: [DrawerStandaloneStory] },
    template: '<story-drawer-standalone></story-drawer-standalone>',
  }),
};

// ── App Shell ─────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-drawer-appshell',
  standalone: true,
  imports: [TwDrawer],
  template: `
    <div class="h-[600px] overflow-hidden">
      <tw-drawer [sections]="sections" [useAsAppShell]="true">
        <ng-template #drawerHeader>
          <div class="px-4 py-3 flex items-center gap-3 border-b border-gray-200">
            <span class="text-lg font-bold text-primary-600">MyApp</span>
          </div>
        </ng-template>
        <div class="p-6 text-gray-500 text-sm">
          App shell content area
        </div>
      </tw-drawer>
    </div>
  `,
})
class DrawerAppShellStory {
  sections = sections;
}

export const AsAppShell: StoryObj = {
  parameters: {
    docs: { description: { story: 'Using `[useAsAppShell]="true"` to make the drawer the parent layout wrapper for the entire page.' } },
  },
  render: () => ({
    moduleMetadata: { imports: [DrawerAppShellStory] },
    template: '<story-drawer-appshell></story-drawer-appshell>',
  }),
};

// ── Minimal ───────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-drawer-minimal',
  standalone: true,
  imports: [TwDrawer],
  template: `
    <div class="flex h-[400px] overflow-hidden border border-gray-200 rounded-lg">
      <tw-drawer [sections]="sections" />
      <div class="flex-1 bg-white p-6 text-gray-400 text-sm">Content</div>
    </div>
  `,
})
class DrawerMinimalStory {
  sections: DrawerMenuSection[] = [
    {
      items: [
        { label: 'Home', icon: 'hero:home', route: '/' },
        { label: 'About', icon: 'hero:information-circle', route: '/about' },
      ],
    },
  ];
}

export const Minimal: StoryObj = {
  parameters: {
    docs: { description: { story: 'Minimal configuration: two navigation items with no section headers or nested children.' } },
  },
  render: () => ({
    moduleMetadata: { imports: [DrawerMinimalStory] },
    template: '<story-drawer-minimal></story-drawer-minimal>',
  }),
};
