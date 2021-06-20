import { addDataArgs, addMetadataArg, addCondensedArg } from '../commonargs';
import { DumpXVIZ, DumpMode } from '../dump';
import { openSource } from '../connect';
export function dumpArgs(inArgs) {
  return inArgs.command('dump <host> [log]', 'Print XVIZ data to stdout', function (args) {
    addDataArgs(args);
    addMetadataArg(args, 'Just fetch metadata and exit');
    addCondensedArg(args, 'Display summary information');
  }, function (args) {
    command(args);
  });
}
export default function command(args) {
  var dumpMode = function () {
    if (args.oneline) {
      return DumpMode.ONELINE;
    } else if (args.condensed) {
      return DumpMode.CONDENSED;
    }

    return DumpMode.ALL;
  }();

  var dump = new DumpXVIZ({
    mode: dumpMode
  });
  var stack = [dump];
  openSource(args, stack);
}
//# sourceMappingURL=dump.js.map