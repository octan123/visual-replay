import { Root, Type } from 'protobufjs';
import { PROTO_DATA } from './data';
export const EXTENSION_PROPERTY = '(xviz_json_schema)';
export function loadProtos() {
  return Root.fromJSON(PROTO_DATA);
}
export function getXVIZProtoTypes(protoRoot) {
  const protoTypes = [];
  traverseTypes(protoRoot, type => {
    if (type.options !== undefined) {
      if (type.options[EXTENSION_PROPERTY] !== undefined) {
        protoTypes.push(type);
      }
    }
  });
  return protoTypes;
}

function traverseTypes(current, fn) {
  if (current instanceof Type) fn(current);
  if (current.nestedArray) current.nestedArray.forEach(function eachType(nested) {
    traverseTypes(nested, fn);
  });
}
//# sourceMappingURL=proto-validation.js.map