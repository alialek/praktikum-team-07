import React from 'react';
import { SxProps, Theme } from '@mui/material';

type ClassName = 'boxWrapper' | 'welcomeBox';

export const homeStyles: Record<ClassName, SxProps<Theme> | React.CSSProperties> = {
  boxWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeBox: {
    width: '1000px',
    height: '472px',
    borderRadius: '32px',
    backgroundColor: '#1976D2',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
};
