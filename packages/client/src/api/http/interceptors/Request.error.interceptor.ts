import { AxiosError } from 'axios';
import errorService from '@/global/Error.service';

export const requestErrorInterceptor = (error: AxiosError) => {
  errorService.catchRequestError(error);
};
