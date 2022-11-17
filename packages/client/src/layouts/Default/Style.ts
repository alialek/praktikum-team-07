import React from 'react';
import { SxProps, Theme } from '@mui/material';
import bgImg from '@/assets/images/background.png';
import bgImgDark from '@/assets/images/bgDark.png';
import colors from '@/colors';

type ClassName = 'main' | 'mainDark';

export const mainStyles: Record<ClassName, SxProps<Theme> | React.CSSProperties> = {
  main: {
    backgroundImage: `url(${bgImg})`,
    minWidth: '320px',
    height: '100%',
    minHeight: '100vh',
    backgroundColor: colors.main,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    maxWidth: 'none !important',
    padding: '0 !important',
  },
  mainDark: {
    backgroundImage: `url(${bgImgDark})`,
    minWidth: '320px',
    height: '100%',
    minHeight: '100vh',
    backgroundColor: colors.main,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    maxWidth: 'none !important',
    padding: '0 !important',
  },
};
