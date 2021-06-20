"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _math = require("math.gl");

var _constant = require("./constant");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var defaultValidateWarn = console.warn;
var defaultValidateError = console.error;

var XVIZMetadataBuilder = function () {
  function XVIZMetadataBuilder() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$validateWarn = _ref.validateWarn,
        validateWarn = _ref$validateWarn === void 0 ? defaultValidateWarn : _ref$validateWarn,
        _ref$validateError = _ref.validateError,
        validateError = _ref$validateError === void 0 ? defaultValidateError : _ref$validateError;

    (0, _classCallCheck2["default"])(this, XVIZMetadataBuilder);
    this._validateWarn = validateWarn;
    this._validateError = validateError;
    this.data = {
      streams: {}
    };
    this.streamId = null;
    this.tmp_ui_builder = null;
    this.tmp_stream = {};
    this.tmp_matrix_transform = null;
    this.tmp_pose_transform = null;
    this.tmp_log_info = {};
    this.tmp_type = null;
  }

  (0, _createClass2["default"])(XVIZMetadataBuilder, [{
    key: "getMetadata",
    value: function getMetadata() {
      this._flush();

      var metadata = _objectSpread({
        version: '2.0.0'
      }, this.data);

      if (Object.keys(this.tmp_log_info).length > 0) {
        metadata.log_info = this.tmp_log_info;
      }

      if (this.tmp_ui_builder) {
        var panels = this.tmp_ui_builder.getUI();
        metadata.ui_config = {};

        for (var _i = 0, _Object$keys = Object.keys(panels); _i < _Object$keys.length; _i++) {
          var panelKey = _Object$keys[_i];
          metadata.ui_config[panelKey] = {
            name: panels[panelKey].name,
            config: panels[panelKey]
          };
        }
      }

      return metadata;
    }
  }, {
    key: "startTime",
    value: function startTime(time) {
      this.tmp_log_info.start_time = time;
      return this;
    }
  }, {
    key: "endTime",
    value: function endTime(time) {
      this.tmp_log_info.end_time = time;
      return this;
    }
  }, {
    key: "ui",
    value: function ui(xvizUIBuilder) {
      this.tmp_ui_builder = xvizUIBuilder;
      return this;
    }
  }, {
    key: "stream",
    value: function stream(streamId) {
      if (this.streamId) {
        this._flush();
      }

      this.streamId = streamId;
      return this;
    }
  }, {
    key: "category",
    value: function category(_category) {
      this.tmp_stream.category = _category.toUpperCase();
      return this;
    }
  }, {
    key: "type",
    value: function type(t) {
      this.tmp_type = t.toUpperCase();
      return this;
    }
  }, {
    key: "source",
    value: function source(_source) {
      this.tmp_stream.source = _source;
      return this;
    }
  }, {
    key: "unit",
    value: function unit(u) {
      this.tmp_stream.units = u;
      return this;
    }
  }, {
    key: "coordinate",
    value: function coordinate(_coordinate) {
      this.tmp_stream.coordinate = _coordinate;
      return this;
    }
  }, {
    key: "transformMatrix",
    value: function transformMatrix(matrix) {
      if (matrix instanceof Array) {
        matrix = new _math.Matrix4(matrix);
      }

      this.tmp_matrix_transform = matrix;
      return this;
    }
  }, {
    key: "pose",
    value: function pose() {
      var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var orientation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var _position$x = position.x,
          x = _position$x === void 0 ? 0 : _position$x,
          _position$y = position.y,
          y = _position$y === void 0 ? 0 : _position$y,
          _position$z = position.z,
          z = _position$z === void 0 ? 0 : _position$z;
      var _orientation$roll = orientation.roll,
          roll = _orientation$roll === void 0 ? 0 : _orientation$roll,
          _orientation$pitch = orientation.pitch,
          pitch = _orientation$pitch === void 0 ? 0 : _orientation$pitch,
          _orientation$yaw = orientation.yaw,
          yaw = _orientation$yaw === void 0 ? 0 : _orientation$yaw;
      var pose = new _math._Pose({
        x: x,
        y: y,
        z: z,
        roll: roll,
        pitch: pitch,
        yaw: yaw
      });
      this.tmp_pose_transform = pose.getTransformationMatrix();
      return this;
    }
  }, {
    key: "streamStyle",
    value: function streamStyle(style) {
      this.tmp_stream.stream_style = style;
      return this;
    }
  }, {
    key: "styleClass",
    value: function styleClass(name, style) {
      if (!this.streamId) {
        this._validateError('A stream must set before adding a style rule.');

        return this;
      }

      var streamRule = {
        name: name,
        style: style
      };

      if (!this.tmp_stream.style_classes) {
        this.tmp_stream.style_classes = [streamRule];
      } else {
        this.tmp_stream.style_classes.push(streamRule);
      }

      return this;
    }
  }, {
    key: "logInfo",
    value: function logInfo(data) {
      this.tmp_log_info = _objectSpread(_objectSpread({}, data), this.tmp_log_info);
      return this;
    }
  }, {
    key: "_flush",
    value: function _flush() {
      if (this.streamId) {
        var streamData = this.tmp_stream;
        var transform = null;

        if (this.tmp_pose_transform && this.tmp_matrix_transform) {
          this._validateError('`pose` and `transformMatrix` cannot be applied at the same time.');
        } else {
          transform = this.tmp_matrix_transform || this.tmp_pose_transform;
        }

        if (transform) {
          streamData.transform = transform;
        }

        if (streamData.category === _constant.CATEGORY.PRIMITIVE || streamData.category === _constant.CATEGORY.FUTURE_INSTANCE) {
          streamData.primitive_type = this.tmp_type;
        } else if (streamData.category === _constant.CATEGORY.VARIABLE || streamData.category === _constant.CATEGORY.TIME_SERIES) {
          streamData.scalar_type = this.tmp_type;
        }

        this.data.streams[this.streamId] = streamData;
      }

      this._reset();
    }
  }, {
    key: "_reset",
    value: function _reset() {
      this.streamId = null;
      this.tmp_stream = {};
      this.tmp_matrix_transform = null;
      this.tmp_pose_transform = null;
      this.tmp_type = null;
    }
  }]);
  return XVIZMetadataBuilder;
}();

exports["default"] = XVIZMetadataBuilder;
//# sourceMappingURL=xviz-metadata-builder.js.map