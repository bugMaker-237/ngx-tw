import type { Meta, StoryObj } from '@storybook/angular';
import { TwButtonIcon } from './button-icon.component';

const meta: Meta<TwButtonIcon> = {
  title: 'Components/Button Icon',
  component: TwButtonIcon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A square icon-only button sharing the same `type` and `color` system as `tw-button`. Use `[svgIcon]` in `namespace:name` format (e.g. `hero:plus`) to specify the icon.',
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
    },
    svgIcon: { control: 'text', description: 'Icon name, e.g. "hero:plus"' },
    disabled: { control: 'boolean' },
  },
  args: {
    type: 'basic',
    svgIcon: 'hero:plus',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<TwButtonIcon>;

export const Basic: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Default unstyled icon button — no border or fill. Use the controls to switch type, color, and icon.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `<tw-button-icon [type]="type" [color]="color" [svgIcon]="svgIcon" [disabled]="disabled" />`,
  }),
};

export const AllVariants: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'All `type`/`color` combinations side by side, including a disabled state.',
      },
    },
  },
  render: () => ({
    template: `
      <div class="flex flex-wrap gap-4 items-center">
        <tw-button-icon type="basic" svgIcon="hero:home" />
        <tw-button-icon type="basic" color="primary" svgIcon="hero:home" />
        <tw-button-icon type="outlined" svgIcon="hero:magnifying-glass" />
        <tw-button-icon type="outlined" color="accent" svgIcon="hero:magnifying-glass" />
        <tw-button-icon type="filled" color="primary" svgIcon="hero:plus" />
        <tw-button-icon type="filled" color="danger" svgIcon="hero:trash" />
        <tw-button-icon type="filled" color="danger" svgIcon="hero:trash" [disabled]="true" />
      </div>
    `,
  }),
};
