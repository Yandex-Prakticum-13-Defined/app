/** TODO: Разобраться с настройкой путей файлов и убрать ts-ignore! */
// @ts-ignore
import pause from '../../img/pause.png';

const img = new Image();
const brickWidth = 75; // Ширина кирпича
const brickPadding = 10; // отступ кирпича
const brickHeight = 60; // Высота кирпича
const brickRowCount = 3; // Кол-во строк кирпичей
const brickOffsetTop = 40; // Смещение по Y первого ряда кирпичей от верхнего края

const ballSpeedNormal = 2; // Скорость мяча (приращения по X и Y координатам)
const ballSpeedBoost = 8; // Скорость мяча (при нажатой SHIFT)
const paddleSpeed = 7; // Скорость ракетки

const screenBackground = '#000000'; // Цвет заливки экрана
const colorBallModeNormal = '#3287fc'; // Цвет мяча в обычном режиме
const colorBallModeBoost = '#ffffff'; // Цвет мяча в режиме Boost
const colorPaddle = '#ffffff'; // Цвет ракетки
const colorBricks = '#3287fc'; // Цвет кирпичей
const colorText = '#3287fc'; // Цвет надписей статистики (Score, Lives)
const colorCountdownText = '#ffffff'; // Цвет текста обратного отсчета

const ballRadius = 10; // Радиус мяча
const paddleHeight = 10; // Высота ракетки
const paddleWidth = 120; // Ширина ракетки

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
let framesCount: number; // Счетчик кол-ва кадров для анимации обратного отсчета

export enum EStep {
  'INIT', // Инициализация (сбрасываем значения в дефолтные)
  'RUNNING', // Игра запущена
  'PAUSED', // Игра на паузе
}
// eslint-disable-next-line import/no-mutable-exports
export let step = EStep.INIT;

type TBrickStatus = 'ACTIVE' | 'DELETED';

interface IBrick {
  x: number,
  y: number,
  status: TBrickStatus,
}

let bricks: IBrick[][];

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
    () => Array.from({ length: brickColCount }, () => ({ x: 0, y: 0, status: 'ACTIVE' })),
  );
}

/** Сбрасывает значения в дефолтные */
export function resetGame(ctx: CanvasRenderingContext2D) {
  x = ctx.canvas.width / 2;
  y = ctx.canvas.height - ballRadius - paddleHeight;
  paddleX = paddleX || (ctx.canvas.width - paddleWidth) / 2;
  rightPressed = false;
  leftPressed = false;
  isBoostBallModeActive = false; // Если true - то мяч движется быстрее чем обычно
  score = 0;
  lives = 3;
  dx = ballSpeedNormal;
  dy = -ballSpeedNormal;

  fillBricksRow(ctx);
  framesCount = 179;
  step = EStep.RUNNING;
}

/** Функция обработки координат мяча и касания мяча ракетки */
export function processCoordinates(ctx: CanvasRenderingContext2D) {
  if (x + dx > ctx.canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > ctx.canvas.height - ballRadius - paddleHeight) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives -= 1;
      if (!lives) {
        // eslint-disable-next-line no-alert
        alert('GAME OVER'); /** TODO: Временная мера - заменить красивую модалку! */
        step = EStep.INIT;
      } else {
        x = ctx.canvas.width / 2;
        y = ctx.canvas.height - ballRadius - paddleHeight;
        dx = isBoostBallModeActive ? ballSpeedBoost : ballSpeedNormal;
        dy = isBoostBallModeActive ? -ballSpeedBoost : -ballSpeedNormal;
      }
    }
  }
  x += dx;
  y += dy;
  if (rightPressed && paddleX < ctx.canvas.width - paddleWidth) {
    paddleX += paddleSpeed;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= paddleSpeed;
  }
}

/** Функция обработки касания кирпича сверху и снизу */
export function isUpDownCollision(brick: IBrick, ballTop: number, ballBottom: number) {
  const hasCollision = ((x > brick.x && x < brick.x + brickWidth)
    /** Обработка касания снизу */
    && ((dy < 0 && ballTop > brick.y && ballTop < brick.y + brickHeight)
      /** Обработка касания сверху */
      || (dy > 0 && ballBottom > brick.y && ballBottom < brick.y + brickHeight))
  );
  if (hasCollision) {
    dy = -dy;
  }

  return hasCollision;
}

/** Функция обработки касания кирпича слева и справа */
export function isLeftRightCollision(brick: IBrick, ballLeft: number, ballRight: number) {
  const hasCollision = ((y > brick.y && y < brick.y + brickHeight)
    /** Обработка касания слева */
    && ((dx > 0 && ballRight > brick.x && ballRight < brick.x + brickWidth)
      /** Обработка касания справа */
      || (dx < 0 && ballLeft > brick.x && ballLeft < brick.x + brickWidth))
  );
  if (hasCollision) {
    dx = -dx;
  }

  return hasCollision;
}

/** Функция обработки касания мяча кирпичей */
export function collisionDetection() {
  const ballTop = y - ballRadius;
  const ballBottom = y + ballRadius;
  const ballLeft = x - ballRadius;
  const ballRight = x + ballRadius;

  for (let r = 0; r < brickRowCount; r += 1) {
    for (let c = 0; c < brickColCount; c += 1) {
      const brick = bricks[r][c];
      if (brick.status === 'ACTIVE') {
        if (isUpDownCollision(brick, ballTop, ballBottom)
          || isLeftRightCollision(brick, ballLeft, ballRight)) {
          brick.status = 'DELETED';
          score += 1;
          if (score === brickColCount * brickRowCount) {
            // eslint-disable-next-line no-alert
            alert('YOU WIN, CONGRATS!'); /** TODO: Временная мера - заменить красивую модалку! */
          }
        }
      }
    }
  }
}

/** Функция отображения иконки паузы посередине экрана */
export function drawPause(ctx: CanvasRenderingContext2D) {
  img.src = pause;
  ctx.drawImage(img, ctx.canvas.width / 2 - 50, ctx.canvas.height / 2 - 50, 128, 128);
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
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = colorBricks;
        ctx.fill();
        ctx.closePath();
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
  const displayNumber = Math.ceil(framesCount / 60);

  drawText(ctx, String(displayNumber), colorCountdownText, 150, offsetX, offsetY);
  framesCount -= 1;
}

export const isAnimationActive = () => !!framesCount;
