function isFlattened(array) {
  return Number.isFinite(array[0]);
}

export function flattenToTypedArray(nestedArray, dimensions = 3, ArrayType = Float32Array) {
  if (nestedArray.length === 0) {
    return new Float32Array(0);
  }

  if (!checkVertices(nestedArray)) {
    return null;
  }

  if (isFlattened(nestedArray)) {
    return ArrayType.from(nestedArray);
  }

  const count = countVertices(nestedArray, dimensions);
  const typedArray = new ArrayType(count);
  flattenVerticesInPlace(nestedArray, typedArray, dimensions);
  return typedArray;
}

function countVertices(nestedArray, dimensions = 3) {
  let nestedCount = 0;
  let localCount = 0;
  let index = -1;

  while (++index < nestedArray.length) {
    const value = nestedArray[index];

    if (Array.isArray(value) || ArrayBuffer.isView(value)) {
      nestedCount += countVertices(value);
    } else {
      localCount++;
    }
  }

  return nestedCount + (nestedCount === 0 && localCount < dimensions ? dimensions : localCount);
}

function checkVertices(nestedArray, predicate = Number.isFinite) {
  let index = -1;

  while (++index < nestedArray.length) {
    const value = nestedArray[index];

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

function flattenVerticesInPlace(nestedArray, result, dimensions = 3) {
  flattenVerticesInPlaceRecursive(nestedArray, result, dimensions, 0);
  return result;
}

function flattenVerticesInPlaceRecursive(nestedArray, result, dimensions, insert) {
  let index = -1;
  let vertexLength = 0;

  while (++index < nestedArray.length) {
    const value = nestedArray[index];

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