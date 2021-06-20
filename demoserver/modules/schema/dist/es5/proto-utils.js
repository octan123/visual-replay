"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProtoEnumTypes = getProtoEnumTypes;
exports.protoEnumsToInts = protoEnumsToInts;
exports.enumToIntField = enumToIntField;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var PRIMITIVE_PROTO_TYPES = new Set(['double', 'float', 'int32', 'int64', 'uint32', 'uint64', 'sint32', 'sint64', 'fixed32', 'fixed64', 'sfixed32', 'sfixed64', 'bool', 'string', 'bytes']);

function getProtoEnumTypes(protoTypeObj) {
  var enumTypes = {};
  protoTypeObj.nestedArray.map(function store(e) {
    if (e.values !== undefined) {
      enumTypes[e.fullName] = e.values;
    } else if (e.nestedArray !== undefined) {
      Object.assign(enumTypes, getProtoEnumTypes(e));
    }
  });
  return enumTypes;
}

function protoEnumsToInts(protoType, jsonObject, enumTypes) {
  if (enumTypes === undefined) {
    throw 'protoEnumsToInts needs defined enumTypes';
  }

  var fields = protoType.fields;

  for (var fieldName in fields) {
    if (fields.hasOwnProperty(fieldName)) {
      var field = fields[fieldName];
      var fieldValue = jsonObject[fieldName];
      var values = lookUpEnumValues(protoType, field.type, enumTypes);

      if (values !== undefined) {
        enumToIntField(values, fieldName, jsonObject);
      } else if (field.map) {
        enumToIntMapField(field, jsonObject[fieldName], enumTypes);
      } else if (field.repeated) {
        enumToIntRepeatedField(field, jsonObject[fieldName], enumTypes);
      } else if ((0, _typeof2["default"])(fieldValue) === 'object') {
        enumToIntMessageField(field, fieldValue, enumTypes);
      }
    }
  }
}

function lookUpEnumValues(protoType, fieldType, enumTypes) {
  var values = enumTypes["".concat(protoType.fullName, ".").concat(fieldType)];

  if (values === undefined) {
    values = enumTypes["".concat(protoType.parent.fullName, ".").concat(fieldType)];
  }

  return values;
}

function enumToIntField(values, fieldName, jsonObject) {
  var originalValue = jsonObject[fieldName];

  if (originalValue !== undefined) {
    var newValue = values[originalValue];

    if (newValue === undefined) {
      var msg = "Error: field \"".concat(fieldName, "\" has unknown enum value \"").concat(originalValue, "\"");
      throw new Error(msg);
    }

    jsonObject[fieldName] = newValue;
  }
}

function enumToIntMessageField(field, jsonObject, enumTypes) {
  if (!PRIMITIVE_PROTO_TYPES.has(field.type) && jsonObject !== undefined) {
    var subType = field.parent.lookupType(field.type);
    protoEnumsToInts(subType, jsonObject, enumTypes);
  }
}

function enumToIntMapField(field, jsonObject, enumTypes) {
  if (!PRIMITIVE_PROTO_TYPES.has(field.type) && jsonObject !== undefined) {
    var subType = field.parent.lookupType(field.type);

    for (var propertyName in jsonObject) {
      if (jsonObject.hasOwnProperty(propertyName)) {
        var propertyValue = jsonObject[propertyName];
        protoEnumsToInts(subType, propertyValue, enumTypes);
      }
    }
  }
}

function enumToIntRepeatedField(field, jsonArray, enumTypes) {
  if (!PRIMITIVE_PROTO_TYPES.has(field.type) && jsonArray !== undefined) {
    var subType = field.parent.lookupType(field.type);

    for (var i = 0; i < jsonArray.length; i++) {
      protoEnumsToInts(subType, jsonArray[i], enumTypes);
    }
  }
}
//# sourceMappingURL=proto-utils.js.map