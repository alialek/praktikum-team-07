import {
  useState,
  useRef,
  useEffect,
  MutableRefObject,
  SetStateAction,
  Dispatch,
} from 'react';
import { Game } from '@/game/Game';

interface UseCanvasProps {
  gameClass: typeof Game;
}

export const useCanvas = ({ gameClass }: UseCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(
    null,
  ) as MutableRefObject<HTMLCanvasElement>;
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const { requestAnimationFrame, cancelAnimationFrame } = window;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    let animationFrameId = 0;

    if (context) {
      const game = new gameClass({ context });

      const render = () => {
        game.draw();
        game.update();

        animationFrameId = requestAnimationFrame(render);
      };
      render();
    }

    return () => cancelAnimationFrame(animationFrameId);
  });

  return [canvasRef, isRunning, setIsRunning] as [
    MutableRefObject<HTMLCanvasElement>,
    boolean,
    Dispatch<SetStateAction<boolean>>,
  ];
};
