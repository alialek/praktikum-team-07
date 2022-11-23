import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import { ToggleColorMode } from '@/components/ToggleColorMode';
import { router } from '@/router/router';
import { RootState, store } from '@/store/store';
import { mainStyles } from '../StyleMain';

function App() {
  const isLoggedIn = useSelector((state: RootState) => state.user.isAuth);
  return useRoutes(router(isLoggedIn));
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
