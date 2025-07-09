import { filter, isObservable, map, Observable, of, tap } from 'rxjs';

export class AutoCompleteManager<T> {
  filteredSuggestions: T[] = [];
  filterFn: (value: string, item: T) => boolean = (value: string, item: T) =>
    this.getDisplayText(item).toLowerCase().includes(value.toLowerCase());

  keyFactory: ((item: T) => { key: string; value: string }) | undefined =
    void 0;

  isOpen = false;

  disabled = false;

  private _suggestions: T[] | Observable<T[]> = [];

  set suggestions(value: T[] | Observable<T[]>) {
    this._suggestions = value;
  }

  get suggestions() {
    return this._suggestions;
  }

  constructor(private valueChangeObservable: Observable<string>) {}

  init(): void {
    this.valueChangeObservable
      .pipe(
        tap((v) => (v.length === 0 ? this.closeDropdown() : void 0)),
        filter((value) => value.length >= 1),
        map((value) => this.filterSuggestions(value))
      )
      .subscribe((filtered) => {
        this.filteredSuggestions = filtered;
        this.openDropdown();
      });
  }

  filterSuggestions(value: string): T[] {
    const suggestionsArray$ = isObservable(this._suggestions)
      ? this._suggestions
      : of(this._suggestions || []);

    let filtered: T[] = [];

    suggestionsArray$.subscribe((suggestions) => {
      filtered = suggestions.filter((suggestion) =>
        this.filterFn(value, suggestion)
      );
    });

    return filtered;
  }

  getDisplayText(item: any): string {
    if (this.keyFactory) {
      return this.keyFactory(item).value;
    }
    return typeof item === 'string' ? item : JSON.stringify(item);
  }

  openDropdown() {
    if (this.disabled === true) return;

    this.isOpen = true;
  }

  closeDropdown() {
    this.isOpen = false;
  }

  selectSuggestion(suggestion: any) {
    if (!this.filteredSuggestions.find((item) => item === suggestion)) {
      return false;
    }
    this.closeDropdown();
    return true;
  }
}
