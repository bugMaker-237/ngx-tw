export type AlertType = 'info' | 'error' | 'warning';
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
