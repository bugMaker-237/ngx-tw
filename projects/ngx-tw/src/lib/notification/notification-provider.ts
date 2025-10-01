import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { defaultTwNotificationConfig, TW_NOTIFICATION_CONFIG_TOKEN } from './notification-config';

export function provideTwNotification(config = defaultTwNotificationConfig): Provider[] {
  return [
    {
      provide: TW_NOTIFICATION_CONFIG_TOKEN,
      useValue: { ...defaultTwNotificationConfig, ...config },
    }
  ];
}
