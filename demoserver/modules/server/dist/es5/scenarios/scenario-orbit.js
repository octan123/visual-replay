"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var DEG_1_AS_RAD = Math.PI / 180;
var orbit_metadata = {
  type: 'xviz/metadata',
  data: {
    version: '2.0.0'
  }
};

var OrbitScenario = function () {
  function OrbitScenario() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, OrbitScenario);
    this.timestamp = 0;
    this.radius = options.radius || 30;
    this.duration = options.duration || 10;
    this.live = options.live;
    this.speed = options.speed || 10;
    this.first = true;
  }

  (0, _createClass2["default"])(OrbitScenario, [{
    key: "getMetadata",
    value: function getMetadata() {
      var metadata = JSON.parse(JSON.stringify(orbit_metadata));

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
      if (this.first) {
        this.first = false;
        return this._getFirstMessage(timeOffset);
      }

      return this._getMessage(timeOffset);
    }
  }, {
    key: "_getFirstMessage",
    value: function _getFirstMessage(timeOffset) {
      var timestamp = this.timestamp + timeOffset;
      return {
        type: 'xviz/state_update',
        data: {
          update_type: 'PERSISTENT',
          updates: [{
            timestamp: timestamp,
            poses: this._drawPoses(timestamp),
            links: this._drawLinks(timestamp),
            primitives: this._drawOrbs(timestamp)
          }]
        }
      };
    }
  }, {
    key: "_getMessage",
    value: function _getMessage(timeOffset) {
      var timestamp = this.timestamp + timeOffset;
      return {
        type: 'xviz/state_update',
        data: {
          update_type: 'INCREMENTAL',
          updates: [{
            timestamp: timestamp,
            poses: this._drawDynamicPoses(timestamp),
            links: this._drawDynamicLinks(timestamp)
          }]
        }
      };
    }
  }, {
    key: "_drawLinks",
    value: function _drawLinks(parent, child) {
      var makeLink = function makeLink(p, c) {
        return (0, _defineProperty2["default"])({}, c, {
          target_pose: p
        });
      };

      return _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, makeLink('/system', '/sun_pose')), makeLink('/system', '/earth_orbit')), makeLink('/system', '/mars_orbit')), makeLink('/sun_pose', '/sun')), makeLink('/earth_orbit', '/earth_pose')), makeLink('/earth_pose', '/earth')), makeLink('/moon_orbit', '/moon_pose')), makeLink('/moon_pose', '/moon')), makeLink('/mars_orbit', '/mars_pose')), makeLink('/mars_pose', '/mars'));
    }
  }, {
    key: "_drawDynamicLinks",
    value: function _drawDynamicLinks(timestamp) {
      var cycle = timestamp % 10;
      var target_pose = '/earth_pose';

      if (cycle > 5) {
        target_pose = '/mars_pose';
      }

      return (0, _defineProperty2["default"])({}, '/moon_orbit', {
        target_pose: target_pose
      });
    }
  }, {
    key: "_drawPoses",
    value: function _drawPoses(timestamp) {
      return {
        '/vehicle_pose': {
          orientation: [0, 0, 0],
          position: [0, 0, 0]
        },
        '/system': {
          orientation: [0, 0, 0],
          position: [0, 0, 0]
        }
      };
    }
  }, {
    key: "_drawDynamicPoses",
    value: function _drawDynamicPoses(timestamp) {
      var degreesPerSecond = 45;
      var currentDegrees = timestamp * degreesPerSecond;
      var angle = currentDegrees * DEG_1_AS_RAD;

      var makePose = function makePose(name, distance, zAngle) {
        return (0, _defineProperty2["default"])({}, name, {
          orientation: [0, 0, zAngle],
          position: [distance, 0, 0]
        });
      };

      return _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, makePose('/earth_orbit', 0, angle)), makePose('/moon_orbit', 0, angle)), makePose('/mars_orbit', 0, -angle)), makePose('/sun_pose', 0, angle)), makePose('/earth_pose', 25, angle)), makePose('/moon_pose', 10, angle)), makePose('/mars_pose', 50, angle));
    }
  }, {
    key: "_drawOrb",
    value: function _drawOrb(name, radius, color) {
      return (0, _defineProperty2["default"])({}, name, {
        circles: [{
          center: [0.0, 0.0, 0.0],
          radius: radius,
          base: {
            style: {
              fill_color: color
            }
          }
        }]
      });
    }
  }, {
    key: "_drawOrbs",
    value: function _drawOrbs(name, radius, color) {
      return _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, this._drawOrb('/sun', 9, [255, 180, 40])), this._drawOrb('/earth', 5, [20, 50, 190])), this._drawOrb('/moon', 1, [200, 200, 200])), this._drawOrb('/mars', 4, [255, 0, 0]));
    }
  }]);
  return OrbitScenario;
}();

module.exports = {
  orbit: function orbit(options) {
    return new OrbitScenario(options);
  }
};
//# sourceMappingURL=scenario-orbit.js.map