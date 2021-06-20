import _createClass from "@babel/runtime/helpers/esm/createClass";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _wrapNativeSuper from "@babel/runtime/helpers/esm/wrapNativeSuper";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import Ajv from 'ajv';
import { SCHEMA_DATA } from './data';
export var ValidationError = function (_Error) {
  _inherits(ValidationError, _Error);

  var _super = _createSuper(ValidationError);

  function ValidationError() {
    var _this;

    _classCallCheck(this, ValidationError);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    Error.captureStackTrace(_assertThisInitialized(_this), ValidationError);
    return _this;
  }

  return ValidationError;
}(_wrapNativeSuper(Error));
export var XVIZValidator = function () {
  function XVIZValidator() {
    _classCallCheck(this, XVIZValidator);

    this.ajv = newAjv();

    for (var schemaName in SCHEMA_DATA) {
      var schemaData = SCHEMA_DATA[schemaName];
      this.ajv.addSchema(schemaData, schemaName);
    }
  }

  _createClass(XVIZValidator, [{
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
export function newAjv() {
  var validator = newAjvDraft4();
  return validator;
}

function newAjvDraft4() {
  var ajv = new Ajv({
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