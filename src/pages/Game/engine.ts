import pauseIcon from '../../images/pause.png';
import brickIcon from '../../images/brick.png';
import { isServer } from '../../utils/isServer';

let imgPause: HTMLImageElement;
let imgBrick: HTMLImageElement;

if (!isServer) {
  imgBrick = new Image();
  imgPause = new Image();
  imgBrick.src = brickIcon;
  imgPause.src = pauseIcon;
}
const brickWidth = 120; // Ширина кирпича
const brickPadding = 4; // Отступ кирпича
const brickHeight = 60; // Высота кирпича
const brickRowCount = 3; // Кол-во строк кирпичей
const brickOffsetTop = 50; // Смещение по Y первого ряда кирпичей от верхнего края

const ballSpeedNormal = 3; // Скорость мяча (приращения по X и Y координатам)
const ballSpeedBoost = ballSpeedNormal * 3; // Скорость мяча (при нажатой SHIFT)
const paddleSpeed = ballSpeedNormal * 3; // Скорость ракетки

const screenBackground = '#000000'; // Цвет заливки экрана
const colorBallModeNormal = '#ffffff'; // Цвет мяча в обычном режиме
const colorBallModeBoost = '#ffff77'; // Цвет мяча в режиме Boost
const colorPaddle = '#3287fc'; // Цвет ракетки
const colorText = '#ffffff'; // Цвет надписей статистики (Score, Lives)
const colorCountdownText = '#ffffff'; // Цвет текста обратного отсчета

const ballRadius = 10; // Радиус мяча
const paddleHeight = 12; // Высота ракетки
const paddleWidth = 150; // Ширина ракетки
const kSpeed = 0.05; // Коэффициент, определяющий дельту приращения по x и y

let x: number; // Координата X мяча
let y: number; // Координата Y мяча
let dx: number; // Приращение координаты X мяча
let dy: number; // Приращение координаты Y мяча
let paddleX: number; // Координата X ракетки
let score: number; // Очки (отображаются в верхнем углу слева)
let lives: number; // Жизни (отображаются в верхнем углу справа)
let brickColCount: number; // Кол-во рядов кирпичей
let brickOffsetLeft: number; // Расстояние до левого края самого левого кирпича
let rightPressed: boolean; // Флаг нажатия стрелки Right
let leftPressed: boolean; // Флаг нажатия стрелки Left
let isBoostBallModeActive: boolean; // Если true - то мяч движется быстрее чем обычно
let animationTime = 2999; // Время в мс (для анимации обратного отсчета)
let frameTime = 16; // Время одного фрейма в мс
let isBallInsidePaddle = false; // Флаг: было касание мячом ракетки или нет

let tPrev = 0; // timestamp предыдущий (для подсчета времени кадра)

export enum EStep {
  'INIT', // Инициализация (сбрасываем значения в дефолтные)
  'RUNNING', // Игра запущена
  'PAUSED' // Игра на паузе
}
export let step = EStep.INIT;
export let isGameOver = false;
export let roundWin = false;

type TBrickStatus = 'ACTIVE' | 'DELETED';

interface IBrick {
  x: number;
  y: number;
  status: TBrickStatus;
}

let bricks: IBrick[][];

export function resetGameIfNeeded(isReset: boolean) {
  step = isReset ? EStep.INIT : step;
}

/** Обработчик нажатия клавиши (событие keydown) */
export function keyDownHandler(e: KeyboardEvent) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = true;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = true;
  }
  if (e.key === 'Shift') {
    isBoostBallModeActive = true;
    dx = dx > 0 ? ballSpeedBoost : -ballSpeedBoost;
    dy = dy > 0 ? ballSpeedBoost : -ballSpeedBoost;
  }
}

/** Обработчик отпускания клавиши (событие keyup) */
export function keyUpHandler(e: KeyboardEvent) {
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    rightPressed = false;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    leftPressed = false;
  }
  if (e.key === 'Shift') {
    isBoostBallModeActive = false;
    dx = dx > 0 ? ballSpeedNormal : -ballSpeedNormal;
    dy = dy > 0 ? ballSpeedNormal : -ballSpeedNormal;
  }
}

