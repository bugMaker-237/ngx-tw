import type { Meta, StoryObj } from '@storybook/angular';
import { TwStickyContentHeader } from './sticky-content-header.component';

const meta: Meta<TwStickyContentHeader> = {
  title: 'Components/StickyContentHeader',
  component: TwStickyContentHeader,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A sticky header bar that locks to a configurable `top` offset as the user scrolls. Use `[top]` (px) to set the vertical stick point (default 72 px) and `[zIndex]` to control stacking. Project any content — toolbars, titles, tab bars — inside the component.',
      },
    },
  },
  argTypes: {
    top: { control: 'number', description: 'Top offset in pixels when the element becomes sticky (default 72)' },
    zIndex: { control: 'number', description: 'CSS z-index of the sticky header' },
  },
  args: {
    top: 0,
    zIndex: 20,
  },
};

export default meta;
type Story = StoryObj<TwStickyContentHeader>;

export const Default: Story = {
  parameters: {
    docs: { description: { story: 'Sticky header inside a scrollable container (set `top` to `0` for this demo). Scroll down inside the box to see the header lock in place.' } },
  },
  render: (args) => ({
    props: args,
    imports: [TwStickyContentHeader],
    template: `
      <div class="h-[400px] overflow-y-auto border border-gray-200 rounded-lg">
        <tw-sticky-content-header [top]="top" [zIndex]="zIndex">
          <div class="px-6 py-3 bg-white shadow-sm font-semibold text-gray-800">
            Sticky Header — scroll down to see it stick
          </div>
        </tw-sticky-content-header>
        <div class="p-6 space-y-4">
          <p *ngFor="let i of items" class="text-gray-500 py-2 border-b border-gray-100">
            Content row {{ i }}
          </p>
        </div>
      </div>
    `,
    component: undefined as any,
    // provide items array
    ngOnInit() { (this as any)['items'] = Array.from({ length: 20 }, (_, i) => i + 1); }
  }),
};

export const WithRichContent: Story = {
  parameters: {
    docs: { description: { story: 'A rich toolbar-style header with a title and Save/Cancel action buttons projected as content.' } },
  },
  render: () => ({
    imports: [TwStickyContentHeader],
    template: `
      <div class="h-[400px] overflow-y-auto border border-gray-200 rounded-lg">
        <tw-sticky-content-header [top]="0">
          <div class="px-6 py-4 flex items-center justify-between bg-white">
            <h2 class="text-xl font-bold text-gray-800">Page Title</h2>
            <div class="flex gap-2">
              <button class="px-3 py-1 text-sm rounded bg-primary-600 text-white">Save</button>
              <button class="px-3 py-1 text-sm rounded border border-gray-300 text-gray-700">Cancel</button>
            </div>
          </div>
        </tw-sticky-content-header>
        <div class="p-6 space-y-3">
          <div *ngFor="let n of [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]"
               class="h-12 bg-gray-100 rounded animate-pulse"></div>
        </div>
      </div>
    `,
  }),
};
