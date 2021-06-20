function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import { getXVIZConfig } from '../config/xviz-config';
import { PRIMITIVE_CAT, normalizeXVIZPrimitive } from './parse-xviz-primitive';
import XVIZObject from '../objects/xviz-object';
import { isMainThread } from '../utils/globals';
import log from '../utils/log';
import { getPrimitiveData } from './xviz-v2-common';
import XVIZPrimitiveSettingsV1 from './xviz-primitives-v1';
import XVIZPrimitiveSettingsV2 from './xviz-primitives-v2';

function createPrimitiveMap() {
  var result = {};

  for (var key in PRIMITIVE_CAT) {
    result[PRIMITIVE_CAT[key]] = [];
  }

  return result;
}

var SCALAR_TYPE = {
  doubles: 'FLOAT',
  int32s: 'INT32',
  bools: 'BOOL',
  strings: 'STRING'
};
export function parseXVIZStream(data, convertPrimitive) {
  var _data$ = data[0],
      primitives = _data$.primitives,
      ui_primitives = _data$.ui_primitives,
      variables = _data$.variables,
      futures = _data$.futures;

  if (primitives) {
    var streamName = Object.keys(primitives)[0];
    return data.map(function (datum) {
      return parseStreamPrimitive(datum.primitives[streamName], streamName, datum.timestamp, convertPrimitive);
    });
  } else if (variables) {
    var _streamName = Object.keys(variables)[0];
    return data.map(function (datum) {
      return parseStreamVariable(datum.variables[_streamName], _streamName, datum.timestamp);
    });
  } else if (futures) {
    var _streamName2 = Object.keys(futures)[0];
    return data.map(function (datum) {
      return parseStreamFutures(datum.futures[_streamName2], _streamName2, datum.timestamp, convertPrimitive);
    });
  } else if (ui_primitives) {
    var _streamName3 = Object.keys(ui_primitives)[0];
    return data.map(function (datum) {
      return parseStreamUIPrimitives(datum.ui_primitives[_streamName3], _streamName3, datum.timestamp);
    });
  }

  return {};
}
export function parseStreamPrimitive(primitives, streamName, time, convertPrimitive) {
  var _getXVIZConfig = getXVIZConfig(),
      OBJECT_STREAM = _getXVIZConfig.OBJECT_STREAM,
      preProcessPrimitive = _getXVIZConfig.preProcessPrimitive,
      DYNAMIC_STREAM_METADATA = _getXVIZConfig.DYNAMIC_STREAM_METADATA;

  var PRIMITIVE_SETTINGS = getXVIZConfig().currentMajorVersion === 1 ? XVIZPrimitiveSettingsV1 : XVIZPrimitiveSettingsV2;
  var primitiveData = getPrimitiveData(primitives);

  if (!primitiveData || !Array.isArray(primitiveData.primitives)) {
    return {};
  }

  var primType = primitiveData.type,
      objects = primitiveData.primitives;
  var primitiveMap = createPrimitiveMap();
  var category = null;

  for (var objectIndex = 0; objectIndex < objects.length; objectIndex++) {
    var object = objects[objectIndex];

    if (object && Array.isArray(object)) {
      category = PRIMITIVE_CAT.LOOKAHEAD;
      primitiveMap[category].push([]);

      for (var j = 0; j < object.length; j++) {
        preProcessPrimitive({
          primitive: object[j],
          streamName: streamName,
          time: time
        });
        var primitive = normalizeXVIZPrimitive(PRIMITIVE_SETTINGS, object[j], objectIndex, streamName, primType, time, convertPrimitive);

        if (primitive) {
          primitiveMap[category][objectIndex].push(primitive);
        }
      }
    } else {
      preProcessPrimitive({
        primitive: object,
        streamName: streamName,
        time: time
      });

      var _primitive = normalizeXVIZPrimitive(PRIMITIVE_SETTINGS, object, objectIndex, streamName, primType, time, convertPrimitive);

      category = PRIMITIVE_SETTINGS[object.type || primType].category;

      if (_primitive) {
        primitiveMap[category].push(_primitive);

        if (isMainThread && (streamName === OBJECT_STREAM || !OBJECT_STREAM && _primitive.id && category === 'features')) {
          XVIZObject.observe(_primitive.id, time);
        }
      }
    }
  }

  primitiveMap.vertices = joinFeatureVerticesToTypedArrays(primitiveMap.features);
  var pointCloud = joinObjectPointCloudsToTypedArrays(primitiveMap.pointCloud);

  if (pointCloud) {
    primitiveMap.features.push({
      type: pointCloud.type,
      points: pointCloud.positions,
      colors: pointCloud.colors,
      ids: pointCloud.ids
    });
  }

  primitiveMap.pointCloud = pointCloud;
  primitiveMap.time = time;

  if (DYNAMIC_STREAM_METADATA) {
    primitiveMap.__metadata = {
      category: 'PRIMITIVE',
      primitive_type: primType
    };
  }

  return primitiveMap;
}
export function parseStreamFutures(objects, streamName, time, convertPrimitive) {
  var _getXVIZConfig2 = getXVIZConfig(),
      currentMajorVersion = _getXVIZConfig2.currentMajorVersion,
      DYNAMIC_STREAM_METADATA = _getXVIZConfig2.DYNAMIC_STREAM_METADATA;

  var result = currentMajorVersion === 1 ? parseStreamFuturesV1(objects, streamName, time, convertPrimitive) : parseStreamFuturesV2(objects, streamName, time, convertPrimitive);

  if (DYNAMIC_STREAM_METADATA) {
    result.__metadata = {
      category: 'FUTURE_INSTANCE',
      primitive_type: result.lookAheads[0][0] && result.lookAheads[0][0].type
    };
  }

  return result;
}
export function parseStreamFuturesV1(objects, streamName, time, convertPrimitive) {
  var futures = [];
  objects.forEach(function (object, objectIndex) {
    var primitives = object.primitives;
    var future = primitives.map(function (primitive) {
      return normalizeXVIZPrimitive(XVIZPrimitiveSettingsV1, primitive, objectIndex, streamName, primitive.type, time, convertPrimitive);
    }).filter(Boolean);
    futures.push(future);
  });
  return {
    time: time,
    lookAheads: futures
  };
}
export function parseStreamFuturesV2(objects, streamName, time, convertPrimitive) {
  var futures = [];
  var timestamps = objects.timestamps;
  objects.primitives.forEach(function (future_set, futureIndex) {
    var data = getPrimitiveData(future_set);
    var future = data.primitives.map(function (primitive) {
      var normalizedPrimitive = normalizeXVIZPrimitive(XVIZPrimitiveSettingsV2, primitive, futureIndex, streamName, data.type, time, convertPrimitive);
      normalizedPrimitive.timestamp = timestamps[futureIndex];
      return normalizedPrimitive;
    }).filter(Boolean);
    futures.push(future);
  });
  return {
    time: time,
    lookAheads: futures
  };
}
export function parseStreamVariable(objects, streamName, time) {
  var _getXVIZConfig3 = getXVIZConfig(),
      currentMajorVersion = _getXVIZConfig3.currentMajorVersion,
      DYNAMIC_STREAM_METADATA = _getXVIZConfig3.DYNAMIC_STREAM_METADATA;

  var result = currentMajorVersion === 1 ? parseStreamVariableV1(objects, streamName, time) : parseStreamVariableV2(objects, streamName, time);

  if (DYNAMIC_STREAM_METADATA) {
    result.__metadata = {
      category: 'VARIABLE',
      scalar_type: Array.isArray(result.variable) && result.variable[0] && result.variable[0].type
    };
  }

  return result;
}
export function parseStreamVariableV1(objects, streamName, time) {
  if (Array.isArray(objects)) {
    return {
      time: time
    };
  }

  var variable;
  var timestamps = objects.timestamps,
      values = objects.values;

  if (values.length === 1) {
    variable = values[0];
  } else if (timestamps) {
    variable = values.map(function (v, i) {
      return [timestamps[i], v];
    });
  } else {
    variable = values;
  }

  var entry = {
    time: time,
    variable: variable
  };
  return entry;
}
export function parseStreamVariableV2(objects, streamName, time) {
  if (Array.isArray(objects)) {
    return {
      time: time
    };
  }

  var variables = objects.variables;

  if (!variables || !Array.isArray(variables)) {
    return {};
  }

  var result = {
    time: time
  };
  result.variable = variables.map(function (entry) {
    var base = entry.base,
        values = entry.values;
    var valueData = getVariableData(values);

    if (!valueData || !valueData.values) {
      return null;
    }

    if (base && base.object_id) {
      valueData.id = base.object_id;
    }

    return valueData;
  }).filter(Boolean);
  return result;
}
export function parseStreamTimeSeries(seriesArray, streamBlackList) {
  var _getXVIZConfig4 = getXVIZConfig(),
      currentMajorVersion = _getXVIZConfig4.currentMajorVersion;

  if (currentMajorVersion === 2) {
    return parseStreamTimeSeriesV2(seriesArray, streamBlackList);
  }

  log.error("Invalid time_series data in XVIZ version ".concat(currentMajorVersion))();
  return null;
}

