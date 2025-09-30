import { OverlayRef } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TwNotification } from '../notification/notification.service';
import { AlertType, IAlert } from './alert';

@Injectable({
  providedIn: 'root',
})
/** @deprecated This service is deprecated use TwNotification */
export class TwAlertService {
  private _alert$ = new BehaviorSubject<IAlert | null>(null);
  private _alertsContainerOverlay?: OverlayRef;

  constructor(private readonly _twNotification: TwNotification) {}

  /**
   *
   * @deprecated This method is deprecated use TwNotification.show() instead
   */
  info({
    title,
    description = void 0,
    icon = null,
    iconColor = null,
    duration = 3000,
    showActions = false,
    primaryActionText = null,
    secondaryActionText = null,
  }: {
    title: string;
    description?: string;
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

  /**
   *
   * @deprecated This method is deprecated use TwNotification.show() instead
   */
  warning({
    title,
    description = void 0,
    icon = null,
    iconColor = null,
    duration = 3000,
    showActions = false,
    primaryActionText = null,
    secondaryActionText = null,
  }: {
    title: string;
    description?: string;
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

  /**
   *
   * @deprecated This method is deprecated use TwNotification.show() instead
   */
  error({
    title,
    description = void 0,
    icon = null,
    iconColor = null,
    duration = 3000,
    showActions = false,
    primaryActionText = null,
    secondaryActionText = null,
  }: {
    title: string;
    description?: string;
    icon?: string | null;
    iconColor?: string | null;
    duration?: number;
    showActions?: boolean;
    secondaryActionText?: string | null;
    primaryActionText?: string | null;
  }) {
    this.notify({
      title,
      type: 'danger',
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
    description = void 0,
    icon = null,
    iconColor = null,
    duration = 3000,
    showActions = false,
    primaryActionText = null,
    secondaryActionText = null,
  }: {
    title: string;
    type: AlertType;
    description?: string;
    icon?: string | null;
    iconColor?: string | null;
    duration?: number;
    showActions?: boolean;
    secondaryActionText?: string | null;
    primaryActionText?: string | null;
  }) {
    this._twNotification.show({
      title,
      type,
      text: description,
      autoCloseTimeout: duration,
    });
  }
}
