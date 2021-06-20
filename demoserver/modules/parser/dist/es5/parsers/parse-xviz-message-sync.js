"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseXVIZMessageSync = parseXVIZMessageSync;
exports.parseXVIZData = parseXVIZData;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _constants = require("../constants");

var _io = require("@xviz/io");

var _parseLogMetadata = require("./parse-log-metadata");

var _parseVideoMessageV = require("./parse-video-message-v1");

var _parseTimesliceDataV = _interopRequireDefault(require("./parse-timeslice-data-v1"));

var _parseTimesliceDataV2 = _interopRequireDefault(require("./parse-timeslice-data-v2"));

var _xvizConfig = require("../config/xviz-config");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function parseXVIZMessageSync(message, onResult, onError, opts) {
  if (typeof Blob !== 'undefined' && message instanceof Blob) {
    (0, _parseVideoMessageV.parseVideoMessageV1)(message, onResult, onError);
    return;
  }

  var messageType = opts.messageType,
      messageFormat = opts.messageFormat;

  try {
    var xvizData = new _io.XVIZData(message, {
      messageType: messageType,
      messageFormat: messageFormat
    });
    var xvizMsg = xvizData.message();

    if (xvizMsg) {
      var data = xvizMsg.data;
      var v2Type = xvizMsg.type || undefined;
      var result = parseXVIZData(data, _objectSpread(_objectSpread({}, opts), {}, {
        v2Type: v2Type
      }));
      onResult(result);
    }
  } catch (error) {
    onError(error);
  }
}

function parseXVIZData(data) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var typeKey = opts.v2Type || data.type || data.message || data.update_type;

  switch (typeKey) {
    case 'state_update':
      return parseTimesliceData(data, opts.convertPrimitive);

    case 'metadata':
      return _objectSpread(_objectSpread({}, (0, _parseLogMetadata.parseLogMetadata)(data)), {}, {
        type: _constants.XVIZ_MESSAGE_TYPE.METADATA
      });

    case 'transform_log_done':
      return _objectSpread(_objectSpread({}, data), {}, {
        type: _constants.XVIZ_MESSAGE_TYPE.DONE
      });

    case 'error':
      return _objectSpread(_objectSpread({}, data), {}, {
        message: 'Stream server error',
        type: _constants.XVIZ_MESSAGE_TYPE.ERROR
      });

    case 'done':
      return _objectSpread(_objectSpread({}, data), {}, {
        type: _constants.XVIZ_MESSAGE_TYPE.DONE
      });

    default:
      return parseTimesliceData(data, opts.convertPrimitive);
  }
}

function parseTimesliceData(data, convertPrimitive) {
  var _getXVIZConfig = (0, _xvizConfig.getXVIZConfig)(),
      currentMajorVersion = _getXVIZConfig.currentMajorVersion;

  return currentMajorVersion === 1 ? (0, _parseTimesliceDataV["default"])(data, convertPrimitive) : (0, _parseTimesliceDataV2["default"])(data, convertPrimitive);
}
//# sourceMappingURL=parse-xviz-message-sync.js.map