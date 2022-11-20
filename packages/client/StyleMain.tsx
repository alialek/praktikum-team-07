import React from 'react';
import { SxProps, Theme } from '@mui/material';
import colors from '@/colors';

type ClassName = 'main';

export const mainStyles: Record<ClassName, SxProps<Theme> | React.CSSProperties> = {
  main: {
    minWidth: '320px',
    height: '100%',
    minHeight: 'calc(100vh)',
    backgroundColor: colors.main,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    maxWidth: 'none !important',
    padding: '0 !important',
  },
};
