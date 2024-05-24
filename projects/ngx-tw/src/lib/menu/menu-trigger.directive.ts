import { CdkMenuTrigger } from '@angular/cdk/menu';
import { ChangeDetectorRef, Directive, Input } from '@angular/core';
import { TwMenuComponent } from './menu.component';

@Directive({
  selector: '[twMenuTriggerFor]',
  standalone: true,
  providers: [],
})
export class TwMenuTriggerDirective extends CdkMenuTrigger {
  constructor(private readonly _cd: ChangeDetectorRef) {
    super();
  }
  @Input('twMenuTriggerFor') menu!: TwMenuComponent;
  ngAfterContentInit(): void {
    if (this.menu?.menuTemplate && !this.menuTemplateRef)
      this.menuTemplateRef = this.menu.menuTemplate;
    this._cd.detectChanges();
  }
}
