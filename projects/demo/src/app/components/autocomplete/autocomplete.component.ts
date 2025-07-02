import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TwAutocomplete } from 'ngx-tw';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [TwAutocomplete, ReactiveFormsModule],
  templateUrl: './autocomplete.component.html',
})
export class AutoComplteDemoComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      myAutocomplete: [[]], // Initialize as an empty array for multi-selection
    });
  }

  suggestionKeyFactory = (item: any) => ({ key: item.id, value: item.name });

  customFilter = (value: string, item: any) => {
    return item.name.toLowerCase().includes(value.toLowerCase());
  };

  onSelectionChange(selectedItems: any[]) {
    console.log('Selected items:', selectedItems);
  }
}
