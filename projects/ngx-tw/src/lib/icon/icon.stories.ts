import type { Meta, StoryObj } from '@storybook/angular';
import { TwIcon } from './icon.component';

const meta: Meta<TwIcon> = {
  title: 'Components/Icon',
  component: TwIcon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'An SVG icon component that fetches icons from a registered namespace path via `HttpClient`. The default `hero:` namespace resolves to `/assets/icons/hero/<name>.svg`. Use `[svgIcon]="\'namespace:name\'"` and optionally `[size]` (in pixels) to control dimensions.',
      },
    },
  },
  argTypes: {
    svgIcon: {
      control: 'text',
      description: 'Icon name in "namespace:name" format, e.g. "hero:home"',
    },
    size: {
      control: { type: 'range', min: 12, max: 64, step: 2 },
      description: 'Size in pixels',
    },
  },
  args: {
    svgIcon: 'hero:home',
    size: 24,
  },
};

export default meta;
type Story = StoryObj<TwIcon>;

export const Default: Story = {
  parameters: {
    docs: { description: { story: 'Single icon rendered at the configured size. Adjust `svgIcon` and `size` using the controls panel.' } },
  },
};

export const Large: Story = {
  parameters: {
    docs: { description: { story: 'Demonstrates the `[size]` input scaling the icon to 48×48 px.' } },
  },
  args: { size: 48, svgIcon: 'hero:star' },
};

export const Gallery: Story = {
  parameters: {
    docs: { description: { story: 'A grid of all available Heroicons at 24×24 px, showing icon names below each glyph.' } },
  },
  render: () => ({
    imports: [TwIcon],
    template: `
      <div class="flex flex-wrap gap-6 items-center">
        <div class="flex flex-col items-center gap-1" *ngFor="let icon of icons">
          <tw-icon [svgIcon]="'hero:' + icon" [size]="24"></tw-icon>
          <span class="text-xs text-gray-500">{{ icon }}</span>
        </div>
      </div>
    `,
    props: {
      icons: [
        'home', 'user', 'cog-6-tooth', 'bell', 'envelope', 'trash',
        'pencil', 'plus', 'minus', 'check', 'x-mark', 'magnifying-glass',
        'arrow-left', 'arrow-right', 'chevron-down', 'chevron-right',
        'eye', 'eye-slash', 'star', 'heart', 'bookmark', 'share',
      ],
    },
  }),
};
