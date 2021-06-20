"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dumpArgs = dumpArgs;
exports["default"] = command;

var _commonargs = require("../commonargs");

var _dump = require("../dump");

var _connect = require("../connect");

function dumpArgs(inArgs) {
  return inArgs.command('dump <host> [log]', 'Print XVIZ data to stdout', function (args) {
    (0, _commonargs.addDataArgs)(args);
    (0, _commonargs.addMetadataArg)(args, 'Just fetch metadata and exit');
    (0, _commonargs.addCondensedArg)(args, 'Display summary information');
  }, function (args) {
    command(args);
  });
}

function command(args) {
  var dumpMode = function () {
    if (args.oneline) {
      return _dump.DumpMode.ONELINE;
    } else if (args.condensed) {
      return _dump.DumpMode.CONDENSED;
    }

    return _dump.DumpMode.ALL;
  }();

  var dump = new _dump.DumpXVIZ({
    mode: dumpMode
  });
  var stack = [dump];
  (0, _connect.openSource)(args, stack);
}
//# sourceMappingURL=dump.js.map