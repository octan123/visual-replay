import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import XVIZPoseBuilder from './xviz-pose-builder';
import XVIZLinkBuilder from './xviz-link-builder';
import XVIZPrimitiveBuilder from './xviz-primitive-builder';
import XVIZFutureInstanceBuilder from './xviz-future-instance-builder';
import XVIZUIPrimitiveBuilder from './xviz-ui-primitive-builder';
import XVIZTimeSeriesBuilder from './xviz-time-series-builder';
import XVIZValidator from './xviz-validator';
import XVIZVariableBuilder from './xviz-variable-builder';
import { PRIMARY_POSE_STREAM } from './constant';
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

    _classCallCheck(this, XVIZBuilder);

    this._validator = new XVIZValidator({
      validateWarn: validateWarn,
      validateError: validateError
    });
    this.metadata = metadata;
    this.disableStreams = disableStreams;
    this.updateType = 'SNAPSHOT';
    this._streamBuilder = null;
    this._poseBuilder = new XVIZPoseBuilder({
      metadata: this.metadata,
      validator: this._validator
    });
    this._variablesBuilder = new XVIZVariableBuilder({
      metadata: this.metadata,
      validator: this._validator
    });
    this._primitivesBuilder = new XVIZPrimitiveBuilder({
      metadata: this.metadata,
      validator: this._validator
    });
    this._futureInstanceBuilder = new XVIZFutureInstanceBuilder({
      metadata: this.metadata,
      validator: this._validator
    });
    this._uiPrimitivesBuilder = new XVIZUIPrimitiveBuilder({
      metadata: this.metadata,
      validator: this._validator
    });
    this._timeSeriesBuilder = new XVIZTimeSeriesBuilder({
      metadata: this.metadata,
      validator: this._validator
    });
    this._linkBuilder = new XVIZLinkBuilder({
      metadata: this.metadata,
      validator: this._validator
    });
  }

  _createClass(XVIZBuilder, [{
    key: "persistent",
    value: function persistent() {
      this.updateType = 'PERSISTENT';
    }
  }, {
    key: "pose",
    value: function pose() {
      var streamId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : PRIMARY_POSE_STREAM;
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

      if (!poses || !poses[PRIMARY_POSE_STREAM]) {
        this._validator.error("Every message requires a ".concat(PRIMARY_POSE_STREAM, " stream"));
      }

      var primitives = this._primitivesBuilder.getData();

      var futures = this._futureInstanceBuilder.getData();

      var variables = this._variablesBuilder.getData();

      var timeSeries = this._timeSeriesBuilder.getData();

      var uiPrimitives = this._uiPrimitivesBuilder.getData();

      var links = this._linkBuilder.getData();

      var data = {
        timestamp: poses[PRIMARY_POSE_STREAM].timestamp,
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

export { XVIZBuilder as default };
//# sourceMappingURL=xviz-builder.js.map