import { OauthSingInModel } from '@/models/oauth.model';
import { REDIRECT_URI } from '@/сonstants/main';
import { api, oauthApi, ApiResponse } from '../client';

export const OauthService = {
  signin(data: OauthSingInModel): Promise<ApiResponse> {
    return api.post('/oauth/yandex', data);
  },

  getServiceId(): Promise<ApiResponse> {
    return api.get(`/oauth/yandex/service-id?redirect_uri=${REDIRECT_URI}`);
  },

  getAccessCode(accessCode: string): Promise<ApiResponse> {
    return oauthApi.get(
      `https://oauth.yandex.ru/authorize?response_type=code&client_id=${accessCode}&redirect_uri=${REDIRECT_URI}`,
    );
  },
};
