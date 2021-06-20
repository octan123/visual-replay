'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  websocket: {
    enable: true,
    package: 'egg-websocket-plugin'
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  }
};
