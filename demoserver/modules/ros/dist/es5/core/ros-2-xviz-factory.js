"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ROS2XVIZFactory = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _ros2Xviz = require("./ros-2-xviz");

var ROS2XVIZFactory = function () {
  function ROS2XVIZFactory(converters) {
    (0, _classCallCheck2["default"])(this, ROS2XVIZFactory);
    this.converters = converters;
  }

  (0, _createClass2["default"])(ROS2XVIZFactory, [{
    key: "create",
    value: function create(rosConfig, options) {
      return new _ros2Xviz.ROS2XVIZConverter(this.converters, rosConfig, options);
    }
  }]);
  return ROS2XVIZFactory;
}();

exports.ROS2XVIZFactory = ROS2XVIZFactory;
//# sourceMappingURL=ros-2-xviz-factory.js.map