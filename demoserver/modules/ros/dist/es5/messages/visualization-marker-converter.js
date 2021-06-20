"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisualizationMarker = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _lodash = _interopRequireDefault(require("lodash"));

var _visualizationMarkerarrayConverter = require("./visualization-markerarray-converter");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var VisualizationMarker = function (_VisualizationMarkerA) {
  (0, _inherits2["default"])(VisualizationMarker, _VisualizationMarkerA);

  var _super = _createSuper(VisualizationMarker);

  function VisualizationMarker(config) {
    (0, _classCallCheck2["default"])(this, VisualizationMarker);
    return _super.call(this, config);
  }

  (0, _createClass2["default"])(VisualizationMarker, [{
    key: "convertMessage",
    value: function () {
      var _convertMessage = (0, _asyncToGenerator2["default"])(_regenerator["default"].mark(function _callee(frame, xvizBuilder) {
        var _this = this;

        var messages, markers;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                messages = frame[this.topic];

                if (messages) {
                  markers = _lodash["default"].map(messages, 'message');
                  markers.forEach(function (marker) {
                    return _this._processMarker(marker);
                  });
                }

                this.writeMarkers(xvizBuilder);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function convertMessage(_x, _x2) {
        return _convertMessage.apply(this, arguments);
      }

      return convertMessage;
    }()
  }], [{
    key: "name",
    get: function get() {
      return 'VisualizationMarker';
    }
  }, {
    key: "messageType",
    get: function get() {
      return 'visualization_msgs/Marker';
    }
  }]);
  return VisualizationMarker;
}(_visualizationMarkerarrayConverter.VisualizationMarkerArray);

exports.VisualizationMarker = VisualizationMarker;
//# sourceMappingURL=visualization-marker-converter.js.map