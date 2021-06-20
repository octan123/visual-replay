import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var mimeTypeMap = new Map([['image/png', getPngSize], ['image/jpeg', getJpegSize], ['image/gif', getGifSize], ['image/bmp', getBmpSize]]);
export function getImageSize(contents, mimeType) {
  var ERR_INVALID_TYPE = "Invalid MIME type. Supported MIME types are: ".concat(Array.from(mimeTypeMap.keys()).join(', '));

  if (mimeType) {
    var handler = mimeTypeMap.get(mimeType);

    if (!handler) {
      throw new Error(ERR_INVALID_TYPE);
    }

    var result = handler(contents);

    if (!result) {
      throw new Error("invalid image data for type: ".concat(mimeType));
    }

    return result;
  }

  var _iterator = _createForOfIteratorHelper(mimeTypeMap.entries()),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
          supportedMimeType = _step$value[0],
          _handler = _step$value[1];

      var _result = _handler(contents);

      if (_result) {
        _result.mimeType = supportedMimeType;
        return _result;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  throw new Error(ERR_INVALID_TYPE);
}

function getPngSize(contents) {
  if (contents.readUInt32BE(0) !== 0x89504e47) {
    return null;
  }

  var width = contents.readUInt32BE(16);
  var height = contents.readUInt32BE(20);
  return {
    width: width,
    height: height
  };
}

function getJpegSize(contents) {
  if (contents.readUInt16BE(0) !== 0xffd8) {
    return null;
  }

  var _getJpegMarkers = getJpegMarkers(),
      tableMarkers = _getJpegMarkers.tableMarkers,
      sofMarkers = _getJpegMarkers.sofMarkers;

  var i = 2;

  while (i < contents.length) {
    var marker = contents.readUInt16BE(i);

    if (sofMarkers.has(marker)) {
      var height = contents.readUInt16BE(i + 5);
      var width = contents.readUInt16BE(i + 7);
      return {
        width: width,
        height: height
      };
    }

    if (!tableMarkers.has(marker)) {
      return null;
    }

    i += 2;
    i += contents.readUInt16BE(i);
  }

  return null;
}

function getJpegMarkers() {
  var tableMarkers = new Set([0xffdb, 0xffc4, 0xffcc, 0xffdd, 0xfffe]);

  for (var i = 0xffe0; i < 0xfff0; ++i) {
    tableMarkers.add(i);
  }

  var sofMarkers = new Set([0xffc0, 0xffc1, 0xffc2, 0xffc3, 0xffc5, 0xffc6, 0xffc7, 0xffc9, 0xffca, 0xffcb, 0xffcd, 0xffce, 0xffcf, 0xffde]);
  return {
    tableMarkers: tableMarkers,
    sofMarkers: sofMarkers
  };
}

function getGifSize(contents) {
  if (contents.readUInt32BE(0) !== 0x47494638) {
    return null;
  }

  var width = contents.readUInt16LE(6);
  var height = contents.readUInt16LE(8);
  return {
    width: width,
    height: height
  };
}

function getBmpSize(contents) {
  if (contents.readUInt16BE(0) !== 0x424d) {
    return null;
  }

  var width = contents.readUInt32LE(18);
  var height = contents.readUInt32LE(22);
  return {
    width: width,
    height: height
  };
}
//# sourceMappingURL=get-image-size.js.map