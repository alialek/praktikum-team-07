import { SnackbarProviderProps } from 'notistack';

export const notistackConfig: Partial<SnackbarProviderProps> = {
  hideIconVariant: true,
  maxSnack: 3,
  anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
};
