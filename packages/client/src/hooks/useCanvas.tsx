import {
    useState,
    useRef,
    useEffect,
    MutableRefObject,
    SetStateAction,
    Dispatch,
} from 'react';
// import draw from '../Game/game'; Основной движок игры

export const useCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(
        null,
    ) as MutableRefObject<HTMLCanvasElement>;
    const [isRefreshed, setRefreshed] = useState<boolean>(false);

    const { requestAnimationFrame, cancelAnimationFrame } = window;

    useEffect(() => {
        const canvas = canvasRef.current;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const context = canvas.getContext('2d');

        let animationFrameId = 0;

        const render = () => {
            // draw(context as CanvasRenderingContext2D, isRefreshed, setRefreshed);
            // Разблокировать как появится движок
            animationFrameId = requestAnimationFrame(render);
        };
        render();

        return () => cancelAnimationFrame(animationFrameId);
    });

    return [canvasRef, isRefreshed, setRefreshed] as [
        MutableRefObject<HTMLCanvasElement>,
        boolean,
        Dispatch<SetStateAction<boolean>>,
    ];
};
