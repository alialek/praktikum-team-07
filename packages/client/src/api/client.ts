import axios, { AxiosResponse } from 'axios';
import { API_URL, YANDEX_API_URL } from '@/сonstants/main';

export type ApiResponse<T = unknown> = AxiosResponse<T>;

export const ownApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const yandexApi = axios.create({
  baseURL: YANDEX_API_URL,
  withCredentials: true,
});
