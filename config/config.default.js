/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1556374454969_9652';

  // add your middleware config here
  config.middleware = [];

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/test',
      options: {},
    },
  };

  config.security = {
    csrf: false,
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.passportLocal = {
    usernameField: 'name',
    passwordField: 'password',
  };

  config.auth_cookie_name = 'yy_token';


  config.jwt = {
    secret: 'aliyunyun',
    enable: true, // default is false
    match: '/jwt', // optional
  };

  return {
    ...config,
    ...userConfig,
  };
};

