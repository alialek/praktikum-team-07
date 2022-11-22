import React from 'react';
import { SxProps, Theme } from '@mui/material';

type ClassName = 'link' | 'button';

export const loginFormStyles: Record<ClassName, SxProps<Theme> | React.CSSProperties> = {
  link: {
    fontSize: '15px',
    fontWeight: 700,
    textAlign: 'center',
  },
  button: {
    borderRadius: '10px',
  },
};
