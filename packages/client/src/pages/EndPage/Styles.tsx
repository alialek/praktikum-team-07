import React from 'react';
import { SxProps, Theme } from '@mui/material';
// import { keyframes } from '@emotion/react';
import boomSprite from '../../img/boomSprite.png';

type ClassName = 'boxWrapper' | 'welcomeBox' | 'wrapperBox' | 'img' | 'wrapperImg';

// const play = keyframes`
//   100% {
//     background-position: -1135px;
// }`;
//
// const step = keyframes`
//   100% {
//     left: 100%;
// }`;

export const endStyles: Record<ClassName, SxProps<Theme> | React.CSSProperties> = {
  boxWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  welcomeBox: {
    width: '80%',
    height: '472px',
    borderRadius: '32px',
    backgroundColor: '#1976D2',
  },
  wrapperBox: {
    display: 'flex',
    justifyContent: 'spaceAround',
  },
  img: {
    height: 'auto',
    width: 'auto',
    position: 'absolute',
    backgroundImage: `url(${boomSprite})`,
    backgroundPosition: '0px 0px',
    // animation: 'play 0.8s steps(16) infinite,
    //            step 10s linear infinite,
    left: '0',
  },
  wrapperImg: {
    width: '80px',
    height: '80px',
    position: 'relative',
    overflow: 'hidden',
  },
};
