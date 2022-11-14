import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as RouterLink } from 'react-router-dom';
import { AccountCircle } from '@mui/icons-material';
import { Link } from '@mui/material';
import {
  LeadersPagePath,
  ProfilePagePath,
  ForumPagePath,
  SigninPagePath,
} from '@/router/paths';
import {
  FORUM_TEXT,
  GAME_NAME_TEXT,
  LEADERS_TEXT,
  LOGOUT_TEXT,
  PROFILE_TEXT,
} from '@/сonstants/text';
import { headerStyles } from './Styles';

const settings = [
  {
    title: PROFILE_TEXT,
    link: ProfilePagePath.path,
  },
  {
    title: LEADERS_TEXT,
    link: LeadersPagePath.path,
  },
  {
    title: FORUM_TEXT,
    link: ForumPagePath.path,
  },
  {
    title: LOGOUT_TEXT,
    link: SigninPagePath.path,
  },
];

export const Header: React.FC = () => {
  return (
    <AppBar position="sticky" sx={headerStyles.appBar}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/" underline="none" component={RouterLink}>
            <Typography
              color="primary"
              sx={{
                fontWeight: 600,
              }}
            >
              {GAME_NAME_TEXT}
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />
          <Box sx={headerStyles.nav}>
            {settings.map(({ title, link }) => (
              <Link to={link} underline="none" component={RouterLink} key={title}>
                <Typography color="primary" sx={headerStyles.navItem}>
                  {title}
                </Typography>
              </Link>
            ))}

            <AccountCircle htmlColor="#bdbdbd" fontSize="large" />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
