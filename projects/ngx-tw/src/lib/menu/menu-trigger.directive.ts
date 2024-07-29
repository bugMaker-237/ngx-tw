import { CdkMenuTrigger } from '@angular/cdk/menu';
import { ConnectedPosition } from '@angular/cdk/overlay';
import {
  ChangeDetectorRef,
  Directive,
  HostListener,
  Input,
} from '@angular/core';
import { TwMenu } from './menu.component';

type TwMenuTriggerPositions =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'center';
@Directive({
  selector: '[twMenuTriggerFor]',
  standalone: true,
  providers: [],
})
export class TwMenuTriggerDirective extends CdkMenuTrigger {
  constructor(private readonly _cd: ChangeDetectorRef) {
    super();
  }
  @Input('twMenuTriggerFor') menu!: TwMenu;

  @Input() set position(value: TwMenuTriggerPositions) {
    this.menuPosition = this._getPosition(value);
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    console.log('clicking');
    event.stopPropagation();
  }

  ngAfterContentInit(): void {
    if (this.menu?.menuTemplate && !this.menuTemplateRef)
      this.menuTemplateRef = this.menu.menuTemplate;
    this._cd.detectChanges();
  }
  private _getPosition(value: TwMenuTriggerPositions): ConnectedPosition[] {
    switch (value) {
      case 'top-left':
        return [
          {
            originX: 'end',
            originY: 'top',
            overlayX: 'end',
            overlayY: 'bottom',
          },
        ];
      case 'top-right':
        return [
          {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'bottom',
          },
        ];
      case 'bottom-left':
        return [
          {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top',
          },
        ];
      case 'bottom-right':
        return [
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
          },
        ];
      case 'center':
        return [
          {
            originX: 'center',
            originY: 'center',
            overlayX: 'center',
            overlayY: 'center',
          },
        ];
      default:
        return [];
    }
  }
}
