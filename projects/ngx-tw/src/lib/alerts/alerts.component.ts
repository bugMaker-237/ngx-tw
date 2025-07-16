import {
  ChangeDetectorRef,
  Component,
  EmbeddedViewRef,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Subscription, takeWhile } from 'rxjs';
import { TwButtonIcon } from '../button/button-icon.component';
import { TwButton } from '../button/button.component';
import { TwIcon } from '../icon/icon.component';
import { AlertType, IAlert } from './alert';
import { TwAlertService } from './alert.service';

@Component({
  selector: 'tw-alerts',
  imports: [TwIcon, TwButtonIcon, TwButton],
  templateUrl: './alerts.component.html',
  styles: `
    ::ng-deep :has(> .tw-alerts-overlayed-alert){
      z-index: 2000;
    }
  `,
})
export class TwAlerts implements OnInit {
  private static _notificationRef = 0;

  @ViewChild('alertsContainer', { static: true, read: ViewContainerRef })
  alertsContainer?: ViewContainerRef;
  @ViewChild('alertTemplate', { static: true, read: TemplateRef })
  alertTemplate?: TemplateRef<any>;

  private _subscribed: boolean = true;
  private _embeddedViewRefs: {
    ref: number;
    embeddedViewRef: EmbeddedViewRef<any>;
  }[] = [];
  private _subsciption$$?: Subscription;
  constructor(
    private readonly _alertService: TwAlertService,
    private readonly _cd: ChangeDetectorRef
  ) {}

  ngOnDestroy() {
    this._subscribed = false;
    this._subsciption$$?.unsubscribe();

    // destroy embeddedViewRefs to avoid memory leak
    for (const viewRef of this._embeddedViewRefs.map(
      (e) => e.embeddedViewRef
    )) {
      if (viewRef && !viewRef.destroyed) {
        viewRef.destroy();
      }
    }
  }
  ngOnInit(): void {
    this._subsciption$$ = this._alertService.alerts
      .pipe(takeWhile(() => this._subscribed))
      .subscribe((notification) => {
        if (notification) this.render(this.withDefaults(notification));
      });
  }
  withDefaults(notification: IAlert): IAlert {
    notification.icon =
      notification.icon || this.getDisplayedIcon(notification.type);
    notification.iconColor =
      notification.iconColor || this.getDisplayedIconColor(notification.type);

    return notification;
  }

  getDisplayedIcon(type: AlertType) {
    return type === 'info'
      ? 'hero:information-circle'
      : type === 'error'
      ? 'hero:exclamation-circle'
      : 'hero:exclamation-triangle';
  }

  getDisplayedIconColor(type: AlertType) {
    return type === 'info'
      ? 'bg-blue-100 text-blue-500'
      : type === 'error'
      ? 'bg-red-100 text-red-500'
      : 'bg-yellow-100 text-yellow-500';
  }

  private render(notification: IAlert) {
    const ref = ++TwAlerts._notificationRef;

    const embeddedViewRef = this.alertsContainer?.createEmbeddedView(
      this.alertTemplate!,
      {
        $implicit: {
          ...notification,
          ref,
        },
      }
    );

    if (embeddedViewRef) {
      this._embeddedViewRefs.push({
        ref,
        embeddedViewRef,
      });
      setTimeout(() => {
        this.close(ref);
        this._cd.detectChanges();
      }, notification.duration);
    }
  }

  close(notificationRef: number) {
    const evf = this._embeddedViewRefs.findIndex(
      (e) => e.ref === notificationRef
    );
    if (evf > -1) {
      const embeddedViewRef = this._embeddedViewRefs[evf].embeddedViewRef;
      const index = this.alertsContainer?.indexOf(embeddedViewRef);
      if (index !== undefined && index > -1) {
        console.log('Removing alert at index:', index);
        this.alertsContainer?.detach(index);
      }
      embeddedViewRef.destroy();
      this._embeddedViewRefs.splice(evf, 1);

      // Remove cdk-global-scrollblock from html if no more alerts
      if (this._embeddedViewRefs.length === 0) {
        // document.documentElement.classList.remove('cdk-global-scrollblock');
        this._alertService.clearContainer();
      }
    }
  }
}
