import { api, ApiResponse } from '../client';

export const ProfileService = {
  avatar(data: FormData): Promise<ApiResponse> {
    return api.put('/user/profile/avatar', data);
  },
};
