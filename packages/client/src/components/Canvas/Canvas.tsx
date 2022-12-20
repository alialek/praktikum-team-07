import React from 'react';
import { Button, Grid } from '@mui/material';
import { Pause, Replay, Stop } from '@mui/icons-material';
import { Game } from '@/game/Game';
import { useCanvas } from '@/hooks/useCanvas';
import { PAUSE_GAME, PLAY_GAME_AGAIN, STOP_GAME } from '@/сonstants/game';

interface CanvasProps {
  onStop: () => void;
}

export const Canvas: React.FC<CanvasProps> = ({ onStop }) => {
  const [canvasRef, isRunning, setIsRunning] = useCanvas({ GameClass: Game });

  const handlePause = () => {
    setIsRunning(!isRunning);
  };

  const handlePlayAgain = () => {
    setIsRunning(false);

    setTimeout(() => {
      setIsRunning(true);
    }, 0);
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
        <canvas
          ref={canvasRef}
          width={1000}
          height={472}
          style={{ borderRadius: '32px', border: '4px solid #000' }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handlePause}
          startIcon={<Pause />}
        >
          {PAUSE_GAME}
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={handlePlayAgain}
          startIcon={<Replay />}
        >
          {PLAY_GAME_AGAIN}
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={onStop}
          startIcon={<Stop />}
        >
          {STOP_GAME}
        </Button>
      </Grid>
    </Grid>
  );
};
