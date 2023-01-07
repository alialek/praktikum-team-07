import { useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SigninPagePath } from '@/router/paths';
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
        const yaRedirectUri = localStorage.getItem('redirect_uri');
        console.log(yaRedirectUri);
        // @ts-ignore
        dispatch(oauthSignIn({ code: yaCode, redirect_uri: yaRedirectUri }));
        console.log(window.location.search.split('=')[1]);
        navigate(SigninPagePath.path);
      }
    }
  }, [isLoggedIn, navigate, pathname, dispatch]);
};
