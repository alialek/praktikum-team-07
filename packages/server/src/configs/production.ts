import type { AppConfig } from '@/types';
import { VERSEL_URL_REGEX, YA_API_URL } from '@/constants/main';
import { productionPresets } from './csp/production';

export const productionConfig: AppConfig = {
  csp: {
    presets: productionPresets,
  },
  cors: {
    allowedOrigins: [VERSEL_URL_REGEX, YA_API_URL],
  },
};
