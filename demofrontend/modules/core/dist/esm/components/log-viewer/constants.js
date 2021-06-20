import { CubeGeometry } from '@luma.gl/core';
import { LightingEffect, AmbientLight, DirectionalLight } from '@deck.gl/core';
export var DEFAULT_CAR = {
  mesh: new CubeGeometry(),
  origin: [0, 0, 0.7],
  color: [128, 128, 128],
  scale: [2, 1, 0.7]
};
export var DEFAULT_ORIGIN = [0, 0, 0];
export var CAR_DATA = [[0, 0, 0]];
export var LIGHTS = new LightingEffect({
  ambient: new AmbientLight({
    color: [255, 255, 255],
    intensity: 2.0
  }),
  dir1: new DirectionalLight({
    color: [255, 255, 255],
    intensity: 1.0,
    direction: [-1, -3, -1]
  }),
  dir2: new DirectionalLight({
    color: [255, 255, 255],
    intensity: 0.5,
    direction: [1, 8, -2.5]
  })
});
//# sourceMappingURL=constants.js.map