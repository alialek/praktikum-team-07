import React from 'react';
import { SxProps, Theme } from '@mui/material';
import bgForm from '../../colors';

export const authWrapperStyles: Record<string, SxProps<Theme> | React.CSSProperties> = {
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
};
