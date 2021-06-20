import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AutoSizer } from '@streetscape.gl/monochrome';
import ImageBuffer from '../../utils/image-buffer';
export default class ImageSequence extends PureComponent {
  constructor(props) {
    super(props);

    _defineProperty(this, "_onCanvasLoad", ref => {
      this._canvas = ref;

      if (ref) {
        this._context = ref.getContext('2d');
      }
    });

    _defineProperty(this, "_onCanvasResize", ({
      width,
      height
    }) => {
      this.setState({
        width,
        height
      });
    });

    _defineProperty(this, "_getVideoFilterCSS", () => {
      const {
        brightness,
        contrast,
        saturate,
        invert
      } = this.props;
      const filter = "      ".concat(Number.isFinite(brightness) ? "brightness(".concat(brightness, ") ") : '', "      ").concat(Number.isFinite(saturate) ? "saturate(".concat(saturate, ") ") : '', "      ").concat(Number.isFinite(contrast) ? "contrast(".concat(contrast, ") ") : '', "      ").concat(Number.isFinite(invert) ? "invert(".concat(invert, ") ") : '');
      return filter;
    });

    _defineProperty(this, "_renderFrame", () => {
      if (!this._context) {
        return;
      }

      const width = this.state.width;
      let height = this.state.height;

      if (!width) {
        return;
      }

      this._context.filter = this._getVideoFilterCSS();
      const {
        currentFrameImage
      } = this.state;

      if (!currentFrameImage) {
        this._context.clearRect(0, 0, width, height);
      } else {
        if (this.props.height === 'auto') {
          height = width / currentFrameImage.width * currentFrameImage.height;
        }

        this._canvas.width = width;
        this._canvas.height = height;

        this._context.drawImage(currentFrameImage, 0, 0, width, height);
      }
    });

    this._buffer = new ImageBuffer(10);
    this.state = _objectSpread({
      width: 0,
      height: 0
    }, this._getCurrentFrames(props));
    this._canvas = null;
    this._context = null;
  }

  componentDidMount() {
    this._renderFrame();
  }

  componentWillReceiveProps(nextProps) {
    this.setState(_objectSpread({}, this._getCurrentFrames(nextProps)));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentFrameImage !== prevState.currentFrameImage && !this.state.currentFrameImagePending || this.state.width !== prevState.width || this.state.height !== prevState.height) {
      this._renderFrame();
    }
  }

  _getCurrentFrames(props) {
    const {
      currentTime,
      src
    } = props;

    const currentFrame = this._buffer.set(src, currentTime);

    const currentFrameData = this._buffer.get(currentFrame);

    if (currentFrameData && !currentFrameData.image) {
      currentFrameData.promise.then(image => {
        if (this.state.currentFrame === currentFrame) {
          this.setState({
            currentFrameImagePending: false,
            currentFrameImage: image
          });
        }
      });
    }

    return {
      currentFrameImage: currentFrameData && currentFrameData.image,
      currentFrameImagePending: currentFrameData && !currentFrameData.image && true,
      currentFrame
    };
  }

  render() {
    const {
      width,
      height
    } = this.props;
    const style = {
      position: 'relative',
      background: '#000',
      lineHeight: 0,
      width,
      height
    };
    return React.createElement("div", {
      style: style
    }, React.createElement(AutoSizer, {
      onResize: this._onCanvasResize
    }), React.createElement("canvas", {
      ref: this._onCanvasLoad
    }));
  }

}

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
//# sourceMappingURL=image-sequence.js.map