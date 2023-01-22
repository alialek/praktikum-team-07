import { AxiosError } from 'axios';
import notificationService, {
  NotificationService,
  NotificationSeverity,
} from '@/global/Notification.service';

export class ErrorService {
  // eslint-disable-next-line no-useless-constructor,no-empty-function
  constructor(private readonly notification: NotificationService) {}

  public catchRequestError(error: AxiosError) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const { title, message: msg, severity } = UNKNOWN_ERROR;
    const message = error?.message || msg;
    this.notification.addNotification(title, message, severity);
  }

  public async catchResponseError(error: AxiosError) {
    // eslint-disable-next-line no-useless-return
    if (!this.shouldShowErrorNotification(error)) return;

    if (error.response?.status === 403) {
      const methods: Record<string, string> = {
        delete: 'удаление',
        post: 'создание',
        patch: 'изменение',
        put: 'изменение',
        get: 'просмотр',
      };

      const method: string = error?.response?.config?.method || 'get';
      this.notification.addNotification(
        '',
        `У вас нет прав на ${methods[method]} этот ресурс!`,
        'warning',
      );

      return;
    }

    if (!error.response) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      const { title, message, severity } = UNKNOWN_ERROR;
      this.notification.addNotification(title, error.message || message, severity);
      return;
    }

    const { data } = error.response as any; // TODO затипизировать

    // @ts-ignore
    if (!data || !data.message) {
      const title = error.response?.status.toString() || '';
      const message = error.response?.statusText || data;
      // eslint-disable-next-line consistent-return
      return this.notification.addNotification(title, message, 'error');
    }

    const message = data.message || data;
    const title = data?.title || '';

    this.notification.addNotification(title, message, 'error');
  }

  // eslint-disable-next-line class-methods-use-this
  protected shouldShowErrorNotification(error: AxiosError): boolean {
    if (error.message === 'canceled') return false;
    if (!error || !error.response) return true;

    return error?.message !== 'canceled';
  }
}

export default new ErrorService(notificationService);

// HELPERS
export const UNKNOWN_ERROR = {
  title: '0',
  message: 'Неизвестная ошибка',
  severity: 'warning' as NotificationSeverity,
};
