import React from 'react';
import { SxProps, Theme } from '@mui/material';

type ClassName = 'appBar' | 'nav' | 'navItem';

export const headerStyles: Record<ClassName, SxProps<Theme> | React.CSSProperties> = {
  appBar: {
    backgroundColor: '#FAFAFA',
    boxShadow: '0px -2px 10px black',
  },
  nav: {
    flexGrow: 0,
    display: 'flex',
    alignItems: 'center',
  },
  navItem: {
    fontWeight: 600,
    mr: 5,
    textTransform: 'uppercase',
  },
};
