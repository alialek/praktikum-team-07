import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { ToggleColorMode } from '@/components/ToggleColorMode';
import { router } from '@/router/router';
import { store } from '@/store/store';
import { mainStyles } from '../StyleMain';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToggleColorMode>
        <Container sx={mainStyles.main}>
          <RouterProvider router={router} />
        </Container>
        <CssBaseline />
      </ToggleColorMode>
    </Provider>
  </React.StrictMode>,
);
