"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STYLES = exports.TOOLTIP_STYLE = exports.INITIAL_STATS = exports.STATS_HELP = exports.STATS_COLORS = exports.STATS_NAMES = exports.STATS_KEYS = exports.COLOR_PALETTE = exports.DEFAULT_STATS_TITLE = exports.HISTORY_SIZE = exports.XVIZ_WORKERS_MONITOR_INTERVAL = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _STATS_NAMES, _STATS_COLORS, _STATS_HELP;

var XVIZ_WORKERS_MONITOR_INTERVAL = 1000;
exports.XVIZ_WORKERS_MONITOR_INTERVAL = XVIZ_WORKERS_MONITOR_INTERVAL;
var HISTORY_SIZE = 16;
exports.HISTORY_SIZE = HISTORY_SIZE;
var DEFAULT_STATS_TITLE = 'Streetscape Performance Metrics';
exports.DEFAULT_STATS_TITLE = DEFAULT_STATS_TITLE;
var COLOR_PALETTE = {
  WHITE: '#FFFFFF',
  BLACK: '#141414',
  DARK_GREY: '#333333',
  LIGHT_GREY: '#B3B3B3',
  BLUE: '#5B91F4',
  LIGHT_BLUE: '#98baf9',
  GREEN: '#34a853',
  ORANGE: '#fbbc05',
  PURPLE: '#673ab7',
  RED: '#ea4335'
};
exports.COLOR_PALETTE = COLOR_PALETTE;
var STATS_KEYS = {
  FPS: 'fps',
  REDRAW: 'framesRedrawn',
  FRAME_UPDATE: 'frame-update',
  LOADER_UPDATE: 'loader-update',
  LOADER_ERROR: 'loader-error'
};
exports.STATS_KEYS = STATS_KEYS;
var STATS_NAMES = (_STATS_NAMES = {}, (0, _defineProperty2["default"])(_STATS_NAMES, STATS_KEYS.FPS, 'FPS'), (0, _defineProperty2["default"])(_STATS_NAMES, STATS_KEYS.REDRAW, 'Redraw'), (0, _defineProperty2["default"])(_STATS_NAMES, STATS_KEYS.FRAME_UPDATE, 'XVIZ Frames Rendered'), (0, _defineProperty2["default"])(_STATS_NAMES, STATS_KEYS.LOADER_UPDATE, 'XVIZ Frames Loaded'), (0, _defineProperty2["default"])(_STATS_NAMES, STATS_KEYS.LOADER_ERROR, 'XVIZ Loading Errors'), _STATS_NAMES);
exports.STATS_NAMES = STATS_NAMES;
var STATS_COLORS = (_STATS_COLORS = {}, (0, _defineProperty2["default"])(_STATS_COLORS, STATS_KEYS.FPS, COLOR_PALETTE.BLUE), (0, _defineProperty2["default"])(_STATS_COLORS, STATS_KEYS.REDRAW, COLOR_PALETTE.GREEN), (0, _defineProperty2["default"])(_STATS_COLORS, STATS_KEYS.FRAME_UPDATE, COLOR_PALETTE.ORANGE), (0, _defineProperty2["default"])(_STATS_COLORS, STATS_KEYS.LOADER_UPDATE, COLOR_PALETTE.PURPLE), (0, _defineProperty2["default"])(_STATS_COLORS, STATS_KEYS.LOADER_ERROR, COLOR_PALETTE.RED), _STATS_COLORS);
exports.STATS_COLORS = STATS_COLORS;
var STATS_HELP = (_STATS_HELP = {}, (0, _defineProperty2["default"])(_STATS_HELP, STATS_KEYS.FPS, 'Number of frames per seconds.'), (0, _defineProperty2["default"])(_STATS_HELP, STATS_KEYS.REDRAW, 'Number of times WebGLContext was re-rendered.'), (0, _defineProperty2["default"])(_STATS_HELP, STATS_KEYS.FRAME_UPDATE, 'Number of XVIZ frames rendered to screen.'), (0, _defineProperty2["default"])(_STATS_HELP, STATS_KEYS.LOADER_UPDATE, 'Number of new XVIZ messages loaded.'), (0, _defineProperty2["default"])(_STATS_HELP, STATS_KEYS.LOADER_ERROR, 'Number of XVIZ errors generated during loading.'), _STATS_HELP);
exports.STATS_HELP = STATS_HELP;
var INITIAL_STATS = {
  counter: 0
};
exports.INITIAL_STATS = INITIAL_STATS;

for (var _i = 0, _Object$values = Object.values(STATS_KEYS); _i < _Object$values.length; _i++) {
  var statName = _Object$values[_i];
  INITIAL_STATS[statName] = [{
    x: INITIAL_STATS.counter,
    y: 0
  }];
}

var TOOLTIP_STYLE = {
  arrowSize: 0,
  borderWidth: 0,
  background: COLOR_PALETTE.BLACK,
  body: {
    maxWidth: null,
    color: COLOR_PALETTE.WHITE,
    whiteSpace: 'pre-wrap',
    fontSize: 14,
    borderRadius: 5
  }
};
exports.TOOLTIP_STYLE = TOOLTIP_STYLE;
var STYLES = {
  LOG_VIEWER: {
    STATS: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      background: COLOR_PALETTE.WHITE
    },
    STATS_HELP: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
    },
    METRIC_CARD: {
      tooltip: TOOLTIP_STYLE
    }
  },
  WORKER_FARM: {
    CONTAINER: {
      margin: '10px 0'
    },
    TITLE: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    }
  },
  WORKERS: {
    CONTAINER: {
      margin: '10px 0'
    },
    TITLE: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    }
  },
  TAG: {
    marginLeft: 10,
    borderRadius: 20,
    padding: '2px 10px',
    border: 'solid 1.5px'
  },
  POSITIVE: {
    background: 'rgb(52, 168, 83, 0.1)',
    color: COLOR_PALETTE.GREEN,
    borderColor: COLOR_PALETTE.GREEN
  },
  NEGATIVE: {
    background: 'rgb(234, 67, 53, 0.1)',
    color: COLOR_PALETTE.RED,
    borderColor: COLOR_PALETTE.RED
  }
};
exports.STYLES = STYLES;
//# sourceMappingURL=constants.js.map