'use strict';
const BaseController = require('./base');

class GiftController extends BaseController {
  async list() {
    const { ctx } = this;
    const result = await ctx.service.gift.list();
    this.success(result);
  }

  async change() {
    const { ctx } = this;
    // console.log(ctx.params('id'));
    const result = await ctx.service.gift.change(ctx.params('id'));
    this.success(result);

  }

  // async delete() {
  //   const { ctx } = this;
  //   const result = await ctx.service.house.delete(ctx.params('id'));
  //   this.success(result);
  // }

}

module.exports = GiftController;