function getVariableData(valuesObject) {
  for (var key in valuesObject) {
    if (key in SCALAR_TYPE) {
      return {
        type: SCALAR_TYPE[key],
        values: valuesObject[key]
      };
    }
  }

  return null;
}

function parseStreamTimeSeriesV2(seriesArray, streamBlackList) {
  if (!Array.isArray(seriesArray)) {
    return {};
  }

  var _getXVIZConfig5 = getXVIZConfig(),
      DYNAMIC_STREAM_METADATA = _getXVIZConfig5.DYNAMIC_STREAM_METADATA;

  var timeSeriesStreams = {};
  seriesArray.forEach(function (timeSeriesEntry) {
    var timestamp = timeSeriesEntry.timestamp,
        streams = timeSeriesEntry.streams,
        values = timeSeriesEntry.values,
        object_id = timeSeriesEntry.object_id;
    var valueData = getVariableData(values);

    if (!valueData || valueData.values.length !== streams.length) {
      return null;
    }

    valueData.values.forEach(function (variable, entryIndex) {
      var streamName = streams[entryIndex];

      if (!streamBlackList.has(streamName)) {
        var entry = {
          time: timestamp,
          variable: variable
        };

        if (object_id) {
          entry.id = object_id;
        }

        var tsStream = timeSeriesStreams[streamName];

        if (tsStream) {
          log.warn("Unexpected time_series duplicate: ".concat(streamName))();
        } else {
          timeSeriesStreams[streamName] = entry;
        }

        if (DYNAMIC_STREAM_METADATA) {
          entry.__metadata = {
            category: 'TIME_SERIES',
            scalar_type: valueData.type
          };
        }
      }
    });
    return timeSeriesStreams;
  });
  return timeSeriesStreams;
}

