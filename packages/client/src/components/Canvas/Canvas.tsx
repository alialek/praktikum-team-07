import React, { MutableRefObject, useRef } from 'react';
import { Button, Grid } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { useEffect } from 'react';
import { useCanvas } from '@/hooks/useCanvas';
import { Game } from '@/game/Game';
import { PLAY_AGAIN } from '@/сonstants/game';

export const Canvas: React.FC = () => {
  const [canvasRef, isRunning, setIsRunning] = useCanvas({ gameClass: Game });

  const handleRefreshCanvas = () => {
    setIsRunning(!isRunning);
  };

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <Grid item xs={12}>
        <canvas ref={canvasRef} width={1000} height={472} />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleRefreshCanvas}
          startIcon={<ReplayIcon />}
        >
          {PLAY_AGAIN}
        </Button>
      </Grid>
    </Grid>
  );
};
