import { ROS2XVIZConverter } from './ros-2-xviz';
export class ROS2XVIZFactory {
  constructor(converters) {
    this.converters = converters;
  }

  create(rosConfig, options) {
    return new ROS2XVIZConverter(this.converters, rosConfig, options);
  }

}
//# sourceMappingURL=ros-2-xviz-factory.js.map