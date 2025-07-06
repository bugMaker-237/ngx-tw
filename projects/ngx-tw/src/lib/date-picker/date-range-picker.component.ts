import {
  BlockScrollStrategy,
  CdkConnectedOverlay,
  Overlay,
} from '@angular/cdk/overlay';
import { CommonModule, NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { TwButton } from '../button/button.component';
import { TwCalendar } from '../calendar/calendar.component';
import { TwIcon } from '../icon/icon.component';
import { MaskConfig } from '../input-field/masked-input-field-interface';
import { TwMaskedInput } from '../input-field/masked-input.component';
import { OverlayPositions } from '../TwElement';

export interface DateRange {
  start: Date;
  end: Date | null;
  preset?: string; // Optional preset ID
}

@Component({
  selector: 'tw-date-range-picker',
  standalone: true,
  templateUrl: 'date-range-picker.component.html',
  imports: [
    TwButton,
    CommonModule,
    TwCalendar,
    FormsModule,
    ReactiveFormsModule,
    CdkConnectedOverlay,
    NgClass,
    TwIcon,
    TwMaskedInput,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TwDateRangePicker),
      multi: true,
    },
  ],
})
export class TwDateRangePicker implements OnInit, ControlValueAccessor {
  @Input() isOpen = false;
  @Input() startDate: Date | null = null;
  @Input() endDate: Date | null = null;
  @Input() minDate: Date | null = null;
  @Input() maxDate: Date | null = (() => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return today;
  })(); // Default max date to today at 11:59 PM

  @Input() disabled = false;

  // Flag to check if in mobile view
  isMobileView = false;

  @Output() rangeSelected = new EventEmitter<DateRange>();
  @Output() openChanged = new EventEmitter<boolean>();

  selectedRange: DateRange = {
    start: new Date(),
    end: new Date(),
  };

  // For FormControl tracking
  private originalRange: DateRange = {
    start: new Date(),
    end: new Date(),
  };

  // For two-way binding with the masked inputs
  startDateModel: string = '';
  endDateModel: string = '';

  selectedPreset: string = 'custom';

  // Calendar display dates (for the two calendars)
  leftCalendarDate = new Date();
  rightCalendarDate = new Date();

  // Mask configuration for date inputs
  dateMaskConfig: MaskConfig = {
    mask: '99 / 99 / 9999',
    guide: true,
    placeholderChar: '_',
    showMask: false,
  };

  presets = [
    { id: 'today', label: 'Today' },
    { id: 'last7days', label: 'Last 7 days' },
    { id: 'last4weeks', label: 'Last 4 weeks' },
    { id: 'last3months', label: 'Last 3 months' },
    { id: 'last12months', label: 'Last 12 months' },
    { id: 'monthToDate', label: 'Month to date' },
    { id: 'quarterToDate', label: 'Quarter to date' },
    { id: 'yearToDate', label: 'Year to date' },
    { id: 'allTime', label: 'All time' },
  ];

  positions = OverlayPositions;
  blockScrollStrategy: BlockScrollStrategy;

  get isValid() {
    return (
      this.checkDateInterval(this.selectedRange.start) === true &&
      this.selectedRange.end &&
      this.checkDateInterval(this.selectedRange.end) === true &&
      this.selectedRange.end >= this.selectedRange.start
    );
  }

  // ControlValueAccessor methods
  onChange: (value: DateRange) => void = () => {};
  onTouched: () => void = () => {};

  constructor(public elementRef: ElementRef, overlay: Overlay) {
    this.blockScrollStrategy = overlay.scrollStrategies.block();
  }

  ngOnInit() {
    // Set default values
    if (this.startDate) {
      this.selectedRange.start = new Date(this.startDate);
      this.originalRange.start = new Date(this.startDate);
    }

    if (this.endDate) {
      this.selectedRange.end = new Date(this.endDate);
      this.originalRange.end = new Date(this.endDate);
    } else if (this.startDate) {
      this.selectedRange.end = new Date(this.startDate);
      this.originalRange.end = new Date(this.startDate);
    }

    // Setup calendar months - current month on the right
    const today = new Date();

    // Right calendar shows current month
    this.rightCalendarDate = new Date(today);

    // Left calendar shows previous month
    this.leftCalendarDate = new Date(today);
    this.leftCalendarDate.setMonth(this.leftCalendarDate.getMonth() - 1);

    // Check if we're on mobile
    this.checkMobileView();

    // Initialize the model values for the masked inputs
    this.startDateModel = this.formatDateForInput(this.selectedRange.start);
    this.endDateModel = this.formatDateForInput(this.selectedRange.end);

    // Add resize event listener to detect mobile/desktop changes
    window.addEventListener('resize', () => {
      this.checkMobileView();
    });
  }

  // Determine if we're in mobile view based on screen width
  checkMobileView(): void {
    this.isMobileView = window.innerWidth < 768; // 768px is standard md breakpoint in Tailwind
  } // ControlValueAccessor methods implementation
  writeValue(value: DateRange | null): void {
    if (value) {
      this.selectedRange = {
        start: value.start ? new Date(value.start) : new Date(),
        end: value.end ? new Date(value.end) : new Date(),
        preset: value.preset,
      };
      this.originalRange = {
        start: value.start ? new Date(value.start) : new Date(),
        end: value.end ? new Date(value.end) : new Date(),
        preset: value.preset,
      };

      // If a preset was provided, update the selectedPreset
      if (value.preset) {
        this.selectedPreset = value.preset;
      }

      // Update calendar dates based on the selected range
      if (value.start) {
        this.leftCalendarDate = new Date(value.start);
        this.leftCalendarDate.setMonth(this.leftCalendarDate.getMonth() - 1);
      }

      if (value.end) {
        this.rightCalendarDate = new Date(value.end);
      }
    }
  }

  registerOnChange(fn: (value: DateRange) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggleOpen(): void {
    if (this.disabled) return;

    this.isOpen = !this.isOpen;
    this.openChanged.emit(this.isOpen);

    if (this.isOpen) {
      this.onTouched();
    }
  }

  closeDropdown(): void {
    if (!this.isValid) {
      this.cancelSelection();
    }
    this.isOpen = false;
    this.openChanged.emit(this.isOpen);
  }

  onRangeSelected(range: { start: Date; end: Date | null }): void {
    this.selectedRange = { ...range, preset: 'custom' };
    this.selectedPreset = 'custom';

    // Update model values
    this.startDateModel = this.formatDateForInput(this.selectedRange.start);
    this.endDateModel = this.formatDateForInput(this.selectedRange.end);
  }

  // Update left calendar when right calendar changes
  onRightCalendarChange(date: Date): void {
    this.rightCalendarDate = date;
  }

  // Update right calendar when left calendar changes
  onLeftCalendarChange(date: Date): void {
    this.leftCalendarDate = date;
  }

  selectPreset(presetId: string): void {
    this.selectedPreset = presetId;

    const today = new Date();
    const start = new Date();
    const end = new Date();

    switch (presetId) {
      case 'today':
        this.selectedRange = { start: today, end: today, preset: presetId };
        break;
      case 'last7days':
        start.setDate(today.getDate() - 6);
        this.selectedRange = { start, end: today, preset: presetId };
        break;
      case 'last4weeks':
        start.setDate(today.getDate() - 27);
        this.selectedRange = { start, end: today, preset: presetId };
        break;
      case 'last3months':
        start.setMonth(today.getMonth() - 3);
        this.selectedRange = { start, end: today, preset: presetId };
        break;
      case 'last12months':
        start.setFullYear(today.getFullYear() - 1);
        this.selectedRange = { start, end: today, preset: presetId };
        break;
      case 'monthToDate':
        start.setDate(1);
        this.selectedRange = { start, end: today, preset: presetId };
        break;
      case 'quarterToDate':
        const quarterMonth = Math.floor(today.getMonth() / 3) * 3;
        start.setMonth(quarterMonth);
        start.setDate(1);
        this.selectedRange = { start, end: today, preset: presetId };
        break;
      case 'yearToDate':
        start.setMonth(0);
        start.setDate(1);
        this.selectedRange = { start, end: today, preset: presetId };
        break;
      case 'allTime':
        start.setFullYear(2000); // Example for "all time"
        this.selectedRange = { start, end: today, preset: presetId };
        break;
    }

    // Update calendars based on the selected range
    this.leftCalendarDate = new Date(this.selectedRange.start);
    this.rightCalendarDate = new Date(
      this.selectedRange.end || this.selectedRange.start
    );

    // Update model values for inputs
    this.startDateModel = this.formatDateForInput(this.selectedRange.start);
    this.endDateModel = this.formatDateForInput(this.selectedRange.end);
  }

  applySelection(): void {
    if (this.selectedRange.start && this.selectedRange.end) {
      // Save the original range for potential reset
      this.originalRange = {
        start: new Date(this.selectedRange.start),
        end: this.selectedRange.end ? new Date(this.selectedRange.end) : null,
      };

      // Also preserve the selected preset
      const previousPreset = this.selectedPreset;

      // Emit event for the parent component
      this.rangeSelected.emit(this.selectedRange);

      // Update form control value
      this.onChange(this.selectedRange);
      this.onTouched();

      // Update model values for inputs
      this.startDateModel = this.formatDateForInput(this.selectedRange.start);
      this.endDateModel = this.formatDateForInput(this.selectedRange.end);

      // Make sure the preset is preserved after closing
      this.selectedPreset = previousPreset;

      this.closeDropdown();
    }
  }

  cancelSelection(): void {
    // Reset to original values without applying changes
    this.selectedRange = {
      start: new Date(this.originalRange.start),
      end: this.originalRange.end ? new Date(this.originalRange.end) : null,
    };
    this.startDateModel = this.formatDateForInput(this.selectedRange.start);
    this.endDateModel = this.formatDateForInput(this.selectedRange.end);

    // Reset preset to original value
    this.selectedPreset = this.originalRange.preset || 'custom';

    // Emit change event with the original range
    this.onChange(this.selectedRange);
    this.rangeSelected.emit(this.selectedRange);
  }

  formatDate(date: Date | null): string {
    if (!date) return '';

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  }

  formatDateRangeDisplay(): string {
    // If a preset is selected (and not custom), show the preset label instead
    if (this.selectedPreset !== 'custom') {
      const preset = this.presets.find((p) => p.id === this.selectedPreset);
      if (preset) {
        return preset.label;
      }
    }

    // Otherwise, format and show the date range
    if (!this.selectedRange.start) return '';

    const start = this.formatDate(this.selectedRange.start);
    const end = this.selectedRange.end
      ? this.formatDate(this.selectedRange.end)
      : '';

    return end ? `${start} → ${end}` : start;
  }

  // Parse input date string to Date object
  parseInputDate(dateStr: string): Date | null {
    if (!dateStr) return null;

    // Clean the input - remove any non-numeric characters except for slashes
    const cleanInput = dateStr.replace(/[^\d\/]/g, '');

    // Try to parse DD / MM / YYYY format
    const parts = cleanInput.split('/');

    if (parts.length === 3) {
      const day = parseInt(parts[0].trim(), 10);
      const month = parseInt(parts[1].trim(), 10) - 1; // Month is 0-indexed
      const year = parseInt(parts[2].trim(), 10);

      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        const date = new Date(year, month, day);

        // Check if the date is valid
        if (
          date.getFullYear() === year &&
          date.getMonth() === month &&
          date.getDate() === day
        ) {
          return date;
        }
      }
    }

    return null;
  }

  // Validator for the date input mask
  validateDate =
    (dateType: 'start' | 'end') =>
    (value: string): boolean | string => {
      if (!value || value.length < 10) return true; // Allow incomplete input

      const date = this.parseInputDate(value);

      if (!date) return 'Invalid date format';

      const dateIntervalCheckResult = this.checkDateInterval(date);

      if (typeof dateIntervalCheckResult === 'string') {
        return dateIntervalCheckResult;
      }

      // Make sure end date is not before start date
      if (
        dateType === 'end' &&
        this.selectedRange.start &&
        date < this.selectedRange.start
      ) {
        return 'End date cannot be before start date';
      }

      return true;
    };

  checkDateInterval(date: Date) {
    // Check min date
    if (this.minDate && date < this.minDate) {
      return `Date cannot be before ${this.formatDateForInput(this.minDate)}`;
    }

    // Check max date
    if (this.maxDate && date > this.maxDate) {
      return `Date cannot be after ${this.formatDateForInput(this.maxDate)}`;
    }

    return true;
  }

  // Handle manual input of start date
  onStartDateInput(value: string): void {
    const date = this.parseInputDate(value);

    if (date) {
      // Update the start date
      this.selectedRange.start = date;

      // If end date is before start date, adjust it
      if (this.selectedRange.end && this.selectedRange.end < date) {
        this.selectedRange.end = new Date(date);
      }

      // Set to custom preset
      this.selectedPreset = 'custom';

      // Emit change
      this.onChange(this.selectedRange);
      this.rangeSelected.emit(this.selectedRange);
    }
  }

  // Handle manual input of end date
  onEndDateInput(value: string): void {
    const date = this.parseInputDate(value);

    if (date) {
      // Update the end date
      this.selectedRange.end = date;

      // Set to custom preset
      this.selectedPreset = 'custom';

      // Emit change
      this.onChange(this.selectedRange);
      this.rangeSelected.emit(this.selectedRange);
    }
  }

  // Format date for input fields
  formatDateForInput(date: Date | null): string {
    if (!date) return '';

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day} / ${month} / ${year}`;
  }
}
