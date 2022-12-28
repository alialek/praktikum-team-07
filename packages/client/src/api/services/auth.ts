import { api, ApiResponse } from '../client';
import { SigninInputModel, SignupInputModel } from '@/models/auth.model';
import { UserModel } from '@/models/user.model';

export const AuthService = {
  signin(data: SigninInputModel): Promise<ApiResponse> {
    return api.post('/auth/signin', data);
  },
  signup(data: SignupInputModel): Promise<ApiResponse> {
    return api.post('/auth/signup', data);
  },
  getUserInfo(data: UserModel): Promise<ApiResponse> {
    return api.get('/auth/user', data);
  },
};
