'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, ws } = app;
  router.get('/', controller.home.index);
  router.get('/map', controller.home.map);
  ws.route('/ws', controller.home.socket);
};
