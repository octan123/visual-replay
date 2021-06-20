import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import README from './README.md';
import { Popover, Tooltip } from './index';
storiesOf('Building Blocks', module).addDecorator(withReadme(README)).add('Popover', () => React.createElement(Popover, {
  content: () => React.createElement("div", {
    style: {
      padding: '10px'
    }
  }, React.createElement("div", null, React.createElement("button", null, "One fish")), React.createElement("div", {
    style: {
      marginTop: '5px'
    }
  }, React.createElement("button", null, "Two fish")), React.createElement("div", {
    style: {
      marginTop: '5px'
    }
  }, React.createElement("button", null, "Red fish")), React.createElement("div", {
    style: {
      marginTop: '5px'
    }
  }, React.createElement("button", null, "Blue fish")))
}, React.createElement("button", null, "Click for popover"))).add('Tooltip', () => React.createElement("div", {
  style: {
    fontFamily: 'Helvetica, sans-serif',
    margin: 100,
    fontSize: 13
  }
}, React.createElement("p", null, React.createElement(Tooltip, {
  position: Popover.RIGHT,
  content: "Tooltip"
}, "Right")), React.createElement("p", null, React.createElement(Tooltip, {
  position: Popover.BOTTOM,
  content: "Tooltip"
}, "Bottom")), React.createElement("p", null, React.createElement(Tooltip, {
  position: Popover.LEFT,
  content: "Tooltip"
}, "Left")), React.createElement("p", null, React.createElement(Tooltip, {
  position: Popover.TOP,
  content: "Tooltip"
}, "Top")), React.createElement("p", null, React.createElement(Tooltip, {
  position: Popover.RIGHT,
  arrowPosition: Popover.BOTTOM,
  content: () => React.createElement("span", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tincidunt et enim vel pellentesque. Aliquam nisl est, dapibus et leo sit amet, venenatis placerat sem.")
}, React.createElement("span", null, "Custom positioning")))));
//# sourceMappingURL=stories.js.map