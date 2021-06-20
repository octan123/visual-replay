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

var _monochrome = require("@streetscape.gl/monochrome");

var _imageBuffer = _interopRequireDefault(require("../../utils/image-buffer"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ImageSequence = function (_PureComponent) {
  (0, _inherits2["default"])(ImageSequence, _PureComponent);

  var _super = _createSuper(ImageSequence);

  function ImageSequence(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, ImageSequence);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onCanvasLoad", function (ref) {
      _this._canvas = ref;

      if (ref) {
        _this._context = ref.getContext('2d');
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_onCanvasResize", function (_ref) {
      var width = _ref.width,
          height = _ref.height;

      _this.setState({
        width: width,
        height: height
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_getVideoFilterCSS", function () {
      var _this$props = _this.props,
          brightness = _this$props.brightness,
          contrast = _this$props.contrast,
          saturate = _this$props.saturate,
          invert = _this$props.invert;
      var filter = "      ".concat(Number.isFinite(brightness) ? "brightness(".concat(brightness, ") ") : '', "      ").concat(Number.isFinite(saturate) ? "saturate(".concat(saturate, ") ") : '', "      ").concat(Number.isFinite(contrast) ? "contrast(".concat(contrast, ") ") : '', "      ").concat(Number.isFinite(invert) ? "invert(".concat(invert, ") ") : '');
      return filter;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "_renderFrame", function () {
      if (!_this._context) {
        return;
      }

      var width = _this.state.width;
      var height = _this.state.height;

      if (!width) {
        return;
      }

      _this._context.filter = _this._getVideoFilterCSS();
      var currentFrameImage = _this.state.currentFrameImage;

      if (!currentFrameImage) {
        _this._context.clearRect(0, 0, width, height);
      } else {
        if (_this.props.height === 'auto') {
          height = width / currentFrameImage.width * currentFrameImage.height;
        }

        _this._canvas.width = width;
        _this._canvas.height = height;

        _this._context.drawImage(currentFrameImage, 0, 0, width, height);
      }
    });
    _this._buffer = new _imageBuffer["default"](10);
    _this.state = _objectSpread({
      width: 0,
      height: 0
    }, _this._getCurrentFrames(props));
    _this._canvas = null;
    _this._context = null;
    return _this;
  }

  (0, _createClass2["default"])(ImageSequence, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._renderFrame();
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.setState(_objectSpread({}, this._getCurrentFrames(nextProps)));
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.state.currentFrameImage !== prevState.currentFrameImage && !this.state.currentFrameImagePending || this.state.width !== prevState.width || this.state.height !== prevState.height) {
        this._renderFrame();
      }
    }
  }, {
    key: "_getCurrentFrames",
    value: function _getCurrentFrames(props) {
      var _this2 = this;

      var currentTime = props.currentTime,
          src = props.src;

      var currentFrame = this._buffer.set(src, currentTime);

      var currentFrameData = this._buffer.get(currentFrame);

      if (currentFrameData && !currentFrameData.image) {
        currentFrameData.promise.then(function (image) {
          if (_this2.state.currentFrame === currentFrame) {
            _this2.setState({
              currentFrameImagePending: false,
              currentFrameImage: image
            });
          }
        });
      }

      return {
        currentFrameImage: currentFrameData && currentFrameData.image,
        currentFrameImagePending: currentFrameData && !currentFrameData.image && true,
        currentFrame: currentFrame
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          width = _this$props2.width,
          height = _this$props2.height;
      var style = {
        position: 'relative',
        background: '#000',
        lineHeight: 0,
        width: width,
        height: height
      };
      return _react["default"].createElement("div", {
        style: style
      }, _react["default"].createElement(_monochrome.AutoSizer, {
        onResize: this._onCanvasResize
      }), _react["default"].createElement("canvas", {
        ref: this._onCanvasLoad
      }));
    }
  }]);
  return ImageSequence;
}(_react.PureComponent);

exports["default"] = ImageSequence;
(0, _defineProperty2["default"])(ImageSequence, "propTypes", {
  width: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  height: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  src: _propTypes["default"].array,
  brightness: _propTypes["default"].number,
  contrast: _propTypes["default"].number,
  saturate: _propTypes["default"].number,
  invert: _propTypes["default"].number,
  currentTime: _propTypes["default"].number.isRequired
});
(0, _defineProperty2["default"])(ImageSequence, "defaultProps", {
  width: '100%',
  height: 'auto',
  src: []
});
//# sourceMappingURL=image-sequence.js.map