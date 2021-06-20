import { Texture2D } from '@luma.gl/core';
const CANVAS_SIZE = 256;

function drawArrow(ctx, {
  x,
  y,
  size,
  strokeWidth,
  scaleX = 1
}) {
  const halfSize = size / 2;
  const headSize = size / 4;

  const getX = px => (halfSize - px) * scaleX + x + halfSize;

  const getY = py => py + y;

  ctx.lineWidth = strokeWidth;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(getX(0), getY(halfSize));
  ctx.lineTo(getX(size), getY(halfSize));
  ctx.moveTo(getX(size - headSize), getY(halfSize - headSize));
  ctx.lineTo(getX(size), getY(halfSize));
  ctx.lineTo(getX(size - headSize), getY(halfSize + headSize));
  ctx.stroke();
}

export function makeLightShapeTexture(gl) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = CANVAS_SIZE * 4;
  canvas.height = CANVAS_SIZE;
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, CANVAS_SIZE * 4, CANVAS_SIZE);
  ctx.fillStyle = '#444';
  ctx.fillRect(CANVAS_SIZE, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.strokeStyle = '#fff';
  drawArrow(ctx, {
    x: CANVAS_SIZE * 1.333,
    y: CANVAS_SIZE / 3,
    size: CANVAS_SIZE / 3,
    strokeWidth: CANVAS_SIZE / 16
  });
  ctx.fillStyle = '#444';
  ctx.fillRect(CANVAS_SIZE * 2, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.strokeStyle = '#fff';
  drawArrow(ctx, {
    x: CANVAS_SIZE * 2.333,
    y: CANVAS_SIZE / 3,
    size: CANVAS_SIZE / 3,
    strokeWidth: CANVAS_SIZE / 16,
    scaleX: -1
  });
  return new Texture2D(gl, {
    data: canvas
  });
}
//# sourceMappingURL=traffic-light-utils.js.map