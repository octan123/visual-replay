"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.main = main;

var _cmds = require("./cmds");

var _register = require("./providers/register");

var yargs = require('yargs');

function setupROSProvider(args) {
  if (args.rosConfig) {
    (0, _register.registerROSBagProvider)(args.rosConfig);
  }
}

function main() {
  var args = yargs.alias('h', 'help');
  args = (0, _cmds.bagdumpArgs)(args);
  args = (0, _cmds.configArgs)(args);
  args = (0, _cmds.convertArgs)(args);
  args.middleware(setupROSProvider).parse();
}
//# sourceMappingURL=main.js.map