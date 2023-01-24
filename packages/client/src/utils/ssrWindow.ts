import { getWindow, extend } from 'ssr-window';

export const window = getWindow();

if (typeof window !== 'undefined') {
  extend(window, {
    localStorage: {
      key: () => null,
      getItem: () => null,
      setItem: () => undefined,
      removeItem: () => undefined,
      clear: () => null,
    },
  });
}
