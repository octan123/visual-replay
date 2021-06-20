import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import { PRIMITIVE_STYLE_MAP } from './constant';

var XVIZValidator = function () {
  function XVIZValidator(_ref) {
    var validateError = _ref.validateError,
        validateWarn = _ref.validateWarn;

    _classCallCheck(this, XVIZValidator);

    this._validateWarn = validateWarn;
    this._validateError = validateError;
  }

  _createClass(XVIZValidator, [{
    key: "warn",
    value: function warn(msg) {
      this._validateWarn(msg);
    }
  }, {
    key: "error",
    value: function error(msg) {
      this._validateError(msg);
    }
  }, {
    key: "hasProp",
    value: function hasProp(builder, prop, msg) {
      if (builder[prop]) {
        return;
      }

      var streamId = builder.getStreamId();

      this._validateWarn(msg || "Stream ".concat(streamId, ": ").concat(prop, " is missing."));
    }
  }, {
    key: "propSetOnce",
    value: function propSetOnce(builder, prop, msg) {
      if (!builder[prop]) {
        return;
      }

      if (builder[prop] instanceof Array && builder[prop].length === 0) {
        return;
      }

      var streamId = builder.getStreamId();

      this._validateWarn(msg || "Stream ".concat(streamId, ": ").concat(prop, " has been already set."));
    }
  }, {
    key: "matchMetadata",
    value: function matchMetadata(builder) {
      var metadata = builder.getMetadata();
      var streamId = builder.getStreamId();
      var category = builder.getCategory();

      if (metadata && metadata.streams) {
        var streamMetadata = metadata.streams[streamId];

        if (!streamMetadata) {
          this._validateWarn("".concat(streamId, " is not defined in metadata."));
        } else if (category !== streamMetadata.category) {
          this._validateWarn("Stream ".concat(streamId, " category '").concat(category, "' does not match metadata definition (").concat(streamMetadata.category, ")."));
        }
      }
    }
  }, {
    key: "validateStyle",
    value: function validateStyle(builder) {
      var properties = Object.keys(builder._style);
      var validProperties = PRIMITIVE_STYLE_MAP[builder._type];
      var streamId = builder.getStreamId();

      if (validProperties) {
        var invalidProps = properties.filter(function (prop) {
          return !validProperties.includes(prop);
        });

        if (invalidProps && invalidProps.length > 0) {
          this.warn("Invalid style properties ".concat(invalidProps.join(','), " for stream ").concat(streamId));
        }
      } else {
        this.warn(this, "Missing style validations for stream ".concat(streamId, " with type ").concat(builder._type));
      }
    }
  }]);

  return XVIZValidator;
}();

export { XVIZValidator as default };
//# sourceMappingURL=xviz-validator.js.map