import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import { useRoutes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { mainStyles } from '../StyleMain';
import { ToggleColorMode } from '@/components/ToggleColorMode';
import { RootState, store } from '@/store/store';
import { router } from '@/router/router';

function Main() {
  const isLoggedIn = useSelector((state: RootState) => state.user.isAuth);
  const routing = useRoutes(router(isLoggedIn));
  return routing;
}

export const render = (req: Request) =>
  renderToString(
    <Provider store={store}>
      <ToggleColorMode>
        <Container sx={mainStyles.main}>
          <StaticRouter location={req.url}>
            <Main />
          </StaticRouter>
        </Container>
        <CssBaseline />
      </ToggleColorMode>
    </Provider>,
  );
