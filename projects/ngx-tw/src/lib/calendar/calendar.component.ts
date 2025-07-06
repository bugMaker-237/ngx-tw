import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TwButtonIcon } from '../button/button-icon.component';

export interface CalendarDate {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isInRange: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isDisabled: boolean;
}

@Component({
  selector: 'tw-calendar',
  templateUrl: './calendar.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, TwButtonIcon],
})
export class TwCalendar implements OnInit, OnChanges {
  @Input() selectedDate: Date | null = null;
  @Input() rangeStart: Date | null = null;
  @Input() rangeEnd: Date | null = null;
  @Input() minDate: Date | null = null;
  @Input() maxDate: Date | null = null;
  @Input() isRange = false;
  @Input() displayDate: Date = new Date();

  @Output() dateSelected = new EventEmitter<Date>();
  @Output() rangeSelected = new EventEmitter<{
    start: Date;
    end: Date | null;
  }>();

  currentDate = new Date();
  calendarDates: CalendarDate[] = [];

  viewMode: 'days' | 'months' | 'years' = 'days';
  years: number[] = [];
  yearRangeStart = 0;

  weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  months = [
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

  get currentMonthName(): string {
    return this.months[this.displayDate.getMonth()];
  }

  get currentYear(): number {
    return this.displayDate.getFullYear();
  }

  ngOnInit(): void {
    if (this.selectedDate && !this.displayDate) {
      this.displayDate = new Date(this.selectedDate);
    }
    this.generateCalendarDates();
    this.generateYearRange();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['displayDate'] && !changes['displayDate'].firstChange) {
      this.generateCalendarDates();
    }

    if (
      (changes['rangeStart'] || changes['rangeEnd']) &&
      (!changes['rangeStart']?.firstChange || !changes['rangeEnd']?.firstChange)
    ) {
      this.generateCalendarDates();
    }
  }

  generateCalendarDates(): void {
    this.calendarDates = [];

    const year = this.displayDate.getFullYear();
    const month = this.displayDate.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);

