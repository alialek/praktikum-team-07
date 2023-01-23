import { OauthSingInModel } from '@/models/oauth.model';
import { REDIRECT_URI } from '@/сonstants/main';
import { yandexApi, ApiResponse } from '../client';

export const OauthService = {
  signin(data: OauthSingInModel): Promise<ApiResponse> {
    return yandexApi.post('/oauth/yandex', data);
  },

  getServiceId(): Promise<ApiResponse<OauthSingInModel>> {
    return yandexApi.get(`/oauth/yandex/service-id?redirect_uri=${REDIRECT_URI}`);
  },
};
