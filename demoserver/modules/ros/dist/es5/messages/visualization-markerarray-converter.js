"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisualizationMarkerArray = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _converter = _interopRequireDefault(require("./converter"));

var _lodash = _interopRequireDefault(require("lodash"));

var _math = require("math.gl");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ACTION_ADD = 0;
var ACTION_DELETE = 2;
var ACTION_DELETE_ALL = 3;
var NAMESPACE_SEPARATOR = '/';

var VisualizationMarkerArray = function (_Converter) {
  (0, _inherits2["default"])(VisualizationMarkerArray, _Converter);

  var _super = _createSuper(VisualizationMarkerArray);

  function VisualizationMarkerArray(config) {
    var _this;

    (0, _classCallCheck2["default"])(this, VisualizationMarkerArray);
    _this = _super.call(this, config);

    _this.acceptMarker = _this.config.acceptMarker || function () {
      return true;
    };

    _this.markersMap = {};
    _this.ARROW_STREAM = [_this.xvizStream, 'arrow'].join(NAMESPACE_SEPARATOR);
    _this.SPHERE_STREAM = [_this.xvizStream, 'sphere'].join(NAMESPACE_SEPARATOR);
    _this.LINESTRIP_STREAM = [_this.xvizStream, 'linestrip'].join(NAMESPACE_SEPARATOR);
    _this.LINELIST_STREAM = [_this.xvizStream, 'linelist'].join(NAMESPACE_SEPARATOR);
    _this.TEXT_STREAM = [_this.xvizStream, 'text'].join(NAMESPACE_SEPARATOR);
    return _this;
  }

  (0, _createClass2["default"])(VisualizationMarkerArray, [{
    key: "convertMessage",
    value: function convertMessage(frame, xvizBuilder) {
      var _this2 = this;

      var messages = frame[this.topic];

      if (messages) {
        var _iterator = _createForOfIteratorHelper(messages),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var message = _step.value.message;
            message.markers.forEach(function (marker) {
              return _this2._processMarker(marker);
            });
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      this.writeMarkers(xvizBuilder);
    }
  }, {
    key: "getMetadata",
    value: function getMetadata(xvizMetaBuilder) {
      xvizMetaBuilder.stream(this.ARROW_STREAM).coordinate('IDENTITY').category('primitive').type('polyline').stream(this.LINESTRIP_STREAM).coordinate('IDENTITY').category('primitive').type('polyline').streamStyle({
        stroke_width: 0.2,
        stroke_width_min_pixels: 1
      }).stream(this.LINELIST_STREAM).coordinate('IDENTITY').category('primitive').type('polyline').streamStyle({
        stroke_width: 0.2,
        stroke_width_min_pixels: 1
      }).stream(this.SPHERE_STREAM).coordinate('IDENTITY').category('primitive').type('circle').streamStyle({
        stroke_width: 0.2
      }).stream(this.TEXT_STREAM).category('primitive').type('text').streamStyle({
        size: 18,
        fill_color: '#0000FF'
      });
    }
  }, {
    key: "writeMarkers",
    value: function writeMarkers(xvizBuilder) {
      var WRITERS = {
        '0': this._writeArrow.bind(this),
        '2': this._writeSphere.bind(this),
        '4': this._writeLineStrip.bind(this),
        '5': this._writeLineList.bind(this),
        '9': this._writeText.bind(this)
      };

      _lodash["default"].forOwn(this.markersMap, function (marker) {
        var writer = WRITERS[marker.type];

        if (writer) {
          writer(marker, xvizBuilder);
        }
      });
    }
  }, {
    key: "_writeArrow",
    value: function _writeArrow(marker, xvizBuilder) {
      var points = this._makeArrow(marker.points, marker.pose);

      xvizBuilder.primitive(this.ARROW_STREAM).polyline(points).style({
        stroke_color: this._toColor(marker)
      }).id(this._getMarkerId(marker));
    }
  }, {
    key: "_writeSphere",
    value: function _writeSphere(marker, xvizBuilder) {
      var RADIUS = marker.scale.x / 2;

      var points = this._mapPoints([{
        x: 0,
        y: 0,
        z: 0
      }], marker.pose);

      xvizBuilder.primitive(this.SPHERE_STREAM).circle(points[0], RADIUS).style({
        fill_color: this._toColor(marker)
      }).id(this._getMarkerId(marker));
    }
  }, {
    key: "_writeLineStrip",
    value: function _writeLineStrip(marker, xvizBuilder) {
      xvizBuilder.primitive(this.LINESTRIP_STREAM).polyline(this._mapPoints(marker.points, marker.pose)).style({
        stroke_color: this._toColor(marker)
      }).id(this._getMarkerId(marker));
    }
  }, {
    key: "_writeLineList",
    value: function _writeLineList(marker, xvizBuilder) {
      var _this3 = this;

      var lines = _lodash["default"].chunk(marker.points, 2);

      lines.forEach(function (line, index) {
        xvizBuilder.primitive(_this3.LINELIST_STREAM).polyline(_this3._mapPoints(line, marker.pose)).style({
          stroke_color: _this3._toColor(marker)
        }).id([_this3._getMarkerId(marker), index].join(NAMESPACE_SEPARATOR));
      });
    }
  }, {
    key: "_writeText",
    value: function _writeText(marker, xvizBuilder) {
      var points = this._mapPoints([{
        x: 0,
        y: 0,
        z: 2
      }], marker.pose);

      xvizBuilder.primitive(this.TEXT_STREAM).position(points[0]).text(marker.text);
    }
  }, {
    key: "_toColor",
    value: function _toColor(marker) {
      var color = marker.color || (marker.colors || [])[0];

      if (color) {
        return [color.r, color.g, color.b, color.a].map(function (v) {
          return Math.round(v * 255);
        });
      }

      return [128, 128, 128, 255];
    }
  }, {
    key: "_mapPoints",
    value: function _mapPoints(points, pose) {
      var origin = new _math.Vector3([pose.position.x, pose.position.y, 0]);
      return points.map(function (p) {
        p = [p.x, p.y, 0];
        return origin.clone().add(p).toArray();
      });
    }
  }, {
    key: "_makeVector",
    value: function _makeVector(p) {
      var v = [p[1][0] - p[0][0], p[1][1] - p[0][1], p[1][2] - p[0][2]];
      return v;
    }
  }, {
    key: "_makePoint",
    value: function _makePoint(base, vector) {
      var v = [base[0] + vector[0], base[1] + vector[1], base[2] + vector[2]];
      return v;
    }
  }, {
    key: "_makeArrow",
    value: function _makeArrow(points, pose) {
      var p = this._mapPoints(points, pose);

      var vecA = new _math.Vector3(this._makeVector([p[1], p[0]]));
      var pCrossVec = vecA.clone().scale(0.3);

      var pCross = this._makePoint(p[1], pCrossVec.toArray());

      vecA.scale(0.5);
      var vecB = vecA.clone();

      var leftPt = this._makePoint(p[1], vecB.rotateZ({
        radians: -Math.PI / 4
      }).toArray());

      var rightPt = this._makePoint(p[1], vecA.rotateZ({
        radians: Math.PI / 4
      }).toArray());

      p.push(p[1]);
      return [p[0], pCross, leftPt, p[1], rightPt, pCross];
    }
  }, {
    key: "_processMarker",
    value: function _processMarker(marker) {
      var markerId = this._getMarkerId(marker);

      if (marker.action === ACTION_ADD) {
        if (this.acceptMarker(marker)) {
          this.markersMap[markerId] = marker;
        }
      } else if (marker.action === ACTION_DELETE) {
        if (!marker.ns) {
          this.markersMap = {};
        } else {
          this.markersMap = _lodash["default"].pickBy(this.markersMap, function (value, key) {
            return !key.startsWith(markerId);
          });
        }
      } else if (marker.action === ACTION_DELETE_ALL) {
        this.markersMap = {};
      }
    }
  }, {
    key: "_getMarkerId",
    value: function _getMarkerId(marker) {
      return [marker.ns, marker.id].join(NAMESPACE_SEPARATOR);
    }
  }], [{
    key: "name",
    get: function get() {
      return 'VisualizationMarkerArray';
    }
  }, {
    key: "messageType",
    get: function get() {
      return 'visualization_msgs/MarkerArray';
    }
  }]);
  return VisualizationMarkerArray;
}(_converter["default"]);

exports.VisualizationMarkerArray = VisualizationMarkerArray;
//# sourceMappingURL=visualization-markerarray-converter.js.map