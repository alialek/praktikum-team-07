import { yandexApi, ApiResponse } from '../client';
import { SigninInputModel, SignupInputModel } from '@/models/auth.model';
import { UserModel } from '@/models/user.model';

export const AuthService = {
  signin(data: SigninInputModel): Promise<ApiResponse> {
    return yandexApi.post('/auth/signin', data);
  },
  signup(data: SignupInputModel): Promise<ApiResponse> {
    return yandexApi.post('/auth/signup', data);
  },
  logout() {
    return yandexApi.post('/auth/logout');
  },
  getUserInfo(): Promise<ApiResponse<UserModel>> {
    return yandexApi.get('/auth/user');
  },
};
