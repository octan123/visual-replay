"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _streams;

var DEG_1_AS_RAD = Math.PI / 180;
var DEG_90_AS_RAD = 90 * DEG_1_AS_RAD;
var circle_metadata = {
  type: 'xviz/metadata',
  data: {
    version: '2.0.0',
    streams: (_streams = {}, (0, _defineProperty2["default"])(_streams, '/vehicle_pose', {}), (0, _defineProperty2["default"])(_streams, '/circle', {
      coordinate: 'IDENTITY',
      stream_style: {
        fill_color: [200, 0, 70, 128]
      }
    }), (0, _defineProperty2["default"])(_streams, '/ground_grid_h', {
      coordinate: 'IDENTITY',
      stream_style: {
        stroked: true,
        stroke_width: 0.2,
        stroke_color: [0, 255, 0, 128]
      }
    }), (0, _defineProperty2["default"])(_streams, '/ground_grid_v', {
      coordinate: 'IDENTITY',
      stream_style: {
        stroked: true,
        stroke_width: 0.2,
        stroke_color: [0, 255, 0, 128]
      }
    }), _streams)
  }
};

var CircleScenario = function () {
  function CircleScenario() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, CircleScenario);
    this.timestamp = Date.now() / 1000;
    this.radius = options.radius || 30;
    this.duration = options.duration || 10;
    this.live = options.live;
    this.speed = options.speed || 10;
    this.grid = this._drawGrid();
  }

  (0, _createClass2["default"])(CircleScenario, [{
    key: "getMetadata",
    value: function getMetadata() {
      var metadata = JSON.parse(JSON.stringify(circle_metadata));

      if (!this.live) {
        var log_start_time = this.timestamp;
        metadata.data.log_info = {
          log_start_time: log_start_time,
          log_end_time: log_start_time + this.duration
        };
      }

      return metadata;
    }
  }, {
    key: "getMessage",
    value: function getMessage(timeOffset) {
      return this._getMessage(timeOffset);
    }
  }, {
    key: "_getMessage",
    value: function _getMessage(timeOffset) {
      var timestamp = this.timestamp + timeOffset;
      return {
        type: 'xviz/state_update',
        data: {
          update_type: 'snapshot',
          updates: [{
            timestamp: timestamp,
            poses: this._drawPose(timestamp),
            primitives: this.grid
          }]
        }
      };
    }
  }, {
    key: "_drawPose",
    value: function _drawPose(timestamp) {
      var circumference = Math.PI * this.radius * 2;
      var degreesPerSecond = 360 / (circumference / this.speed);
      var currentDegrees = timestamp * degreesPerSecond;
      var angle = currentDegrees * DEG_1_AS_RAD;
      return {
        '/vehicle_pose': {
          timestamp: timestamp,
          orientation: [0, 0, DEG_90_AS_RAD + currentDegrees * DEG_1_AS_RAD],
          position: [this.radius * Math.cos(angle), this.radius * Math.sin(angle), 0]
        }
      };
    }
  }, {
    key: "_calculateGrid",
    value: function _calculateGrid(size) {
      var grid = [0];

      for (var i = 10; i <= size; i += 10) {
        grid.unshift(-i);
        grid.push(i);
      }

      return grid;
    }
  }, {
    key: "_drawGrid",
    value: function _drawGrid() {
      var _ref;

      var gridSize = this.radius + 10;

      var grid = this._calculateGrid(gridSize);

      var gridXVIZ_h = grid.map(function (x) {
        return {
          vertices: [x, -gridSize, 0, x, gridSize, 0]
        };
      });
      var gridXVIZ_v = grid.map(function (y) {
        return {
          vertices: [-gridSize, y, 0, gridSize, y, 0]
        };
      });
      return _ref = {}, (0, _defineProperty2["default"])(_ref, '/ground_grid_h', {
        polylines: gridXVIZ_h
      }), (0, _defineProperty2["default"])(_ref, '/ground_grid_v', {
        polylines: gridXVIZ_v
      }), (0, _defineProperty2["default"])(_ref, '/circle', {
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
      }), _ref;
    }
  }]);
  return CircleScenario;
}();

module.exports = {
  circle: function circle(options) {
    return new CircleScenario(options);
  }
};
//# sourceMappingURL=scenario-circle.js.map