import {
  useState,
  useRef,
  useEffect,
  MutableRefObject,
  SetStateAction,
  Dispatch,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { EndGamePagePath } from '@/router/paths';
import { GameType } from '@/game/Game';
import { Boom } from '@/game/Boom';
import boomImageSrc from '@/assets/images/boom.png';

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

    if (context && !isRunning && localStorage.isReload !== 'true') {
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
      setTimeout(() => {
        localStorage.removeItem('gameSpeed');
        localStorage.removeItem('gameFrame');
        navigate(EndGamePagePath.path);
      }, 2000);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      cancelAnimationFrame(animationFrameIdBoom);
    };
  }, [isRunning, isPaused, GameClass, requestAnimationFrame, cancelAnimationFrame]);

  return [canvasRef, isRunning, isPaused, setIsRunning, setIsPaused, setCords] as [
    MutableRefObject<HTMLCanvasElement>,
    boolean,
    boolean,
    Dispatch<SetStateAction<boolean>>,
    Dispatch<SetStateAction<boolean>>,
    Dispatch<SetStateAction<Record<string, number>>>,
  ];
};
