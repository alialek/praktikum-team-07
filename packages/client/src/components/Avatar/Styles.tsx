import React from 'react';
import { SxProps, Theme } from '@mui/material';
import editAvatarIcon from '@/img/edit.svg';

type ClassName = 'boxWrapper' | 'boxInner' | 'avatarInput' | 'img';

export const avatarStyles: Record<ClassName, SxProps<Theme> | React.CSSProperties> = {
  boxWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
  },
  boxInner: {
    position: 'relative',
    overflow: 'hidden',
    display: 'block',
    cursor: 'pointer',
    margin: 'auto',
    width: 256,
    height: 256,
    borderRadius: 65,
    ':hover:after': {
      position: 'absolute',
      zIndex: 1,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'block',
      content: "''",
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backgroundImage: `url(${editAvatarIcon})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 40,
      borderRadius: 65,
    },
  },
  avatarInput: {
    overflow: 'hidden',
    width: 256,
    height: 256,
    zIndex: 2,
    cursor: 'pointer',
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0,
  },
  img: {
    display: 'block',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
};
