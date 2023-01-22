import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SigninPagePath } from '@/router/paths';
import { getUserInfo, oauthSignIn } from '@/store/user/user.actions';
import { REDIRECT_URI } from '@/сonstants/main';
import { useAppDispatch, useAppSelector } from '@/hooks/index';
import { showUserData } from '@/store/user/user.slice';

export const useAuthGuard = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const { profile: user } = useAppSelector(showUserData);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const fetchUserData = useCallback(async () => {
    const resultAction = await dispatch(getUserInfo());
    if (getUserInfo.fulfilled.match(resultAction)) {
      const { payload } = resultAction;
      return payload;
    }
    return null;
  }, [dispatch]);

  useEffect(() => {
    fetchUserData().then((payload) => {
      if (!payload) {
        localStorage.clear();
        navigate('/auth/login', { replace: true });
      }
    });
  }, [user.id]);

  useEffect(() => {
    const loggedIn = Boolean(localStorage.getItem('user_in'));

    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!pathname.includes('/auth')) {
      if (!isLoggedIn && !window.location.search.includes('code')) {
        navigate(SigninPagePath.path);
      }
      if (window.location.search.includes('code')) {
        const yaCode: string = window.location.search.split('=')[1];

        // @ts-ignore
        dispatch(oauthSignIn({ code: yaCode, redirect_uri: REDIRECT_URI }));
        navigate(SigninPagePath.path);
      }
    }
  }, [isLoggedIn, navigate, pathname, dispatch]);
};
