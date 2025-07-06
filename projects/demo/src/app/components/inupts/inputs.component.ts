import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  TwAutocomplete,
  TwButton,
  TwCalendar,
  TwChip,
  TwChipItem,
  TwChipList,
  TwDateRangePicker,
  TwIcon,
  TwInputField,
  TwMaskedInput,
  TwSwitch,
} from 'ngx-tw';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  standalone: true,
  imports: [
    TwIcon,
    TwInputField,
    TwButton,
    TwMaskedInput,
    TwSwitch,
    TwChip,
    TwChipList,
    FormsModule,
    ReactiveFormsModule,
    TwAutocomplete,
    TwChipItem,
    TwDateRangePicker,
    TwCalendar,
  ],
})
export class InputsComponent {
  form = new FormGroup({
    nameClassic: new FormControl('', []),
    nameIconPrefix: new FormControl('', []),
    nameIconPrefixSuffix: new FormControl('', []),
    description: new FormControl('', []),
    runCycle: new FormControl(false, []),
    phoneNumber: new FormControl('', []),
    dateMMYYYY: new FormControl('', []),
    dateDDMMYYYY: new FormControl('', [])
  });
  
  // Mask configurations
  phoneMask = {
    mask: '(999) 999-9999',
    guide: true,
    placeholderChar: '_',
    showMask: true
  };
  
  dateMMYYYYMask = {
    mask: '99/9999',
    guide: true,
    placeholderChar: '_',
    showMask: true
  };
  
  dateDDMMYYYYMask = {
    mask: '99-99-9999',
    guide: true,
    placeholderChar: '_',
    showMask: true
  };
  
  validateDate = (value: string): boolean | string => {
    if (!value || value.length < 10) return true; // Allow incomplete input
    
    // Extract day, month, year
    const parts = value.split('-');
    if (parts.length !== 3) return 'Invalid date format';
    
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    
    // Basic validation
    if (isNaN(day) || isNaN(month) || isNaN(year)) return 'Date contains non-numeric values';
    if (month < 1 || month > 12) return 'Month must be between 1 and 12';
    if (day < 1 || day > 31) return 'Day must be between 1 and 31';
    
    // Check days in month
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day > daysInMonth) return `Invalid day for month ${month}`;
    
    return true;
  };

  chips = [
    {
      label: 'Mark',
      image:
        'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
      isDeletable: true,
    },
    {
      label: 'Mark',
      image:
        'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
      isDeletable: true,
    },
    {
      label: 'Mark zuck',
      isDeletable: true,
    },
    {
      label: 'Mark',
      image:
        'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
      isDeletable: true,
    },
  ];

  chips2 = [...this.chips];

  suggestionKeyFactory = (item: any) => ({ key: item.id, value: item.name });

  customFilter = (value: string, item: any) => {
    return item.name.toLowerCase().includes(value.toLowerCase());
  };

  onSelectionChange(selectedItems: any[]) {
    console.log('Selected items:', selectedItems);
  }
}
