import React from 'react';
import { BrowserRouter, useRoutes, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { ToggleColorMode } from '@/components/ToggleColorMode';
import { router } from '@/router/router';
import { store } from '@/store/store';
import { mainStyles } from '../../../StyleMain';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { getUserInfo } from '@/store/user/user.actions';
import { showUserData } from '@/store/user/user.slice';
import { useAppDispatch, useAppSelector } from '@/hooks';

function Main() {
  const navigate = useNavigate();
  const routing = useRoutes(router());

  const dispatch = useAppDispatch();
  const { profile: user, isAuth: isLoggedIn } = useAppSelector(showUserData);

  useAuthGuard(isLoggedIn); // TODO починить бы, ломает роутинг, при перезагрузке всегда редирект на главную

  const fetchData = async () => {
    const resultAction = await dispatch(getUserInfo());
    if (getUserInfo.fulfilled.match(resultAction)) {
      const { payload } = resultAction;
      return payload;
    }
    return null;
  };

  React.useEffect(() => {
    fetchData().then((payload) => {
      if (!payload) {
        navigate('/auth/login', { replace: true });
      }
    });
  }, [user.id]);

  return routing;
}
export const App = () => {
  return (
    <Provider store={store}>
      <ToggleColorMode>
        <Container sx={mainStyles.main}>
          <Main />
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
