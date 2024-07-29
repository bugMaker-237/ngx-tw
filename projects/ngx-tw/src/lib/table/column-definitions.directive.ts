import { ContentChild, Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[twHeaderCellDef]',
  standalone: true,
})
export class TwHeaderCellDefDirective {
  constructor(public template: TemplateRef<any>) {}
}

@Directive({
  selector: '[twCellDef]',
  standalone: true,
})
export class TwCellDefDirective<T> {
  constructor(public template: TemplateRef<T>) {}
}

@Directive({
  selector: '[twRowDef]',
  standalone: true,
})
export class TwRowDefDirective<T> {
  @Input({ alias: 'twRowDefDisplayColumns', required: true })
  displayColumns!: string[];
  @Input({ alias: 'twRowDefLink' }) getLink?: (row: T) => string[];
  constructor(public template: TemplateRef<T>) {}
}

@Directive({
  selector: '[twColumnDef]',
  standalone: true,
})
export class TwColumnDefDirective<T> {
  @Input({ alias: 'twColumnDef', required: true }) name!: string;
  @ContentChild(TwHeaderCellDefDirective)
  headerCellDef?: TwHeaderCellDefDirective;
  @ContentChild(TwCellDefDirective)
  cellDef?: TwCellDefDirective<T | { $implicit: T }>;
}

export const TwTableColumnRowDefinitions = [
  TwColumnDefDirective,
  TwHeaderCellDefDirective,
  TwCellDefDirective,
  TwRowDefDirective,
];
