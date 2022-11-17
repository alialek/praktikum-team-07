import React from 'react';
import { SxProps, Theme } from '@mui/material';
import { keyframes } from '@emotion/react';
import boomSprite from '../../img/boomSprite.png';

type ClassName =
  | 'boxWrapper'
  | 'welcomeBox'
  | 'wrapperCount'
  | 'img'
  | 'title'
  | 'wrapperTitle';

const play = keyframes`
  100% {
    background-position: -1135px;
}`;

export const endGameStyles: Record<ClassName, SxProps<Theme> | React.CSSProperties> = {
  boxWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  welcomeBox: {
    height: '472px',
    borderRadius: '32px',
    backgroundColor: '#1976D2',
    width: '736px',
    display: 'flex',
    flexDirection: 'column',
    padding: '15px',
  },
  wrapperCount: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  img: {
    height: '100px',
    width: '95px',
    position: 'absolute',
    backgroundImage: `url(${boomSprite})`,
    backgroundPosition: '-15px 0px',
    animation: `${play} 0.9s steps(12) infinite`,
    right: '0',
    top: '-40px',
  },
  wrapperTitle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  title: {
    textAlign: 'center',
    paddingRight: '95px',
    position: 'relative',
    display: 'flex',
  },
};
