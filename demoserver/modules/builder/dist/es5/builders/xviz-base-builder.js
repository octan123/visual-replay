"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var XVIZBaseBuilder = function () {
  function XVIZBaseBuilder(_ref) {
    var validator = _ref.validator,
        category = _ref.category,
        metadata = _ref.metadata;
    (0, _classCallCheck2["default"])(this, XVIZBaseBuilder);
    this._streamId = null;
    this._category = category;
    this._metadata = metadata;
    this._validator = validator;
  }

  (0, _createClass2["default"])(XVIZBaseBuilder, [{
    key: "stream",
    value: function stream(streamId) {
      if (this._streamId) {
        this._flush();
      }

      this._streamId = streamId;
      return this;
    }
  }, {
    key: "getStreamId",
    value: function getStreamId() {
      return this._streamId;
    }
  }, {
    key: "getCategory",
    value: function getCategory() {
      return this._category;
    }
  }, {
    key: "getMetadata",
    value: function getMetadata() {
      return this._metadata;
    }
  }, {
    key: "_flush",
    value: function _flush() {
      throw new Error('Derived class must implement the "_flush()" method.');
    }
  }, {
    key: "_reset",
    value: function _reset() {
      this._category = null;
    }
  }, {
    key: "_validate",
    value: function _validate() {
      this._validator.hasProp(this, '_streamId');

      this._validator.hasProp(this, '_category');

      this._validator.matchMetadata(this);
    }
  }, {
    key: "validateWarn",
    value: function validateWarn(msg) {
      this._validator.warn(msg);
    }
  }, {
    key: "validateError",
    value: function validateError(msg) {
      this._validator.error(msg);
    }
  }, {
    key: "validatePropSetOnce",
    value: function validatePropSetOnce(prop) {
      this._validator.propSetOnce(this, prop);
    }
  }]);
  return XVIZBaseBuilder;
}();

exports["default"] = XVIZBaseBuilder;
//# sourceMappingURL=xviz-base-builder.js.map