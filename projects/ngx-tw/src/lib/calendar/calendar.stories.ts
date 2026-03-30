import type { Meta, StoryObj } from '@storybook/angular';
import { TwCalendar } from './calendar.component';

const meta: Meta<TwCalendar> = {
  title: 'Components/Calendar',
  component: TwCalendar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'An inline calendar widget for single-date or date-range selection. Supports optional `minDate`/`maxDate` boundaries and emits `selectedDate` events on selection.',
      },
    },
  },
  argTypes: {
    isRange: {
      control: 'boolean',
      description:
        'Enable date range selection — click a start date then an end date',
    },
    selectedDate: { control: 'date' },
    minDate: { control: 'date' },
    maxDate: { control: 'date' },
  },
  args: {
    isRange: false,
  },
};

export default meta;
type Story = StoryObj<TwCalendar>;

export const SingleDate: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Single date selection mode (`[isRange]="false"`). Click any day to select it.',
      },
    },
  },
  args: { isRange: false },
};

export const DateRange: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Range selection mode (`[isRange]="true"`). Click a start date then an end date to define the range.',
      },
    },
  },
  args: { isRange: true },
};

export const WithMinMax: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Constrains selectable dates to the first–28th of the current month via `[minDate]` and `[maxDate]`.',
      },
    },
  },
  args: {
    isRange: false,
    minDate: new Date(new Date().setDate(1)),
    maxDate: new Date(new Date().setDate(28)),
  },
};
