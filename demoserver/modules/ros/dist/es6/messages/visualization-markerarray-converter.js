import Converter from './converter';
import _ from 'lodash';
import { Vector3 } from 'math.gl';
const ACTION_ADD = 0;
const ACTION_DELETE = 2;
const ACTION_DELETE_ALL = 3;
const NAMESPACE_SEPARATOR = '/';
export class VisualizationMarkerArray extends Converter {
  constructor(config) {
    super(config);

    this.acceptMarker = this.config.acceptMarker || (() => true);

    this.markersMap = {};
    this.ARROW_STREAM = [this.xvizStream, 'arrow'].join(NAMESPACE_SEPARATOR);
    this.SPHERE_STREAM = [this.xvizStream, 'sphere'].join(NAMESPACE_SEPARATOR);
    this.LINESTRIP_STREAM = [this.xvizStream, 'linestrip'].join(NAMESPACE_SEPARATOR);
    this.LINELIST_STREAM = [this.xvizStream, 'linelist'].join(NAMESPACE_SEPARATOR);
    this.TEXT_STREAM = [this.xvizStream, 'text'].join(NAMESPACE_SEPARATOR);
  }

  static get name() {
    return 'VisualizationMarkerArray';
  }

  static get messageType() {
    return 'visualization_msgs/MarkerArray';
  }

  convertMessage(frame, xvizBuilder) {
    const messages = frame[this.topic];

    if (messages) {
      for (const {
        message
      } of messages) {
        message.markers.forEach(marker => this._processMarker(marker));
      }
    }

    this.writeMarkers(xvizBuilder);
  }

  getMetadata(xvizMetaBuilder) {
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

  writeMarkers(xvizBuilder) {
    const WRITERS = {
      '0': this._writeArrow.bind(this),
      '2': this._writeSphere.bind(this),
      '4': this._writeLineStrip.bind(this),
      '5': this._writeLineList.bind(this),
      '9': this._writeText.bind(this)
    };

    _.forOwn(this.markersMap, marker => {
      const writer = WRITERS[marker.type];

      if (writer) {
        writer(marker, xvizBuilder);
      }
    });
  }

  _writeArrow(marker, xvizBuilder) {
    const points = this._makeArrow(marker.points, marker.pose);

    xvizBuilder.primitive(this.ARROW_STREAM).polyline(points).style({
      stroke_color: this._toColor(marker)
    }).id(this._getMarkerId(marker));
  }

  _writeSphere(marker, xvizBuilder) {
    const RADIUS = marker.scale.x / 2;

    const points = this._mapPoints([{
      x: 0,
      y: 0,
      z: 0
    }], marker.pose);

    xvizBuilder.primitive(this.SPHERE_STREAM).circle(points[0], RADIUS).style({
      fill_color: this._toColor(marker)
    }).id(this._getMarkerId(marker));
  }

  _writeLineStrip(marker, xvizBuilder) {
    xvizBuilder.primitive(this.LINESTRIP_STREAM).polyline(this._mapPoints(marker.points, marker.pose)).style({
      stroke_color: this._toColor(marker)
    }).id(this._getMarkerId(marker));
  }

  _writeLineList(marker, xvizBuilder) {
    const lines = _.chunk(marker.points, 2);

    lines.forEach((line, index) => {
      xvizBuilder.primitive(this.LINELIST_STREAM).polyline(this._mapPoints(line, marker.pose)).style({
        stroke_color: this._toColor(marker)
      }).id([this._getMarkerId(marker), index].join(NAMESPACE_SEPARATOR));
    });
  }

  _writeText(marker, xvizBuilder) {
    const points = this._mapPoints([{
      x: 0,
      y: 0,
      z: 2
    }], marker.pose);

    xvizBuilder.primitive(this.TEXT_STREAM).position(points[0]).text(marker.text);
  }

  _toColor(marker) {
    const color = marker.color || (marker.colors || [])[0];

    if (color) {
      return [color.r, color.g, color.b, color.a].map(v => Math.round(v * 255));
    }

    return [128, 128, 128, 255];
  }

  _mapPoints(points, pose) {
    const origin = new Vector3([pose.position.x, pose.position.y, 0]);
    return points.map(p => {
      p = [p.x, p.y, 0];
      return origin.clone().add(p).toArray();
    });
  }

  _makeVector(p) {
    const v = [p[1][0] - p[0][0], p[1][1] - p[0][1], p[1][2] - p[0][2]];
    return v;
  }

  _makePoint(base, vector) {
    const v = [base[0] + vector[0], base[1] + vector[1], base[2] + vector[2]];
    return v;
  }

  _makeArrow(points, pose) {
    const p = this._mapPoints(points, pose);

    const vecA = new Vector3(this._makeVector([p[1], p[0]]));
    const pCrossVec = vecA.clone().scale(0.3);

    const pCross = this._makePoint(p[1], pCrossVec.toArray());

    vecA.scale(0.5);
    const vecB = vecA.clone();

    const leftPt = this._makePoint(p[1], vecB.rotateZ({
      radians: -Math.PI / 4
    }).toArray());

    const rightPt = this._makePoint(p[1], vecA.rotateZ({
      radians: Math.PI / 4
    }).toArray());

    p.push(p[1]);
    return [p[0], pCross, leftPt, p[1], rightPt, pCross];
  }

  _processMarker(marker) {
    const markerId = this._getMarkerId(marker);

    if (marker.action === ACTION_ADD) {
      if (this.acceptMarker(marker)) {
        this.markersMap[markerId] = marker;
      }
    } else if (marker.action === ACTION_DELETE) {
      if (!marker.ns) {
        this.markersMap = {};
      } else {
        this.markersMap = _.pickBy(this.markersMap, (value, key) => {
          return !key.startsWith(markerId);
        });
      }
    } else if (marker.action === ACTION_DELETE_ALL) {
      this.markersMap = {};
    }
  }

  _getMarkerId(marker) {
    return [marker.ns, marker.id].join(NAMESPACE_SEPARATOR);
  }

}
//# sourceMappingURL=visualization-markerarray-converter.js.map