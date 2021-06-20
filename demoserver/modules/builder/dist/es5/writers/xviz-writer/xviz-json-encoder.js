"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xvizConvertJson = xvizConvertJson;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _base64Js = _interopRequireDefault(require("base64-js"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function xvizConvertJson(object, keyName) {
  var nestedDepth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  if (Array.isArray(object)) {
    return object.map(function (element) {
      return xvizConvertJson(element, keyName, nestedDepth + 1);
    });
  }

  if (ArrayBuffer.isView(object)) {
    if (!(keyName === 'vertices' || keyName === 'points') || nestedDepth > 0) {
      return Array.from(object);
    }

    var length = object.length;

    if (length % 3 !== 0) {
      throw new Error('TypeArray conversion failure. The array is expect to be divisible by 3');
    }

    var newObject = [];
    var count = length / 3;

    for (var i = 0; i < count; i++) {
      newObject.push(Array.from(object.slice(i * 3, i * 3 + 3)));
    }

    return newObject;
  }

  if (object !== null && (0, _typeof2["default"])(object) === 'object') {
    var properties = Object.keys(object);

    if (properties.includes('data') && keyName === 'images') {
      return _objectSpread(_objectSpread({}, object), {}, {
        data: _base64Js["default"].fromByteArray(object.data)
      });
    }

    var _newObject = {};

    for (var key in object) {
      _newObject[key] = xvizConvertJson(object[key], key);
    }

    return _newObject;
  }

  return object;
}
//# sourceMappingURL=xviz-json-encoder.js.map