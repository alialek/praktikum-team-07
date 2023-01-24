import type { CSPDirectives } from 'csp-header';

import { API_URL, YANDEX_API_URL } from '@/constants/main';

export const apiPolicies: Partial<CSPDirectives> = {
  'connect-src': [YANDEX_API_URL, API_URL, 'https://www.google-analytics.com'],
};
