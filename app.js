'use strict';

module.exports = app => {

  const localHandler = async (ctx, { username, password }) => {
    const getUser = name => {
      return ctx.service.user.getUserByName(name);
    };

    const exitUser = await getUser(username);
    console.log('user  exit' + JSON.stringify(exitUser));
    // 用户不存在
    if (!exitUser) {
      console.log('user not exit');
      return null;
    }

    const passwordstr = exitUser.password;

    // 密码不相等
    if (passwordstr !== password) {
      return null;
    }

    return exitUser;
  };

  app.passport.verify(async (ctx, user) => {
    console.log('passprot verify user' + JSON.stringify(user));
    const handler = localHandler;
    const exitUser = await handler(ctx, user);
    console.log('exit user' + JSON.stringify(exitUser));
    if (exitUser) {
      const auth_token = exitUser._id + '$$$$'; // userId
      const opts = {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30,
        signed: true,
        httpOnly: true,
      };
      ctx.cookies.set(app.config.auth_cookie_name, auth_token, opts); // cookie 有效期30天
    }
    return exitUser;
  });
}
;
