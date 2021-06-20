import { encodeBinaryXVIZ } from '@xviz/io';
export function writeBinaryXVIZtoFile(sink, directory, name, json, options) {
  const glbFileBuffer = encodeBinaryXVIZ(json, options);
  sink.writeSync(directory, "".concat(name, ".glb"), Buffer.from(glbFileBuffer), {
    flag: 'w'
  });
  return glbFileBuffer;
}
//# sourceMappingURL=xviz-binary-writer.js.map