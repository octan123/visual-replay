"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LIGHTS = exports.CAR_DATA = exports.DEFAULT_ORIGIN = exports.DEFAULT_CAR = void 0;

var _core = require("@luma.gl/core");

var _core2 = require("@deck.gl/core");

var DEFAULT_CAR = {
  mesh: new _core.CubeGeometry(),
  origin: [0, 0, 0.7],
  color: [128, 128, 128],
  scale: [2, 1, 0.7]
};
exports.DEFAULT_CAR = DEFAULT_CAR;
var DEFAULT_ORIGIN = [0, 0, 0];
exports.DEFAULT_ORIGIN = DEFAULT_ORIGIN;
var CAR_DATA = [[0, 0, 0]];
exports.CAR_DATA = CAR_DATA;
var LIGHTS = new _core2.LightingEffect({
  ambient: new _core2.AmbientLight({
    color: [255, 255, 255],
    intensity: 2.0
  }),
  dir1: new _core2.DirectionalLight({
    color: [255, 255, 255],
    intensity: 1.0,
    direction: [-1, -3, -1]
  }),
  dir2: new _core2.DirectionalLight({
    color: [255, 255, 255],
    intensity: 0.5,
    direction: [1, 8, -2.5]
  })
});
exports.LIGHTS = LIGHTS;
//# sourceMappingURL=constants.js.map