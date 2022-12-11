import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { ToggleColorMode } from '@/components/ToggleColorMode';
import { router } from '@/router/router';
import { RootState, store } from '@/store/store';
import { mainStyles } from '../../../StyleMain';

function Main() {
  const isLoggedIn = useSelector((state: RootState) => state.user.isAuth);
  const routing = useRoutes(router(isLoggedIn));
  return routing;
}
export const App = () => {
  return (
    <Provider store={store}>
      <ToggleColorMode>
        <Container sx={mainStyles.main}>
          <BrowserRouter>
            <Main />
          </BrowserRouter>
        </Container>
        <CssBaseline />
      </ToggleColorMode>
    </Provider>
  );
};
