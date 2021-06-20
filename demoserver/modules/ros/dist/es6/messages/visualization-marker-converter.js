import _ from 'lodash';
import { VisualizationMarkerArray } from './visualization-markerarray-converter';
export class VisualizationMarker extends VisualizationMarkerArray {
  constructor(config) {
    super(config);
  }

  static get name() {
    return 'VisualizationMarker';
  }

  static get messageType() {
    return 'visualization_msgs/Marker';
  }

  async convertMessage(frame, xvizBuilder) {
    const messages = frame[this.topic];

    if (messages) {
      const markers = _.map(messages, 'message');

      markers.forEach(marker => this._processMarker(marker));
    }

    this.writeMarkers(xvizBuilder);
  }

}
//# sourceMappingURL=visualization-marker-converter.js.map