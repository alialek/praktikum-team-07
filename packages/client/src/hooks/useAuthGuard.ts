import { useEffect } from 'react';
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
  const isLoggedIn = Boolean(localStorage.getItem('user_in'));

  const fetchUserData = async () => {
    const resultAction = await dispatch(getUserInfo());
    if (getUserInfo.fulfilled.match(resultAction)) {
      const { payload } = resultAction;
      return payload;
    }
    return null;
  };
  // const [dispatch];

  const handleUserInfo = () => {
    fetchUserData().then((payload) => {
      if (!payload) {
        localStorage.clear();
        navigate('/auth/login', { replace: true });
      }
    });
  };

  useEffect(() => {
    if (!user?.id) {
      handleUserInfo();
    }
  }, [user.id]);

  useEffect(() => {
    if (!pathname.includes('/auth')) {
      if (!isLoggedIn && !window.location.search.includes('code')) {
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
  }, [user.id]);
};
