import React, {
  useCallback, useEffect, useRef, useState
} from 'react';
import './Canvas.scss';
import ModalGameOver from '../ModalGameOver/ModalGameOver';
import { isGameOver, roundWin, score } from '../../engine';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { addUserToLeaderboard } from '../../../../store/slice/leaderboardSlice';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { enterFullScreen, exitFullScreen, IEnterFullScreenElement } from '../../../../api/fullScreenApi';

interface ICanvasProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  draw: Function;
}

const Canvas: React.FC<ICanvasProps> = ({ draw }) => {
  const dispatch = useAppDispatch();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [isRoundWin, setIsRoundWin] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = useAppSelector((state) => state.user.data!);

  const doubleClickHandler = useCallback(() => {
    if (isGameOver) {
      return;
    }
    if (document.fullscreenElement) {
      exitFullScreen();
    } else {
      enterFullScreen(containerRef.current as unknown as IEnterFullScreenElement);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    addEventListener('dblclick', doubleClickHandler);

    return () => {
      // eslint-disable-next-line no-restricted-globals
      removeEventListener('dblclick', doubleClickHandler);
    };
  }, []);

  useEffect(() => {
    setIsShowModal(isGameOver);
    setIsRoundWin(roundWin);
    if (isGameOver) {
      dispatch(addUserToLeaderboard({ score, userId: user.id }));
      exitFullScreen();
    } else {
      enterFullScreen(containerRef.current as unknown as IEnterFullScreenElement);
    }
  }, [isGameOver]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const canvas = canvasRef.current!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const container = containerRef.current!;
    canvas.height = container.clientHeight;
    canvas.width = container.clientWidth;

    const context = canvas.getContext('2d');
    let animationFrameId: number;

    const render = () => {
      setIsShowModal(isGameOver);
      draw(context, isReset);
      setIsReset(false);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw, isReset]);

  const onResetGame = () => setIsReset(true);

  return (
    <div ref={containerRef} className='canvas-container'>
      {isShowModal && <ModalGameOver isRoundWin={isRoundWin} hideModal={onResetGame}/>}
      <canvas ref={canvasRef} className='canvas'/>
    </div>
  );
};

export default Canvas;
