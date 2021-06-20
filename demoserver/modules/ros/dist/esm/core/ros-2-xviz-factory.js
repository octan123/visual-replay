import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import { ROS2XVIZConverter } from './ros-2-xviz';
export var ROS2XVIZFactory = function () {
  function ROS2XVIZFactory(converters) {
    _classCallCheck(this, ROS2XVIZFactory);

    this.converters = converters;
  }

  _createClass(ROS2XVIZFactory, [{
    key: "create",
    value: function create(rosConfig, options) {
      return new ROS2XVIZConverter(this.converters, rosConfig, options);
    }
  }]);

  return ROS2XVIZFactory;
}();
//# sourceMappingURL=ros-2-xviz-factory.js.map