import React from 'react';
import { SxProps, Theme } from '@mui/material';
import bgForm from '../../colors';

type ClassName = 'boxWrapper' | 'card' | 'title' | 'link' | 'button';

export const loginFormStyles: Record<ClassName, SxProps<Theme> | React.CSSProperties> = {
  boxWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  card: {
    maxWidth: '552px',
    padding: '50px 40px',
    background: bgForm,
    borderRadius: '10px',
    width: '100%',
  },
  title: {
    padding: '0 0 24px 0',
    textAlign: 'center',
    fontWeight: '600',
  },
  link: {
    fontSize: '15px',
    fontWeight: 700,
    textAlign: 'center',
  },
  button: {
    borderRadius: '10px',
  },
};
