export var COORDINATE = {
  GEOGRAPHIC: 'GEOGRAPHIC',
  VEHICLE_RELATIVE: 'VEHICLE_RELATIVE',
  IDENTITY: 'IDENTITY',
  DYNAMIC: 'DYNAMIC'
};
export var DEFAULT_VIEW_STATE = {
  minZoom: 12,
  maxZoom: 24,
  minPitch: 0,
  maxPitch: 0,
  bearing: 0,
  pitch: 0,
  zoom: 20
};
export var VIEW_MODE = {
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
//# sourceMappingURL=constants.js.map