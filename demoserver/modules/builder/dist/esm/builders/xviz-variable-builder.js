import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _get from "@babel/runtime/helpers/esm/get";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { CATEGORY } from './constant';
import XVIZBaseBuilder from './xviz-base-builder';

var XVIZVariableBuilder = function (_XVIZBaseBuilder) {
  _inherits(XVIZVariableBuilder, _XVIZBaseBuilder);

  var _super = _createSuper(XVIZVariableBuilder);

  function XVIZVariableBuilder(props) {
    var _this;

    _classCallCheck(this, XVIZVariableBuilder);

    _this = _super.call(this, _objectSpread(_objectSpread({}, props), {}, {
      category: CATEGORY.VARIABLE
    }));
    _this._data = new Map();
    _this._id = null;
    _this._values = null;
    return _this;
  }

  _createClass(XVIZVariableBuilder, [{
    key: "id",
    value: function id(identifier) {
      this.validatePropSetOnce('_id');
      this._id = identifier;
      return this;
    }
  }, {
    key: "values",
    value: function values(_values) {
      this.validatePropSetOnce('_values');

      if (!(_values instanceof Array)) {
        this.validateError('Input `values` must be array');
      }

      this._values = _values;
      return this;
    }
  }, {
    key: "getData",
    value: function getData() {
      this._flush();

      if (this._data.size === 0) {
        return null;
      }

      var variablesData = {};

      var _iterator = _createForOfIteratorHelper(this._data),
          _step;

      try {
        var _loop = function _loop() {
          var _step$value = _slicedToArray(_step.value, 2),
              streamId = _step$value[0],
              ids = _step$value[1];

          var variables = [];
          ids.forEach(function (entry) {
            return variables.push(entry);
          });
          variablesData[streamId] = {
            variables: variables
          };
        };

        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return variablesData;
    }
  }, {
    key: "_addVariableEntry",
    value: function _addVariableEntry() {
      if (!this._dataPending()) {
        return;
      }

      var fieldName = 'doubles';
      var value = this._values[0];

      if (typeof value === 'string' || value instanceof String) {
        fieldName = 'strings';
      } else if (typeof value === 'boolean') {
        fieldName = 'bools';
      }

      var entry = {
        values: _defineProperty({}, fieldName, this._values)
      };

      if (this._id) {
        entry.base = {
          object_id: this._id
        };
      }

      var streamEntry = this._data.get(this._streamId);

      if (streamEntry) {
        var idEntry = streamEntry.get(this._id);

        if (idEntry) {
          this.validateError("Input `values` already set for id ".concat(this._id));
        } else {
          streamEntry.set(this._id, entry);
        }
      } else {
        var _idEntry = new Map();

        _idEntry.set(this._id, entry);

        this._data.set(this._streamId, _idEntry);
      }
    }
  }, {
    key: "_dataPending",
    value: function _dataPending() {
      return this._values !== null || this._id !== null;
    }
  }, {
    key: "_validate",
    value: function _validate() {
      if (this._dataPending()) {
        _get(_getPrototypeOf(XVIZVariableBuilder.prototype), "_validate", this).call(this);

        if (this._values === null) {
          this.validateWarn("Stream".concat(this._streamId, " values are not provided."));
        }
      }
    }
  }, {
    key: "_flush",
    value: function _flush() {
      this._validate();

      this._addVariableEntry();

      this._reset();
    }
  }, {
    key: "_reset",
    value: function _reset() {
      this._id = null;
      this._values = null;
    }
  }]);

  return XVIZVariableBuilder;
}(XVIZBaseBuilder);

export { XVIZVariableBuilder as default };
//# sourceMappingURL=xviz-variable-builder.js.map