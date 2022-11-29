import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import { RootPath } from '@/router/paths';
import { endGameStyles } from './Styles';
import { PLAY_GAME_AGAIN, END_TEXT, RECORD_TEXT, COUNT_TEXT } from '@/сonstants/game';
import { WelcomeBox } from '../WelcomeBox';

export const EndGame = () => {
  const { pathname } = useLocation();

  return (
    <WelcomeBox>
      <Box sx={endGameStyles.welcomeBox}>
        <Grid sx={endGameStyles.wrapperCount}>
          <Typography variant="h6">{COUNT_TEXT}</Typography>
          <Typography variant="h6">{RECORD_TEXT}</Typography>
        </Grid>
        <Grid sx={endGameStyles.wrapperTitle}>
          <Typography sx={endGameStyles.title} variant="h3">
            {END_TEXT}
            <Box sx={endGameStyles.img} />
          </Typography>
        </Grid>
      </Box>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PlayArrow />}
          component={Link}
          to={RootPath.path}
          state={{ previousPath: pathname }}
        >
          {PLAY_GAME_AGAIN}
        </Button>
      </Grid>
    </WelcomeBox>
  );
};
