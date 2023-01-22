import { v4 } from 'uuid';

export class NotificationService {
  public notifications: Notification[] = [];

  public addNotification(title: string, message: string, variant: NotificationSeverity) {
    const key = v4();
    const notification: Notification = { key, message, title, variant };

    this.notifications.push(notification);
  }

  public removeNotification(key: string) {
    this.notifications = this.notifications.filter((el) => el.key !== key);
  }
}

export default new NotificationService();

export type NotificationSeverity = 'success' | 'error' | 'warning';
export interface Notification {
  key: string;
  title: string;
  message: string;
  variant: NotificationSeverity;
}
