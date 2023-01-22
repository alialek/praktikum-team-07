import { AxiosInstance, AxiosRequestConfig } from 'axios';
import httpTransport from '@/api/http/Http.transport';

export class HttpService {
  // eslint-disable-next-line no-useless-constructor,no-empty-function
  constructor(private readonly transport: AxiosInstance) {}

  // eslint-disable-next-line class-methods-use-this
  public async get<T>(
    url: string,
    abortController = new AbortController(),
    config: AxiosRequestConfig = {},
  ): Promise<T | null> {
    return this.transport.get(url, { signal: abortController.signal, ...config });
  }

  public async post<T>(
    url: string,
    dto: T,
    abortController = new AbortController(),
    config: AxiosRequestConfig = {},
  ): Promise<T | null> {
    return this.transport.post(url, dto, { signal: abortController.signal, ...config });
  }
}

export const httpService = new HttpService(httpTransport);
