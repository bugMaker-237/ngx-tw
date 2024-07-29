import {
  Dialog as CdkDialog,
  DIALOG_DATA,
  DialogConfig,
  DialogRef,
} from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';

export { DIALOG_DATA, DialogRef };

@Injectable({
  providedIn: 'root',
})
export class TwDialog {
  constructor(private readonly _dialog: CdkDialog) {}

  open<R = unknown, C = unknown, D = unknown>(
    component: ComponentType<C>,
    dialogConfig: DialogConfig<D, DialogRef<R, C>> = {}
  ) {
    const config = {
      minWidth: '250px',
      backdropClass: 'acrylic-backdrop',
      panelClass: ['shadow-2xl', 'rounded-2xl'],
      ...dialogConfig,
    };
    return this._dialog.open(component, config).closed;
  }
}
