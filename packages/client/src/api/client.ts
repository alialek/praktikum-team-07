import axios, { AxiosResponse } from 'axios'

const API_URL = 'https://ya-praktikum.tech/api/v2'

export type ApiResponse<T = unknown> = AxiosResponse<T>

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})
