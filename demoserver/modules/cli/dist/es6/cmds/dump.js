import { addDataArgs, addMetadataArg, addCondensedArg } from '../commonargs';
import { DumpXVIZ, DumpMode } from '../dump';
import { openSource } from '../connect';
export function dumpArgs(inArgs) {
  return inArgs.command('dump <host> [log]', 'Print XVIZ data to stdout', args => {
    addDataArgs(args);
    addMetadataArg(args, 'Just fetch metadata and exit');
    addCondensedArg(args, 'Display summary information');
  }, args => {
    command(args);
  });
}
export default function command(args) {
  const dumpMode = (() => {
    if (args.oneline) {
      return DumpMode.ONELINE;
    } else if (args.condensed) {
      return DumpMode.CONDENSED;
    }

    return DumpMode.ALL;
  })();

  const dump = new DumpXVIZ({
    mode: dumpMode
  });
  const stack = [dump];
  openSource(args, stack);
}
//# sourceMappingURL=dump.js.map