'use strict';

const Controller = require('egg').Controller;
class RoleController extends Controller {
  constructor(props) {
    super(props);
    this.createRule = {
      name: { type: 'string', required: true },
      password: { type: 'string', required: true },
    };
  }
  async create() {
    const ctx = this.ctx;
    console.log('is a : ' + JSON.stringify(this.ctx.request.body));
    ctx.validate(this.createRule);

    const result = await ctx.service.role.create(ctx.request.body);
    ctx.helper.success(result);
  }
}

module.exports = RoleController;
