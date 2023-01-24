import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import { RootPath } from '@/router/paths';
import { endGameStyles } from './Styles';
import { PLAY_GAME_AGAIN, END_TEXT, RECORD_TEXT, COUNT_TEXT } from '@/сonstants/game';

export const EndGame = () => {
  return (
    <Box>
      <Box sx={endGameStyles.welcomeBox}>
        <Grid sx={endGameStyles.wrapperCount}>
          <Typography variant="h6">
            {COUNT_TEXT} {localStorage.getItem('gameScore')}
          </Typography>
          <Typography variant="h6">
            {RECORD_TEXT} {localStorage.getItem('bestScore')}
          </Typography>
        </Grid>
        <Grid sx={endGameStyles.wrapperTitle}>
          <Typography sx={endGameStyles.title} variant="h4">
            {END_TEXT}
            <Box sx={endGameStyles.img} />
          </Typography>
        </Grid>
      </Box>
      <Grid item xs={12} sx={endGameStyles.buttonWrapper}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PlayArrow />}
          component={Link}
          to={RootPath.path}
        >
          {PLAY_GAME_AGAIN}
        </Button>
      </Grid>
    </Box>
  );
};
