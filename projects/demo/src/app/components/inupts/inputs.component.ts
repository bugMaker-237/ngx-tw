import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  TwButton,
  TwChip,
  TwChipList,
  TwIcon,
  TwInputField,
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
    TwInputField,
    TwSwitch,
    TwChip,
    TwChipList,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class InputsComponent {
  form = new FormGroup({
    nameClassic: new FormControl('', []),
    nameIconPrefix: new FormControl('', []),
    nameIconPrefixSuffix: new FormControl('', []),
    description: new FormControl('', []),
    runCycle: new FormControl(false, []),
  });

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
}
