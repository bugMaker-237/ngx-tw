import { CdkConnectedOverlay, ConnectedPosition } from '@angular/cdk/overlay';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CdkConnectedOverlay],
  selector: '<o-autocomplete></o-autocomplete>',
  template: `
    <div class="relative w-full max-w-sm">
      <input
        #inputRef
        type="text"
        [formControl]="inputControl"
        class="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type to search..."
        (focus)="showDropdown = filteredSuggestions.length > 0"
      />

      <ng-template
        cdk-connected-overlay
        [cdkConnectedOverlayOrigin]="inputRef"
        [cdkConnectedOverlayOpen]="showDropdown"
        [cdkConnectedOverlayHasBackdrop]="true"
        [cdkConnectedOverlayBackdropClass]="'cdk-overlay-transparent-backdrop'"
        (backdropClick)="close()"
        [cdkConnectedOverlayPositions]="positions"
      >
        <ul
          [style.width]="inputRef.offsetWidth + 'px'"
          class="z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          @for (suggestion of filteredSuggestions; track $index) {
          <li
            (click)="selectSuggestion(suggestion)"
            class="px-4 py-2 cursor-pointer hover:bg-blue-100"
          >
            {{ suggestion }}
          </li>
          }
        </ul>
      </ng-template>
    </div>
  `,
})
export class AutocompleteComponent {
  public positions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: 8,
    },
    {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top',
      offsetY: 8,
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetY: -8,
    },
    {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom',
      offsetY: -8,
    },
  ];

  @Input() suggestions: string[] = [];
  inputControl = new FormControl('');
  filteredSuggestions: string[] = [];
  showDropdown = false;

  @ViewChild('inputRef', { static: true }) inputRef!: ElementRef;

  constructor() {
    this.inputControl.valueChanges.subscribe((value) => {
      const input = value?.toLowerCase() || '';
      this.filteredSuggestions = this.suggestions.filter((s) =>
        s.toLowerCase().includes(input)
      );
      this.showDropdown = !!input && this.filteredSuggestions.length > 0;
    });
  }

  selectSuggestion(suggestion: string) {
    this.inputControl.setValue(suggestion);
    this.showDropdown = false;
  }

  close() {
    this.showDropdown = false;
  }
}
