import type { AppConfig } from '@/types';
import { VERSEL_URL_REGEX, YANDEX_API_URL, API_URL } from '@/constants/main';
import { productionPresets } from './csp/production';

export const productionConfig: AppConfig = {
  csp: {
    presets: productionPresets,
  },
  cors: {
    allowedOrigins: [VERSEL_URL_REGEX, YANDEX_API_URL, API_URL],
  },
};
