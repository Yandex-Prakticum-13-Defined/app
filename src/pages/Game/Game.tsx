import React, { useEffect } from 'react';
import {
  ClearAll, collisionDetection,
  drawBall,
  drawBricks,
  drawLives,
  drawPaddle, drawPause,
  drawScore, EStep, isAnimationActive,
  keyDownHandler, keySpaceHandler,
  keyUpHandler, processCoordinates, resetGame, showCountdownAnimation, step
} from './engine';
import Canvas from './Canvas';

const Game: React.FC = () => {
  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);
    window.addEventListener('keypress', keySpaceHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
      window.removeEventListener('keyup', keyUpHandler);
      window.removeEventListener('keypress', keySpaceHandler);
    };
  }, []);

  /** Основная функция рисования */
  const draw = (ctx: CanvasRenderingContext2D) => {
    switch (step) {
      case EStep.INIT:
        resetGame(ctx);
        break;

      case EStep.RUNNING:
        ClearAll(ctx);
        drawBricks(ctx);
        drawBall(ctx);
        drawPaddle(ctx);
        drawScore(ctx);
        drawLives(ctx);

        if (isAnimationActive()) {
          showCountdownAnimation(ctx);
        } else {
          processCoordinates(ctx);
          collisionDetection();
        }
        break;

      case EStep.PAUSED:
        drawPause(ctx);
        break;

      default:
        break;
    }
  };

  return <Canvas draw={draw} />;
};

export default Game;
