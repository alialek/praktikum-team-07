import React from 'react';
import { SxProps, Theme } from '@mui/material';

export const welcomeBoxStyles: Record<string, SxProps<Theme> | React.CSSProperties> = {
  boxWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
};
