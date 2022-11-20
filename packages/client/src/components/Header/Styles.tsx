import React from 'react';
import { SxProps, Theme } from '@mui/material';
import white from '@/colors';

type ClassName = 'appBar' | 'nav' | 'navItem';

export const headerStyles: Record<ClassName, SxProps<Theme> | React.CSSProperties> = {
  appBar: {
    backgroundColor: white,
    // При передаче цвета в виде hex, перестает работать правильная отрисовка тени в даркмоде
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
