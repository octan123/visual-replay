const yargs = require('yargs');

import { bagdumpArgs, configArgs, convertArgs } from './cmds';
import { registerROSBagProvider } from './providers/register';

function setupROSProvider(args) {
  if (args.rosConfig) {
    registerROSBagProvider(args.rosConfig);
  }
}

export function main() {
  let args = yargs.alias('h', 'help');
  args = bagdumpArgs(args);
  args = configArgs(args);
  args = convertArgs(args);
  args.middleware(setupROSProvider).parse();
}
//# sourceMappingURL=main.js.map