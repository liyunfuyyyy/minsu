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
    const result = await ctx.service.gift.change(ctx.params('id'));
    this.success(result);

  }
}

module.exports = GiftController;
