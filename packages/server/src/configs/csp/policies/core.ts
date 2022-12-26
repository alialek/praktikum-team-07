import { EVAL, INLINE, SELF, CSPDirectives } from 'csp-header';

export const corePolicies: Partial<CSPDirectives> = {
  'connect-src': [SELF],
  'default-src': [SELF],
  'script-src': [EVAL, INLINE],
  'style-src': [INLINE],
  'img-src': [SELF, INLINE],
};
