import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AutoSizer } from '@streetscape.gl/monochrome';
import ImageBuffer from '../../utils/image-buffer';

var ImageSequence = function (_PureComponent) {
  _inherits(ImageSequence, _PureComponent);

  var _super = _createSuper(ImageSequence);

  function ImageSequence(props) {
    var _this;

    _classCallCheck(this, ImageSequence);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "_onCanvasLoad", function (ref) {
      _this._canvas = ref;

      if (ref) {
        _this._context = ref.getContext('2d');
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_onCanvasResize", function (_ref) {
      var width = _ref.width,
          height = _ref.height;

      _this.setState({
        width: width,
        height: height
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_getVideoFilterCSS", function () {
      var _this$props = _this.props,
          brightness = _this$props.brightness,
          contrast = _this$props.contrast,
          saturate = _this$props.saturate,
          invert = _this$props.invert;
      var filter = "      ".concat(Number.isFinite(brightness) ? "brightness(".concat(brightness, ") ") : '', "      ").concat(Number.isFinite(saturate) ? "saturate(".concat(saturate, ") ") : '', "      ").concat(Number.isFinite(contrast) ? "contrast(".concat(contrast, ") ") : '', "      ").concat(Number.isFinite(invert) ? "invert(".concat(invert, ") ") : '');
      return filter;
    });

    _defineProperty(_assertThisInitialized(_this), "_renderFrame", function () {
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

    _this._buffer = new ImageBuffer(10);
    _this.state = _objectSpread({
      width: 0,
      height: 0
    }, _this._getCurrentFrames(props));
    _this._canvas = null;
    _this._context = null;
    return _this;
  }

  _createClass(ImageSequence, [{
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
      return React.createElement("div", {
        style: style
      }, React.createElement(AutoSizer, {
        onResize: this._onCanvasResize
      }), React.createElement("canvas", {
        ref: this._onCanvasLoad
      }));
    }
  }]);

  return ImageSequence;
}(PureComponent);

_defineProperty(ImageSequence, "propTypes", {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  src: PropTypes.array,
  brightness: PropTypes.number,
  contrast: PropTypes.number,
  saturate: PropTypes.number,
  invert: PropTypes.number,
  currentTime: PropTypes.number.isRequired
});

_defineProperty(ImageSequence, "defaultProps", {
  width: '100%',
  height: 'auto',
  src: []
});

export { ImageSequence as default };
//# sourceMappingURL=image-sequence.js.map