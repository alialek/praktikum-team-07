import React from 'react';
import ReactDOM from 'react-dom/client';
import { useRoutes, BrowserRouter } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import { ToggleColorMode } from '@/components/ToggleColorMode';
import { router } from '@/router/router';
import { store } from '@/store/store';
import { mainStyles } from '../StyleMain';

function App() {
  // @ts-ignore
  const { isLoggedIn } = useSelector((state) => state.user.isAuth);

  const routing = useRoutes(router(isLoggedIn));

  return routing;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToggleColorMode>
        <Container sx={mainStyles.main}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Container>
      </ToggleColorMode>
    </Provider>
  </React.StrictMode>,
);
