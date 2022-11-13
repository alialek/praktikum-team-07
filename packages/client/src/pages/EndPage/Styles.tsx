import React from 'react';
import { SxProps, Theme } from '@mui/material';

type ClassName = 'boxWrapper' | 'welcomeBox' | 'wrapperBox';

export const endStyles: Record<ClassName, SxProps<Theme> | React.CSSProperties> = {
  boxWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  welcomeBox: {
    width: '80%',
    height: '472px',
    borderRadius: '32px',
    backgroundColor: '#1976D2',
  },
  wrapperBox: {
    display: 'flex',
    justifyContent: 'spaceAround',
  },
};
