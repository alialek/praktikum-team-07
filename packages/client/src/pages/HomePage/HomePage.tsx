import React, { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { useLocation } from 'react-router-dom';
import CanvasComponent from '@/components/Canvas/Canvas';
import {
  CONTROL_TEXT,
  PAUSE_GAME_TEXT,
  START_GAME_TEXT,
  WELCOME_TEXT,
} from '@/сonstants/text';
import { homeStyles } from './Styles';

export const HomePage = () => {
  const { state } = useLocation();
  const [isStarted, setStarted] = useState(() => {
    if (state?.previousPath === '/end') {
      return true;
    }
    return false;
  });

  const handleStart = () => setStarted(!isStarted);

  return (
    <Box sx={homeStyles.boxWrapper}>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Grid item xs={12}>
          {isStarted ? (
            <CanvasComponent />
          ) : (
            <Box sx={homeStyles.welcomeBox}>
              <Typography variant="h5" component="div" gutterBottom>
                {WELCOME_TEXT}
              </Typography>
              <Typography variant="body2" component="div" gutterBottom>
                {CONTROL_TEXT}
              </Typography>
            </Box>
          )}
        </Grid>
        <Grid item xs={12}>
          {isStarted ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleStart}
              startIcon={<PauseIcon />}
            >
              {PAUSE_GAME_TEXT}
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleStart}
              startIcon={<PlayArrowIcon />}
            >
              {START_GAME_TEXT}
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
