import { useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { SigninPagePath } from '@/router/paths';

export const useAuthGuard = (isLoggedIn: boolean) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!pathname.includes('/auth')) {
      if (!isLoggedIn) {
        navigate(SigninPagePath.path);
      }
    }
  }, [isLoggedIn, navigate]);
};
