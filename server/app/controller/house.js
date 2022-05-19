'use strict';
const BaseController = require('./base');

class HouseController extends BaseController {
  async hot() {
    const { ctx } = this;
    const result = await ctx.service.house.hot();
    console.log('#########', result);
    this.success(result);
  }

  async mine() {
    const { ctx } = this;
    const result = await ctx.service.house.mine(ctx.userId);
    this.success(result);
  }

  async delete() {
    const { ctx } = this;
    const result = await ctx.service.house.delete(ctx.params('id'));
    this.success(result);
  }

  async add() {
    const { ctx } = this;
    // console.info(ctx);
    const userId = ctx.userId;
    // console.log(ctx.userId);
    const result = await ctx.service.house.add({ ...ctx.params(), cityCode: ctx.params('cityCode')[0], userId });
    console.log('请求成功');
    this.success(result);
  }

  async search() {
    const { ctx } = this;
    const result = await ctx.service.house.search(ctx.params());
    this.success(result);
  }

  async detail() {
    const { ctx } = this;
    const result = await ctx.service.house.detail(ctx.params('id'));

    this.success({
      info: result,
      banner: result.imgs,
    });
  }
}

module.exports = HouseController;
