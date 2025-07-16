import { Component, inject } from '@angular/core';
import { TwAlertService, TwButton } from 'ngx-tw';

@Component({
  selector: 'app-alerts',
  imports: [TwButton],
  template: `
    <h2 class="mb-8 mt-8 text-2xl">Alerts</h2>

    <div class="flex gap-4">
      <tw-button (click)="showAlertInfo()" color="primary"
        >Show Alert Info</tw-button
      >
      <tw-button (click)="showAlertWarning()" color="accent"
        >Show Alert warning</tw-button
      >
      <tw-button (click)="showAlertError()" color="danger"
        >Show Alert error</tw-button
      >
      <tw-button (click)="showAlertWithCustomIcon()" class="text-pink-500"
        >Show Alert error</tw-button
      >
    </div>
  `,
})
export class AlertsComponent {
  private readonly _alertService = inject(TwAlertService);

  showAlertWithCustomIcon() {
    this._alertService.info({
      title: 'Custom Icon Alert',
      description: 'This alert has a custom icon.',
      icon: 'hero:chart-bar',
      duration: 3000,
    });
  }
  showAlertInfo() {
    this._alertService.info({
      title: 'Information',
      description: 'This is an informational alert.',
      duration: 3000,
    });
  }
  showAlertWarning() {
    this._alertService.warning({
      title: 'Warning',
      description: 'This is a warning alert.',
      duration: 3000,
    });
  }
  showAlertError() {
    this._alertService.error({
      title: 'Error',
      description: 'This is an error alert.',
      duration: 3000,
    });
  }
}
