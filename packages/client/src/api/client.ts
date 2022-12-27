import axios, { AxiosResponse } from 'axios';
import { API_URL, OAUTH_YANDEX_ACCESS_CODE } from '@/сonstants/main';

export type ApiResponse<T = unknown> = AxiosResponse<T>;

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const oauthApi = axios.create({
  baseURL: OAUTH_YANDEX_ACCESS_CODE,
  withCredentials: true,
});
