import type { Meta, StoryObj } from '@storybook/angular';
import { TwExpanderModule } from './index';

const meta: Meta = {
  title: 'Components/Expander',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'An accessible accordion component composed of `tw-expander`, `tw-expander-header`, and `tw-expander-content`. Wrap one or more expanders in `tw-expander-group` to create accordion behavior with optional multi-open support.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Single: Story = {
  parameters: {
    docs: { description: { story: 'Standalone expander with a clickable header that toggles content visibility via CDK accordion animation.' } },
  },
  render: () => ({
    imports: [TwExpanderModule],
    template: `
      <tw-expander>
        <tw-expander-header>Section Title</tw-expander-header>
        <tw-expander-content>
          <div class="p-4">
            This is the expandable content. Click the header to toggle.
          </div>
        </tw-expander-content>
      </tw-expander>
    `,
  }),
};

export const WithoutIcon: Story = {
  parameters: {
    docs: { description: { story: 'Hide the chevron indicator by passing `[showIcon]="false"` to `tw-expander-header`.' } },
  },
  render: () => ({No Icon Header</tw-expander-header>
        <tw-expander-content>
          <div class="p-4">Content without a chevron icon.</div>
        </tw-expander-content>
      </tw-expander>
    `,
  }),
};

export const PreExpanded: Story = {
  parameters: {
    docs: { description: { story: 'Pass `[expanded]="true"` to `tw-expander` to start the panel open on first render.' } },
  },
  render: () => ({
        <tw-expander-header>Pre-expanded Section</tw-expander-header>
        <tw-expander-content>
          <div class="p-4">This starts open.</div>
        </tw-expander-content>
      </tw-expander>
    `,
  }),
};

export const Group: Story = {
  parameters: {
    docs: { description: { story: '`tw-expander-group` with `[multi]="false"` enforces single-open accordion behaviour — opening one panel collapses the others.' } },
  },
  render: () => ({ class="block w-full">
        <tw-expander>
          <tw-expander-header>Item 1</tw-expander-header>
          <tw-expander-content>
            <div class="p-4">Content for item 1. Only one item can be open at a time.</div>
          </tw-expander-content>
        </tw-expander>
        <tw-expander>
          <tw-expander-header>Item 2</tw-expander-header>
          <tw-expander-content>
            <div class="p-4">Content for item 2.</div>
          </tw-expander-content>
        </tw-expander>
        <tw-expander>
          <tw-expander-header>Item 3</tw-expander-header>
          <tw-expander-content>
            <div class="p-4">Content for item 3.</div>
          </tw-expander-content>
        </tw-expander>
      </tw-expander-group>
    `,
  }),
};

export const MultiGroup: Story = {
  parameters: {
    docs: { description: { story: '`tw-expander-group` with `[multi]="true"` allows any number of panels to be open simultaneously.' } },
  },
  render: () => ({ class="block w-full">
        <tw-expander>
          <tw-expander-header>Item 1</tw-expander-header>
          <tw-expander-content>
            <div class="p-4">Multiple expanders can be open simultaneously.</div>
          </tw-expander-content>
        </tw-expander>
        <tw-expander>
          <tw-expander-header>Item 2</tw-expander-header>
          <tw-expander-content>
            <div class="p-4">Content for item 2.</div>
          </tw-expander-content>
        </tw-expander>
      </tw-expander-group>
    `,
  }),
};
