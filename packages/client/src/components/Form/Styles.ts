import React from 'react';
import { SxProps, Theme } from '@mui/material';
import bgForm from '../../colors';

export const loginFormStyles: Record<string, SxProps<Theme> | React.CSSProperties> = {
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

export const profileStyles: Record<string, SxProps<Theme> | React.CSSProperties> = {
  boxWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  card: {
    maxWidth: '828px',
    padding: '50px 164px',
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
    margin: 0,
    fontSize: 14,
  },
  button: {
    borderRadius: '10px',
    fontSize: 14,
  },
  btnBlock: {
    alignItems: 'flex-start',
  },
  avatarBlock: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '16px',
  },
};

export const changePasswordStyles: Record<string, SxProps<Theme> | React.CSSProperties> =
  {
    card: {
      maxWidth: '828px',
      padding: '50px 164px',
      background: bgForm,
      borderRadius: '10px',
      width: '100%',
    },
    link: {
      margin: 0,
      fontSize: 14,
    },
    button: {
      borderRadius: '10px',
      fontSize: 14,
    },
    btnBlock: {
      alignItems: 'flex-start',
    },
  };
