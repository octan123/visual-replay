import { wrappers } from 'protobufjs';
import * as is from 'is';
export class StructEncode {
  constructor(options) {
    options = options || {};
    this.seenObjects = new Set();
    this.removeCircular = options.removeCircular === true;
    this.stringify = options.stringify === true;
  }

  encodeStruct(obj) {
    const convertedObject = {
      fields: {}
    };
    this.seenObjects.add(obj);

    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        const value = obj[prop];

        if (is.undefined(value)) {
          continue;
        }

        convertedObject.fields[prop] = this.encodeValue(value);
      }
    }

    this.seenObjects.delete(obj);
    return convertedObject;
  }

  encodeValue(value) {
    let convertedValue;

    if (is.null(value)) {
      convertedValue = {
        nullValue: 0
      };
    } else if (is.number(value)) {
      convertedValue = {
        numberValue: value
      };
    } else if (is.string(value)) {
      convertedValue = {
        stringValue: value
      };
    } else if (is.boolean(value)) {
      convertedValue = {
        boolValue: value
      };
    } else if (is.object(value)) {
      if (this.seenObjects.has(value)) {
        if (!this.removeCircular) {
          throw new Error(['This object contains a circular reference. To automatically', 'remove it, set the `removeCircular` option to true.'].join(' '));
        }

        convertedValue = {
          stringValue: '[Circular]'
        };
      } else {
        convertedValue = {
          structValue: this.encodeStruct(value)
        };
      }
    } else if (is.array(value)) {
      convertedValue = {
        listValue: {
          values: value.map(this.encodeValue.bind(this))
        }
      };
    } else {
      if (!this.stringify) {
        throw new Error("Value of type ".concat(typeof value, " not recognized."));
      }

      convertedValue = {
        stringValue: String(value)
      };
    }

    return convertedValue;
  }

}
export class StructDecode {
  static decodeValue(value) {
    switch (value.kind) {
      case 'structValue':
        {
          return StructDecode.decodeStruct(value.structValue);
        }

      case 'nullValue':
        {
          return null;
        }

      case 'listValue':
        {
          return value.listValue.values.map(StructDecode.decodeValue);
        }

      default:
        {
          return value[value.kind];
        }
    }
  }

  static decodeStruct(struct) {
    const convertedObject = {};

    for (const prop in struct.fields) {
      if (struct.fields.hasOwnProperty(prop)) {
        const value = struct.fields[prop];
        convertedObject[prop] = StructDecode.decodeValue(value);
      }
    }

    return convertedObject;
  }

}
wrappers['.google.protobuf.Value'] = {
  fromObject(object) {
    if (object) {
      return new StructEncode().encodeValue(object);
    }

    return this.fromObject(object);
  },

  toObject(message) {
    return StructDecode.decodeValue(message);
  }

};
wrappers['.google.protobuf.Struct'] = {
  fromObject(object) {
    if (object) {
      return new StructEncode().encodeStruct(object);
    }

    return this.fromObject(object);
  },

  toObject(message) {
    return StructDecode.decodeStruct(message);
  }

};
//# sourceMappingURL=proto-struct-wrapper.js.map