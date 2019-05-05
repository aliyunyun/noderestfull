'use strict';
const Service = require('egg').Service;
class UserAccessService extends Service {


  async login(payload) {
    const { ctx, service, logger } = this;
    const { mobile, password } = payload;

    const user = await service.user.getUserByMobile(mobile);
    if (!user) {
      ctx.throw(404, 'user is not found');
    }

    if (user.password !== password) {
      ctx.throw(404, 'password is error');
    }

    const token = await service.actionToken.apply(user._id);
    logger.info('token ' + token);
    return { token };
  }

  async current() {
    const { ctx, service, logger } = this;
    const _id = ctx.state.user.data._id;
    logger.info('current id:' + _id);
    const user = await service.user.getUserById(_id);
    if (!user) {
      ctx.throw(404, 'user is not found');
    }
    user.password = '';
    return user;
  }

  async resetpwd(payload) {
    const { ctx, service, logger } = this;
    const _id = ctx.state.user.data._id;
    logger.info('current id:' + _id);
    const user = await service.user.getUserById(_id);
    if (!user) {
      ctx.throw(404, 'user is not found');
    }
    user.password = payload.password;

    return await service.user.updatePassword(_id, user);
  }
}

module.exports = UserAccessService;
