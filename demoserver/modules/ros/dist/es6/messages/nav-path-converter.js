import Converter from './converter';
export class NavPath extends Converter {
  constructor(config) {
    super(config);
  }

  static get name() {
    return 'NavPath';
  }

  static get messageType() {
    return 'nav_msgs/Path';
  }

  async convertMessage(frame, xvizBuilder) {
    const data = frame[this.topic];

    if (!data) {
      return;
    }

    for (const d of data) {
      const polyline = d.message.poses.map(p => {
        const {
          position
        } = p.pose;
        return [position.x, position.y, 0];
      });
      xvizBuilder.primitive(this.xvizStream).polyline(polyline);
    }
  }

  getMetadata(xvizMetaBuilder) {
    xvizMetaBuilder.stream(this.xvizStream).coordinate('IDENTITY').category('primitive').type('polyline').streamStyle({
      stroke_color: '#57AD57AA',
      stroke_width: 1.4,
      stroke_width_min_pixels: 1
    });
  }

}
//# sourceMappingURL=nav-path-converter.js.map