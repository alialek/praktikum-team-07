import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { NavLink } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';
import {
  LeadersPagePath,
  ProfilePagePath,
  ForumPagePath,
  SigninPagePath,
} from '@/router/paths';

const settings = [
  {
    title: 'ПРОФИЛЬ',
    link: ProfilePagePath.path,
  },
  {
    title: 'ЛИДЕРЫ',
    link: LeadersPagePath.path,
  },
  {
    title: 'ФОРУМ',
    link: ForumPagePath.path,
  },
  {
    title: 'ВЫЙТИ',
    link: SigninPagePath.path,
  },
];

export const Header: React.FC = () => {
  return (
    <AppBar
      position="sticky"
      sx={{ backgroundColor: '#FAFAFA', boxShadow: '0px -2px 10px black' }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            <Typography
              color="primary"
              sx={{
                fontWeight: 600,
              }}
            >
              ATOMIC CARS
            </Typography>
          </NavLink>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            {settings.map(({ title, link }) => (
              <NavLink to={link} style={{ textDecoration: 'none' }} key={title}>
                <Typography
                  color="primary"
                  sx={{
                    fontWeight: 600,
                    mr: 5,
                  }}
                >
                  {title}
                </Typography>
              </NavLink>
            ))}

            <AccountCircle htmlColor="#bdbdbd" fontSize="large" />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
