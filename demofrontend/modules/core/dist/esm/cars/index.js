import _sedan from './sedan';

function createCar(makeMesh, opts) {
  var length = opts.length,
      width = opts.width,
      height = opts.height,
      _opts$color = opts.color,
      color = _opts$color === void 0 ? [128, 128, 128] : _opts$color,
      _opts$origin = opts.origin,
      origin = _opts$origin === void 0 ? [0, 0, 0] : _opts$origin;

  if (!Number.isFinite(length) || !Number.isFinite(width) || !Number.isFinite(height)) {
    throw new Error('invalid dimensions');
  }

  var mesh = makeMesh(length, width, height);
  return {
    color: color,
    origin: origin,
    mesh: mesh,
    scale: [1, 1, 1]
  };
}

export default {
  sedan: function sedan(opts) {
    return createCar(_sedan, opts);
  }
};
//# sourceMappingURL=index.js.map