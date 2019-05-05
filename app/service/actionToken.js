'use strict';

const Service = require('egg').Service;
class ActionToken extends Service {
  async apply(id) {
    const { ctx, logger } = this;
    logger.info('user id: ' + id);
    return ctx.app.jwt.sign({
      data: {
        _id: id,
      },
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7),
    }, ctx.app.config.jwt.secret);
  }
}

module.exports = ActionToken;
