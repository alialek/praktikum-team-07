import React from 'react';
import { SxProps, Theme } from '@mui/material';

type ClassName =
  | 'boxWrapper'
  | 'title'
  | 'cardWrapper'
  | 'mainTitle'
  | 'mainTitleWrapper';

export const threadStyles: Record<ClassName, SxProps<Theme> | React.CSSProperties> = {
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
    fontWeight: '500',
  },
  mainTitleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};
