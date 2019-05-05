'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/signin', controller.home.sign);
  // router.post('/api/role', controller.role.create);
  // router.get('/api/role', controller.role.index);

  router.resources('role', '/api/role', controller.role);


  router.post('/api/user', controller.user.create);
  router.post('/api/user/detail', controller.user.findByMobile);
  router.get('/api/user/:id', controller.user.findById);

  router.post('/api/user/access/login', controller.userAccess.login);
  router.post('/api/user/access/current', app.jwt, controller.userAccess.current);
  router.post('/api/user/access/resetpwd', app.jwt, controller.userAccess.resetpwd);

  const localStrategy = app.passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin',
  });
  router.post('/api/sign', localStrategy);
};
