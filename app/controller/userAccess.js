'use strict';

const Controller = require('egg').Controller;
class UserAccessController extends Controller {
  constructor(props) {
    super(props);
    this.loginRule = {
      mobile: { type: 'string' },
      password: { type: 'string' },
    };
  }

  // post mobile password
  async login() {
    const { ctx, service } = this;
    ctx.validate(this.loginRule);
    const payload = ctx.request.body || {};
    const res = await service.userAccess.login(payload);
    ctx.helper.success({ ctx, res });
  }

  async current() {
    const { ctx, service } = this;
    const res = await service.userAccess.current();

    ctx.helper.success({ ctx, res });
  }

  async resetpwd() {
    const { ctx, service } = this;
    ctx.validate(this.loginRule);
    const payload = ctx.request.body;
    const res = await service.userAccess.resetpwd(payload);
    ctx.helper.success({ ctx, res });
  }
}

module.exports = UserAccessController;
