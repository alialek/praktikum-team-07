import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SigninPagePath } from '@/router/paths';
import { oauthSignIn } from '@/store/user/user.actions';
import { REDIRECT_URI } from '@/сonstants/main';
import { useAppDispatch } from '@/hooks/index';

export const useAuthGuard = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const isLoggedIn = Boolean(localStorage.getItem('user_in'));

  useEffect(() => {
    if (!pathname.includes('/auth')) {
      if (!isLoggedIn && !window.location.search.includes('code')) {
        navigate(SigninPagePath.path);
      }
      if (window.location.search.includes('code')) {
        const yaCode: string = window.location.search.split('=')[1];

        dispatch(oauthSignIn({ code: yaCode, redirect_uri: REDIRECT_URI }));
        navigate(SigninPagePath.path);
      }
    }
  }, [isLoggedIn, navigate, pathname, dispatch]);
};
