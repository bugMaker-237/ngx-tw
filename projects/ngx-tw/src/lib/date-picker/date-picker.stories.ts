import type { Meta, StoryObj } from '@storybook/angular';
import { TwDateRangePicker } from './date-range-picker.component';

const meta: Meta<TwDateRangePicker> = {
  title: 'Components/Date Range Picker',
  component: TwDateRangePicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A pop-up date-range picker that wraps `TwCalendar` inside an overlay panel. Bind two-way to `startDate` and `endDate`, or control the panel programmatically with `[isOpen]`.',
      },
    },
  },
  argTypes: {
    isOpen: { control: 'boolean', description: 'Programmatically open or close the picker panel' },
  },
  args: {
    isOpen: false,
  },
};

export default meta;
type Story = StoryObj<TwDateRangePicker>;

export const Default: Story = {
  parameters: {
    docs: { description: { story: 'Default closed state — the trigger element toggles the picker panel.' } },
  },
};

export const InitiallyOpen: Story = {
  parameters: {
    docs: { description: { story: 'Panel pre-opened via `[isOpen]="true"` — useful for inline display or testing.' } },
  },
  args: { isOpen: true },
};
