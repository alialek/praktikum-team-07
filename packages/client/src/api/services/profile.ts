import { ChangePasswordModel } from '@/models/user.model';
import { CHANGE_PASSWORD, UPDATE_AVATAR, UPDATE_PROFILE_URL } from '@/сonstants/main';
import { yandexApi, ApiResponse } from '../client';

export const ProfileService = {
  updateProfile<T>(data: T): Promise<ApiResponse<T>> {
    return yandexApi.put<T>(UPDATE_PROFILE_URL, data);
  },

  updateAvatar<T>(data: FormData): Promise<ApiResponse<T>> {
    return yandexApi.put<T>(UPDATE_AVATAR, data);
  },

  changePassword<T>(data: ChangePasswordModel): Promise<ApiResponse<T>> {
    return yandexApi.put<T>(CHANGE_PASSWORD, data);
  },
};
