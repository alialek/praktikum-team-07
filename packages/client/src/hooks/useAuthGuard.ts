import { useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SigninPagePath } from '@/router/paths';
import { REDIRECT_URI } from '@/сonstants/main';
import { oauthSignIn } from '@/store/user/user.actions';

export const useAuthGuard = (isLoggedIn: boolean) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!pathname.includes('/auth')) {
      if (!isLoggedIn && !window.location.search.includes('code')) {
        navigate(SigninPagePath.path);
      }
      if (window.location.search.includes('code')) {
        const yaCode: string = window.location.search.split('=')[1];
        // @ts-ignore
        dispatch(oauthSignIn({ code: yaCode, redirect_uri: REDIRECT_URI }));
        console.log(window.location.search.split('=')[1]);
        navigate(SigninPagePath.path);
      }
    }
  }, [isLoggedIn, navigate, pathname, dispatch]);
};
