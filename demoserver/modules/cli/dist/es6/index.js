const yargs = require('yargs');

import { XVIZMiddlewareStack } from './middleware';
import { DumpXVIZ, DumpMode } from './dump';
import { WebSocketInterface } from './websocket';
import { validateArgs } from './cmds/validate';
import { dumpArgs } from './cmds/dump';

function main() {
  let args = yargs.alias('h', 'help');
  args = dumpArgs(args);
  args = validateArgs(args);
  return args.argv;
}

module.exports = {
  XVIZMiddlewareStack,
  DumpXVIZ,
  DumpMode,
  WebSocketInterface,
  main
};
//# sourceMappingURL=index.js.map