'use strict';
const Service = require('egg').Service;
class UserService extends Service {
  async create(payload) {
    const { ctx, service } = this;
    const role = await service.role.show(payload.role);
    if (!role) {
      ctx.throw(404, 'role is not found');
    }
    return this.ctx.model.User.create(payload);
  }

  async getUserByMobile(mobile) {
    const { logger } = this;
    logger.info('get mobile ' + mobile);
    return this.ctx.model.User.findOne({ mobile }).populate(
      {
        path: 'role',
        seslect: '_id access name',
        model: 'Role',
      }
    ).exec();
  }

  async getUserById(id) {
    const { logger } = this;
    logger.info('get id ' + id);
    return this.ctx.model.User.findById(id).populate(
      {
        path: 'role',
        seslect: '_id access name',
        model: 'Role',
      }
    ).exec();
  }

  async updatePassword(id, payload) {
    const user = await this.ctx.model.User.findById(id);
    if (!user) {
      this.ctx.throw(404, 'role not found');
    }
    return this.ctx.model.User.findByIdAndUpdate(id, payload);
  }
}

module.exports = UserService;
