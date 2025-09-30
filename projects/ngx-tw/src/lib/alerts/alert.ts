import { TwNotificationType } from '../notification/notification-config';

export type AlertType = TwNotificationType;
export interface IAlert {
  title: string;
  description?: string;
  type: AlertType;
  duration: number;
  icon?: string;
  iconColor?: string;
  showActions?: boolean;
  secondaryActionText?: string;
  primaryActionText?: string;
}
