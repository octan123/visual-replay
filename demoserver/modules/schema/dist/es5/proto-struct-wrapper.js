"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StructDecode = exports.StructEncode = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _protobufjs = require("protobufjs");

var is = _interopRequireWildcard(require("is"));

var StructEncode = function () {
  function StructEncode(options) {
    (0, _classCallCheck2["default"])(this, StructEncode);
    options = options || {};
    this.seenObjects = new Set();
    this.removeCircular = options.removeCircular === true;
    this.stringify = options.stringify === true;
  }

  (0, _createClass2["default"])(StructEncode, [{
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
          throw new Error("Value of type ".concat((0, _typeof2["default"])(value), " not recognized."));
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

exports.StructEncode = StructEncode;

var StructDecode = function () {
  function StructDecode() {
    (0, _classCallCheck2["default"])(this, StructDecode);
  }

  (0, _createClass2["default"])(StructDecode, null, [{
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

exports.StructDecode = StructDecode;
_protobufjs.wrappers['.google.protobuf.Value'] = {
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
_protobufjs.wrappers['.google.protobuf.Struct'] = {
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