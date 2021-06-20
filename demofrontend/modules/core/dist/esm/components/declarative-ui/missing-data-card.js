import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import { evaluateStyle, Tooltip, withTheme } from '@streetscape.gl/monochrome';
import styled from '@emotion/styled';
var Container = styled.div(function (props) {
  return _objectSpread(_objectSpread({}, props.theme.__reset__), {}, {
    color: props.theme.warning400,
    padding: props.theme.spacingNormal,
    overflow: 'hidden'
  }, evaluateStyle(props.userStyle, props));
});

var MissingDataCardBase = function MissingDataCardBase(props) {
  var missingData = props.missingData,
      theme = props.theme,
      style = props.style;
  var missingDataAsString = missingData.join(', ');
  return React.createElement(Container, {
    theme: theme,
    userStyle: style.missingData
  }, React.createElement(Tooltip, {
    style: props.style.tooltip,
    content: missingDataAsString
  }, "Missing Data: ", missingDataAsString));
};

export var MissingDataCard = withTheme(MissingDataCardBase);
//# sourceMappingURL=missing-data-card.js.map