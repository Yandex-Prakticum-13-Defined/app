import React, { useEffect, useRef, useState } from 'react';
import './Canvas.scss';
import ModalGameOver from '../ModalGameOver/ModalGameOver';
import { isGameOver, roundWin } from '../../engine';

interface ICanvasProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  draw: Function;
}

const Canvas: React.FC<ICanvasProps> = ({ draw }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [isRoundWin, setIsRoundWin] = useState(false);

  useEffect(() => {
    setIsShowModal(isGameOver);
    setIsRoundWin(roundWin);
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
