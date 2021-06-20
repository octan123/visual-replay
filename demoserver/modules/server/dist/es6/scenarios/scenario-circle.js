const DEG_1_AS_RAD = Math.PI / 180;
const DEG_90_AS_RAD = 90 * DEG_1_AS_RAD;
const circle_metadata = {
  type: 'xviz/metadata',
  data: {
    version: '2.0.0',
    streams: {
      ['/vehicle_pose']: {},
      ['/circle']: {
        coordinate: 'IDENTITY',
        stream_style: {
          fill_color: [200, 0, 70, 128]
        }
      },
      ['/ground_grid_h']: {
        coordinate: 'IDENTITY',
        stream_style: {
          stroked: true,
          stroke_width: 0.2,
          stroke_color: [0, 255, 0, 128]
        }
      },
      ['/ground_grid_v']: {
        coordinate: 'IDENTITY',
        stream_style: {
          stroked: true,
          stroke_width: 0.2,
          stroke_color: [0, 255, 0, 128]
        }
      }
    }
  }
};

class CircleScenario {
  constructor(options = {}) {
    this.timestamp = Date.now() / 1000;
    this.radius = options.radius || 30;
    this.duration = options.duration || 10;
    this.live = options.live;
    this.speed = options.speed || 10;
    this.grid = this._drawGrid();
  }

  getMetadata() {
    const metadata = JSON.parse(JSON.stringify(circle_metadata));

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
    return {
      type: 'xviz/state_update',
      data: {
        update_type: 'snapshot',
        updates: [{
          timestamp,
          poses: this._drawPose(timestamp),
          primitives: this.grid
        }]
      }
    };
  }

  _drawPose(timestamp) {
    const circumference = Math.PI * this.radius * 2;
    const degreesPerSecond = 360 / (circumference / this.speed);
    const currentDegrees = timestamp * degreesPerSecond;
    const angle = currentDegrees * DEG_1_AS_RAD;
    return {
      '/vehicle_pose': {
        timestamp,
        orientation: [0, 0, DEG_90_AS_RAD + currentDegrees * DEG_1_AS_RAD],
        position: [this.radius * Math.cos(angle), this.radius * Math.sin(angle), 0]
      }
    };
  }

  _calculateGrid(size) {
    const grid = [0];

    for (let i = 10; i <= size; i += 10) {
      grid.unshift(-i);
      grid.push(i);
    }

    return grid;
  }

  _drawGrid() {
    const gridSize = this.radius + 10;

    const grid = this._calculateGrid(gridSize);

    const gridXVIZ_h = grid.map(x => {
      return {
        vertices: [x, -gridSize, 0, x, gridSize, 0]
      };
    });
    const gridXVIZ_v = grid.map(y => {
      return {
        vertices: [-gridSize, y, 0, gridSize, y, 0]
      };
    });
    return {
      ['/ground_grid_h']: {
        polylines: gridXVIZ_h
      },
      ['/ground_grid_v']: {
        polylines: gridXVIZ_v
      },
      ['/circle']: {
        circles: [{
          center: [0.0, 0.0, 0.0],
          radius: this.radius
        }, {
          center: [this.radius, 0.0, 0.1],
          radius: 1,
          base: {
            style: {
              fill_color: [0, 0, 255]
            }
          }
        }]
      }
    };
  }

}

module.exports = {
  circle: options => new CircleScenario(options)
};
//# sourceMappingURL=scenario-circle.js.map