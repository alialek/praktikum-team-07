import type { AppConfig } from '@/types';
import { YA_API_URL } from '@/constants/main';
import { developmentPresets } from './csp/development';
import { SERVER_PORT } from './default';

export const CLIENT_PORT = Number(process.env.CLIENT_PORT) || 3000;

export const developmentConfig: AppConfig = {
  csp: {
    presets: developmentPresets,
  },
  cors: {
    allowedOrigins: [
      `http://localhost:${SERVER_PORT}`,
      `http://localhost:${CLIENT_PORT}`,
      YA_API_URL,
    ],
  },
  logger: {
    format: 'dev',
  },
  database: {
    host: 'localhost',
  },
};
