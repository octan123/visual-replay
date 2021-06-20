"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var DEG_1_AS_RAD = Math.PI / 180;
var straight_metadata = {
  type: 'xviz/metadata',
  data: {
    version: '2.0.0'
  }
};

var StraightScenario = function () {
  function StraightScenario() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, StraightScenario);
    this.timestamp = Date.now() / 1000;
    this.lineGap = 5;
    this.duration = options.duration || 30;
    this.live = options.live;
    this.speed = options.speed || 10;
  }

  (0, _createClass2["default"])(StraightScenario, [{
    key: "getMetadata",
    value: function getMetadata() {
      var metadata = JSON.parse(JSON.stringify(straight_metadata));

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

      var x = this._getPositionX(timestamp);

      return {
        type: 'xviz/state_update',
        data: {
          update_type: 'snapshot',
          updates: [{
            timestamp: timestamp,
            poses: this._drawPose(timestamp, x),
            primitives: this._drawLines(x)
          }]
        }
      };
    }
  }, {
    key: "_drawPose",
    value: function _drawPose(timestamp, x) {
      return {
        '/vehicle_pose': {
          timestamp: timestamp,
          orientation: [0, 0, 0],
          position: [x, 0, 0]
        }
      };
    }
  }, {
    key: "_range",
    value: function _range(start, end) {
      var increment = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var range = [];

      for (var i = start; i <= end; i += increment) {
        range.push(i * this.lineGap);
      }

      return range;
    }
  }, {
    key: "_lineColor",
    value: function _lineColor(x) {
      return [120 + Math.cos(x * 2 * DEG_1_AS_RAD) * 90, 200 + Math.cos(x * DEG_1_AS_RAD) * 30, 170 + Math.sin(x * 3 * DEG_1_AS_RAD) * 60];
    }
  }, {
    key: "_getPositionX",
    value: function _getPositionX(timestamp) {
      return this.speed * (timestamp - this.timestamp);
    }
  }, {
    key: "_drawLines",
    value: function _drawLines(x) {
      var _this = this;

      var lineStart = (x - 15) / this.lineGap;
      var lineEnd = (x + 20) / this.lineGap;

      var lineSpacing = this._range(Math.ceil(lineStart), Math.floor(lineEnd));

      var lineSpacingXVIZ = lineSpacing.map(function (lineX) {
        return {
          base: {
            style: {
              stroke_width: 0.2,
              stroke_color: _this._lineColor(lineX)
            }
          },
          vertices: [lineX, -40, 0, lineX, 40, 0]
        };
      });
      return (0, _defineProperty2["default"])({}, '/ground_lines', {
        polylines: lineSpacingXVIZ
      });
    }
  }]);
  return StraightScenario;
}();

module.exports = {
  straight: function straight(options) {
    return new StraightScenario(options);
  }
};
//# sourceMappingURL=scenario-straight.js.map