export const API_URL = 'https://ya-praktikum.tech/api/v2';
export const GET_AVATAR_URL = `${API_URL}/resources`;
export const UPDATE_AVATAR = '/user/profile/avatar';
export const CHANGE_PASSWORD = '/user/password';

// oauth
export const REDIRECT_URI = 'http://localhost:3000';
export const OAUTH_GET_SERVICE_ID = '/oauth/yandex/service-id';
export const OAUTH_GET_ACCESS_TOKEN = '/oauth/yandex';
export const OAUTH_YANDEX_ACCESS_CODE =
  'https://oauth.yandex.ru/authorize?response_type=code';

export const PHONE_REGEX =
  /^(\+7|7|8)?[\s\\-]?\(?[489][0-9]{2}\)?[\s\\-]?[0-9]{3}[\s\\-]?[0-9]{2}[\s\\-]?[0-9]{2}$/;
