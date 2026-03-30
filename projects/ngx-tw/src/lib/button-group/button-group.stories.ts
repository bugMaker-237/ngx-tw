import type { Meta, StoryObj } from '@storybook/angular';
import { TwButtonGroupItem } from './button-group-Item.component';
import { TwButtonGroup } from './button-group.component';

const meta: Meta<TwButtonGroup> = {
  title: 'Components/Button Group',
  component: TwButtonGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A segmented control grouping multiple `tw-btn-group-item` elements into a visually connected set. Supports horizontal and vertical orientation, group-level or per-item color theming, and a shared `disabled` state.',
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: [undefined, 'primary', 'accent', 'danger'],
    },
    disabled: { control: 'boolean' },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
  },
  args: {
    color: 'primary',
    disabled: false,
    orientation: 'horizontal',
  },
};

export default meta;
type Story = StoryObj<TwButtonGroup>;

export const Basic: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Horizontal group with a shared `color` applied at the group level. Use the controls to change orientation and color.',
      },
    },
  },
  render: (args) => ({
    props: args,
    imports: [TwButtonGroup, TwButtonGroupItem],
    template: `
      <tw-btn-group [color]="color" [disabled]="disabled" [orientation]="orientation">
        <tw-btn-group-item value="1">Option 1</tw-btn-group-item>
        <tw-btn-group-item value="2">Option 2</tw-btn-group-item>
        <tw-btn-group-item value="3">Option 3</tw-btn-group-item>
      </tw-btn-group>
    `,
  }),
};

export const Colors: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Side-by-side comparison of `primary`, `accent`, and `danger` color groups.',
      },
    },
  },
  render: () => ({
    imports: [TwButtonGroup, TwButtonGroupItem],
    template: `
      <div class="flex flex-col gap-4">
        <tw-btn-group color="primary">
          <tw-btn-group-item value="1">Option X</tw-btn-group-item>
          <tw-btn-group-item value="2">Option Y</tw-btn-group-item>
          <tw-btn-group-item value="3">Option Z</tw-btn-group-item>
        </tw-btn-group>
        <tw-btn-group color="accent">
          <tw-btn-group-item value="1">Option X</tw-btn-group-item>
          <tw-btn-group-item value="2">Option Y</tw-btn-group-item>
          <tw-btn-group-item value="3">Option Z</tw-btn-group-item>
        </tw-btn-group>
        <tw-btn-group color="danger">
          <tw-btn-group-item value="1">Option X</tw-btn-group-item>
          <tw-btn-group-item value="2">Option Y</tw-btn-group-item>
          <tw-btn-group-item value="3">Option Z</tw-btn-group-item>
        </tw-btn-group>
      </div>
    `,
  }),
};

export const PerItemColor: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Each `tw-btn-group-item` carries its own `[color]` override, allowing mixed-color groups.',
      },
    },
  },
  render: () => ({
    imports: [TwButtonGroup, TwButtonGroupItem],
    template: `
      <tw-btn-group>
        <tw-btn-group-item value="1" color="primary">Primary</tw-btn-group-item>
        <tw-btn-group-item value="2" color="accent">Accent</tw-btn-group-item>
        <tw-btn-group-item value="3" color="danger">Danger</tw-btn-group-item>
      </tw-btn-group>
    `,
  }),
};

export const Vertical: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Setting `orientation="vertical"` stacks items top-to-bottom instead of left-to-right.',
      },
    },
  },
  args: { orientation: 'vertical', color: 'primary' },
  render: (args) => ({
    props: args,
    imports: [TwButtonGroup, TwButtonGroupItem],
    template: `
      <tw-btn-group [color]="color" [orientation]="orientation">
        <tw-btn-group-item value="1">Option 1</tw-btn-group-item>
        <tw-btn-group-item value="2">Option 2</tw-btn-group-item>
        <tw-btn-group-item value="3">Option 3</tw-btn-group-item>
      </tw-btn-group>
    `,
  }),
};
