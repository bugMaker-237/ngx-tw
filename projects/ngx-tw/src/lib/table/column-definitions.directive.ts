import { ContentChild, Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[twHeaderCellDef]',
  standalone: true,
})
export class __TwHeaderCellDefDirective {
  constructor(public template: TemplateRef<any>) {}
}

@Directive({
  selector: '[twCellDef]',
  standalone: true,
})
export class __TwCellDefDirective<T> {
  constructor(public template: TemplateRef<T>) {}
}

@Directive({
  selector: '[twRowDef]',
  standalone: true,
})
export class __TwRowDefDirective {
  @Input({ alias: 'twRowDefDisplayColumns', required: true })
  displayColumns!: string[];
  @Input({ alias: 'twRowDefLink' }) getLink?: (row: any) => string[];
  constructor(public template: TemplateRef<any>) {}
}

@Directive({
  selector: '[twColumnDef]',
  standalone: true,
})
export class __TwColumnDefDirective {
  @Input({ alias: 'twColumnDef', required: true }) name!: string;
  @ContentChild(__TwHeaderCellDefDirective)
  headerCellDef?: __TwHeaderCellDefDirective;
  @ContentChild(__TwCellDefDirective)
  cellDef?: __TwCellDefDirective<any>;
}

export const TwTableColumnRowDefinitions = [
  __TwCellDefDirective,
  __TwColumnDefDirective,
  __TwHeaderCellDefDirective,
  __TwCellDefDirective,
  __TwRowDefDirective,
];
