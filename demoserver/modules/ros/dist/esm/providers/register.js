import { XVIZProviderFactory } from '@xviz/io';
import { ROSBag } from '../core/ros-bag';
import { ROS2XVIZFactory } from '../core/ros-2-xviz-factory';
import { ROSBagProvider } from '../providers/rosbag-provider';
import { DEFAULT_CONVERTERS } from '../messages';
import fs from 'fs';
export function registerROSBagProvider(rosConfig) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$converters = _ref.converters,
      converters = _ref$converters === void 0 ? DEFAULT_CONVERTERS : _ref$converters,
      _ref$BagClass = _ref.BagClass,
      BagClass = _ref$BagClass === void 0 ? ROSBag : _ref$BagClass;

  if (rosConfig) {
    console.log("Setting up ROSProvider with ".concat(rosConfig));
  }

  var config = null;

  if (rosConfig) {
    var data = fs.readFileSync(rosConfig);

    if (data) {
      config = JSON.parse(data);
    }
  }

  var ros2xvizFactory = new ROS2XVIZFactory(converters);
  var rosbagProviderConfig = {
    rosConfig: config,
    ros2xvizFactory: ros2xvizFactory,
    BagClass: BagClass
  };
  XVIZProviderFactory.addProviderClass(ROSBagProvider, rosbagProviderConfig);
}
//# sourceMappingURL=register.js.map