import _typeof from "@babel/runtime/helpers/esm/typeof";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import { wrappers } from 'protobufjs';
import * as is from 'is';
export var StructEncode = function () {
  function StructEncode(options) {
    _classCallCheck(this, StructEncode);

    options = options || {};
    this.seenObjects = new Set();
    this.removeCircular = options.removeCircular === true;
    this.stringify = options.stringify === true;
  }

  _createClass(StructEncode, [{
    key: "encodeStruct",
    value: function encodeStruct(obj) {
      var convertedObject = {
        fields: {}
      };
      this.seenObjects.add(obj);

      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          var value = obj[prop];

          if (is.undefined(value)) {
            continue;
          }

          convertedObject.fields[prop] = this.encodeValue(value);
        }
      }

      this.seenObjects["delete"](obj);
      return convertedObject;
    }
  }, {
    key: "encodeValue",
    value: function encodeValue(value) {
      var convertedValue;

      if (is["null"](value)) {
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
      } else if (is["boolean"](value)) {
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
          throw new Error("Value of type ".concat(_typeof(value), " not recognized."));
        }

        convertedValue = {
          stringValue: String(value)
        };
      }

      return convertedValue;
    }
  }]);

  return StructEncode;
}();
export var StructDecode = function () {
  function StructDecode() {
    _classCallCheck(this, StructDecode);
  }

  _createClass(StructDecode, null, [{
    key: "decodeValue",
    value: function decodeValue(value) {
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
  }, {
    key: "decodeStruct",
    value: function decodeStruct(struct) {
      var convertedObject = {};

      for (var prop in struct.fields) {
        if (struct.fields.hasOwnProperty(prop)) {
          var value = struct.fields[prop];
          convertedObject[prop] = StructDecode.decodeValue(value);
        }
      }

      return convertedObject;
    }
  }]);

  return StructDecode;
}();
wrappers['.google.protobuf.Value'] = {
  fromObject: function fromObject(object) {
    if (object) {
      return new StructEncode().encodeValue(object);
    }

    return this.fromObject(object);
  },
  toObject: function toObject(message) {
    return StructDecode.decodeValue(message);
  }
};
wrappers['.google.protobuf.Struct'] = {
  fromObject: function fromObject(object) {
    if (object) {
      return new StructEncode().encodeStruct(object);
    }

    return this.fromObject(object);
  },
  toObject: function toObject(message) {
    return StructDecode.decodeStruct(message);
  }
};
//# sourceMappingURL=proto-struct-wrapper.js.map