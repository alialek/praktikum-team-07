import React from 'react';
import { Button, Grid } from '@mui/material';
import { Pause, Replay, Stop, PlayCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Game } from '@/game/Game';
import { useCanvas } from '@/hooks/useCanvas';
import { PAUSE_GAME, PLAY_GAME, PLAY_GAME_AGAIN, STOP_GAME } from '@/сonstants/game';
import { EndGamePagePath } from '@/router/paths';

interface CanvasProps {
  onStop: () => void;
}
export const Canvas: React.FC<CanvasProps> = () => {
  const [canvasRef, isRunning, isPaused, setIsRunning, setIsPaused] = useCanvas({
    GameClass: Game,
  });
  const navigate = useNavigate();

  function handlePause() {
    const _isPaused = localStorage.getItem('isPaused');
    if (_isPaused === 'true') {
      setIsPaused(false);
      localStorage.setItem('isPaused', 'false');
    } else {
      setIsPaused(true);
    }
  }

  const handlePlayAgain = () => {
    setIsRunning(!isRunning);
    localStorage.setItem('isReload', 'true');

    setTimeout(() => {
      Object.entries(localStorage).forEach(([key]) => {
        if (!key.includes('bestScore')) delete localStorage[key];
      });
      setIsRunning(true);
      localStorage.setItem('isReload', 'false');
    }, 0);
  };

  const handleStop = () => {
    // eslint-disable-next-line no-unused-expressions
    setIsRunning(!isRunning);
    navigate(EndGamePagePath.path);
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
      <Grid container justifyContent="space-around" alignItems="center" item xs={12}>
        <Grid item>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handlePause}
            startIcon={isPaused ? <PlayCircle /> : <Pause />}
          >
            {isPaused ? PLAY_GAME : PAUSE_GAME}
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handlePlayAgain}
            startIcon={<Replay />}
          >
            {PLAY_GAME_AGAIN}
          </Button>
        </Grid>

        <Grid item>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleStop}
            startIcon={<Stop />}
          >
            {STOP_GAME}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
