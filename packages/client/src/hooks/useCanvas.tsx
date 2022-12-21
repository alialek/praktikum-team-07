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
  const [isRunning, setIsRunning] = useState(true);

  const { requestAnimationFrame, cancelAnimationFrame } = window;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    let animationFrameId = 0;
    if (context && isRunning) {
      const game = new GameClass({ context, setIsRunning });
      const render = () => {
        game.draw();
        game.update();

        animationFrameId = requestAnimationFrame(render);
      };
      render();
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isRunning, GameClass, requestAnimationFrame, cancelAnimationFrame]);

  return [canvasRef, isRunning, setIsRunning] as [
    MutableRefObject<HTMLCanvasElement>,
    boolean,
    Dispatch<SetStateAction<boolean>>,
  ];
};
