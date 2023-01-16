import * as React from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { AccountCircle } from '@mui/icons-material';
import { LOGOUT_TEXT } from '@/сonstants/text';
import { AuthService } from '@/api/services/auth';
import { headerStyles } from '@/components/Header/Styles';
import { AppDispatch } from '@/store/store';
import colors from '@/colors';
import { SETTINGS } from '@/components/Nav/settings';

export const Nav = () => {
  const dispatch = useDispatch<ThunkDispatch<AppDispatch, Promise<AxiosResponse>, any>>();
  const isLoggedIn = Boolean(localStorage.getItem('user_in'));

  return isLoggedIn ? (
    <>
      {SETTINGS.map(({ title, link }) => (
        <Link
          to={link}
          underline="none"
          component={RouterLink}
          key={title}
          onClick={() => title === LOGOUT_TEXT && dispatch(AuthService.logout())}
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
