import React from 'react';
import { SxProps, Theme } from '@mui/material';

type ClassName = 'boxWrapper' | 'title' | 'cardWrapper' | 'mainTitle';

export const forumStyles: Record<ClassName, SxProps<Theme> | React.CSSProperties> = {
  boxWrapper: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: '20',
    fontWeight: '700',
  },
  cardWrapper: {
    padding: '30px 50px',
    borderRadius: '10px',
  },
  mainTitle: {
    fontWeight: '400',
    padding: '0 0 56px 0',
    textAlign: 'left',
  },
};
