import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import type { Meta, StoryObj } from '@storybook/angular';
import { TwMaskedInput } from './masked-input.component';

@Component({
  selector: 'sb-masked-input-demo',
  imports: [TwMaskedInput, ReactiveFormsModule, JsonPipe],
  template: `
    <form [formGroup]="form" class="flex flex-col gap-4 max-w-sm">
      <div>
        <p class="mb-1 text-sm font-medium text-gray-600">Phone (999) 999-9999</p>
        <tw-masked-input
          inputType="tel"
          placeholder="(___) ___-____"
          [maskConfig]="phoneMask"
          formControlName="phone"
        />
      </div>

      <div>
        <p class="mb-1 text-sm font-medium text-gray-600">Date MM/YYYY</p>
        <tw-masked-input
          inputType="text"
          placeholder="MM/YYYY"
          [maskConfig]="dateMask"
          formControlName="date"
        />
      </div>

      <div>
        <p class="mb-1 text-sm font-medium text-gray-600">Alphanumeric Code XX-0000-XX</p>
        <tw-masked-input
          inputType="text"
          placeholder="XX-0000-XX"
          [maskConfig]="alphanumericMask"
          [allowAlphanumeric]="true"
          formControlName="code"
        />
      </div>

      <div>
        <p class="mb-1 text-sm font-medium text-gray-600">Phone with icons</p>
        <tw-masked-input
          inputType="tel"
          placeholder="Phone"
          [maskConfig]="phoneMask"
          iconPrefix="hero:phone"
          iconSuffix="hero:information-circle"
          iconSuffixClass="text-blue-500"
          formControlName="phoneWithIcons"
        />
      </div>

      <pre class="bg-gray-100 rounded p-3 text-sm">{{ form.value | json }}</pre>
    </form>
  `,
})
class MaskedInputDemoComponent {
  phoneMask = { mask: '(999) 999-9999', guide: true, placeholderChar: '_' };
  dateMask = { mask: '99/9999', guide: true, placeholderChar: '_' };
  alphanumericMask = { mask: 'AA-9999-AA', guide: true, placeholderChar: '_' };

  form = new FormGroup({
    phone: new FormControl(''),
    date: new FormControl(''),
    code: new FormControl(''),
    phoneWithIcons: new FormControl(''),
  });
}

const meta: Meta<MaskedInputDemoComponent> = {
  title: 'Components/Masked Input',
  component: MaskedInputDemoComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A masked text input built on `TwInputField`. Pass a `[maskConfig]` object with `mask` (pattern string), `guide` (boolean), and `placeholderChar` to enforce formatted entry. In mask patterns, `9` matches digits and `A` matches letters. Supports icon prefix/suffix and `ControlValueAccessor`.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<MaskedInputDemoComponent>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Four masked inputs inside a reactive form: phone `(999) 999-9999`, date `MM/YYYY`, alphanumeric code `XX-0000-XX`, and a phone with prefix/suffix icons. The live form value is printed below.',
      },
    },
  },
};
