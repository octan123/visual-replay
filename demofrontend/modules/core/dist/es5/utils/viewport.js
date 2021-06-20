"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getViewStateOffset = getViewStateOffset;
exports.getViews = getViews;
exports.getViewStates = getViewStates;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _viewportMercatorProject = _interopRequireDefault(require("viewport-mercator-project"));

var _core = require("@deck.gl/core");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function getViewStateOffset(oldViewState, viewState, oldOffset) {
  if (!oldViewState) {
    return oldOffset;
  }

  var oldViewport = new _viewportMercatorProject["default"](oldViewState);
  var oldPos = [oldViewport.width / 2 + oldOffset.x, oldViewport.height / 2 + oldOffset.y];
  var trackedLngLat = oldViewport.unproject(oldPos);
  var newViewport = new _viewportMercatorProject["default"](viewState);
  var newPos = newViewport.project(trackedLngLat);
  return {
    x: oldOffset.x + newPos[0] - oldPos[0],
    y: oldOffset.y + newPos[1] - oldPos[1],
    bearing: oldOffset.bearing + viewState.bearing - oldViewState.bearing
  };
}

function offsetViewState(viewState, offset) {
  var shiftedViewState = _objectSpread(_objectSpread({}, viewState), {}, {
    bearing: viewState.bearing + offset.bearing
  });

  var helperViewport = new _viewportMercatorProject["default"](shiftedViewState);
  var pos = [viewState.width / 2 + offset.x, viewState.height / 2 + offset.y];
  var lngLat = [viewState.longitude, viewState.latitude];

  var _helperViewport$getLo = helperViewport.getLocationAtPoint({
    lngLat: lngLat,
    pos: pos
  }),
      _helperViewport$getLo2 = (0, _slicedToArray2["default"])(_helperViewport$getLo, 2),
      longitude = _helperViewport$getLo2[0],
      latitude = _helperViewport$getLo2[1];

  return _objectSpread(_objectSpread({}, shiftedViewState), {}, {
    longitude: longitude,
    latitude: latitude
  });
}

function getViews(viewMode) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var name = viewMode.name,
      orthographic = viewMode.orthographic,
      firstPerson = viewMode.firstPerson,
      mapInteraction = viewMode.mapInteraction;

  var controllerProps = _objectSpread(_objectSpread({}, mapInteraction), {}, {
    keyboard: false
  });

  if (firstPerson) {
    return new _core.FirstPersonView(_objectSpread(_objectSpread({}, options), {}, {
      id: name,
      fovy: 75,
      near: 1,
      far: 10000,
      focalDistance: 6,
      controller: controllerProps
    }));
  }

  return new _core.MapView(_objectSpread(_objectSpread({}, options), {}, {
    id: name,
    orthographic: orthographic,
    controller: controllerProps
  }));
}

function getViewStates(_ref) {
  var viewState = _ref.viewState,
      trackedPosition = _ref.trackedPosition,
      viewMode = _ref.viewMode,
      offset = _ref.offset;
  var name = viewMode.name,
      firstPerson = viewMode.firstPerson,
      _viewMode$tracked = viewMode.tracked,
      tracked = _viewMode$tracked === void 0 ? {} : _viewMode$tracked;
  var viewStates = {};

  if (firstPerson) {
    if (trackedPosition) {
      var bearing = trackedPosition.bearing;
      viewState = _objectSpread(_objectSpread(_objectSpread({}, viewState), firstPerson), {}, {
        longitude: trackedPosition.longitude,
        latitude: trackedPosition.latitude,
        bearing: bearing + offset.bearing
      });
      viewState.position = [0, 0, trackedPosition.altitude + 1.3];
    }

    viewStates[name] = viewState;
  } else {
    viewState = _objectSpread(_objectSpread({}, viewState), {}, {
      transitionDuration: 0
    });
    offset = _objectSpread({}, offset);

    if (tracked.position && trackedPosition) {
      viewState.longitude = trackedPosition.longitude;
      viewState.latitude = trackedPosition.latitude;
    } else {
      offset.x = 0;
      offset.y = 0;
    }

    if (tracked.heading && trackedPosition) {
      viewState.bearing = trackedPosition.bearing;
    } else {
      offset.bearing = 0;
    }

    if (trackedPosition) {
      viewState.position = [0, 0, trackedPosition.altitude];
    }

    viewStates[name] = offsetViewState(viewState, offset);
  }

  return viewStates;
}
//# sourceMappingURL=viewport.js.map