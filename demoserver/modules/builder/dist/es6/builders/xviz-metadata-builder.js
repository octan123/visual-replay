import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { _Pose as Pose, Matrix4 } from 'math.gl';
import { CATEGORY } from './constant';
const defaultValidateWarn = console.warn;
const defaultValidateError = console.error;
export default class XVIZMetadataBuilder {
  constructor({
    validateWarn = defaultValidateWarn,
    validateError = defaultValidateError
  } = {}) {
    this._validateWarn = validateWarn;
    this._validateError = validateError;
    this.data = {
      streams: {}
    };
    this.streamId = null;
    this.tmp_ui_builder = null;
    this.tmp_stream = {};
    this.tmp_matrix_transform = null;
    this.tmp_pose_transform = null;
    this.tmp_log_info = {};
    this.tmp_type = null;
  }

  getMetadata() {
    this._flush();

    const metadata = _objectSpread({
      version: '2.0.0'
    }, this.data);

    if (Object.keys(this.tmp_log_info).length > 0) {
      metadata.log_info = this.tmp_log_info;
    }

    if (this.tmp_ui_builder) {
      const panels = this.tmp_ui_builder.getUI();
      metadata.ui_config = {};

      for (const panelKey of Object.keys(panels)) {
        metadata.ui_config[panelKey] = {
          name: panels[panelKey].name,
          config: panels[panelKey]
        };
      }
    }

    return metadata;
  }

  startTime(time) {
    this.tmp_log_info.start_time = time;
    return this;
  }

  endTime(time) {
    this.tmp_log_info.end_time = time;
    return this;
  }

  ui(xvizUIBuilder) {
    this.tmp_ui_builder = xvizUIBuilder;
    return this;
  }

  stream(streamId) {
    if (this.streamId) {
      this._flush();
    }

    this.streamId = streamId;
    return this;
  }

  category(category) {
    this.tmp_stream.category = category.toUpperCase();
    return this;
  }

  type(t) {
    this.tmp_type = t.toUpperCase();
    return this;
  }

  source(source) {
    this.tmp_stream.source = source;
    return this;
  }

  unit(u) {
    this.tmp_stream.units = u;
    return this;
  }

  coordinate(coordinate) {
    this.tmp_stream.coordinate = coordinate;
    return this;
  }

  transformMatrix(matrix) {
    if (matrix instanceof Array) {
      matrix = new Matrix4(matrix);
    }

    this.tmp_matrix_transform = matrix;
    return this;
  }

  pose(position = {}, orientation = {}) {
    const {
      x = 0,
      y = 0,
      z = 0
    } = position;
    const {
      roll = 0,
      pitch = 0,
      yaw = 0
    } = orientation;
    const pose = new Pose({
      x,
      y,
      z,
      roll,
      pitch,
      yaw
    });
    this.tmp_pose_transform = pose.getTransformationMatrix();
    return this;
  }

  streamStyle(style) {
    this.tmp_stream.stream_style = style;
    return this;
  }

  styleClass(name, style) {
    if (!this.streamId) {
      this._validateError('A stream must set before adding a style rule.');

      return this;
    }

    const streamRule = {
      name,
      style
    };

    if (!this.tmp_stream.style_classes) {
      this.tmp_stream.style_classes = [streamRule];
    } else {
      this.tmp_stream.style_classes.push(streamRule);
    }

    return this;
  }

  logInfo(data) {
    this.tmp_log_info = _objectSpread(_objectSpread({}, data), this.tmp_log_info);
    return this;
  }

  _flush() {
    if (this.streamId) {
      const streamData = this.tmp_stream;
      let transform = null;

      if (this.tmp_pose_transform && this.tmp_matrix_transform) {
        this._validateError('`pose` and `transformMatrix` cannot be applied at the same time.');
      } else {
        transform = this.tmp_matrix_transform || this.tmp_pose_transform;
      }

      if (transform) {
        streamData.transform = transform;
      }

      if (streamData.category === CATEGORY.PRIMITIVE || streamData.category === CATEGORY.FUTURE_INSTANCE) {
        streamData.primitive_type = this.tmp_type;
      } else if (streamData.category === CATEGORY.VARIABLE || streamData.category === CATEGORY.TIME_SERIES) {
        streamData.scalar_type = this.tmp_type;
      }

      this.data.streams[this.streamId] = streamData;
    }

    this._reset();
  }

  _reset() {
    this.streamId = null;
    this.tmp_stream = {};
    this.tmp_matrix_transform = null;
    this.tmp_pose_transform = null;
    this.tmp_type = null;
  }

}
//# sourceMappingURL=xviz-metadata-builder.js.map