import React, { useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { endStyles } from '@/pages/EndPage/Styles';
import CanvasComponent from '@/components/Canvas/Canvas';
import boomSprite from '../../img/boomSprite.png';
import {
  PAUSE_GAME_TEXT,
  START_GAME_TEXT,
  END_TEXT,
  RECORD_TEXT,
  COUNT_TEXT,
} from '@/сonstants/text';

export const EndPage = () => {
  const [isStarted, setStarted] = useState<boolean>(false);

  const handleStart = () => setStarted(!isStarted);

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
            {isStarted ? (
              <CanvasComponent />
            ) : (
              <Typography sx={endStyles.welcomeBox}>
                <Box sx={endStyles.wrapperBox}>
                  <Typography variant="h5" component="div" gutterBottom>
                    {COUNT_TEXT}
                  </Typography>
                  <Typography variant="h5" component="div" gutterBottom>
                    {RECORD_TEXT}
                  </Typography>
                </Box>
                <Typography variant="h3" component="div" gutterBottom>
                  {END_TEXT}
                </Typography>
                <Box style={endStyles.wrapperImg as React.CSSProperties}>
                  <img style={endStyles.img as React.CSSProperties} src={boomSprite} />
                </Box>
              </Typography>
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
    </>
  );
};