    // Get day of week for first day (0 is Sunday in JS)
    let firstDayOfWeek = firstDay.getDay();
    // Convert to Monday-based (0 is Monday)
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    // Fill in days from previous month
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthLastDay - i);
      this.calendarDates.push(this.createCalendarDate(date, false));
    }

    // Fill in days of current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      this.calendarDates.push(this.createCalendarDate(date, true));
    }

    // Fill in days from next month
    const remainingDays = 42 - this.calendarDates.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      this.calendarDates.push(this.createCalendarDate(date, false));
    }
  }

  createCalendarDate(date: Date, isCurrentMonth: boolean): CalendarDate {
    const today = new Date();
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    let isInRange = false;
    let isRangeStart = false;
    let isRangeEnd = false;

    // Handle range selection - even when end date is not selected yet
    if (this.isRange && this.rangeStart) {
      if (this.rangeEnd) {
        // Complete range
        isInRange = date >= this.rangeStart && date <= this.rangeEnd;
        isRangeStart =
          date.getTime() === this.getStartOfDay(this.rangeStart).getTime();
        isRangeEnd =
          date.getTime() === this.getStartOfDay(this.rangeEnd).getTime();
      } else {
        // Only start date selected - highlight it
        isRangeStart =
          date.getTime() === this.getStartOfDay(this.rangeStart).getTime();
        isInRange = isRangeStart; // Make sure it's highlighted
      }
    }

    const isSelected = this.selectedDate
      ? date.getTime() === this.getStartOfDay(this.selectedDate).getTime()
      : false;

    const isDisabled = this.isDateDisabled(date);

    return {
      date,
      isCurrentMonth,
      isToday,
      isSelected,
      isInRange,
      isRangeStart,
      isRangeEnd,
      isDisabled,
    };
  }

  isDateDisabled(date: Date): boolean {
    if (this.minDate && date < this.getStartOfDay(this.minDate)) {
      return true;
    }
    if (this.maxDate && date > this.getEndOfDay(this.maxDate)) {
      return true;
    }
    return false;
  }

  getStartOfDay(date: Date): Date {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
  }

  getEndOfDay(date: Date): Date {
    const newDate = new Date(date);
    newDate.setHours(23, 59, 59, 999);
    return newDate;
  }

  selectDate(date: CalendarDate): void {
    if (date.isDisabled) {
      return;
    }

    if (!this.isRange) {
      this.selectedDate = new Date(date.date);
      this.dateSelected.emit(this.selectedDate);
      date.isSelected = true;
      this.unSelectAllOtherDates(date);
      return;
    }

    // Range selection logic
    if (!this.rangeStart || (this.rangeStart && this.rangeEnd)) {
      // Start new range
      this.rangeStart = new Date(date.date);
      this.rangeEnd = null;
      // Emit the event for the start date
      this.rangeSelected.emit({
        start: this.rangeStart,
        end: this.rangeEnd,
      });
    } else {
      // Complete the range
      if (date.date < this.rangeStart) {
        this.rangeEnd = new Date(this.rangeStart);
        this.rangeStart = new Date(date.date);
      } else {
        this.rangeEnd = new Date(date.date);
      }

      if (this.rangeStart && this.rangeEnd) {
        this.rangeSelected.emit({
          start: this.rangeStart,
          end: this.rangeEnd,
        });
      }
    }

    // Always emit the selected date (for calendar month navigation)
    this.dateSelected.emit(date.date);

    this.generateCalendarDates();
  }

  unSelectAllOtherDates(date: CalendarDate) {
    this.calendarDates.forEach((d) => {
      if (d !== date) {
        d.isSelected = false;
        d.isInRange = false;
        d.isRangeStart = false;
        d.isRangeEnd = false;
      }
    });
  }

  changeMonth(delta: number): void {
    this.displayDate.setMonth(this.displayDate.getMonth() + delta);
    this.generateCalendarDates();
    this.dateSelected.emit(new Date(this.displayDate));
  }

  changeYear(delta: number): void {
    this.displayDate.setFullYear(this.displayDate.getFullYear() + delta);
    this.generateCalendarDates();
    this.generateYearRange();
    this.dateSelected.emit(new Date(this.displayDate));
  }

  switchView(mode: 'days' | 'months' | 'years'): void {
    this.viewMode = mode;
    if (mode === 'years') {
      this.generateYearRange();
    }
  }

  generateYearRange(): void {
    const currentYear = this.displayDate.getFullYear();
    this.yearRangeStart = Math.floor(currentYear / 10) * 10;

    this.years = [];
    for (let i = 0; i < 12; i++) {
      this.years.push(this.yearRangeStart + i);
    }
  }

  isYearDisabled(year: number): boolean {
    if (!this.minDate && !this.maxDate) {
      return false;
    }

    // Check if the entire year is before minDate
    if (this.minDate && year < this.minDate.getFullYear()) {
      return true;
    }

    // Check if the entire year is after maxDate
    if (this.maxDate && year > this.maxDate.getFullYear()) {
      return true;
    }

    return false;
  }

  isMonthDisabled(monthIndex: number): boolean {
    if (!this.minDate && !this.maxDate) {
      return false;
    }

    const year = this.displayDate.getFullYear();

    // Create date for first day of the month
    const firstDayOfMonth = new Date(year, monthIndex, 1);
    // Create date for last day of the month
    const lastDayOfMonth = new Date(year, monthIndex + 1, 0);

    // Check if the entire month is before minDate
    if (this.minDate && lastDayOfMonth < this.getStartOfDay(this.minDate)) {
      return true;
    }

    // Check if the entire month is after maxDate
    if (this.maxDate && firstDayOfMonth > this.getEndOfDay(this.maxDate)) {
      return true;
    }

    return false;
  }

  selectMonth(monthIndex: number): void {
    this.displayDate.setMonth(monthIndex);
    this.viewMode = 'days';
    this.generateCalendarDates();
    this.dateSelected.emit(new Date(this.displayDate));
  }

  selectYear(year: number): void {
    this.displayDate.setFullYear(year);
    this.viewMode = 'months';
    this.generateCalendarDates();
    this.dateSelected.emit(new Date(this.displayDate));
  }

  changeYearRange(delta: number): void {
    this.yearRangeStart += delta * 10;
    this.generateYearRange();
  }

  // Check if previous month button should be disabled
  isPrevMonthDisabled(): boolean {
    if (!this.minDate) {
      return false;
    }

    // Create a copy of current display date set to first day of month
    const firstDayOfCurrentMonth = new Date(
      this.displayDate.getFullYear(),
      this.displayDate.getMonth(),
      1
    );

    // Previous month would be last day of previous month
    const lastDayOfPrevMonth = new Date(
      this.displayDate.getFullYear(),
      this.displayDate.getMonth(),
      0
    );

    // If the last day of previous month is before minDate, disable button
    return lastDayOfPrevMonth < this.getStartOfDay(this.minDate);
  }

  // Check if next month button should be disabled
  isNextMonthDisabled(): boolean {
    if (!this.maxDate) {
      return false;
    }

    // First day of next month
    const firstDayOfNextMonth = new Date(
      this.displayDate.getFullYear(),
      this.displayDate.getMonth() + 1,
      1
    );

    // If the first day of next month is after maxDate, disable button
    return firstDayOfNextMonth > this.getEndOfDay(this.maxDate);
  }

  // Check if previous year button should be disabled
  isPrevYearDisabled(): boolean {
    if (!this.minDate) {
      return false;
    }

    // First day of current year
    const firstDayOfCurrentYear = new Date(
      this.displayDate.getFullYear(),
      0,
      1
    );

    // Last day of previous year
    const lastDayOfPrevYear = new Date(
      this.displayDate.getFullYear() - 1,
      11,
      31
    );

    // If the last day of previous year is before minDate, disable button
    return lastDayOfPrevYear < this.getStartOfDay(this.minDate);
  }

  // Check if next year button should be disabled
  isNextYearDisabled(): boolean {
    if (!this.maxDate) {
      return false;
    }

    // First day of next year
    const firstDayOfNextYear = new Date(
      this.displayDate.getFullYear() + 1,
      0,
      1
    );

    // If the first day of next year is after maxDate, disable button
    return firstDayOfNextYear > this.getEndOfDay(this.maxDate);
  }

  // Check if previous year range button should be disabled
  isPrevYearRangeDisabled(): boolean {
    if (!this.minDate) {
      return false;
    }

    // Last year of previous decade
    const lastYearOfPrevDecade = this.yearRangeStart - 1;
    const lastDayOfLastYearPrevDecade = new Date(lastYearOfPrevDecade, 11, 31);

    return lastDayOfLastYearPrevDecade < this.getStartOfDay(this.minDate);
  }

  // Check if next year range button should be disabled
  isNextYearRangeDisabled(): boolean {
    if (!this.maxDate) {
      return false;
    }

    // First year of next decade
    const firstYearOfNextDecade = this.yearRangeStart + 12;
    const firstDayOfFirstYearNextDecade = new Date(firstYearOfNextDecade, 0, 1);

    return firstDayOfFirstYearNextDecade > this.getEndOfDay(this.maxDate);
  }
}
