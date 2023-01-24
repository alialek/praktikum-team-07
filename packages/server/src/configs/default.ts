import { join } from 'path';
import type { AppConfig } from '@/types';
import { defaultPresets } from './csp/default';

export const SERVER_PORT = Number(process.env.SERVER_PORT) || 3001;

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
};
