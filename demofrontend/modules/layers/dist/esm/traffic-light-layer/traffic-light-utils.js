import { Texture2D } from '@luma.gl/core';
var CANVAS_SIZE = 256;

function drawArrow(ctx, _ref) {
  var x = _ref.x,
      y = _ref.y,
      size = _ref.size,
      strokeWidth = _ref.strokeWidth,
      _ref$scaleX = _ref.scaleX,
      scaleX = _ref$scaleX === void 0 ? 1 : _ref$scaleX;
  var halfSize = size / 2;
  var headSize = size / 4;

  var getX = function getX(px) {
    return (halfSize - px) * scaleX + x + halfSize;
  };

  var getY = function getY(py) {
    return py + y;
  };

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
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
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