function getVertexCount(vertices) {
  return Number.isFinite(vertices[0]) ? vertices.length / 3 : vertices.length;
}

function getColorStride(colors, vertexCount) {
  if (colors) {
    if (colors.length / 4 === vertexCount) {
      return 4;
    }

    if (colors.length / 3 === vertexCount) {
      return 3;
    }

    var stride;

    if (Array.isArray(colors[0])) {
      stride = colors[0].length;
    } else {
      stride = colors.length;
    }

    if (stride === 3 || stride === 4) {
      return stride;
    }

    log.error('Unknown point color format');
  }

  return 0;
}

function joinFeatureVerticesToTypedArrays(features) {
  var vertexCount = 0;

  var _iterator = _createForOfIteratorHelper(features),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var feature = _step.value;

      if (feature.vertices) {
        vertexCount += getVertexCount(feature.vertices);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  if (vertexCount === 0) {
    return null;
  }

  var vertices = new Float64Array(vertexCount * 3);
  var i = 0;

  var _iterator2 = _createForOfIteratorHelper(features),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _feature = _step2.value;

      if (_feature.vertices) {
        var count = getVertexCount(_feature.vertices);

        if (Number.isFinite(_feature.vertices[0])) {
          vertices.set(_feature.vertices, i);
          i += count * 3;
        } else {
          var _iterator3 = _createForOfIteratorHelper(_feature.vertices),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var p = _step3.value;
              vertices.set(p, i);
              i += 3;
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }

        _feature.vertices = vertices.subarray(i - count * 3, i);
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return vertices;
}

var DEFAULT_COLOR = [0, 0, 0, 255];

function joinObjectPointCloudsToTypedArrays(objects) {
  if (objects.length === 0) {
    return null;
  }

  var numInstances = 0;

  var _iterator4 = _createForOfIteratorHelper(objects),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var object = _step4.value;
      numInstances += getVertexCount(object.vertices);
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }

  var vertexColorStride = null;
  var positions = new Float32Array(numInstances * 3);
  var colors = new Uint8ClampedArray(numInstances * 4);
  var ids = new Uint32Array(numInstances);
  var i = 0;
  objects.forEach(function (object) {
    var vertexPositions = object.vertices;
    var vertexColors = object.colors;
    var vertexCount = getVertexCount(vertexPositions);

    if (vertexCount === 0) {
      return;
    }

    var colorStride = getColorStride(vertexColors || object.color, vertexCount);

    if (vertexColorStride !== null && vertexColorStride !== colorStride) {
      log.error('Inconsistent point color format');
    }

    vertexColorStride = colorStride;
    var isColorFlattenedArray = vertexColors && vertexColors.length === vertexCount * vertexColorStride;

    if (isColorFlattenedArray) {
      colors.set(vertexColors, i * vertexColorStride);
    }

    var isPositionFlattenedArray = vertexPositions.length === vertexCount * 3;

    if (isPositionFlattenedArray) {
      positions.set(vertexPositions, i * 3);
    }

    if (Number.isFinite(object.id)) {
      ids.fill(object.id, i, i + vertexCount);
    }

    if (isPositionFlattenedArray && (isColorFlattenedArray || !vertexColorStride)) {
      return;
    }

    var color = object.color || DEFAULT_COLOR;

    for (var j = 0; j < vertexCount; j++, i++) {
      if (!isPositionFlattenedArray) {
        var vertex = vertexPositions[j];
        positions[i * 3 + 0] = vertex[0];
        positions[i * 3 + 1] = vertex[1];
        positions[i * 3 + 2] = vertex[2];
      }

      if (!isColorFlattenedArray && vertexColorStride) {
        if (vertexColors) {
          color = vertexColors[j];
        }

        colors[i * vertexColorStride + 0] = color[0];
        colors[i * vertexColorStride + 1] = color[1];
        colors[i * vertexColorStride + 2] = color[2];

        if (vertexColorStride === 4) {
          colors[i * vertexColorStride + 3] = color[3] || 255;
        }
      }
    }
  });
  return {
    type: objects[0].type,
    numInstances: numInstances,
    positions: positions,
    colors: vertexColorStride ? colors.subarray(0, vertexColorStride * numInstances) : null,
    ids: ids
  };
}

export function parseStreamUIPrimitives(components, streamName, time) {
  var result = Object.assign({
    time: time
  }, components);

  if (getXVIZConfig().DYNAMIC_STREAM_METADATA) {
    result.__metadata = {
      category: 'UI_PRIMITIVE'
    };
  }

  return result;
}
//# sourceMappingURL=parse-xviz-stream.js.map