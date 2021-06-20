"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerROSBagProvider = registerROSBagProvider;

var _io = require("@xviz/io");

var _rosBag = require("../core/ros-bag");

var _ros2XvizFactory = require("../core/ros-2-xviz-factory");

var _rosbagProvider = require("../providers/rosbag-provider");

var _messages = require("../messages");

var _fs = _interopRequireDefault(require("fs"));

function registerROSBagProvider(rosConfig) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$converters = _ref.converters,
      converters = _ref$converters === void 0 ? _messages.DEFAULT_CONVERTERS : _ref$converters,
      _ref$BagClass = _ref.BagClass,
      BagClass = _ref$BagClass === void 0 ? _rosBag.ROSBag : _ref$BagClass;

  if (rosConfig) {
    console.log("Setting up ROSProvider with ".concat(rosConfig));
  }

  var config = null;

  if (rosConfig) {
    var data = _fs["default"].readFileSync(rosConfig);

    if (data) {
      config = JSON.parse(data);
    }
  }

  var ros2xvizFactory = new _ros2XvizFactory.ROS2XVIZFactory(converters);
  var rosbagProviderConfig = {
    rosConfig: config,
    ros2xvizFactory: ros2xvizFactory,
    BagClass: BagClass
  };

  _io.XVIZProviderFactory.addProviderClass(_rosbagProvider.ROSBagProvider, rosbagProviderConfig);
}
//# sourceMappingURL=register.js.map