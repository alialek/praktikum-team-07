import React from 'react';
import { SxProps, Theme } from '@mui/material';

export const homeStyles: Record<string, SxProps<Theme> | React.CSSProperties> = {
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
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '16px',
  },
};
