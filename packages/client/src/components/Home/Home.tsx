import { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { Canvas } from '@/components/Canvas';
import { PLAY_GAME } from '@/сonstants/game';
import { CONTROL_TEXT, WELCOME_TEXT } from '@/сonstants/text';
import { EndGamePagePath } from '@/router/paths';
import { homeStyles } from './Styles';

export const Home = () => {
  const { state: locationState } = useLocation();
  const [isStarted, setStarted] = useState(
    locationState?.previousPath === EndGamePagePath.path,
  );

  const handleStart = () => {
    setStarted(!isStarted);
    Object.entries(localStorage).forEach(([key]) => {
      if (!key.includes('bestScore') && !key.includes('user_in'))
        localStorage.removeItem(key);
    });
  };
  return (
    <Box>
      <Grid item xs={12}>
        {isStarted ? (
          <Canvas />
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
      <Grid item xs={12} sx={homeStyles.buttonWrapper}>
        {!isStarted ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleStart}
            startIcon={<PlayArrow />}
          >
            {PLAY_GAME}
          </Button>
        ) : null}
      </Grid>
    </Box>
  );
};
