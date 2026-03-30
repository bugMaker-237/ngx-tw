import { Component } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { TwButton } from '../button/button.component';
import { TwNotification } from '../notification/notification.service';
import { TwAlertService } from './alert.service';

@Component({
  selector: 'sb-alerts-demo',
  imports: [TwButton],
  providers: [],
  template: `
    <div class="flex flex-wrap gap-4">
      <tw-button type="filled" color="primary" (click)="showInfo()"
        >Info Notification</tw-button
      >
      <tw-button type="filled" color="accent" (click)="showWarning()"
        >Warning Notification</tw-button
      >
      <tw-button type="filled" color="danger" (click)="showDanger()"
        >Danger Notification</tw-button
      >
      <tw-button type="filled" (click)="showSuccess()"
        >Success Notification</tw-button
      >
      <tw-button type="outlined" color="primary" (click)="showCustomIcon()"
        >Custom Icon</tw-button
      >
    </div>
  `,
})
class AlertsDemoComponent {
  constructor(
    private notification: TwNotification,
    private alertService: TwAlertService,
  ) {}

  showInfo() {
    this.notification.show({
      title: 'Information',
      text: 'This is an informational notification.',
      type: 'info',
      autoClose: true,
      autoCloseTimeout: 3000,
    });
  }

  showWarning() {
    this.notification.show({
      title: 'Warning',
      text: 'This is a warning notification.',
      type: 'warning',
      autoClose: true,
      autoCloseTimeout: 3000,
    });
  }

  showDanger() {
    this.notification.show({
      title: 'Error',
      text: 'Something went wrong.',
      type: 'danger',
      autoClose: true,
      autoCloseTimeout: 3000,
    });
  }

  showSuccess() {
    this.notification.show({
      title: 'Success',
      text: 'Operation completed successfully!',
      type: 'success',
      autoClose: true,
      autoCloseTimeout: 3000,
    });
  }

  showCustomIcon() {
    this.alertService.info({
      title: 'Custom Icon Alert',
      description: 'This uses the legacy TwAlertService with a custom icon.',
      icon: 'hero:chart-bar',
      duration: 3000,
    });
  }
}

const meta: Meta<AlertsDemoComponent> = {
  title: 'Components/Notifications',
  component: AlertsDemoComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A global toast notification system. Inject `TwNotification` and call `notification.show(opts)` with a `type` of `info`, `warning`, `danger`, or `success`. The legacy `TwAlertService` is also supported for icon-based alerts. Notifications auto-close after a configurable timeout.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<AlertsDemoComponent>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Click any button to fire a toast notification. Each type maps to a distinct color and icon. Notifications auto-close after 3 seconds.',
      },
    },
  },
};
