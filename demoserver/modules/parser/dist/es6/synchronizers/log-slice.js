import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import { getXVIZConfig } from '../config/xviz-config';
import XVIZObject from '../objects/xviz-object';
import { findInsertPos, INSERT_POSITION } from '../utils/search';
import log from '../utils/log';
import { getTransformsFromPose } from '../parsers/parse-vehicle-pose';

function lookAheadTimesliceAccessor(timeslice) {
  if (timeslice && timeslice.length) {
    return timeslice[0].timestamp;
  }

  log.warn('Missing entry or timestamp in lookAhead array')();
  return 0;
}

function updateObjects(streamName, features) {
  for (const feature of features) {
    const xvizObject = XVIZObject.get(feature.id);

    if (xvizObject) {
      xvizObject._addFeature(streamName, feature);
    }
  }
}

export default class LogSlice {
  constructor(streamFilter, lookAheadMs, linksByReverseTime, streamsByReverseTime) {
    this.features = {};
    this.variables = {};
    this.pointCloud = null;
    this.lookAheads = {};
    this.components = {};
    this.links = {};
    this.streams = {};
    this.initialize(streamFilter, lookAheadMs, linksByReverseTime, streamsByReverseTime);
  }

  getCurrentFrame(params, postProcessFrame) {
    const {
      vehiclePose
    } = params;

    if (!vehiclePose) {
      return null;
    }

    const {
      OBJECT_STREAM
    } = getXVIZConfig();

    const frame = _objectSpread(_objectSpread(_objectSpread({}, params), getTransformsFromPose(vehiclePose)), {}, {
      vehiclePose,
      features: this.features,
      lookAheads: this.lookAheads,
      variables: this.variables,
      pointCloud: this.pointCloud,
      components: this.components,
      streams: this.streams,
      links: this.links
    });

    XVIZObject.resetAll();

    if (postProcessFrame) {
      postProcessFrame(frame);
    }

    if (OBJECT_STREAM) {
      updateObjects(OBJECT_STREAM, this.features[OBJECT_STREAM] || []);
    } else {
      for (const streamName in this.features) {
        const features = this.features[streamName];

        if (features.length && features[0].id) {
          updateObjects(streamName, features);
        }
      }

      for (const streamName in this.variables) {
        const variables = this.variables[streamName];

        if (variables.length && variables[0].id) {
          updateObjects(streamName, variables);
        }
      }
    }

    frame.objects = XVIZObject.getAllInCurrentFrame();
    return frame;
  }

  initialize(streamFilter, lookAheadMs, linksByReverseTime, streamsByReverseTime) {
    const filter = streamFilter && Object.keys(streamFilter).length > 0 ? streamFilter : null;
    streamsByReverseTime.forEach(streams => {
      for (const streamName in streams) {
        if (this.streams[streamName] !== null && !this.streams[streamName] && this._includeStream(filter, streamName)) {
          this.addStreamDatum(streams[streamName], streamName, lookAheadMs, this);
        }
      }
    });
    linksByReverseTime.forEach(links => {
      for (const streamName in links) {
        if (this.links[streamName] !== null && !this.links[streamName] && this._includeStream(filter, streamName)) {
          this.links[streamName] = links[streamName];
        }
      }
    });
  }

  addStreamDatum(datum, streamName, lookAheadMs) {
    this.streams[streamName] = datum;

    if (!datum) {
      return;
    }

    this.setLabelsOnXVIZObjects(datum.labels);
    const {
      features = [],
      lookAheads = [],
      variable,
      pointCloud = null
    } = datum;

    if (lookAheads.length && lookAheadMs > 0) {
      const lookAheadTime = datum.time + lookAheadMs;
      const lookAheadIndex = findInsertPos(lookAheads, lookAheadTime, INSERT_POSITION.RIGHT, lookAheadTimesliceAccessor);

      if (lookAheadIndex) {
        this.lookAheads[streamName] = lookAheads[lookAheadIndex - 1];
      }
    }

    if (features.length) {
      this.features[streamName] = features;
    }

    if (pointCloud) {
      this.pointCloud = pointCloud;
    }

    if (variable !== undefined) {
      this.variables[streamName] = variable;
    }
  }

  setLabelsOnXVIZObjects(labels = []) {
    labels.forEach(label => {
      const object = XVIZObject.get(label.id);

      if (object && label.labelName) {
        object._setProp(label.labelName, label.value);
      }
    });
  }

  getStream(stream, defaultValue = {}) {
    const streamData = this.streams[stream];

    if (!streamData) {
      return defaultValue;
    }

    return streamData;
  }

  _includeStream(streamFilter, streamName) {
    return !streamFilter || streamFilter[streamName];
  }

}
//# sourceMappingURL=log-slice.js.map