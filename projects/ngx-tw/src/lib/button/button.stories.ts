import type { Meta, StoryObj } from '@storybook/angular';
import { TwButton } from './button.component';

const meta: Meta<TwButton> = {
  title: 'Components/Button',
  component: TwButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A multi-variant button with `basic`, `outlined`, and `filled` styles. Supports `primary`, `accent`, and `danger` color palettes, optional `rounded` border-radius control, and content projection for label text.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['basic', 'outlined', 'filled'],
      description: 'Visual style of the button',
    },
    color: {
      control: 'select',
      options: [undefined, 'primary', 'accent', 'danger'],
      description: 'Color theme',
    },
    rounded: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full'],
      description: 'Border radius',
    },
    disabled: { control: 'boolean' },
    isSubmit: { control: 'boolean' },
    twClass: { control: 'text', description: 'Extra CSS classes' },
  },
  args: {
    type: 'basic',
    disabled: false,
    isSubmit: false,
    rounded: 'md',
  },
};

export default meta;
type Story = StoryObj<TwButton>;

export const Basic: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Default text-only button with no border or fill — ideal for low-emphasis actions.',
      },
    },
  },
  args: { type: 'basic' },
  render: (args) => ({
    props: args,
    template: `<tw-button [type]="type" [color]="color" [rounded]="rounded" [disabled]="disabled">Button</tw-button>`,
  }),
};

export const Outlined: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Button with a visible border and transparent background — suitable for secondary actions.',
      },
    },
  },
  args: { type: 'outlined', color: 'primary' },
  render: (args) => ({
    props: args,
    template: `<tw-button [type]="type" [color]="color" [rounded]="rounded" [disabled]="disabled">Button</tw-button>`,
  }),
};

export const Filled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Solid-background button for high-emphasis or primary call-to-action scenarios.',
      },
    },
  },
  args: { type: 'filled', color: 'primary' },
  render: (args) => ({
    props: args,
    template: `<tw-button [type]="type" [color]="color" [rounded]="rounded" [disabled]="disabled">Button</tw-button>`,
  }),
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Setting `[disabled]="true"` prevents interaction and applies reduced-opacity styling.',
      },
    },
  },
  args: { type: 'filled', color: 'danger', disabled: true },
  render: (args) => ({
    props: args,
    template: `<tw-button [type]="type" [color]="color" [disabled]="disabled">Disabled</tw-button>`,
  }),
};

export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'All three variants (`basic`, `outlined`, `filled`) across all available color themes (`primary`, `accent`, `danger`) side by side.',
      },
    },
  },
  render: () => ({
    template: `
      <div class="flex flex-wrap gap-4">
        <tw-button type="basic">Basic</tw-button>
        <tw-button type="basic" color="primary">Primary</tw-button>
        <tw-button type="basic" color="accent">Accent</tw-button>
        <tw-button type="basic" color="danger">Danger</tw-button>
        <tw-button type="outlined">Outlined</tw-button>
        <tw-button type="outlined" color="primary">Primary</tw-button>
        <tw-button type="outlined" color="accent">Accent</tw-button>
        <tw-button type="outlined" color="danger">Danger</tw-button>
        <tw-button type="filled">Filled</tw-button>
        <tw-button type="filled" color="primary">Primary</tw-button>
        <tw-button type="filled" color="accent">Accent</tw-button>
        <tw-button type="filled" color="danger">Danger</tw-button>
      </div>
    `,
  }),
};
