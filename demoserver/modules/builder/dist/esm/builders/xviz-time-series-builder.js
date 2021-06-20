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

var XVIZTimeSeriesBuilder = function (_XVIZBaseBuilder) {
  _inherits(XVIZTimeSeriesBuilder, _XVIZBaseBuilder);

  var _super = _createSuper(XVIZTimeSeriesBuilder);

  function XVIZTimeSeriesBuilder(props) {
    var _this;

    _classCallCheck(this, XVIZTimeSeriesBuilder);

    _this = _super.call(this, _objectSpread(_objectSpread({}, props), {}, {
      category: CATEGORY.TIME_SERIES
    }));
    _this._data = new Map();
    _this._id = null;
    _this._value = null;
    _this._timestamp = null;
    return _this;
  }

  _createClass(XVIZTimeSeriesBuilder, [{
    key: "id",
    value: function id(identifier) {
      this.validatePropSetOnce('_id');
      this._id = identifier;
      return this;
    }
  }, {
    key: "value",
    value: function value(_value) {
      this.validatePropSetOnce('_value');

      if (_value instanceof Array) {
        this.validateError('Input `value` must be single value');
      }

      this._value = _value;
      return this;
    }
  }, {
    key: "timestamp",
    value: function timestamp(_timestamp) {
      this.validatePropSetOnce('_timestamp');

      if (_timestamp instanceof Array) {
        this.validateError('Input `timestamp` must be a single value');
      }

      this._timestamp = _timestamp;
      return this;
    }
  }, {
    key: "getData",
    value: function getData() {
      this._flush();

      if (this._data.size === 0) {
        return null;
      }

      var timeSeriesData = [];

      var _iterator = _createForOfIteratorHelper(this._data),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
              timestamp = _step$value[0],
              ids = _step$value[1];

          var _iterator2 = _createForOfIteratorHelper(ids),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _step2$value = _slicedToArray(_step2.value, 2),
                  id = _step2$value[0],
                  fields = _step2$value[1];

              var _iterator3 = _createForOfIteratorHelper(fields.values()),
                  _step3;

              try {
                for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                  var tsdata = _step3.value;
                  var entry = {
                    timestamp: timestamp,
                    streams: tsdata.streams,
                    values: tsdata.values
                  };

                  if (id !== null) {
                    entry.object_id = id;
                  }

                  timeSeriesData.push(entry);
                }
              } catch (err) {
                _iterator3.e(err);
              } finally {
                _iterator3.f();
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return timeSeriesData;
    }
  }, {
    key: "_addTimestampEntry",
    value: function _addTimestampEntry() {
      if (!this._dataPending()) {
        return;
      }

      var fieldName = 'doubles';

      if (typeof this._value === 'string' || this._value instanceof String) {
        fieldName = 'strings';
      } else if (typeof this._value === 'boolean') {
        fieldName = 'bools';
      }

      var tsEntry = this._data.get(this._timestamp);

      if (tsEntry) {
        var idEntry = tsEntry.get(this._id);

        if (idEntry) {
          var fieldEntry = idEntry.get(fieldName);

          if (fieldEntry) {
            fieldEntry.streams.push(this._streamId);
            fieldEntry.values[fieldName].push(this._value);
          } else {
            idEntry.set(fieldName, this._getFieldEntry(fieldName));
          }
        } else {
          tsEntry.set(this._id, this._getIdEntry(fieldName));
        }
      } else {
        tsEntry = new Map();
        tsEntry.set(this._id, this._getIdEntry(fieldName));

        this._data.set(this._timestamp, tsEntry);
      }
    }
  }, {
    key: "_getIdEntry",
    value: function _getIdEntry(fieldName) {
      var idEntry = new Map();
      idEntry.set(fieldName, this._getFieldEntry(fieldName));
      return idEntry;
    }
  }, {
    key: "_getFieldEntry",
    value: function _getFieldEntry(fieldName) {
      return {
        streams: [this._streamId],
        values: _defineProperty({}, fieldName, [this._value])
      };
    }
  }, {
    key: "_dataPending",
    value: function _dataPending() {
      return this._value !== null || this._timestamp !== null || this._id !== null;
    }
  }, {
    key: "_validate",
    value: function _validate() {
      if (this._dataPending()) {
        _get(_getPrototypeOf(XVIZTimeSeriesBuilder.prototype), "_validate", this).call(this);

        if (this._value === null) {
          this.validateWarn("Stream ".concat(this._streamId, " value is not provided."));
        }

        if (this._timestamp === null) {
          this.validateWarn("Stream ".concat(this._streamId, " timestamp is not provided."));
        }
      }
    }
  }, {
    key: "_flush",
    value: function _flush() {
      this._validate();

      this._addTimestampEntry();

      this._reset();
    }
  }, {
    key: "_reset",
    value: function _reset() {
      this._id = null;
      this._value = null;
      this._timestamp = null;
    }
  }]);

  return XVIZTimeSeriesBuilder;
}(XVIZBaseBuilder);

export { XVIZTimeSeriesBuilder as default };
//# sourceMappingURL=xviz-time-series-builder.js.map