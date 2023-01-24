import { join } from 'path';
import type { AppConfig } from '@/types';
import { defaultPresets } from './csp/default';

export const SERVER_PORT = Number(process.env.SERVER_PORT) || 3001;

const { POSTGRES_HOST, POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB } =
  process.env;

export const defaultConfig: AppConfig = {
  csp: {
    presets: defaultPresets,
    policies: {},
    serviceName: 'ssr-app',
    useDefaultReportUri: true,
  },
  cors: {
    credentials: true,
    methods: 'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT',
  },
  static: {
    baseUrl: '',
    staticDir: join(__dirname, '..', '..', '..', 'client/dist/'),
  },
  logger: {
    format: 'combined',
  },
  server: {
    port: SERVER_PORT,
  },
  database: {
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT),
    user: POSTGRES_USER,
    database: POSTGRES_DB,
    password: POSTGRES_PASSWORD,
  },
};
