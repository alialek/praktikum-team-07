import { OauthSingInModel } from '@/models/oauth.model';
import { api, ApiResponse } from '../client';

export const OauthService = {
  signin(data: OauthSingInModel): Promise<ApiResponse> {
    return api.post('/oauth/yandex', data);
  },

  getServiceId(): Promise<ApiResponse> {
    return api.get('/oauth/yandex/service-id');
  },
};
