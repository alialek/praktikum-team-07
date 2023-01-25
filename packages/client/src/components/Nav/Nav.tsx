import * as React from 'react';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { AccountCircle } from '@mui/icons-material';
import { LOGOUT_TEXT } from '@/сonstants/text';
import { AuthService } from '@/api/services/auth';
import { headerStyles } from '@/components/Header/Styles';
import colors from '@/colors';
import { SETTINGS } from '@/components/Nav/settings';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { removeUser, showUserData } from '@/store/user/user.slice';

export const Nav = () => {
  const { profile: user } = useAppSelector(showUserData);
  const dispatch = useAppDispatch();

  const isLoggedIn = Boolean(user.id);

  const handleClickLogout = () => {
    AuthService.logout();
    localStorage.removeItem('user_in');
    dispatch(removeUser());
  };

  return isLoggedIn ? (
    <>
      {SETTINGS.map(({ title, link }) => (
        <Link
          to={link}
          underline="none"
          component={RouterLink}
          key={title}
          onClick={title === LOGOUT_TEXT ? handleClickLogout : undefined}
        >
          <Typography color="primary" sx={headerStyles.navItem}>
            {title}
          </Typography>
        </Link>
      ))}
      <AccountCircle htmlColor={colors.avaBG} fontSize="large" />
    </>
  ) : (
    <div />
  );
};
