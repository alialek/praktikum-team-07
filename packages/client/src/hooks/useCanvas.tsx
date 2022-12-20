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
      });

      const render = () => {
        game.draw();
        game.update();

        animationFrameId = requestAnimationFrame(render);
      };
      render();
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isRunning, GameClass, requestAnimationFrame, cancelAnimationFrame, isPaused]);

  return [canvasRef, isRunning, setIsRunning, setIsPaused] as [
    MutableRefObject<HTMLCanvasElement>,
    boolean,
    Dispatch<SetStateAction<boolean>>,
    Dispatch<SetStateAction<boolean>>,
  ];
};
