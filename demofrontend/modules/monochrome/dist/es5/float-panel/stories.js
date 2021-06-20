"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _addonKnobs = require("@storybook/addon-knobs");

var _react2 = require("@storybook/react");

var _storybookReadme = require("storybook-readme");

var _README = _interopRequireDefault(require("./README.md"));

var _index = _interopRequireDefault(require("./index"));

var _shared = require("../shared");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var FloatPanelExample = function (_Component) {
  (0, _inherits2["default"])(FloatPanelExample, _Component);

  var _super = _createSuper(FloatPanelExample);

  function FloatPanelExample() {
    var _this;

    (0, _classCallCheck2["default"])(this, FloatPanelExample);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      x: 0,
      y: 0,
      size: 200,
      minimized: false
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onUpdatePanel", function (_ref) {
      var x = _ref.x,
          y = _ref.y,
          width = _ref.width,
          minimized = _ref.minimized;
      width = Math.min(400, Math.max(50, width));

      _this.setState({
        x: x,
        y: y,
        minimized: minimized,
        size: width
      });
    });
    return _this;
  }

  (0, _createClass2["default"])(FloatPanelExample, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          x = _this$state.x,
          y = _this$state.y,
          size = _this$state.size,
          minimized = _this$state.minimized;
      return _react["default"].createElement("div", {
        style: {
          height: '100vh'
        }
      }, _react["default"].createElement(_shared.AutoSizer, null, function (_ref2) {
        var width = _ref2.width,
            height = _ref2.height;
        return _react["default"].createElement(_index["default"], {
          title: 'My Photo',
          parentWidth: width,
          parentHeight: height,
          x: x,
          y: y,
          width: size,
          height: size,
          minimized: minimized,
          movable: (0, _addonKnobs["boolean"])('movable', true),
          resizable: (0, _addonKnobs["boolean"])('resizable', true),
          minimizable: (0, _addonKnobs["boolean"])('minimizable', true),
          onUpdate: _this2._onUpdatePanel
        }, _react["default"].createElement("img", {
          src: "https://avatars2.githubusercontent.com/u/2059298?v=3&s=460",
          width: "100%"
        }));
      }));
    }
  }]);
  return FloatPanelExample;
}(_react.Component);

(0, _react2.storiesOf)('FloatPanel', module).addDecorator((0, _storybookReadme.withReadme)(_README["default"])).add('Basic example', function () {
  return _react["default"].createElement(FloatPanelExample, null);
});
//# sourceMappingURL=stories.js.map