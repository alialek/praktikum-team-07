/* eslint-disable camelcase */
import {
  useState,
  useRef,
  useEffect,
  MutableRefObject,
  SetStateAction,
  Dispatch,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { EndGamePagePath } from '@/router/paths';
import { GameType } from '@/game/Game';
import { Boom } from '@/game/Boom';
import boomImageSrc from '@/assets/images/boom.png';
import { AppDispatch } from '@/store/store';
import { addNewLeader, getAllLeaders } from '@/store/leaders/leaders.action';

import { useAppSelector } from '@/hooks';
import { showUserData } from '@/store/user/user.slice';
import { Leader } from '@/models/leader.model';
import { window } from '@/utils/ssrWindow';

interface UseCanvasProps {
  GameClass: GameType;
}

export const useCanvas = ({ GameClass }: UseCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(
    null,
  ) as MutableRefObject<HTMLCanvasElement>;
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [cords, setCords] = useState<Record<string, number>>({});

  const { requestAnimationFrame, cancelAnimationFrame } = window;

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { profile: user } = useAppSelector(showUserData);
  const { display_name, avatar, login } = user;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    let animationFrameId = 0;
    let animationFrameIdBoom = 0;
    if (context && isRunning) {
      const game = new GameClass({
        context,
        setIsRunning,
        setCords,
        isPaused,
      });

      const render = () => {
        game.draw();
        game.update();

        animationFrameId = requestAnimationFrame(render);
      };
      render();
    }

    if (context && !isRunning && window.localStorage.isReload !== 'true') {
      const boom = new Boom({
        context,
        boomImageSrc,
        width: 96,
        height: 96,
      });

      const render = () => {
        boom.draw(cords.hero, cords.enemy);
        boom.update();

        animationFrameIdBoom = requestAnimationFrame(render);
      };
      render();
      const data: Leader = {
        user_name: display_name || login,
        avatar,
        score: parseInt(window.localStorage.getItem('bestScore') || '0', 10),
      };
      dispatch(
        addNewLeader({ ratingFieldName: 'score', data, teamName: 'atom_dream_team' }),
      );
      dispatch(getAllLeaders({ ratingFieldName: 'score', cursor: 0, limit: 10 }));
      setTimeout(() => {
        window.localStorage.removeItem('gameSpeed');
        window.localStorage.removeItem('gameFrame');
        navigate(EndGamePagePath.path);
      }, 2000);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      cancelAnimationFrame(animationFrameIdBoom);
    };
  }, [
    isRunning,
    isPaused,
    GameClass,
    requestAnimationFrame,
    cancelAnimationFrame,
    cords,
  ]);

  return [canvasRef, isRunning, isPaused, setIsRunning, setIsPaused, setCords] as [
    MutableRefObject<HTMLCanvasElement>,
    boolean,
    boolean,
    Dispatch<SetStateAction<boolean>>,
    Dispatch<SetStateAction<boolean>>,
    Dispatch<SetStateAction<Record<string, number>>>,
  ];
};
