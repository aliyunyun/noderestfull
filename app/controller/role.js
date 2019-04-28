'use strict';

const Controller = require('egg').Controller;
class RoleController extends Controller {
  constructor(props) {
    super(props);
    this.createRule = {
      name: { type: 'string', required: true },
    };
  }
  async create() {
    const ctx = this.ctx;
    console.log('is a : ' + JSON.stringify(this.ctx.request.body));
    //校验参数
    ctx.validate(this.createRule);
    //获取参数
    const payload = ctx.request.body || {};
    //存储数据库
    const result = await ctx.service.role.create(payload);
    //返回结果
    ctx.helper.success({ctx, result});
  }
}

module.exports = RoleController;
