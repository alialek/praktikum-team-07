import {
  useState,
  useRef,
  useEffect,
  MutableRefObject,
  SetStateAction,
  Dispatch,
} from 'react';
import { GameType } from '@/game/Game';

interface UseCanvasProps {
  GameClass: GameType;
}

export const useCanvas = ({ GameClass }: UseCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(
    null,
  ) as MutableRefObject<HTMLCanvasElement>;
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const gameSpeed = parseInt(JSON.parse(localStorage.getItem('gameSpeed') || '1'), 10);
  const gameScore = parseInt(JSON.parse(localStorage.getItem('gameScore') || '0'), 10);
  const gameFrame = parseInt(JSON.parse(localStorage.getItem('gameFrame') || '0'), 10);

  const { requestAnimationFrame, cancelAnimationFrame } = window;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    let animationFrameId = 0;

    if (context && isRunning) {
      const game = new GameClass({
        context,
        setIsRunning,
        isPaused,
        gameSpeed,
        gameScore,
        gameFrame,
      });

      const render = () => {
        game.draw();
        game.update();

        animationFrameId = requestAnimationFrame(render);
      };
      render();
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [
    isRunning,
    GameClass,
    requestAnimationFrame,
    cancelAnimationFrame,
    gameFrame,
    gameSpeed,
    gameScore,
    isPaused,
  ]);

  return [canvasRef, isRunning, setIsRunning, setIsPaused] as [
    MutableRefObject<HTMLCanvasElement>,
    boolean,
    Dispatch<SetStateAction<boolean>>,
    Dispatch<SetStateAction<boolean>>,
  ];
};
