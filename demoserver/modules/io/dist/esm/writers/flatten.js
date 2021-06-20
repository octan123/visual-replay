function isFlattened(array) {
  return Number.isFinite(array[0]);
}

export function flattenToTypedArray(nestedArray) {
  var dimensions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  var ArrayType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Float32Array;

  if (nestedArray.length === 0) {
    return new Float32Array(0);
  }

  if (!checkVertices(nestedArray)) {
    return null;
  }

  if (isFlattened(nestedArray)) {
    return ArrayType.from(nestedArray);
  }

  var count = countVertices(nestedArray, dimensions);
  var typedArray = new ArrayType(count);
  flattenVerticesInPlace(nestedArray, typedArray, dimensions);
  return typedArray;
}

function countVertices(nestedArray) {
  var dimensions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;
  var nestedCount = 0;
  var localCount = 0;
  var index = -1;

  while (++index < nestedArray.length) {
    var value = nestedArray[index];

    if (Array.isArray(value) || ArrayBuffer.isView(value)) {
      nestedCount += countVertices(value);
    } else {
      localCount++;
    }
  }

  return nestedCount + (nestedCount === 0 && localCount < dimensions ? dimensions : localCount);
}

function checkVertices(nestedArray) {
  var predicate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Number.isFinite;
  var index = -1;

  while (++index < nestedArray.length) {
    var value = nestedArray[index];

    if (Array.isArray(value) || ArrayBuffer.isView(value)) {
      if (!checkVertices(value, predicate)) {
        return false;
      }
    } else if (!predicate(value)) {
      return false;
    }
  }

  return true;
}

function flattenVerticesInPlace(nestedArray, result) {
  var dimensions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
  flattenVerticesInPlaceRecursive(nestedArray, result, dimensions, 0);
  return result;
}

function flattenVerticesInPlaceRecursive(nestedArray, result, dimensions, insert) {
  var index = -1;
  var vertexLength = 0;

  while (++index < nestedArray.length) {
    var value = nestedArray[index];

    if (Array.isArray(value) || ArrayBuffer.isView(value)) {
      insert = flattenVerticesInPlaceRecursive(value, result, dimensions, insert);
    } else {
      if (vertexLength < dimensions) {
        result[insert++] = value;
        vertexLength++;
      }
    }
  }

  if (vertexLength > 0 && vertexLength < dimensions) {
    result[insert++] = 0;
  }

  return insert;
}
//# sourceMappingURL=flatten.js.map