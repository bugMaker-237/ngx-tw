import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AlertType, IAlert } from './alert';
import { TwAlerts } from './alerts.component';

@Injectable({
  providedIn: 'root',
})
export class TwAlertService {
  private _alert$ = new BehaviorSubject<IAlert | null>(null);
  private _alertsContainerOverlay?: OverlayRef;

  constructor(private readonly _overlay: Overlay) {}

  info({
    title,
    description = null,
    icon = null,
    iconColor = null,
    duration = 3000,
    showActions = false,
    primaryActionText = null,
    secondaryActionText = null,
  }: {
    title: string;
    description?: string | null;
    icon?: string | null;
    iconColor?: string | null;
    duration?: number;
    showActions?: boolean;
    secondaryActionText?: string | null;
    primaryActionText?: string | null;
  }) {
    this.notify({
      title,
      type: 'info',
      description,
      icon,
      iconColor,
      duration: duration,
      primaryActionText,
      secondaryActionText,
      showActions,
    });
  }
  warning({
    title,
    description = null,
    icon = null,
    iconColor = null,
    duration = 3000,
    showActions = false,
    primaryActionText = null,
    secondaryActionText = null,
  }: {
    title: string;
    description?: string | null;
    icon?: string | null;
    iconColor?: string | null;
    duration?: number;
    showActions?: boolean;
    secondaryActionText?: string | null;
    primaryActionText?: string | null;
  }) {
    this.notify({
      title,
      type: 'warning',
      description,
      icon,
      iconColor,
      duration: duration,
      primaryActionText,
      secondaryActionText,
      showActions,
    });
  }
  error({
    title,
    description = null,
    icon = null,
    iconColor = null,
    duration = 3000,
    showActions = false,
    primaryActionText = null,
    secondaryActionText = null,
  }: {
    title: string;
    description?: string | null;
    icon?: string | null;
    iconColor?: string | null;
    duration?: number;
    showActions?: boolean;
    secondaryActionText?: string | null;
    primaryActionText?: string | null;
  }) {
    this.notify({
      title,
      type: 'error',
      description,
      icon,
      iconColor,
      duration: duration,
      primaryActionText,
      secondaryActionText,
      showActions,
    });
  }
  private notify({
    title,
    type,
    description = null,
    icon = null,
    iconColor = null,
    duration = 3000,
    showActions = false,
    primaryActionText = null,
    secondaryActionText = null,
  }: {
    title: string;
    type: AlertType;
    description?: string | null;
    icon?: string | null;
    iconColor?: string | null;
    duration?: number;
    showActions?: boolean;
    secondaryActionText?: string | null;
    primaryActionText?: string | null;
  }) {
    this._createContainer();
    duration = !duration ? 3000 : duration;
    this._alert$.next({
      title,
      type: type,
      description,
      icon,
      iconColor,
      duration: duration,
      primaryActionText,
      secondaryActionText,
      showActions,
    } as IAlert);
  }
  private _createContainer() {
    if (!!this._alertsContainerOverlay) return;
    // Returns an OverlayRef (which is a PortalHost)
    this._alertsContainerOverlay = this._overlay.create({
      hasBackdrop: false,
      positionStrategy: this._overlay.position().global().end('0').top('0'),
      scrollStrategy: this._overlay.scrollStrategies.block(),
      panelClass: 'tw-alerts-overlayed-alert',
    });

    // Create ComponentPortal that can be attached to a PortalHost
    const filePreviewPortal = new ComponentPortal(TwAlerts);

    // Attach ComponentPortal to PortalHost
    this._alertsContainerOverlay.attach(filePreviewPortal);
  }

  clearContainer() {
    this._alertsContainerOverlay?.detach();
    this._alertsContainerOverlay?.dispose();
    this._alertsContainerOverlay = undefined;
  }

  get alerts() {
    return this._alert$.asObservable();
  }
}
