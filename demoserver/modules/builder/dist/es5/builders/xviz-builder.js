"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _xvizPoseBuilder = _interopRequireDefault(require("./xviz-pose-builder"));

var _xvizLinkBuilder = _interopRequireDefault(require("./xviz-link-builder"));

var _xvizPrimitiveBuilder = _interopRequireDefault(require("./xviz-primitive-builder"));

var _xvizFutureInstanceBuilder = _interopRequireDefault(require("./xviz-future-instance-builder"));

var _xvizUiPrimitiveBuilder = _interopRequireDefault(require("./xviz-ui-primitive-builder"));

var _xvizTimeSeriesBuilder = _interopRequireDefault(require("./xviz-time-series-builder"));

var _xvizValidator = _interopRequireDefault(require("./xviz-validator"));

var _xvizVariableBuilder = _interopRequireDefault(require("./xviz-variable-builder"));

var _constant = require("./constant");

var defaultValidateWarn = console.warn;
var defaultValidateError = console.error;

var XVIZBuilder = function () {
  function XVIZBuilder() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$metadata = _ref.metadata,
        metadata = _ref$metadata === void 0 ? {} : _ref$metadata,
        _ref$disableStreams = _ref.disableStreams,
        disableStreams = _ref$disableStreams === void 0 ? [] : _ref$disableStreams,
        _ref$validateWarn = _ref.validateWarn,
        validateWarn = _ref$validateWarn === void 0 ? defaultValidateWarn : _ref$validateWarn,
        _ref$validateError = _ref.validateError,
        validateError = _ref$validateError === void 0 ? defaultValidateError : _ref$validateError;

    (0, _classCallCheck2["default"])(this, XVIZBuilder);
    this._validator = new _xvizValidator["default"]({
      validateWarn: validateWarn,
      validateError: validateError
    });
    this.metadata = metadata;
    this.disableStreams = disableStreams;
    this.updateType = 'SNAPSHOT';
    this._streamBuilder = null;
    this._poseBuilder = new _xvizPoseBuilder["default"]({
      metadata: this.metadata,
      validator: this._validator
    });
    this._variablesBuilder = new _xvizVariableBuilder["default"]({
      metadata: this.metadata,
      validator: this._validator
    });
    this._primitivesBuilder = new _xvizPrimitiveBuilder["default"]({
      metadata: this.metadata,
      validator: this._validator
    });
    this._futureInstanceBuilder = new _xvizFutureInstanceBuilder["default"]({
      metadata: this.metadata,
      validator: this._validator
    });
    this._uiPrimitivesBuilder = new _xvizUiPrimitiveBuilder["default"]({
      metadata: this.metadata,
      validator: this._validator
    });
    this._timeSeriesBuilder = new _xvizTimeSeriesBuilder["default"]({
      metadata: this.metadata,
      validator: this._validator
    });
    this._linkBuilder = new _xvizLinkBuilder["default"]({
      metadata: this.metadata,
      validator: this._validator
    });
  }

  (0, _createClass2["default"])(XVIZBuilder, [{
    key: "persistent",
    value: function persistent() {
      this.updateType = 'PERSISTENT';
    }
  }, {
    key: "pose",
    value: function pose() {
      var streamId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constant.PRIMARY_POSE_STREAM;
      this._streamBuilder = this._poseBuilder.stream(streamId);
      return this._streamBuilder;
    }
  }, {
    key: "link",
    value: function link(parent, child) {
      this._streamBuilder = this._linkBuilder.stream(child).parent(parent);
      return this._streamBuilder;
    }
  }, {
    key: "variable",
    value: function variable(streamId) {
      this._streamBuilder = this._variablesBuilder.stream(streamId);
      return this._streamBuilder;
    }
  }, {
    key: "primitive",
    value: function primitive(streamId) {
      this._streamBuilder = this._primitivesBuilder.stream(streamId);
      return this._streamBuilder;
    }
  }, {
    key: "futureInstance",
    value: function futureInstance(streamId, timestamp) {
      this._streamBuilder = this._futureInstanceBuilder.stream(streamId);

      this._streamBuilder._timestamp(timestamp);

      return this._streamBuilder;
    }
  }, {
    key: "uiPrimitive",
    value: function uiPrimitive(streamId) {
      this._streamBuilder = this._uiPrimitivesBuilder.stream(streamId);
      return this._streamBuilder;
    }
  }, {
    key: "timeSeries",
    value: function timeSeries(streamId) {
      this._streamBuilder = this._timeSeriesBuilder.stream(streamId);
      return this._streamBuilder;
    }
  }, {
    key: "getMessage",
    value: function getMessage() {
      var _this$_poseBuilder$ge = this._poseBuilder.getData(),
          poses = _this$_poseBuilder$ge.poses;

      if (!poses || !poses[_constant.PRIMARY_POSE_STREAM]) {
        this._validator.error("Every message requires a ".concat(_constant.PRIMARY_POSE_STREAM, " stream"));
      }

      var primitives = this._primitivesBuilder.getData();

      var futures = this._futureInstanceBuilder.getData();

      var variables = this._variablesBuilder.getData();

      var timeSeries = this._timeSeriesBuilder.getData();

      var uiPrimitives = this._uiPrimitivesBuilder.getData();

      var links = this._linkBuilder.getData();

      var data = {
        timestamp: poses[_constant.PRIMARY_POSE_STREAM].timestamp,
        poses: poses
      };

      if (primitives) {
        data.primitives = primitives;
      }

      if (futures) {
        data.future_instances = futures;
      }

      if (variables) {
        data.variables = variables;
      }

      if (timeSeries) {
        data.time_series = timeSeries;
      }

      if (uiPrimitives) {
        data.ui_primitives = uiPrimitives;
      }

      if (links) {
        data.links = links;
      }

      var message = {
        update_type: this.updateType,
        updates: [data]
      };
      return message;
    }
  }, {
    key: "getFrame",
    value: function getFrame() {
      return this.getMessage();
    }
  }, {
    key: "_reset",
    value: function _reset() {
      this._streamBuilder = null;
    }
  }]);
  return XVIZBuilder;
}();

exports["default"] = XVIZBuilder;
//# sourceMappingURL=xviz-builder.js.map