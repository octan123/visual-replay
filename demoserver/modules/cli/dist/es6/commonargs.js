export function addDataArgs(args) {
  args.options('start', {
    alias: 's',
    describe: 'Start time for the request'
  });
  args.options('end', {
    alias: 'e',
    describe: 'End time for the request'
  });
}
export function addMetadataArg(args, help) {
  args.options('metadata', {
    alias: 'm',
    boolean: true,
    describe: help
  });
}
export function addCondensedArg(args, help) {
  args.options('condensed', {
    alias: 'c',
    boolean: true,
    describe: help
  });
}
//# sourceMappingURL=commonargs.js.map