import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SigninPagePath } from '@/router/paths';
import { getUserInfo, oauthSignIn } from '@/store/user/user.actions';
import { AUTH_STATUS, REDIRECT_URI } from '@/сonstants/main';
import { useAppDispatch, useAppSelector } from '@/hooks/index';
import { showUserData } from '@/store/user/user.slice';
import { window } from '@/utils/ssrWindow';

export const useAuthGuard = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const [userStatus, setUserStatus] = useState<string>(AUTH_STATUS.UNKNOWN);

  const { profile: user } = useAppSelector(showUserData);

  const fetchUserData = async () => {
    const resultAction = await dispatch(getUserInfo());
    if (getUserInfo.fulfilled.match(resultAction)) {
      const { payload } = resultAction;
      setUserStatus(AUTH_STATUS.AUTHORIZED);
      window.localStorage.setItem('user_in', JSON.stringify(true));
      return payload;
    }
    return null;
  };

  const handleUserInfo = () => {
    fetchUserData().then((payload) => {
      if (!payload) {
        window.localStorage.clear();
        setUserStatus(AUTH_STATUS.UNAUTHORIZED);
        navigate('/auth/login', { replace: true });
      }
    });
  };

  useEffect(() => {
    handleUserInfo();
  }, []);

  useEffect(() => {
    if (!pathname.includes('/auth')) {
      if (
        !user.id &&
        !window.location.search.includes('code') &&
        userStatus === AUTH_STATUS.UNAUTHORIZED
      ) {
        navigate(SigninPagePath.path);
      }
      if (window.location.search.includes('code')) {
        const yaCode: string = window.location.search.split('=')[1];

        const authorize = async () => {
          await dispatch(oauthSignIn({ code: yaCode, redirect_uri: REDIRECT_URI }));
          handleUserInfo();
        };

        authorize();
      }
    }
  }, [user, userStatus]);

  return [userStatus];
};
