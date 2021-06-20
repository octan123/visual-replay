"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeBinaryXVIZtoFile = writeBinaryXVIZtoFile;

var _io = require("@xviz/io");

function writeBinaryXVIZtoFile(sink, directory, name, json, options) {
  var glbFileBuffer = (0, _io.encodeBinaryXVIZ)(json, options);
  sink.writeSync(directory, "".concat(name, ".glb"), Buffer.from(glbFileBuffer), {
    flag: 'w'
  });
  return glbFileBuffer;
}
//# sourceMappingURL=xviz-binary-writer.js.map