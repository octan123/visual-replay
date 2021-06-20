import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import { getXVIZConfig } from '../config/xviz-config';
import XVIZObject from '../objects/xviz-object';
import { findInsertPos, INSERT_POSITION } from '../utils/search';
import log from '../utils/log';
import { getTransformsFromPose } from '../parsers/parse-vehicle-pose';

function lookAheadTimesliceAccessor(timeslice) {
  if (timeslice && timeslice.length) {
    return timeslice[0].timestamp;
  }

  log.warn('Missing entry or timestamp in lookAhead array')();
  return 0;
}

function updateObjects(streamName, features) {
  var _iterator = _createForOfIteratorHelper(features),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var feature = _step.value;
      var xvizObject = XVIZObject.get(feature.id);

      if (xvizObject) {
        xvizObject._addFeature(streamName, feature);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

var LogSlice = function () {
  function LogSlice(streamFilter, lookAheadMs, linksByReverseTime, streamsByReverseTime) {
    _classCallCheck(this, LogSlice);

    this.features = {};
    this.variables = {};
    this.pointCloud = null;
    this.lookAheads = {};
    this.components = {};
    this.links = {};
    this.streams = {};
    this.initialize(streamFilter, lookAheadMs, linksByReverseTime, streamsByReverseTime);
  }

  _createClass(LogSlice, [{
    key: "getCurrentFrame",
    value: function getCurrentFrame(params, postProcessFrame) {
      var vehiclePose = params.vehiclePose;

      if (!vehiclePose) {
        return null;
      }

      var _getXVIZConfig = getXVIZConfig(),
          OBJECT_STREAM = _getXVIZConfig.OBJECT_STREAM;

      var frame = _objectSpread(_objectSpread(_objectSpread({}, params), getTransformsFromPose(vehiclePose)), {}, {
        vehiclePose: vehiclePose,
        features: this.features,
        lookAheads: this.lookAheads,
        variables: this.variables,
        pointCloud: this.pointCloud,
        components: this.components,
        streams: this.streams,
        links: this.links
      });

      XVIZObject.resetAll();

      if (postProcessFrame) {
        postProcessFrame(frame);
      }

      if (OBJECT_STREAM) {
        updateObjects(OBJECT_STREAM, this.features[OBJECT_STREAM] || []);
      } else {
        for (var streamName in this.features) {
          var features = this.features[streamName];

          if (features.length && features[0].id) {
            updateObjects(streamName, features);
          }
        }

        for (var _streamName in this.variables) {
          var variables = this.variables[_streamName];

          if (variables.length && variables[0].id) {
            updateObjects(_streamName, variables);
          }
        }
      }

      frame.objects = XVIZObject.getAllInCurrentFrame();
      return frame;
    }
  }, {
    key: "initialize",
    value: function initialize(streamFilter, lookAheadMs, linksByReverseTime, streamsByReverseTime) {
      var _this = this;

      var filter = streamFilter && Object.keys(streamFilter).length > 0 ? streamFilter : null;
      streamsByReverseTime.forEach(function (streams) {
        for (var streamName in streams) {
          if (_this.streams[streamName] !== null && !_this.streams[streamName] && _this._includeStream(filter, streamName)) {
            _this.addStreamDatum(streams[streamName], streamName, lookAheadMs, _this);
          }
        }
      });
      linksByReverseTime.forEach(function (links) {
        for (var streamName in links) {
          if (_this.links[streamName] !== null && !_this.links[streamName] && _this._includeStream(filter, streamName)) {
            _this.links[streamName] = links[streamName];
          }
        }
      });
    }
  }, {
    key: "addStreamDatum",
    value: function addStreamDatum(datum, streamName, lookAheadMs) {
      this.streams[streamName] = datum;

      if (!datum) {
        return;
      }

      this.setLabelsOnXVIZObjects(datum.labels);
      var _datum$features = datum.features,
          features = _datum$features === void 0 ? [] : _datum$features,
          _datum$lookAheads = datum.lookAheads,
          lookAheads = _datum$lookAheads === void 0 ? [] : _datum$lookAheads,
          variable = datum.variable,
          _datum$pointCloud = datum.pointCloud,
          pointCloud = _datum$pointCloud === void 0 ? null : _datum$pointCloud;

      if (lookAheads.length && lookAheadMs > 0) {
        var lookAheadTime = datum.time + lookAheadMs;
        var lookAheadIndex = findInsertPos(lookAheads, lookAheadTime, INSERT_POSITION.RIGHT, lookAheadTimesliceAccessor);

        if (lookAheadIndex) {
          this.lookAheads[streamName] = lookAheads[lookAheadIndex - 1];
        }
      }

      if (features.length) {
        this.features[streamName] = features;
      }

      if (pointCloud) {
        this.pointCloud = pointCloud;
      }

      if (variable !== undefined) {
        this.variables[streamName] = variable;
      }
    }
  }, {
    key: "setLabelsOnXVIZObjects",
    value: function setLabelsOnXVIZObjects() {
      var labels = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      labels.forEach(function (label) {
        var object = XVIZObject.get(label.id);

        if (object && label.labelName) {
          object._setProp(label.labelName, label.value);
        }
      });
    }
  }, {
    key: "getStream",
    value: function getStream(stream) {
      var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var streamData = this.streams[stream];

      if (!streamData) {
        return defaultValue;
      }

      return streamData;
    }
  }, {
    key: "_includeStream",
    value: function _includeStream(streamFilter, streamName) {
      return !streamFilter || streamFilter[streamName];
    }
  }]);

  return LogSlice;
}();

export { LogSlice as default };
//# sourceMappingURL=log-slice.js.map