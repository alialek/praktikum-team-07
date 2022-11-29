import React from 'react';
import { SxProps, Theme } from '@mui/material';

export const loginFormStyles: Record<string, SxProps<Theme> | React.CSSProperties> = {
  link: {
    fontSize: '15px',
    fontWeight: 700,
    textAlign: 'center',
  },
  button: {
    borderRadius: '10px',
  },
};
