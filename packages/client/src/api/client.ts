import axios, { AxiosResponse } from 'axios';
import { API_URL } from '@/сonstants/main';

export type ApiResponse<T = unknown> = AxiosResponse<T>;

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const oauthApi = axios.create({
  headers: { 'Access-Control-Allow-Origin': '*' },
});