/** Обработчик нажатия клавиши (событие keypress) */
export function keySpaceHandler(e: KeyboardEvent) {
  if (e.key === ' ') {
    step = step === EStep.RUNNING ? EStep.PAUSED : EStep.RUNNING;
  }
}

/** Заполняет массив кирпичей (bricks). Рассчитывает кол-во кирпичей в ряду по ширине экрана */
export function fillBricksRow(ctx: CanvasRenderingContext2D) {
  const brickTotalWidth = brickWidth + brickPadding;
  brickColCount = Math.floor(ctx.canvas.width / brickTotalWidth);
  brickOffsetLeft = Math.floor((ctx.canvas.width - brickColCount * brickTotalWidth) / 2
    + brickPadding / 2);
  bricks = Array.from(
    { length: brickRowCount },
    () => Array.from({ length: brickColCount }, () => ({ x: 0, y: 0, status: 'ACTIVE' }))
  );
}

/** Сбрасывает значения в дефолтные */
export function resetGame(ctx: CanvasRenderingContext2D) {
  x = ctx.canvas.width / 2;
  y = ctx.canvas.height - ballRadius - paddleHeight;
  paddleX = (ctx.canvas.width - paddleWidth) / 2;
  rightPressed = false;
  leftPressed = false;
  isBoostBallModeActive = false; // Если true - то мяч движется быстрее чем обычно
  score = 0;
  lives = 3;
  dx = ballSpeedNormal;
  dy = -ballSpeedNormal;

  fillBricksRow(ctx);
  animationTime = 2999;
  isGameOver = false;
  step = EStep.RUNNING;
}

/** Функция расчета времени кадра */
export function calcFrameTime() {
  const tNow = performance.now();
  tPrev = tPrev === 0 ? tNow - 16 : tPrev;

  // Обработка старта (когда tPrev === 0) и нажатия паузы (когда delta -> ♾)
  frameTime = (tNow - tPrev) > 100 ? 16 : tNow - tPrev;
  tPrev = tNow;

  // Расчет времени анимации обратного отсчета
  if (animationTime - frameTime > 0) {
    animationTime -= frameTime;
  } else {
    animationTime = 0;
  }
}

/** Функция обработки координат мяча и касания мячом ракетки */
export function processCoordinates(ctx: CanvasRenderingContext2D) {
  if (isGameOver) {
    return;
  }

  const ballLeft = x - ballRadius;
  const ballRight = x + ballRadius;
  const ballTop = y - ballRadius;

  x += (frameTime * dx) * kSpeed;
  y += (frameTime * dy) * kSpeed;

  if (rightPressed) {
    const paddleEnd = paddleX + paddleWidth + paddleSpeed;

    if (paddleEnd <= ctx.canvas.width) {
      paddleX += paddleSpeed;
    } else {
      paddleX = ctx.canvas.width - paddleWidth;
    }
  }

  if (leftPressed) {
    const paddleStart = paddleX - paddleSpeed;

    if (paddleStart >= 0) {
      paddleX -= paddleSpeed;
    } else {
      paddleX = 0;
    }
  }

  isBallInsidePaddle = checkBallCollisionWith(
    paddleX + paddleWidth / 2,
    ctx.canvas.height - paddleHeight / 2,
    paddleWidth,
    paddleHeight
  );

  if (ballLeft + dx < 0 || ballRight + dx > ctx.canvas.width) {
    dx = -dx;
  }

  if (ballTop + dy < 0) {
    dy = -dy;
  }

  if (ballTop >= ctx.canvas.height) {
    lives -= 1;
    if (!lives) {
      roundWin = false;
      isGameOver = true;
    } else {
      x = ctx.canvas.width / 2;
      y = ctx.canvas.height - ballRadius - paddleHeight;
      dx = isBoostBallModeActive ? ballSpeedBoost : ballSpeedNormal;
      dy = isBoostBallModeActive ? -ballSpeedBoost : -ballSpeedNormal;
      paddleX = (ctx.canvas.width - paddleWidth) / 2;
    }
  }
}

/**
 * Функция обработки столкновений мяча с кирпичом либо ракеткой
 * @param objectCenterX - координата по оси X центра объекта
 * @param objectCenterY - координата по оси Y центра объекта
 * @param objectWidth - ширина объекта
 * @param objectHeight - высота объекта
 * */
