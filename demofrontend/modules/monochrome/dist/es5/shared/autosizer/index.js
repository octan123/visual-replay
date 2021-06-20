"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _AutoSizer = _interopRequireDefault(require("react-virtualized/dist/commonjs/AutoSizer"));

var _debounce = _interopRequireDefault(require("debounce"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var noop = function noop() {
  return null;
};

var SizeSensor = function (_Component) {
  (0, _inherits2["default"])(SizeSensor, _Component);

  var _super = _createSuper(SizeSensor);

  function SizeSensor() {
    var _this;

    (0, _classCallCheck2["default"])(this, SizeSensor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onResize", function (size) {
      if (_this.resize) {
        _this.resize(size);
      } else if (_this.props.onResize) {
        var _this$props = _this.props,
            onResize = _this$props.onResize,
            debounceTime = _this$props.debounceTime;
        onResize(size);
        _this.resize = debounceTime > 0 ? (0, _debounce["default"])(onResize, debounceTime) : onResize;
      }
    });
    return _this;
  }

  (0, _createClass2["default"])(SizeSensor, [{
    key: "render",
    value: function render() {
      return _react["default"].createElement(_AutoSizer["default"], {
        onResize: this._onResize
      }, this.props.children || noop);
    }
  }]);
  return SizeSensor;
}(_react.Component);

exports["default"] = SizeSensor;
(0, _defineProperty2["default"])(SizeSensor, "propTypes", {
  debounceTime: _propTypes["default"].number
});
//# sourceMappingURL=index.js.map