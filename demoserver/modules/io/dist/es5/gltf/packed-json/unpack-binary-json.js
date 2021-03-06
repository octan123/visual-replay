"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = unpackJsonArrays;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

function unpackJsonArrays(json, buffers) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return unpackJsonArraysRecursive(json, json, buffers, options);
}

function unpackJsonArraysRecursive(json, topJson, buffers) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var object = json;
  var buffer = decodeJSONPointer(object, buffers);

  if (buffer) {
    return buffer;
  }

  if (Array.isArray(object)) {
    return object.map(function (element) {
      return unpackJsonArraysRecursive(element, topJson, buffers, options);
    });
  }

  if (object !== null && (0, _typeof2["default"])(object) === 'object') {
    var newObject = {};

    for (var key in object) {
      newObject[key] = unpackJsonArraysRecursive(object[key], topJson, buffers, options);
    }

    return newObject;
  }

  return object;
}

function decodeJSONPointer(object, buffers) {
  var pointer = parseJSONPointer(object);

  if (pointer) {
    var _pointer = (0, _slicedToArray2["default"])(pointer, 2),
        field = _pointer[0],
        index = _pointer[1];

    var buffer = buffers[field] && buffers[field][index];

    if (buffer) {
      return buffer;
    }

    console.error("Invalid JSON pointer ".concat(object, ": #/").concat(field, "/").concat(index));
  }

  return null;
}

function parseJSONPointer(value) {
  if (typeof value === 'string') {
    if (value.indexOf('##/') === 0) {
      return value.slice(1);
    }

    var matches = value.match(/#\/([a-z]+)\/([0-9]+)/);

    if (matches) {
      var index = parseInt(matches[2], 10);
      return [matches[1], index];
    }

    matches = value.match(/\$\$\$([0-9]+)/);

    if (matches) {
      var _index = parseInt(matches[1], 10);

      return ['accessors', _index];
    }
  }

  return null;
}
//# sourceMappingURL=unpack-binary-json.js.map