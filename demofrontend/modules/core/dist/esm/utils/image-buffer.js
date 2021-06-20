import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import { getXVIZConfig } from '@xviz/parser';

function loadImage(frame) {
  var blob = new Blob([frame.imageData], {
    type: frame.imageType
  });

  if (typeof createImageBitmap !== 'undefined') {
    return createImageBitmap(blob);
  }

  return new Promise(function (resolve, reject) {
    try {
      var image = new Image();

      image.onload = function () {
        return resolve(image);
      };

      image.onerror = reject;
      image.src = URL.createObjectURL(blob);
    } catch (error) {
      reject(error);
    }
  });
}

function deleteImage(image) {
  if (image.close) {
    image.close();
  }
}

var ImageBuffer = function () {
  function ImageBuffer(size) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$imageLoader = _ref.imageLoader,
        imageLoader = _ref$imageLoader === void 0 ? loadImage : _ref$imageLoader,
        _ref$imageDeleter = _ref.imageDeleter,
        imageDeleter = _ref$imageDeleter === void 0 ? deleteImage : _ref$imageDeleter;

    _classCallCheck(this, ImageBuffer);

    this.size = size;
    this.imageLoader = imageLoader;
    this.imageDeleter = imageDeleter;
    this.buffer = new Map();
  }

  _createClass(ImageBuffer, [{
    key: "get",
    value: function get(frame) {
      return this.buffer.get(frame);
    }
  }, {
    key: "set",
    value: function set(allFrames, currentTime) {
      var _this = this;

      var buffer = this.buffer;

      var _this$_getCurrentFram = this._getCurrentFrames(allFrames, currentTime),
          currentFrame = _this$_getCurrentFram.currentFrame,
          bufferedFrames = _this$_getCurrentFram.bufferedFrames;

      var _iterator = _createForOfIteratorHelper(buffer.keys()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var frame = _step.value;

          if (bufferedFrames.length === 0 || frame.time < bufferedFrames[0].time || frame.time > bufferedFrames[bufferedFrames.length - 1].time) {
            this.imageDeleter(buffer.get(frame));
            buffer["delete"](frame);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      bufferedFrames.forEach(function (frame) {
        if (!buffer.has(frame)) {
          var data = {};
          data.promise = _this.imageLoader(frame.images[0]).then(function (image) {
            data.image = image;
            return image;
          });
          buffer.set(frame, data);
        }
      });
      return currentFrame;
    }
  }, {
    key: "_getCurrentFrames",
    value: function _getCurrentFrames(allFrames, currentTime) {
      var currentFrame = null;
      var currentFrameIndex = -1;
      var bestDelta = getXVIZConfig().TIME_WINDOW;
      allFrames.forEach(function (frame, i) {
        var delta = currentTime - frame.time;

        if (delta >= 0 && delta < bestDelta) {
          bestDelta = delta;
          currentFrame = frame;
          currentFrameIndex = i;
        }
      });
      var bufferedFrames = currentFrameIndex >= 0 ? allFrames.slice(Math.max(0, currentFrameIndex - this.size), currentFrameIndex + this.size) : [];
      return {
        currentFrame: currentFrame,
        bufferedFrames: bufferedFrames
      };
    }
  }]);

  return ImageBuffer;
}();

export { ImageBuffer as default };
//# sourceMappingURL=image-buffer.js.map