export function checkBallCollisionWith(
  objectCenterX: number,
  objectCenterY: number,
  objectWidth: number,
  objectHeight: number
): boolean {
  const xDistance = Math.abs(x - objectCenterX) - objectWidth / 2;
  const yDistance = Math.abs(y - objectCenterY) - objectHeight / 2;

  if (
    (xDistance <= ballRadius && yDistance <= 0)
    || (yDistance <= ballRadius && xDistance <= 0)
    || (xDistance ** 2 + yDistance ** 2 <= ballRadius ** 2)
  ) {
    handleCollision(xDistance, yDistance);

    return true;
  }

  return false;
}

function handleCollision(xDistance: number, yDistance: number): void {
  if (isBallInsidePaddle) {
    return;
  }

  if (xDistance < yDistance) {
    dy = -dy;
  } else if (xDistance === yDistance) {
    dx = -dx;
    dy = -dy;
  } else {
    dx = -dx;
  }
}

/** Функция обработки касания мячом кирпичей */
export function bricksCollisionDetection() {
  for (let r = 0; r < brickRowCount; r += 1) {
    for (let c = 0; c < brickColCount; c += 1) {
      const brick = bricks[r][c];
      if (brick.status === 'ACTIVE') {
        if (checkBallCollisionWith(
          brick.x + brickWidth / 2,
          brick.y + brickHeight / 2,
          brickWidth,
          brickHeight
        )) {
          brick.status = 'DELETED';
          score += 1;
          if (score === brickColCount * brickRowCount) {
            roundWin = true;
            isGameOver = true;
          }
        }
      }
    }
  }
}

/** Функция отображения иконки паузы посередине экрана */
export function drawPause(ctx: CanvasRenderingContext2D) {
  ctx.drawImage(imgPause, ctx.canvas.width / 2 - 50, ctx.canvas.height / 2 - 50, 128, 128);
}

/** Функция очистки экрана */
export function ClearAll(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.fillStyle = screenBackground;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.fill();
}

/** Отображение мяча */
export function drawBall(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = isBoostBallModeActive ? colorBallModeBoost : colorBallModeNormal;
  ctx.fill();
  ctx.closePath();
}

/** Отображение ракетки */
export function drawPaddle(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.rect(paddleX, ctx.canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = colorPaddle;
  ctx.fill();
  ctx.closePath();
}

/** Отображение кирпичей */
export function drawBricks(ctx: CanvasRenderingContext2D) {
  for (let c = 0; c < brickRowCount; c += 1) {
    for (let r = 0; r < brickColCount; r += 1) {
      if (bricks[c][r].status === 'ACTIVE') {
        const brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
        const brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.drawImage(imgBrick, brickX, brickY, brickWidth, brickHeight);
      }
    }
  }
}

/**
 * Отображает текст на экране
 * @param ctx - Canvas context
 * @param text - текст для отображения
 * @param color - цвет текста
 * @param fontSize - размер шрифта
 * @param offsetX - смещение по оси X
 * @param offsetY - смещение по оси Y
 * */
function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  color: string,
  fontSize: number,
  offsetX: number,
  offsetY: number
) {
  ctx.font = `${fontSize}px Righteous`;
  ctx.fillStyle = color;
  ctx.fillText(text, offsetX, offsetY);
}

/** Отображение очков */
export function drawScore(ctx: CanvasRenderingContext2D) {
  drawText(ctx, `Score: ${score}`, colorText, 20, 15, 25);
}

/** Отображение жизней */
export function drawLives(ctx: CanvasRenderingContext2D) {
  drawText(ctx, `Lives: ${lives}`, colorText, 20, ctx.canvas.width - 85, 25);
}

/** Отображение жизней */
export function showCountdownAnimation(ctx: CanvasRenderingContext2D) {
  const offsetX = ctx.canvas.width / 2 - 40;
  const offsetY = ctx.canvas.height / 2 + 50;
  const displayNumber = Math.ceil(animationTime / 1000);

  drawText(ctx, String(displayNumber), colorCountdownText, 150, offsetX, offsetY);
}

export const isAnimationActive = () => !!animationTime;
