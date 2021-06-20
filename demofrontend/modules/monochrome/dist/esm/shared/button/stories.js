import React from 'react';
import { boolean as _boolean, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';
import README from './README.md';
import Button from './index';
var typeOptions = {
  Normal: Button.NORMAL,
  Primary: Button.PRIMARY,
  Waring: Button.WARNING,
  Muted: Button.MUTED
};
storiesOf('Building Blocks', module).addDecorator(withReadme(README)).add('Button', function () {
  return React.createElement(Button, {
    type: select('Type', typeOptions),
    isEnabled: _boolean('isEnabled', true)
  }, "Click me!");
});
//# sourceMappingURL=stories.js.map