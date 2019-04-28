'use strict';

const Service = require('egg').Service;

class RoleService extends Service {
  async create(payload) {
    const { ctx } = this;

    const role = new ctx.model.Role(payload);

    return role.save();

  }
}

module.exports = RoleService;
