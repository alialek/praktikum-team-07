import type { CSPDirectives } from 'csp-header';
import { YA_API_URL } from '@/constants/main';

export const apiPolicies: Partial<CSPDirectives> = {
  'connect-src': [YA_API_URL],
};
