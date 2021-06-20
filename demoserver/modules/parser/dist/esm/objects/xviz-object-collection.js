import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import XVIZObject from './xviz-object';

var XVIZObjectCollection = function () {
  function XVIZObjectCollection() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$ObjectType = _ref.ObjectType,
        ObjectType = _ref$ObjectType === void 0 ? XVIZObject : _ref$ObjectType;

    _classCallCheck(this, XVIZObjectCollection);

    this.objects = new Map();
    this.ObjectType = ObjectType;
  }

  _createClass(XVIZObjectCollection, [{
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

export { XVIZObjectCollection as default };
//# sourceMappingURL=xviz-object-collection.js.map