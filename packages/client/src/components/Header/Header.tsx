import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { GAME_NAME_TEXT } from '@/сonstants/text';
import { headerStyles } from './Styles';
import { ColorModeContext } from '@/components/ToggleColorMode';
import { Nav } from '@/components/Nav/Nav';

export const Header = () => {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <AppBar position="sticky" sx={headerStyles.appBar} color="inherit">
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
            <Nav />
            <IconButton
              sx={{ ml: 1 }}
              onClick={colorMode?.toggleColorMode as () => void}
              color="inherit"
            >
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
