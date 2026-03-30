import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import type { Meta, StoryObj } from '@storybook/angular';
import { TwOption } from './option/option.component';
import { TwSelect } from './select.component';

const OPTIONS = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Date', value: 'date' },
  { label: 'Elderberry', value: 'elderberry' },
  { label: 'Fig', value: 'fig' },
  { label: 'Grape', value: 'grape' },
  { label: 'Honeydew', value: 'honeydew' },
];

@Component({
  selector: 'sb-select-demo',
  imports: [TwSelect, TwOption, FormsModule, ReactiveFormsModule],
  template: `
    <div class="flex flex-col gap-8 max-w-sm">
      <div>
        <p class="mb-2 text-sm font-medium text-gray-600">Basic select</p>
        <tw-select color="primary" #s1>
          <tw-option>Choose a fruit</tw-option>
          @for (opt of options; track opt.value) {
            <tw-option [value]="opt.value">{{ opt.label }}</tw-option>
          }
        </tw-select>
        <p class="mt-1 text-sm text-gray-500">Selected: {{ s1.value || '–' }}</p>
      </div>

      <div>
        <p class="mb-2 text-sm font-medium text-gray-600">With search input</p>
        <tw-select color="accent" #s2>
          <input
            type="text"
            class="focus:ring-0 focus:outline-0 min-w-full sm:text-sm border-b border-gray-200 -m-3 -mt-4 p-3 mb-0"
            placeholder="Search..."
            #searchField
            (input)="search(searchField.value)"
          />
          @for (opt of filteredOptions; track opt.value) {
            <tw-option [value]="opt.value">{{ opt.label }}</tw-option>
          }
        </tw-select>
        <p class="mt-1 text-sm text-gray-500">Selected: {{ s2.value || '–' }}</p>
      </div>

      <div>
        <p class="mb-2 text-sm font-medium text-gray-600">With ngModel</p>
        <tw-select color="primary" [(ngModel)]="selectedModel">
          @for (opt of options; track opt.value) {
            <tw-option [value]="opt.value">{{ opt.label }}</tw-option>
          }
        </tw-select>
        <p class="mt-1 text-sm text-gray-500">Model value: {{ selectedModel || '–' }}</p>
      </div>

      <div>
        <p class="mb-2 text-sm font-medium text-gray-600">With reactive form</p>
        <form [formGroup]="form">
          <tw-select color="accent" formControlName="fruit">
            @for (opt of options; track opt.value) {
              <tw-option [value]="opt.value">{{ opt.label }}</tw-option>
            }
          </tw-select>
          <p class="mt-1 text-sm text-gray-500">Form value: {{ form.value.fruit || '–' }}</p>
        </form>
      </div>
    </div>
  `,
})
class SelectDemoComponent {
  options = OPTIONS;
  filteredOptions = [...OPTIONS];
  selectedModel = 'cherry';

  form = new FormGroup({
    fruit: new FormControl('banana'),
  });

  search(value: string) {
    if (!value) {
      this.filteredOptions = [...OPTIONS];
      return;
    }
    this.filteredOptions = OPTIONS.filter((o) =>
      o.label.toLowerCase().includes(value.toLowerCase())
    );
  }
}

const meta: Meta<SelectDemoComponent> = {
  title: 'Components/Select',
  component: SelectDemoComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A styled select dropdown composed of `tw-select` and `tw-option` elements. Supports `ngModel`, reactive forms (`formControlName`), and a custom search input for filtering long option lists. Options support arbitrary `[value]` bindings.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<SelectDemoComponent>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Four select variants: basic, with an embedded search input, with `ngModel` two-way binding, and inside a reactive `FormGroup`.',
      },
    },
  },
};
