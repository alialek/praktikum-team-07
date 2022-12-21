import { useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigate } from 'react-router';
import { SigninPagePath } from '@/router/paths';

export const useAuthGuard = (isLoggedIn: boolean) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate(SigninPagePath.path);
    }
  }, [isLoggedIn]);
};
