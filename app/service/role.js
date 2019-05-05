'use strict';

const Service = require('egg').Service;

class RoleService extends Service {
  async create(payload) {
    const { ctx } = this;
    return ctx.model.Role.create(payload);

  }

  async index(payload) {
    const { currentPage, pageSize, isPaging, search } = payload;
    let res = [];
    let count = 0;

    console.log('query: ' + JSON.stringify(payload));
    const skip = ((Number(currentPage)) - 1) * Number(pageSize || 10);
    // 是否分页
    if (isPaging === 'true') {
      if (search) {
        res = await this.ctx.model.Role.find({ name: { $regex: search } }).skip(skip).limit(Number(pageSize))
          .sort({ createdAt: -1 })
          .exec();
        count = res.length;
      } else {
        res = await this.ctx.model.Role.find({}).skit(skip).limit(Number(pageSize))
          .create({ createdAt: -1 })
          .exec();
        count = await this.ctx.model.Role.count({}).exec();
      }
    } else {
      // 是否条件搜索
      if (search) {
        res = await this.ctx.model.Role.find({ name: { $regex: search } }).sort({ createdAt: -1 })
          .exec();
        count = res.length;
      } else {
        res = await this.ctx.model.Role.find({}).sort({ createdAt: -1 }).exec();
        count = await this.ctx.model.Role.count({}).exec();
      }
    }

    console.log('user list:' + JSON.stringify(res));
    // 整理数据
    const data = res.map((e, i) => {
      console.log('map obj: ' + JSON.stringify(e));
      const jsonObject = Object.assign({}, e._doc);
      jsonObject.key = i;
      jsonObject.createdAt = this.ctx.helper.formateTime(e.createdAt);
      return jsonObject;
    });
    return {
      count,
      list: data,
      pageSize: Number(pageSize),
      currentPage: Number(currentPage),
    };
  }

  async destory(id) {
    return this.ctx.model.Role.deleteOne({ _id: id });
  }

  async show(id) {
    const role = await this.ctx.service.role.find(id);
    if (!role) {
      this.ctx.throw(404, 'role not found');
    }
    return role;
  }

  async update(id, payload) {
    const { ctx } = this;
    const role = await ctx.service.role.find(id);
    if (!role) {
      ctx.throw(404, 'role not found');
    }
    return ctx.model.Role.findByIdAndUpdate(id, payload);
  }

  async find(id) {
    return this.ctx.model.Role.findById(id);
  }

  async removes(ids) {
    this.ctx.model.Role.remove({ _id: { $in: ids } });
  }
}

module.exports = RoleService;
