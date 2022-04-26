import React, { useEffect, useRef } from 'react';
import './Canvas.scss';

interface ICanvasProps {
  draw: Function;
}

const Canvas: React.FC<ICanvasProps> = ({ draw }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const container = containerRef.current!;
    canvas.height = container.clientHeight;
    canvas.width = container.clientWidth;

    const context = canvas.getContext('2d');
    let animationFrameId: number;

    const render = () => {
      draw(context);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return <div ref={containerRef} className={'canvas-container'}>
    <canvas ref={canvasRef} />
  </div>;
};

export default Canvas;
