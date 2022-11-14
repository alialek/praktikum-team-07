import React, { useState, useMemo, createContext, PropsWithChildren } from 'react';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { Shadows } from '@mui/material/styles/shadows';
import colors from '@/colors';

interface IProp {
  children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const ColorModeContext = createContext({ toggleColorMode: () => {} });

function ToggleColorMode(props: PropsWithChildren<IProp>) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      responsiveFontSizes(
        createTheme({
          palette: {
            mode,
            primary: {
              main: colors.main,
              light: '',
              dark: '',
              contrastText: '',
            },
            secondary: {
              main: colors.white,
              light: '',
              dark: '',
              contrastText: '',
            },
            success: {
              main: colors.mainSuccess,
              light: colors.lightSuccess,
              dark: colors.darkSuccess,
            },
            error: {
              main: colors.mainError,
              light: colors.lightError,
              dark: colors.darkError,
            },
            warning: {
              main: colors.mainWarning,
              light: colors.lightWarning,
              dark: colors.darkWarning,
            },
            info: {
              main: colors.mainInfo,
              light: colors.lightInfo,
              dark: colors.darkInfo,
            },
          },
          typography: {
            fontSize: 17,
            h1: {
              fontSize: 46,
              fontWeight: 700,
            },
            h2: {
              fontSize: 24,
            },
            button: {
              fontSize: 16,
            },
            body1: {
              fontSize: 17,
            },
            caption: {
              fontSize: 14,
            },
            fontFamily: [
              '-apple-system',
              'BlinkMacSystemFont',
              '"Segoe UI"',
              'Roboto',
              '"Helvetica Neue"',
              'Arial',
              'sans-serif',
              '"Apple Color Emoji"',
              '"Segoe UI Emoji"',
              '"Segoe UI Symbol"',
            ].join(','),
          },
          spacing: 8,
          shadows: [
            'none',
            '0px 4px 30px rgba(108, 72, 0, 0.2)',
            ...Array<string>(23).fill('none'),
          ] as Shadows,
          components: {
            MuiCssBaseline: {
              styleOverrides: {
                body: {
                  backgroundColor: colors.main,
                },
              },
            },
          },
        }),
      ),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export { ToggleColorMode };
