import type { Meta, StoryObj } from '@storybook/angular';
import { TwSpinner } from './spinner.component';

const meta: Meta<TwSpinner> = {
  title: 'Components/Spinner',
  component: TwSpinner,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'An animated circular spinner for indicating a loading or in-progress state. Pass any Tailwind text-color utility (e.g. `text-primary-500`, `text-blue-600`) via `[color]` to customise the spinner colour.',
      },
    },
  },
  argTypes: {
    color: { control: 'text', description: 'Tailwind color class, e.g. "text-primary-500"' },
  },
  args: {
    color: 'text-primary-500',
  },
};

export default meta;
type Story = StoryObj<TwSpinner>;

export const Default: Story = {
  parameters: {
    docs: { description: { story: 'Spinner with the default `text-primary-500` colour. Use the controls panel to change the Tailwind colour class.' } },
  },
};

export const AllColors: Story = {
  parameters: {
    docs: { description: { story: 'Spinners rendered with several common Tailwind colour classes side by side.' } },
  },
  render: () => ({
    imports: [TwSpinner],
    template: `
      <div class="flex flex-wrap gap-6 items-center">
        <tw-spinner color="text-primary-500" />
        <tw-spinner color="text-blue-500" />
        <tw-spinner color="text-green-500" />
        <tw-spinner color="text-red-500" />
        <tw-spinner color="text-yellow-500" />
        <tw-spinner color="text-purple-500" />
        <tw-spinner color="text-gray-500" />
      </div>
    `,
  }),
};
