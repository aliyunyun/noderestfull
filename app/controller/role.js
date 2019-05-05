'use strict';

const Controller = require('egg').Controller;
class RoleController extends Controller {
  constructor(props) {
    super(props);
    this.createRule = {
      name: { type: 'string', required: true },
      access: { type: 'string', require: true },
    };
  }
  async create() {
    const ctx = this.ctx;
    console.log('is a : ' + JSON.stringify(this.ctx.request.body));
    // 校验参数
    ctx.validate(this.createRule);
    // 获取参数
    const payload = ctx.request.body || {};
    // 存储数据库
    const res = await ctx.service.role.create(payload);
    // 返回结果
    ctx.helper.success({ ctx, res });
  }

  // 根据id修改个人信息  put ctx.params.id
  async update() {
    const { ctx } = this;
    // 校验参数
    ctx.validate(this.createRule);
    const { id } = ctx.params;
    const payload = ctx.request.body || {};
    await ctx.service.role.update(id, payload);
    ctx.helper.success({ ctx });
  }

  // 根据id删除个人信息  delete put ctx.params.id
  async destroy() {
    const { ctx } = this;
    const id = ctx.params.id;
    const res = await ctx.service.role.destory(id);
    ctx.helper.success({ ctx, res });
  }

  // 根据id查询个人信息  get put ctx.params.id
  // /api/role/:id
  async show() {
    const { ctx } = this;
    const id = ctx.params.id;
    const res = await ctx.service.role.find(id);
    ctx.helper.success({ ctx, res });
  }

  // 列表查询 get
  async index() {
    const { ctx, service } = this;
    const payload = ctx.query;
    const res = await service.role.index(payload);
    ctx.helper.success({ ctx, res });
  }

  // remove id
  async removes() {
    const { ctx, service } = this;
    const payload = ctx.body || {};
    const ids = payload.splite(',') || [];
    const res = await service.role.removes(ids);
    ctx.helper.success({ ctx, res });
  }
}

module.exports = RoleController;
