import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { Meta, StoryObj } from '@storybook/angular';
import { of } from 'rxjs';
import { TwChipItem } from './chip-item-maker.component';
import { TwChipList } from './chip-list.component';

@Component({
  selector: 'sb-chip-demo',
  imports: [TwChipList, TwChipItem, FormsModule],
  template: `
    <div class="flex flex-col gap-6 max-w-xl">
      <div>
        <p class="mb-2 font-medium text-sm text-gray-600">Static chip list</p>
        <tw-chip-list color="primary">
          <tw-chip-item label="Angular" [isDeletable]="false" />
          <tw-chip-item label="TypeScript" [isDeletable]="false" />
          <tw-chip-item label="Tailwind" [isDeletable]="false" />
        </tw-chip-list>
      </div>

      <div>
        <p class="mb-2 font-medium text-sm text-gray-600">
          Editable chip list (free text)
        </p>
        <tw-chip-list
          [isEditable]="true"
          color="accent"
          placeholder="Add a tag..."
        >
        </tw-chip-list>
      </div>

      <div>
        <p class="mb-2 font-medium text-sm text-gray-600">
          Editable with autocomplete suggestions
        </p>
        <tw-chip-list
          [isEditable]="true"
          color="primary"
          placeholder="Search fruit..."
          [autoCompleteSuggestions]="suggestions"
          [autoCompleteDisplayFactory]="displayFactory"
          [autoCompleteFilterFn]="filterFn"
          [allowUnknownItemInsertion]="false"
        ></tw-chip-list>
      </div>
    </div>
  `,
})
class ChipDemoComponent {
  suggestions = of([
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Cherry' },
    { id: 4, name: 'Date' },
    { id: 5, name: 'Elderberry' },
    { id: 6, name: 'Fig' },
  ]);

  displayFactory = (item: any) => ({ key: String(item.id), text: item.name });

  filterFn = (value: string, item: any) =>
    item.name.toLowerCase().includes(value.toLowerCase());
}

const meta: Meta<ChipDemoComponent> = {
  title: 'Components/Chip List',
  component: ChipDemoComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A chip (tag) list component supporting static items, free-text tag entry, and suggestions-based autocomplete input. Child `tw-chip-item` elements can be pre-seeded; set `[isEditable]="true"` to allow adding/removing chips at runtime. Pass `[autoCompleteSuggestions]` to enable filtered suggestions.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<ChipDemoComponent>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Three chip list variants: a static read-only list, an editable free-text list, and an editable list with autocomplete suggestions.',
      },
    },
  },
};
