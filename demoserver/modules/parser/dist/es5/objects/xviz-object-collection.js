"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _xvizObject = _interopRequireDefault(require("./xviz-object"));

var XVIZObjectCollection = function () {
  function XVIZObjectCollection() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$ObjectType = _ref.ObjectType,
        ObjectType = _ref$ObjectType === void 0 ? _xvizObject["default"] : _ref$ObjectType;

    (0, _classCallCheck2["default"])(this, XVIZObjectCollection);
    this.objects = new Map();
    this.ObjectType = ObjectType;
  }

  (0, _createClass2["default"])(XVIZObjectCollection, [{
    key: "clear",
    value: function clear() {
      this.objects.clear();
    }
  }, {
    key: "count",
    value: function count() {
      return this.objects.size;
    }
  }, {
    key: "observe",
    value: function observe(id, timestamp) {
      if (id === undefined || id === null) {
        return;
      }

      id = id.toString();

      if (this.objects.has(id)) {
        var object = this.objects.get(id);

        object._observe(timestamp);
      } else {
        var _object = new this.ObjectType({
          id: id,
          timestamp: timestamp
        });

        this.objects.set(id, _object);
      }
    }
  }, {
    key: "get",
    value: function get(id) {
      if (id === undefined || id === null) {
        return null;
      }

      id = id.toString();
      return this.objects.get(id) || null;
    }
  }, {
    key: "resetAll",
    value: function resetAll() {
      this.objects.forEach(function (object) {
        return object._reset();
      });
    }
  }, {
    key: "getAll",
    value: function getAll() {
      var result = {};
      this.objects.forEach(function (object, id) {
        result[id] = object;
      });
      return result;
    }
  }, {
    key: "getAllInCurrentFrame",
    value: function getAllInCurrentFrame() {
      var result = {};
      this.objects.forEach(function (object, id) {
        if (object.isValid) {
          result[id] = object;
        }
      });
      return result;
    }
  }, {
    key: "prune",
    value: function prune(startTime, endTime) {
      var objects = this.objects;
      var idsToRemove = [];
      objects.forEach(function (object, id) {
        if (object.endTime < startTime || object.startTime > endTime) {
          idsToRemove.push(id);
        }
      });
      idsToRemove.forEach(function (id) {
        objects["delete"](id);
      });
    }
  }]);
  return XVIZObjectCollection;
}();

exports["default"] = XVIZObjectCollection;
//# sourceMappingURL=xviz-object-collection.js.map