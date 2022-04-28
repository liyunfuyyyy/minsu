'use strict';

const md5 = require('md5');
const BaseService = require('./base');

class UserService extends BaseService {
  // 获取用户信息
  async getUser(username, password) {
    return this.run(async () => {
      const { ctx, app } = this;
      const _where = password ? { username, password: md5(password + app.config.salt) } : { username };
      const result = await ctx.model.User.findOne({
        where: _where,
      });
      return result;
    });
  }

  // 添加用户
  async add(params) {
    return this.run(async () => {
      const { ctx } = this;
      const result = await ctx.model.User.create(params);
      return result;
    });
  }

  // 修改用户信息
  async edit(params) {
    return this.run(async ctx => {
      try {
        const result = await ctx.model.User.update(params, {
          where: {
            username: ctx.username,
          },
        });
        return result;
      } catch (error) {
        console.log('edit', error);
        return null;
      }
    });
  }

  // 删除用户
  async del(username) {
    return this.run(async ctx => {
      try {
        const result = await ctx.model.User.del({
          where: {
            username,
          },
        });
        return result;
      } catch (error) {
        console.log('del', error);
        return null;
      }
    });
  }

}

module.exports = UserService;
