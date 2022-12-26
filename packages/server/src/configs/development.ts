import type { AppConfig } from '@/types';
import { YA_API_URL } from '@/constants/main';
import { developmentPresets } from './csp/development';
import { PORT } from './default';

export const developmentConfig: AppConfig = {
  csp: {
    presets: developmentPresets,
  },
  cors: {
    allowedOrigins: [`http://localhost:${PORT}`, YA_API_URL],
  },
  logger: {
    format: 'dev',
  },
};
