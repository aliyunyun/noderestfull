'use strict';
const moment = require('moment');

// 格式化事件
exports.formateTime = time => moment(time).format('YYYY-MM-DD HH:mm:ss');

// 处理成功响应
exports.success = ({ ctx, res = null, msg = '请求成功' }) => {
  ctx.body = {
    code: 0,
    data: res,
    msg,
  };
  ctx.status = 200;
};
