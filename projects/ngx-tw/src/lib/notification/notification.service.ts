import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Inject, Injectable, Injector, Optional } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  defaultTwNotificationConfig,
  TW_NOTIFICATION_CONFIG_TOKEN,
  TwNotificationConfig,
  TwNotificationData,
} from './notification-config';
import { TwNotificationRef } from './notification-ref';
import { NotificationComponent } from './notification.component';

@Injectable({
  providedIn: 'root',
})
export class TwNotification {
  private lastNotification!: TwNotificationRef;

  constructor(
    private overlay: Overlay,
    private parentInjector: Injector,
    @Optional()
    @Inject(TW_NOTIFICATION_CONFIG_TOKEN)
    private notificationConfig: TwNotificationConfig = defaultTwNotificationConfig
  ) {
    console.log(notificationConfig || defaultTwNotificationConfig);
    this.notificationConfig = notificationConfig || defaultTwNotificationConfig;

    console.log('TwNotification initialized', this.notificationConfig);
  }

  show(data: TwNotificationData) {
    const positionStrategy = this.getPositionStrategy();
    const overlayRef = this.overlay.create({ positionStrategy });

    const notificationRef = new TwNotificationRef(overlayRef);
    this.lastNotification = notificationRef;

    const injector = this.getInjector(
      data,
      notificationRef,
      this.parentInjector
    );
    const notificationPortal = new ComponentPortal(
      NotificationComponent,
      null,
      injector
    );

    overlayRef.attach(notificationPortal);

    return notificationRef;
  }

  getPositionStrategy() {
    return this.overlay
      .position()
      .global()
      .top(this.getPosition())
      .right(this.notificationConfig.position?.right + 'px');
  }

  getPosition() {
    console.log(defaultTwNotificationConfig, this.notificationConfig);
    const lastNotificationIsVisible =
      this.lastNotification && this.lastNotification.isVisible();
    const position = lastNotificationIsVisible
      ? this.lastNotification.getPosition().bottom
      : this.notificationConfig.position?.top;

    return position + 'px';
  }

  getInjector(
    data: TwNotificationData,
    notificationRef: TwNotificationRef,
    parentInjector: Injector
  ) {
    const tokens = new WeakMap();

    tokens.set(TwNotificationData, data);
    tokens.set(TwNotificationRef, notificationRef);

    return Injector.create({
      providers: [
        provideAnimations(),
        {
          provide: TW_NOTIFICATION_CONFIG_TOKEN,
          useValue: this.notificationConfig,

        },
        { provide: TwNotificationData, useValue: data },
        { provide: TwNotificationRef, useValue: notificationRef },
      ],
      parent: parentInjector,
    });
  }
}
