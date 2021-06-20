"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIEW_MODE = exports.DEFAULT_VIEW_STATE = exports.COORDINATE = void 0;
var COORDINATE = {
  GEOGRAPHIC: 'GEOGRAPHIC',
  VEHICLE_RELATIVE: 'VEHICLE_RELATIVE',
  IDENTITY: 'IDENTITY',
  DYNAMIC: 'DYNAMIC'
};
exports.COORDINATE = COORDINATE;
var DEFAULT_VIEW_STATE = {
  minZoom: 12,
  maxZoom: 24,
  minPitch: 0,
  maxPitch: 0,
  bearing: 0,
  pitch: 0,
  zoom: 20
};
exports.DEFAULT_VIEW_STATE = DEFAULT_VIEW_STATE;
var VIEW_MODE = {
  TOP_DOWN: {
    name: 'top-down',
    initialViewState: {},
    orthographic: true,
    tracked: {
      position: true
    }
  },
  PERSPECTIVE: {
    name: 'perspective',
    initialViewState: {
      maxPitch: 85,
      pitch: 60
    },
    tracked: {
      position: true,
      heading: true
    }
  },
  DRIVER: {
    name: 'driver',
    initialProps: {
      maxPitch: 0
    },
    firstPerson: {
      position: [0, 0, 1.5]
    },
    mapInteraction: {
      dragPan: false,
      scrollZoom: false
    }
  }
};
exports.VIEW_MODE = VIEW_MODE;
//# sourceMappingURL=constants.js.map