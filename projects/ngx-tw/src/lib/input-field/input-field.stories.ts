import type { Meta, StoryObj } from '@storybook/angular';
import { TwInputField } from './input-field.component';

const meta: Meta<TwInputField> = {
  title: 'Components/Input Field',
  component: TwInputField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A text input (or textarea) with optional floating label, leading/trailing icon decorators, color accent, and full `ControlValueAccessor` integration. Set `[multiline]="true"` for a `<textarea>`. Supports reactive forms and `ngModel`.',
      },
    },
  },
  argTypes: {
    inputType: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
    color: {
      control: 'select',
      options: [undefined, 'primary', 'accent', 'danger'],
    },
    placeholder: { control: 'text' },
    label: { control: 'text' },
    showLabel: { control: 'boolean' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    multiline: { control: 'boolean' },
    iconPrefix: { control: 'text' },
    iconSuffix: { control: 'text' },
  },
  args: {
    inputType: 'text',
    placeholder: 'Enter text...',
    showLabel: false,
    required: false,
    disabled: false,
    multiline: false,
  },
};

export default meta;
type Story = StoryObj<TwInputField>;

export const Basic: Story = {
  parameters: {
    docs: { description: { story: 'Plain text input with no label or icon decorators.' } },
  },
  args: { placeholder: 'Your name' },
};

export const WithLabel: Story = {
  parameters: {
    docs: { description: { story: 'Floating label shown above the field when `[showLabel]="true"` and `[label]` is set.' } },
  },
  args: {
    label: 'Email address',
    showLabel: true,
    inputType: 'email',
    placeholder: 'name@example.com',
  },
};

export const WithIconPrefix: Story = {
  parameters: {
    docs: { description: { story: 'Leading icon inside the field via `[iconPrefix]`. Accepts `namespace:name` icon strings.' } },
  },
  args: {
    iconPrefix: 'hero:magnifying-glass',
    placeholder: 'Search...',
    color: 'primary',
  },
};

export const WithBothIcons: Story = {
  parameters: {
    docs: { description: { story: 'Both a leading `[iconPrefix]` and trailing `[iconSuffix]` icon applied simultaneously.' } },
  },
  args: {
    iconPrefix: 'hero:envelope',
    iconSuffix: 'hero:check',
    placeholder: 'Email address',
    color: 'accent',
  },
};

export const Multiline: Story = {
  parameters: {
    docs: { description: { story: 'Textarea mode enabled by `[multiline]="true"`. The field grows with content.' } },
  },
  args: {
    multiline: true,
    placeholder: 'Write a description...',
  },
};

export const Disabled: Story = {
  parameters: {
    docs: { description: { story: 'Disabled state — interaction is blocked and the field is visually de-emphasized.' } },
  },
  args: {
    placeholder: 'Disabled input',
    disabled: true,
    value: 'Cannot edit this',
  },
};

export const AllVariants: Story = {
  parameters: {
    docs: { description: { story: 'Side-by-side view of all common input configurations: plain, icon prefix, dual icons, multiline, and disabled.' } },
  },
  render: () => ({
    imports: [TwInputField],
    template: `
      <div class="flex flex-col gap-4 max-w-sm">
        <tw-input-field placeholder="Basic input" />
        <tw-input-field placeholder="With prefix icon" iconPrefix="hero:megaphone" color="accent" />
        <tw-input-field placeholder="With both icons" iconPrefix="hero:envelope" iconSuffix="hero:check" color="danger" />
        <tw-input-field placeholder="Multiline / textarea" [multiline]="true" />
        <tw-input-field placeholder="Disabled" [disabled]="true" value="Read-only value" />
      </div>
    `,
  }),
};
