"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _xvizBaseBuilder = _interopRequireDefault(require("./xviz-base-builder"));

var _constant = require("./constant");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var XVIZTreeTableRowBuilder = function () {
  function XVIZTreeTableRowBuilder(id, values) {
    var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    (0, _classCallCheck2["default"])(this, XVIZTreeTableRowBuilder);
    this._parent = parent;
    this._id = id;
    this._values = values;
    this._children = [];
  }

  (0, _createClass2["default"])(XVIZTreeTableRowBuilder, [{
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
  (0, _inherits2["default"])(XVIZUIPrimitiveBuilder, _XVIZBaseBuilder);

  var _super = _createSuper(XVIZUIPrimitiveBuilder);

  function XVIZUIPrimitiveBuilder(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, XVIZUIPrimitiveBuilder);
    _this = _super.call(this, _objectSpread(_objectSpread({}, props), {}, {
      category: _constant.CATEGORY.UI_PRIMITIVE
    }));

    _this.reset();

    _this._primitives = {};
    return _this;
  }

  (0, _createClass2["default"])(XVIZUIPrimitiveBuilder, [{
    key: "treetable",
    value: function treetable(columns) {
      if (this._type) {
        this._flush();
      }

      this.validatePropSetOnce('_columns');
      this._columns = columns;
      this._type = _constant.PRIMITIVE_TYPES.treetable;
      return this;
    }
  }, {
    key: "row",
    value: function row(id, values) {
      this.validatePropSetOnce('_id');
      var row = new XVIZTreeTableRowBuilder(id, values);

      this._rows.push(row);

      this._type = _constant.PRIMITIVE_TYPES.treetable;
      return row;
    }
  }, {
    key: "_validate",
    value: function _validate() {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(XVIZUIPrimitiveBuilder.prototype), "_validate", this).call(this);
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
        case _constant.PRIMITIVE_TYPES.treetable:
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
        case _constant.PRIMITIVE_TYPES.treetable:
          if (this._rows.length > 0) {
            var _ref;

            return (_ref = []).concat.apply(_ref, (0, _toConsumableArray2["default"])(this._rows.map(function (row) {
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
}(_xvizBaseBuilder["default"]);

exports["default"] = XVIZUIPrimitiveBuilder;
//# sourceMappingURL=xviz-ui-primitive-builder.js.map