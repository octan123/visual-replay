"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.main = main;

var _server = require("./cmds/server");

var yargs = require('yargs');

function main() {
  console.log('main');
  var args = yargs.alias('h', 'help');
  args = (0, _server.serverArgs)(args, {
    defaultCommand: true
  });
  args.parse();
}
//# sourceMappingURL=main.js.map