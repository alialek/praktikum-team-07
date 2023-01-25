import { yandexApi, ApiResponse } from '../client';
import { UserModel } from '@/models/user.model';

export const AuthService = {
  signin<T>(data: T): Promise<ApiResponse<T>> {
    return yandexApi.post('/auth/signin', data);
  },
  signup<T>(data: T): Promise<ApiResponse<T>> {
    return yandexApi.post('/auth/signup', data);
  },
  logout() {
    return yandexApi.post('/auth/logout');
  },
  getUserInfo(): Promise<ApiResponse<UserModel>> {
    return yandexApi.get('/auth/user');
  },
};
