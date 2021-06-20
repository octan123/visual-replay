"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = parseTimesliceData;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _xvizConfig = require("../config/xviz-config");

var _constants = require("../constants");

var _parseXvizStream = require("./parse-xviz-stream");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function parseTimesliceData(data, convertPrimitive) {
  var _getXVIZConfig = (0, _xvizConfig.getXVIZConfig)(),
      PRIMARY_POSE_STREAM = _getXVIZConfig.PRIMARY_POSE_STREAM;

  var vehiclePose = data.vehicle_pose,
      stateUpdates = data.state_updates,
      otherInfo = (0, _objectWithoutProperties2["default"])(data, ["vehicle_pose", "state_updates"]);
  var timestamp;

  if (vehiclePose) {
    timestamp = vehiclePose.time;
  } else if (stateUpdates) {
    timestamp = stateUpdates.reduce(function (t, stateUpdate) {
      return Math.max(t, stateUpdate.timestamp);
    }, 0);
  }

  if (!timestamp) {
    return {
      type: _constants.XVIZ_MESSAGE_TYPE.INCOMPLETE
    };
  }

  var newStreams = {};

  var result = _objectSpread(_objectSpread({}, otherInfo), {}, {
    type: _constants.XVIZ_MESSAGE_TYPE.TIMESLICE,
    streams: newStreams,
    timestamp: timestamp
  });

  if (stateUpdates) {
    var xvizStreams = parseStateUpdates(stateUpdates, timestamp, convertPrimitive);
    Object.assign(newStreams, xvizStreams);
  }

  if (vehiclePose) {
    newStreams[PRIMARY_POSE_STREAM] = vehiclePose;
  }

  return result;
}

function parseStateUpdates(stateUpdates, timestamp, convertPrimitive) {
  var _getXVIZConfig2 = (0, _xvizConfig.getXVIZConfig)(),
      STREAM_BLACKLIST = _getXVIZConfig2.STREAM_BLACKLIST;

  var newStreams = {};
  var primitives = {};
  var variables = {};
  var futures = {};

  var _iterator = _createForOfIteratorHelper(stateUpdates),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var stateUpdate = _step.value;
      Object.assign(primitives, stateUpdate.primitives);
      Object.assign(variables, stateUpdate.variables);
      Object.assign(futures, stateUpdate.futures);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  Object.keys(primitives).filter(function (streamName) {
    return !STREAM_BLACKLIST.has(streamName);
  }).forEach(function (primitive) {
    newStreams[primitive] = (0, _parseXvizStream.parseStreamPrimitive)(primitives[primitive], primitive, timestamp, convertPrimitive);
  });
  Object.keys(variables).filter(function (streamName) {
    return !STREAM_BLACKLIST.has(streamName);
  }).forEach(function (variable) {
    newStreams[variable] = (0, _parseXvizStream.parseStreamVariable)(variables[variable], variable, timestamp);
  });
  Object.keys(futures).filter(function (streamName) {
    return !STREAM_BLACKLIST.has(streamName);
  }).forEach(function (future) {
    newStreams[future] = (0, _parseXvizStream.parseStreamFutures)(futures[future], future, timestamp, convertPrimitive);
  });
  return newStreams;
}
//# sourceMappingURL=parse-timeslice-data-v1.js.map