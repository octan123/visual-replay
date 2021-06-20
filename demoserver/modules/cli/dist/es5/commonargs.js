"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addDataArgs = addDataArgs;
exports.addMetadataArg = addMetadataArg;
exports.addCondensedArg = addCondensedArg;

function addDataArgs(args) {
  args.options('start', {
    alias: 's',
    describe: 'Start time for the request'
  });
  args.options('end', {
    alias: 'e',
    describe: 'End time for the request'
  });
}

function addMetadataArg(args, help) {
  args.options('metadata', {
    alias: 'm',
    "boolean": true,
    describe: help
  });
}

function addCondensedArg(args, help) {
  args.options('condensed', {
    alias: 'c',
    "boolean": true,
    describe: help
  });
}
//# sourceMappingURL=commonargs.js.map