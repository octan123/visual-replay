const DEG_1_AS_RAD = Math.PI / 180;
const straight_metadata = {
  type: 'xviz/metadata',
  data: {
    version: '2.0.0'
  }
};

class StraightScenario {
  constructor(options = {}) {
    this.timestamp = Date.now() / 1000;
    this.lineGap = 5;
    this.duration = options.duration || 30;
    this.live = options.live;
    this.speed = options.speed || 10;
  }

  getMetadata() {
    const metadata = JSON.parse(JSON.stringify(straight_metadata));

    if (!this.live) {
      const log_start_time = this.timestamp;
      metadata.data.log_info = {
        log_start_time,
        log_end_time: log_start_time + this.duration
      };
    }

    return metadata;
  }

  getMessage(timeOffset) {
    return this._getMessage(timeOffset);
  }

  _getMessage(timeOffset) {
    const timestamp = this.timestamp + timeOffset;

    const x = this._getPositionX(timestamp);

    return {
      type: 'xviz/state_update',
      data: {
        update_type: 'snapshot',
        updates: [{
          timestamp,
          poses: this._drawPose(timestamp, x),
          primitives: this._drawLines(x)
        }]
      }
    };
  }

  _drawPose(timestamp, x) {
    return {
      '/vehicle_pose': {
        timestamp,
        orientation: [0, 0, 0],
        position: [x, 0, 0]
      }
    };
  }

  _range(start, end, increment = 1) {
    const range = [];

    for (let i = start; i <= end; i += increment) {
      range.push(i * this.lineGap);
    }

    return range;
  }

  _lineColor(x) {
    return [120 + Math.cos(x * 2 * DEG_1_AS_RAD) * 90, 200 + Math.cos(x * DEG_1_AS_RAD) * 30, 170 + Math.sin(x * 3 * DEG_1_AS_RAD) * 60];
  }

  _getPositionX(timestamp) {
    return this.speed * (timestamp - this.timestamp);
  }

  _drawLines(x) {
    const lineStart = (x - 15) / this.lineGap;
    const lineEnd = (x + 20) / this.lineGap;

    const lineSpacing = this._range(Math.ceil(lineStart), Math.floor(lineEnd));

    const lineSpacingXVIZ = lineSpacing.map(lineX => {
      return {
        base: {
          style: {
            stroke_width: 0.2,
            stroke_color: this._lineColor(lineX)
          }
        },
        vertices: [lineX, -40, 0, lineX, 40, 0]
      };
    });
    return {
      ['/ground_lines']: {
        polylines: lineSpacingXVIZ
      }
    };
  }

}

module.exports = {
  straight: options => new StraightScenario(options)
};
//# sourceMappingURL=scenario-straight.js.map