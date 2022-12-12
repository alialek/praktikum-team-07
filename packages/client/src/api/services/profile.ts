import { ChangePasswordModel } from '@/models/user.model';
import { CHANGE_PASSWORD, UPDATE_AVATAR } from '@/сonstants/main';
import { api, ApiResponse } from '../client';

export const ProfileService = {
  avatar(data: FormData): Promise<ApiResponse> {
    return api.put(UPDATE_AVATAR, data);
  },

  changePassword(data: ChangePasswordModel): Promise<ApiResponse> {
    return api.put(CHANGE_PASSWORD, data);
  },
};
