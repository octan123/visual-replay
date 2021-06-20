"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _xvizPrimitiveBuilder = _interopRequireDefault(require("./xviz-primitive-builder"));

var _utils = require("../utils");

var _constant = require("./constant");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var XVIZFutureInstanceBuilder = function (_XVIZPrimitiveBuilder) {
  (0, _inherits2["default"])(XVIZFutureInstanceBuilder, _XVIZPrimitiveBuilder);

  var _super = _createSuper(XVIZFutureInstanceBuilder);

  function XVIZFutureInstanceBuilder(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, XVIZFutureInstanceBuilder);
    _this = _super.call(this, _objectSpread(_objectSpread({}, props), {}, {
      category: _constant.CATEGORY.FUTURE_INSTANCE
    }));

    _this.reset();

    _this._futures = {};
    return _this;
  }

  (0, _createClass2["default"])(XVIZFutureInstanceBuilder, [{
    key: "_timestamp",
    value: function _timestamp(timestamp) {
      this._ts = timestamp;
      return this;
    }
  }, {
    key: "_flush",
    value: function _flush() {
      var future = this._futures[this._streamId];

      if (!future) {
        future = {
          timestamps: [],
          primitives: []
        };
        this._futures[this._streamId] = future;
      }

      var primitive = this._formatPrimitive();

      var _future = future,
          timestamps = _future.timestamps,
          primitives = _future.primitives;
      var update = {};
      update["".concat(this._type, "s")] = [primitive];
      (0, _utils.insertTimestamp)(timestamps, primitives, this._ts, "".concat(this._type, "s"), primitive);
      this.reset();
    }
  }, {
    key: "getData",
    value: function getData() {
      if (this._type) {
        this._flush();
      }

      if (Object.keys(this._futures).length === 0) {
        return null;
      }

      return this._futures;
    }
  }, {
    key: "reset",
    value: function reset() {
      (0, _get2["default"])((0, _getPrototypeOf2["default"])(XVIZFutureInstanceBuilder.prototype), "reset", this).call(this);
    }
  }]);
  return XVIZFutureInstanceBuilder;
}(_xvizPrimitiveBuilder["default"]);

exports["default"] = XVIZFutureInstanceBuilder;
//# sourceMappingURL=xviz-future-instance-builder.js.map