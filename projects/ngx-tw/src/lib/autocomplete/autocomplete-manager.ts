import {
  debounceTime,
  filter,
  isObservable,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';

export type SuggestionsType<T> =
  | T[]
  | Observable<T[]>
  | ((searchTerm: string, item?: T) => Observable<T[]>)
  | ((searchTerm: string, item?: T) => T[]);

function isFunction(value: any): value is (...args: any[]) => any {
  return typeof value === 'function';
}

export class AutoCompleteManager<T> {
  filteredSuggestions: T[] = [];
  filterFn: (value: string, item: T) => boolean = (value: string, item: T) =>
    this.getDisplayText(item).toLowerCase().includes(value.toLowerCase());

  displayFactory: ((item: T) => { key: string; text: string }) | undefined =
    void 0;

  isOpen = false;

  disabled = false;

  suggestionsLoading = false;

  private _suggestions: SuggestionsType<T> = [];

  set suggestions(value: SuggestionsType<T>) {
    this._suggestions = value;
  }

  get suggestions() {
    return this._suggestions;
  }

  constructor(private valueChangeObservable: Observable<string | null>) {}

  init(): void {
    this.valueChangeObservable
      .pipe(
        debounceTime(300),
        tap((v) => (v?.length === 0 ? this.closeDropdown() : void 0)),
        filter((value) => !!value && value.length >= 1),
        tap(() => ((this.suggestionsLoading = true), this.openDropdown())),
        switchMap((value) => this.filterSuggestions(value!))
      )
      .subscribe((filtered) => {
        this.suggestionsLoading = false;
        this.filteredSuggestions = filtered;
      });
  }

  filterSuggestions(value: string): Observable<T[]> {
    const filterObs = (obs: Observable<T[]>) =>
      obs.pipe(
        map((suggestions) => suggestions.filter((s) => this.filterFn(value, s)))
      );

    const resolveObs = (fn: (searchTerm: string) => Observable<T[]> | T[]) => {
      const result = fn(value);
      return isObservable(result) ? result : of(result);
    };

    const suggestionsArray$ = isObservable(this._suggestions)
      ? filterObs(this._suggestions)
      : isFunction(this._suggestions)
      ? resolveObs(this._suggestions)
      : of(this._suggestions.filter((s) => this.filterFn(value, s)));

    return suggestionsArray$;
  }

  getDisplayText(item: any): string {
    if (this.displayFactory) {
      return this.displayFactory(item).text;
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
