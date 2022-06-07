import React, { useEffect, useRef, useState } from 'react';
import './Canvas.scss';
import ModalGameOver from '../ModalGameOver/ModalGameOver';
import { isGameOver, roundWin, score } from '../../engine';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { addUserToLeaderboard } from '../../../../store/slice/leaderboardSlice';
import { useAppSelector } from '../../../../hooks/useAppSelector';

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

  useEffect(() => {
    setIsShowModal(isGameOver);
    setIsRoundWin(roundWin);
    isGameOver && dispatch(addUserToLeaderboard({ score, userId: user.id }));
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
