import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _get from "@babel/runtime/helpers/esm/get";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import XVIZBaseBuilder from './xviz-base-builder';
import { CATEGORY, PRIMITIVE_TYPES } from './constant';

var XVIZTreeTableRowBuilder = function () {
  function XVIZTreeTableRowBuilder(id, values) {
    var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, XVIZTreeTableRowBuilder);

    this._parent = parent;
    this._id = id;
    this._values = values;
    this._children = [];
  }

  _createClass(XVIZTreeTableRowBuilder, [{
    key: "child",
    value: function child(id, values) {
      var row = new XVIZTreeTableRowBuilder(id, values, this._id);

      this._children.push(row);

      return row;
    }
  }, {
    key: "getData",
    value: function getData() {
      var obj = {
        id: this._id
      };

      if (this._values) {
        obj.column_values = this._values;
      }

      if (this._parent !== null) {
        obj.parent = this._parent;
      }

      return [].concat.apply([obj], this._children.map(function (row) {
        return row.getData();
      }));
    }
  }]);

  return XVIZTreeTableRowBuilder;
}();

var XVIZUIPrimitiveBuilder = function (_XVIZBaseBuilder) {
  _inherits(XVIZUIPrimitiveBuilder, _XVIZBaseBuilder);

  var _super = _createSuper(XVIZUIPrimitiveBuilder);

  function XVIZUIPrimitiveBuilder(props) {
    var _this;

    _classCallCheck(this, XVIZUIPrimitiveBuilder);

    _this = _super.call(this, _objectSpread(_objectSpread({}, props), {}, {
      category: CATEGORY.UI_PRIMITIVE
    }));

    _this.reset();

    _this._primitives = {};
    return _this;
  }

  _createClass(XVIZUIPrimitiveBuilder, [{
    key: "treetable",
    value: function treetable(columns) {
      if (this._type) {
        this._flush();
      }

      this.validatePropSetOnce('_columns');
      this._columns = columns;
      this._type = PRIMITIVE_TYPES.treetable;
      return this;
    }
  }, {
    key: "row",
    value: function row(id, values) {
      this.validatePropSetOnce('_id');
      var row = new XVIZTreeTableRowBuilder(id, values);

      this._rows.push(row);

      this._type = PRIMITIVE_TYPES.treetable;
      return row;
    }
  }, {
    key: "_validate",
    value: function _validate() {
      _get(_getPrototypeOf(XVIZUIPrimitiveBuilder.prototype), "_validate", this).call(this);
    }
  }, {
    key: "_flush",
    value: function _flush() {
      this._validate();

      this._flushPrimitives();
    }
  }, {
    key: "getData",
    value: function getData() {
      if (this._type) {
        this._flush();
      }

      if (Object.keys(this._primitives).length) {
        return this._primitives;
      }

      return null;
    }
  }, {
    key: "_flushPrimitives",
    value: function _flushPrimitives() {
      var stream = this._primitives[this._streamId];

      if (!stream) {
        stream = {};
        this._primitives[this._streamId] = stream;
      }

      var fieldName;
      var primitiveArray;

      switch (this._type) {
        case PRIMITIVE_TYPES.treetable:
          fieldName = this._type;

          if (!stream[fieldName]) {
            this._validator.hasProp(this, '_columns');

            stream[fieldName] = {
              columns: this._columns,
              nodes: []
            };
          }

          primitiveArray = stream[fieldName].nodes;
          break;

        default:
      }

      var primitives = this._formatPrimitives();

      if (primitives) {
        var _iterator = _createForOfIteratorHelper(primitives),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var primitive = _step.value;
            primitiveArray.push(primitive);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      this.reset();
    }
  }, {
    key: "_formatPrimitives",
    value: function _formatPrimitives() {
      switch (this._type) {
        case PRIMITIVE_TYPES.treetable:
          if (this._rows.length > 0) {
            var _ref;

            return (_ref = []).concat.apply(_ref, _toConsumableArray(this._rows.map(function (row) {
              return row.getData();
            })));
          }

          break;

        default:
      }

      return null;
    }
  }, {
    key: "reset",
    value: function reset() {
      this._type = null;
      this._columns = null;
      this._rows = [];
    }
  }]);

  return XVIZUIPrimitiveBuilder;
}(XVIZBaseBuilder);

export { XVIZUIPrimitiveBuilder as default };
//# sourceMappingURL=xviz-ui-primitive-builder.js.map