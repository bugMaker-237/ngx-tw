import type { Meta, StoryObj } from '@storybook/angular';
import { TwSwitch } from './switch.component';

const meta: Meta<TwSwitch> = {
  title: 'Components/Switch',
  component: TwSwitch,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A toggle switch with an optional text label and color theme. Supports two-way binding via `[(ngModel)]`, reactive forms, and emits `(toggleChange)` output events. Color defaults to a neutral gray when unchecked.',
      },
    },
  },
  argTypes: {
    label: { control: 'text', description: 'Label text shown next to the toggle' },
    color: {
      control: 'select',
      options: [undefined, 'primary', 'accent', 'danger'],
    },
    disabled: { control: 'boolean' },
    value: { control: 'boolean' },
  },
  args: {
    label: 'Enable feature',
    value: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<TwSwitch>;

export const Default: Story = {
  parameters: {
    docs: { description: { story: 'Unchecked toggle in its default neutral style. Use the controls panel to change label, color, and value.' } },
  },
};

export const Checked: Story = {
  parameters: {
    docs: { description: { story: 'Pre-checked switch styled with the `primary` color.' } },
  },
  args: { value: true, color: 'primary', label: 'Active' },
};

export const Disabled: Story = {
  parameters: {
    docs: { description: { story: 'Disabled state — user interaction is blocked and the control is visually de-emphasized.' } },
  },
  args: { value: true, disabled: true, label: 'Disabled toggle' },
};

export const AllVariants: Story = {
  parameters: {
    docs: { description: { story: 'All color themes in both checked and unchecked states, plus disabled examples.' } },
  },
  render: () => ({
    imports: [TwSwitch],
    template: `
      <div class="flex flex-col gap-4">
        <tw-switch label="Default" />
        <tw-switch label="Primary (on)" [value]="true" color="primary" />
        <tw-switch label="Accent (on)" [value]="true" color="accent" />
        <tw-switch label="Danger (on)" [value]="true" color="danger" />
        <tw-switch label="Disabled" [disabled]="true" />
        <tw-switch label="Disabled (on)" [value]="true" [disabled]="true" color="primary" />
      </div>
    `,
  }),
};
