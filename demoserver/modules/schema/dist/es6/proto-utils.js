const PRIMITIVE_PROTO_TYPES = new Set(['double', 'float', 'int32', 'int64', 'uint32', 'uint64', 'sint32', 'sint64', 'fixed32', 'fixed64', 'sfixed32', 'sfixed64', 'bool', 'string', 'bytes']);
export function getProtoEnumTypes(protoTypeObj) {
  const enumTypes = {};
  protoTypeObj.nestedArray.map(function store(e) {
    if (e.values !== undefined) {
      enumTypes[e.fullName] = e.values;
    } else if (e.nestedArray !== undefined) {
      Object.assign(enumTypes, getProtoEnumTypes(e));
    }
  });
  return enumTypes;
}
export function protoEnumsToInts(protoType, jsonObject, enumTypes) {
  if (enumTypes === undefined) {
    throw 'protoEnumsToInts needs defined enumTypes';
  }

  const fields = protoType.fields;

  for (const fieldName in fields) {
    if (fields.hasOwnProperty(fieldName)) {
      const field = fields[fieldName];
      const fieldValue = jsonObject[fieldName];
      const values = lookUpEnumValues(protoType, field.type, enumTypes);

      if (values !== undefined) {
        enumToIntField(values, fieldName, jsonObject);
      } else if (field.map) {
        enumToIntMapField(field, jsonObject[fieldName], enumTypes);
      } else if (field.repeated) {
        enumToIntRepeatedField(field, jsonObject[fieldName], enumTypes);
      } else if (typeof fieldValue === 'object') {
        enumToIntMessageField(field, fieldValue, enumTypes);
      }
    }
  }
}

function lookUpEnumValues(protoType, fieldType, enumTypes) {
  let values = enumTypes["".concat(protoType.fullName, ".").concat(fieldType)];

  if (values === undefined) {
    values = enumTypes["".concat(protoType.parent.fullName, ".").concat(fieldType)];
  }

  return values;
}

export function enumToIntField(values, fieldName, jsonObject) {
  const originalValue = jsonObject[fieldName];

  if (originalValue !== undefined) {
    const newValue = values[originalValue];

    if (newValue === undefined) {
      const msg = "Error: field \"".concat(fieldName, "\" has unknown enum value \"").concat(originalValue, "\"");
      throw new Error(msg);
    }

    jsonObject[fieldName] = newValue;
  }
}

function enumToIntMessageField(field, jsonObject, enumTypes) {
  if (!PRIMITIVE_PROTO_TYPES.has(field.type) && jsonObject !== undefined) {
    const subType = field.parent.lookupType(field.type);
    protoEnumsToInts(subType, jsonObject, enumTypes);
  }
}

function enumToIntMapField(field, jsonObject, enumTypes) {
  if (!PRIMITIVE_PROTO_TYPES.has(field.type) && jsonObject !== undefined) {
    const subType = field.parent.lookupType(field.type);

    for (const propertyName in jsonObject) {
      if (jsonObject.hasOwnProperty(propertyName)) {
        const propertyValue = jsonObject[propertyName];
        protoEnumsToInts(subType, propertyValue, enumTypes);
      }
    }
  }
}

function enumToIntRepeatedField(field, jsonArray, enumTypes) {
  if (!PRIMITIVE_PROTO_TYPES.has(field.type) && jsonArray !== undefined) {
    const subType = field.parent.lookupType(field.type);

    for (let i = 0; i < jsonArray.length; i++) {
      protoEnumsToInts(subType, jsonArray[i], enumTypes);
    }
  }
}
//# sourceMappingURL=proto-utils.js.map