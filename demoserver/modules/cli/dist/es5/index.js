"use strict";

var _middleware = require("./middleware");

var _dump = require("./dump");

var _websocket = require("./websocket");

var _validate = require("./cmds/validate");

var _dump2 = require("./cmds/dump");

var yargs = require('yargs');

function main() {
  var args = yargs.alias('h', 'help');
  args = (0, _dump2.dumpArgs)(args);
  args = (0, _validate.validateArgs)(args);
  return args.argv;
}

module.exports = {
  XVIZMiddlewareStack: _middleware.XVIZMiddlewareStack,
  DumpXVIZ: _dump.DumpXVIZ,
  DumpMode: _dump.DumpMode,
  WebSocketInterface: _websocket.WebSocketInterface,
  main: main
};
//# sourceMappingURL=index.js.map