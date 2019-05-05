'use strict';
const Controller = require('egg').Controller;
class UserController extends Controller {

  constructor(props) {
    super(props);
    this.createRule = {
      realName: { type: 'string' },
      password: { type: 'string' },
      mobile: { type: 'string' },
    };

    this.findByMobileRule = {
      mobile: { type: 'string' },
    };
  }

  async create() {
    const { ctx } = this;
    ctx.validate(this.createRule);
    const userinfo = ctx.request.body || {};
    const res = await ctx.service.user.create(userinfo);
    ctx.helper.success({ ctx, res });
  }

  // post mobile
  async findByMobile() {
    const { ctx, logger } = this;
    ctx.validate(this.findByMobileRule);
    const { mobile } = ctx.request.body || {};
    logger.info('find by mobile' + ctx.request.body);
    const res = await ctx.service.user.getUserByMobile(mobile);
    ctx.helper.success({ ctx, res });
  }

  // get id
  async findById() {
    const { ctx } = this;
    const { id } = ctx.params;
    const res = await ctx.service.user.getUserById(id);
    ctx.helper.success({ ctx, res });
  }
}

module.exports = UserController;
