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
import { mainStyles } from '../StyleMain';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Container sx={mainStyles.main}>
          <RouterProvider router={router} />
        </Container>
        <CssBaseline />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
