"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newAjv = newAjv;
exports.XVIZValidator = exports.ValidationError = void 0;

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _wrapNativeSuper2 = _interopRequireDefault(require("@babel/runtime/helpers/wrapNativeSuper"));

var _ajv = _interopRequireDefault(require("ajv"));

var _data = require("./data");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ValidationError = function (_Error) {
  (0, _inherits2["default"])(ValidationError, _Error);

  var _super = _createSuper(ValidationError);

  function ValidationError() {
    var _this;

    (0, _classCallCheck2["default"])(this, ValidationError);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    Error.captureStackTrace((0, _assertThisInitialized2["default"])(_this), ValidationError);
    return _this;
  }

  return ValidationError;
}((0, _wrapNativeSuper2["default"])(Error));

exports.ValidationError = ValidationError;

var XVIZValidator = function () {
  function XVIZValidator() {
    (0, _classCallCheck2["default"])(this, XVIZValidator);
    this.ajv = newAjv();

    for (var schemaName in _data.SCHEMA_DATA) {
      var schemaData = _data.SCHEMA_DATA[schemaName];
      this.ajv.addSchema(schemaData, schemaName);
    }
  }

  (0, _createClass2["default"])(XVIZValidator, [{
    key: "validateMetadata",
    value: function validateMetadata(data) {
      this.validate('session/metadata.schema.json', data);
    }
  }, {
    key: "validateStateUpdate",
    value: function validateStateUpdate(data) {
      this.validate('session/state_update.schema.json', data);
    }
  }, {
    key: "validateStreamSet",
    value: function validateStreamSet(data) {
      this.validate('core/stream_set.schema.json', data);
    }
  }, {
    key: "validatePose",
    value: function validatePose(data) {
      this.validate("core/pose.schema.json", data);
    }
  }, {
    key: "validatePrimitive",
    value: function validatePrimitive(type, data) {
      this.validate("primitives/".concat(type, ".schema.json"), data);
    }
  }, {
    key: "validateTimeSeries",
    value: function validateTimeSeries(data) {
      this.validate('core/timeseries_state.schema.json', data);
    }
  }, {
    key: "validateFutureInstances",
    value: function validateFutureInstances(data) {
      this.validate('core/future_instances.schema.json', data);
    }
  }, {
    key: "validateVariable",
    value: function validateVariable(data) {
      this.validate('core/variable.schema.json', data);
    }
  }, {
    key: "validateAnnotation",
    value: function validateAnnotation(type, data) {
      this.validate("core/annotation_".concat(type, ".schema.json"), data);
    }
  }, {
    key: "validate",
    value: function validate(schemaName, data) {
      var schemaValidator = this._getSchema(schemaName);

      if (schemaValidator === undefined) {
        var error = "Could not load schema: ".concat(schemaName);
        throw error;
      }

      var valid = schemaValidator(data);

      if (!valid) {
        var errorDescription = JSON.stringify(schemaValidator.errors, null, '  ');
        throw new ValidationError("Validation errors: ".concat(errorDescription));
      }
    }
  }, {
    key: "schemaCount",
    value: function schemaCount() {
      return Object.keys(this.ajv._schemas).length;
    }
  }, {
    key: "hasSchema",
    value: function hasSchema(schemaName) {
      return this._getSchema(schemaName) !== undefined;
    }
  }, {
    key: "_getSchema",
    value: function _getSchema(schemaName) {
      if (!schemaName.endsWith('.schema.json')) {
        schemaName += '.schema.json';
      }

      return this.ajv.getSchema(schemaName);
    }
  }]);
  return XVIZValidator;
}();

exports.XVIZValidator = XVIZValidator;

function newAjv() {
  var validator = newAjvDraft4();
  return validator;
}

function newAjvDraft4() {
  var ajv = new _ajv["default"]({
    meta: false,
    schemaId: 'id',
    extendRefs: 'fail'
  });

  var metaSchema = require('ajv/lib/refs/json-schema-draft-04.json');

  ajv.addMetaSchema(metaSchema);
  ajv._opts.defaultMeta = metaSchema.id;
  ajv.removeKeyword('propertyNames');
  ajv.removeKeyword('contains');
  ajv.removeKeyword('const');
  return ajv;
}
//# sourceMappingURL=validator.js.map