import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { RootPath } from '@/router/paths';
import { endGameStyles } from '@/pages/EndGamePage/Styles';
import { START_GAME_TEXT, END_TEXT, RECORD_TEXT, COUNT_TEXT } from '@/сonstants/game';

export const EndGamePage = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Box sx={endGameStyles.boxWrapper}>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
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
              startIcon={<PlayArrowIcon />}
              component={Link}
              to={RootPath.path}
              state={{ previousPath: pathname }}
            >
              {START_GAME_TEXT}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
