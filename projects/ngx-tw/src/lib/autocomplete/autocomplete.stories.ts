import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
} from '@angular/forms';
import type { Meta, StoryObj } from '@storybook/angular';
import { of } from 'rxjs';
import { TwAutocomplete } from './autocomplete.component';

const meta: Meta = {
  title: 'Components/Autocomplete',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A text input with autocomplete suggestions powered by CDK overlay. Pass `[suggestions]` as a plain array, an `Observable<T[]>`, or a `Promise<T[]>`. Use `[displayFactory]` to map items to `{ key, text }`. Fully integrates with `ControlValueAccessor` for reactive and template-driven forms. Add `[filterFn]` for custom filtering logic.',
      },
    },
  },
};

export default meta;

// ── Static Array ────────────────────────────────────────────────────────────

@Component({
  selector: 'story-autocomplete-array',
  standalone: true,
  imports: [TwAutocomplete, ReactiveFormsModule],
  template: `
    <div class="p-4 w-80">
      <tw-autocomplete
        label="Country"
        placeholder="Search a country…"
        [suggestions]="countries"
        [displayFactory]="display"
        (selectionChanged)="selected = $event"
      />
      <p *ngIf="selected" class="mt-2 text-sm text-gray-600">
        Selected: {{ selected.label }}
      </p>
    </div>
  `,
})
class AutocompleteArrayStory {
  countries = [
    { key: 'fr', label: 'France' },
    { key: 'de', label: 'Germany' },
    { key: 'es', label: 'Spain' },
    { key: 'it', label: 'Italy' },
    { key: 'us', label: 'United States' },
    { key: 'gb', label: 'United Kingdom' },
    { key: 'jp', label: 'Japan' },
    { key: 'cn', label: 'China' },
  ];
  display = (item: { key: string; label: string }) => ({
    key: item.key,
    text: item.label,
  });
  selected: any = null;
}

export const WithArray: StoryObj = {
  parameters: {
    docs: { description: { story: 'Suggestions provided as a plain JavaScript array. A `displayFactory` maps each object to `{ key, text }` for rendering.' } },
  },
  render: () => ({
    moduleMetadata: { imports: [AutocompleteArrayStory] },
    template: '<story-autocomplete-array></story-autocomplete-array>',
  }),
};

// ── Observable ───────────────────────────────────────────────────────────────

@Component({
  selector: 'story-autocomplete-observable',
  standalone: true,
  imports: [TwAutocomplete],
  template: `
    <div class="p-4 w-80">
      <tw-autocomplete
        label="Framework"
        placeholder="Search frameworks…"
        [suggestions]="frameworks$"
        [displayFactory]="display"
        (selectionChanged)="selected = $event"
      />
      <p *ngIf="selected" class="mt-2 text-sm text-gray-600">
        Selected: {{ display(selected).text }}
      </p>
    </div>
  `,
})
class AutocompleteObservableStory {
  frameworks$ = of([
    { id: 1, name: 'Angular' },
    { id: 2, name: 'React' },
    { id: 3, name: 'Vue' },
    { id: 4, name: 'Svelte' },
    { id: 5, name: 'SolidJS' },
  ]);
  display = (item: { id: number; name: string }) => ({
    key: String(item.id),
    text: item.name,
  });
  selected: any = null;
}

export const WithObservable: StoryObj = {
  parameters: {
    docs: { description: { story: 'Suggestions supplied as an `Observable<T[]>` — the component subscribes automatically and handles loading state.' } },
  },
  render: () => ({
    moduleMetadata: { imports: [AutocompleteObservableStory] },
    template: '<story-autocomplete-observable></story-autocomplete-observable>',
  }),
};

// ── Reactive Form ─────────────────────────────────────────────────────────────

@Component({
  selector: 'story-autocomplete-form',
  standalone: true,
  imports: [TwAutocomplete, ReactiveFormsModule],
  template: `
    <div class="p-4 w-80" [formGroup]="form">
      <tw-autocomplete
        formControlName="country"
        label="Country (reactive)"
        placeholder="Pick a country…"
        [suggestions]="countries"
        [displayFactory]="display"
      />
      <p class="mt-2 text-xs text-gray-500">Form value: {{ form.value | json }}</p>
    </div>
  `,
})
class AutocompleteFormStory {
  countries = [
    { key: 'fr', label: 'France' },
    { key: 'de', label: 'Germany' },
    { key: 'es', label: 'Spain' },
  ];
  display = (item: { key: string; label: string }) => ({
    key: item.key,
    text: item.label,
  });
  form = new FormGroup({ country: new FormControl(null) });
}

export const WithReactiveForm: StoryObj = {
  parameters: {
    docs: { description: { story: 'Autocomplete bound to a reactive `FormControl` via `formControlName` inside a `FormGroup`. The selected item\'s value is reflected in the form.' } },
  },
  render: () => ({
    moduleMetadata: { imports: [AutocompleteFormStory] },
    template: '<story-autocomplete-form></story-autocomplete-form>',
  }),
};

// ── With Icon ────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-autocomplete-icon',
  standalone: true,
  imports: [TwAutocomplete],
  template: `
    <div class="p-4 w-80">
      <tw-autocomplete
        label="Search users"
        placeholder="Type a name…"
        iconPrefix="hero:user"
        [suggestions]="users"
        [displayFactory]="display"
      />
    </div>
  `,
})
class AutocompleteIconStory {
  users = ['Alice Johnson', 'Bob Smith', 'Carol White', 'David Brown', 'Eve Martin'];
  display = (item: string) => ({ key: item, text: item });
}

export const WithIcon: StoryObj = {
  parameters: {
    docs: { description: { story: 'Leading icon added via `[iconPrefix]` — accepts `namespace:name` icon strings (e.g. `hero:user`).' } },
  },
  render: () => ({
    moduleMetadata: { imports: [AutocompleteIconStory] },
    template: '<story-autocomplete-icon></story-autocomplete-icon>',
  }),
};
