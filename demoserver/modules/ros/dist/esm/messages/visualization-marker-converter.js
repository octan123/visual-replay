import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import _ from 'lodash';
import { VisualizationMarkerArray } from './visualization-markerarray-converter';
export var VisualizationMarker = function (_VisualizationMarkerA) {
  _inherits(VisualizationMarker, _VisualizationMarkerA);

  var _super = _createSuper(VisualizationMarker);

  function VisualizationMarker(config) {
    _classCallCheck(this, VisualizationMarker);

    return _super.call(this, config);
  }

  _createClass(VisualizationMarker, [{
    key: "convertMessage",
    value: function () {
      var _convertMessage = _asyncToGenerator(_regeneratorRuntime.mark(function _callee(frame, xvizBuilder) {
        var _this = this;

        var messages, markers;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                messages = frame[this.topic];

                if (messages) {
                  markers = _.map(messages, 'message');
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
}(VisualizationMarkerArray);
//# sourceMappingURL=visualization-marker-converter.js.map