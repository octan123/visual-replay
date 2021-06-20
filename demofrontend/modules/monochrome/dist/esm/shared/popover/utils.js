import { POSITIONS } from './popover';
export function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}
export function getOppositePosition(side) {
  switch (side) {
    case POSITIONS.TOP:
      return POSITIONS.BOTTOM;

    case POSITIONS.RIGHT:
      return POSITIONS.LEFT;

    case POSITIONS.BOTTOM:
      return POSITIONS.TOP;

    case POSITIONS.LEFT:
      return POSITIONS.RIGHT;

    default:
      return POSITIONS.BOTTOM;
  }
}
export function generateTriangleStyles(position, size) {
  var positions = [POSITIONS.TOP, POSITIONS.RIGHT, POSITIONS.BOTTOM, POSITIONS.LEFT];
  var oppositePosition = getOppositePosition(position);
  var style = {
    position: 'absolute',
    width: 0,
    height: 0,
    borderStyle: 'solid'
  };

  for (var _i = 0, _positions = positions; _i < _positions.length; _i++) {
    var p = _positions[_i];
    var key = capitalize(p);
    var width = p === oppositePosition ? 0 : size;
    var color = p === position ? undefined : 'transparent';
    style["border".concat(key, "Width")] = width;
    style["border".concat(key, "Color")] = color;
  }

  return style;
}
export function nodeHasParent(current, possibleParent) {
  if (current === possibleParent) {
    return true;
  }

  while (current.parentNode) {
    if (current === possibleParent) {
      return true;
    }

    current = current.parentNode;
  }

  return false;
}
export function positionsToPopperPlacement(position, arrowPosition) {
  var placement = position || POSITIONS.AUTO;

  if (arrowPosition === POSITIONS.LEFT || arrowPosition === POSITIONS.TOP) {
    placement = "".concat(placement, "-start");
  }

  if (arrowPosition === POSITIONS.RIGHT || arrowPosition === POSITIONS.BOTTOM) {
    placement = "".concat(placement, "-end");
  }

  return placement;
}
//# sourceMappingURL=utils.js.map