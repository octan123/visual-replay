"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadProtos = loadProtos;
exports.getXVIZProtoTypes = getXVIZProtoTypes;
exports.EXTENSION_PROPERTY = void 0;

var _protobufjs = require("protobufjs");

var _data = require("./data");

var EXTENSION_PROPERTY = '(xviz_json_schema)';
exports.EXTENSION_PROPERTY = EXTENSION_PROPERTY;

function loadProtos() {
  return _protobufjs.Root.fromJSON(_data.PROTO_DATA);
}

function getXVIZProtoTypes(protoRoot) {
  var protoTypes = [];
  traverseTypes(protoRoot, function (type) {
    if (type.options !== undefined) {
      if (type.options[EXTENSION_PROPERTY] !== undefined) {
        protoTypes.push(type);
      }
    }
  });
  return protoTypes;
}

function traverseTypes(current, fn) {
  if (current instanceof _protobufjs.Type) fn(current);
  if (current.nestedArray) current.nestedArray.forEach(function eachType(nested) {
    traverseTypes(nested, fn);
  });
}
//# sourceMappingURL=proto-validation.js.map