import React, { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { endStyles } from '@/pages/EndPage/Styles';
import CanvasComponent from '@/components/Canvas/Canvas';
import {
  PAUSE_GAME_TEXT,
  START_GAME_TEXT,
  END_TEXT,
  RECORD_TEXT,
  COUNT_TEXT,
} from '@/сonstants/text';

export const EndPage = () => {
  const [isInitial, removeInitial] = useState<boolean>(true);
  const [isStarted, setStarted] = useState<boolean>(false);

  function handleStartButtonClick() {
    setStarted(!isStarted);
    removeInitial(isInitial);
  }

  const handleStart = () => {
    setStarted(!isStarted);
  };

  return (
    <>
      <Box sx={endStyles.boxWrapper}>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <Grid item xs={12}>
            {isInitial ? (
              <Box sx={endStyles.welcomeBox}>
                <Grid sx={endStyles.wrapperCount}>
                  <Typography variant="h5">
                    {COUNT_TEXT} {}
                  </Typography>
                  <Typography variant="h5">
                    {RECORD_TEXT} {}
                  </Typography>
                </Grid>
                <Grid sx={endStyles.wrapperTitle}>
                  <Typography sx={endStyles.title} variant="h3">
                    {END_TEXT}
                    <Box sx={endStyles.img as React.CSSProperties} />
                  </Typography>
                </Grid>
              </Box>
            ) : (
              <CanvasComponent></CanvasComponent>
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
                onClick={handleStartButtonClick}
                startIcon={<PlayArrowIcon />}
              >
                {START_GAME_TEXT}
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
