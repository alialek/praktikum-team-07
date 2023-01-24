/* eslint-disable camelcase */
import React from 'react';
import { Button, Grid } from '@mui/material';
import { Pause, Replay, Stop, PlayCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Game } from '@/game/Game';
import { useCanvas } from '@/hooks/useCanvas';
import { PAUSE_GAME, PLAY_GAME, PLAY_GAME_AGAIN, STOP_GAME } from '@/сonstants/game';
import { EndGamePagePath } from '@/router/paths';
import { AppDispatch } from '@/store/store';
import { useAppSelector } from '@/hooks';
import { showUserData } from '@/store/user/user.slice';
import { addNewLeader, getAllLeaders } from '@/store/leaders/leaders.action';
import { Leader } from '@/models/leader.model';
import { window } from '@/utils/ssrWindow';

export const Canvas = () => {
  const [canvasRef, isRunning, isPaused, setIsRunning, setIsPaused] = useCanvas({
    GameClass: Game,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { profile: user } = useAppSelector(showUserData);
  const { display_name, avatar } = user;

  function handlePause() {
    const _isPaused = window.localStorage.getItem('isPaused');
    if (_isPaused === 'true') {
      setIsPaused(false);
      window.localStorage.setItem('isPaused', 'false');
    } else {
      setIsPaused(true);
    }
  }

  const handlePlayAgain = () => {
    setIsRunning(!isRunning);
    window.localStorage.setItem('isReload', 'true');

    setTimeout(() => {
      Object.entries(window.localStorage).forEach(([key]) => {
        if (!key.includes('bestScore') && !key.includes('user_in'))
          window.localStorage.removeItem(key);
      });
      setIsRunning(true);
      window.localStorage.setItem('isReload', 'false');
    }, 0);
  };

  const handleStop = () => {
    setIsRunning(!isRunning);
    const data: Leader = {
      user_name: display_name,
      avatar,
      score: parseInt(window.localStorage.getItem('bestScore') || '0', 10),
    };
    dispatch(
      addNewLeader({ ratingFieldName: 'score', data, teamName: 'atom_dream_team' }),
    );
    dispatch(getAllLeaders({ ratingFieldName: 'score', cursor: 0, limit: 10 }));
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
