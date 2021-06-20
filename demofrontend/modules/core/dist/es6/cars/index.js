import _sedan from './sedan';

function createCar(makeMesh, opts) {
  const {
    length,
    width,
    height,
    color = [128, 128, 128],
    origin = [0, 0, 0]
  } = opts;

  if (!Number.isFinite(length) || !Number.isFinite(width) || !Number.isFinite(height)) {
    throw new Error('invalid dimensions');
  }

  const mesh = makeMesh(length, width, height);
  return {
    color,
    origin,
    mesh,
    scale: [1, 1, 1]
  };
}

export default {
  sedan: opts => createCar(_sedan, opts)
};
//# sourceMappingURL=index.js.map