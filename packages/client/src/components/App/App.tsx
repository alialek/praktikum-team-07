import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { SnackbarProvider } from 'notistack';
import { ToggleColorMode } from '@/components/ToggleColorMode';
import { router } from '@/router/router';
import { store } from '@/store/store';
import { mainStyles } from '../../../StyleMain';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { notistackConfig } from '@/configs/Notistack.config';

function Main() {
  const routing = useRoutes(router());

  useAuthGuard();

  return routing;
}

export const App = () => {
  return (
    <Provider store={store}>
      <ToggleColorMode>
        <Container sx={mainStyles.main}>
          <SnackbarProvider {...notistackConfig}>
            <Main />
          </SnackbarProvider>
        </Container>
        <CssBaseline />
      </ToggleColorMode>
    </Provider>
  );
};

export const ClientApp = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};
