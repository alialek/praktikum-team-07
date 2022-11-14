import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import theme from './theme';
import { router } from '@/router/router';
import { store } from '@/store/store';

import bgImg from './assets/images/background.png';
import colors from '@/colors';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Container
          sx={{
            minWidth: '320px',
            height: '100%',
            minHeight: 'calc(100vh)',
            backgroundColor: colors.main,
            backgroundImage: `url(${bgImg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            maxWidth: 'none !important',
            padding: '0 !important',
          }}
        >
          <RouterProvider router={router} />
        </Container>
        <CssBaseline />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
