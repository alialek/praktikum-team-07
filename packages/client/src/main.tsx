import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { ToggleColorMode } from '@/components/ToggleColorMode';
import { router } from '@/router/router';
import { RootState, store } from '@/store/store';
import { mainStyles } from '../StyleMain';

function App() {
  const isLoggedIn = useSelector((state: RootState) => state.user.isAuth);
  const routing = useRoutes(router(isLoggedIn));
  return routing;
}

hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <ToggleColorMode>
        <Container sx={mainStyles.main}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Container>
        <CssBaseline />
      </ToggleColorMode>
    </Provider>
  </React.StrictMode>,
);
