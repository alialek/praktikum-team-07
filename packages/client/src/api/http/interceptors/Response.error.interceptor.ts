import { AxiosError } from 'axios';
import errorService from '@/global/Error.service';

export const responseErrorInterceptor = (error: AxiosError) => {
  errorService.catchResponseError(error).catch((e) => console.warn(e));
  return Promise.resolve(null);
};
