export const VERSEL_URL_REGEX = /praktikum-team-07-client(.*).vercel.app/;

export const NODE_ENV = process.env.NODE_ENV || '';

export const YANDEX_API_URL =
  process.env.VITE_YANDEX_API_URL || 'https://ya-praktikum.tech';
export const API_URL = process.env.VITE_API_URL || 'https://cloud-atom.ya-praktikum.tech';

export const CLIENT_PORT = Number(process.env.CLIENT_PORT) || 3000;
export const SERVER_PORT = Number(process.env.SERVER_PORT) || 3001;

export const POSTGRES_DB = process.env.POSTGRES_DB || '';
export const POSTGRES_PORT = Number(process.env.POSTGRES_PORT) || 5432;
export const POSTGRES_HOST = process.env.POSTGRES_HOST || '';
export const POSTGRES_USER = process.env.POSTGRES_USER || '';
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || '';
