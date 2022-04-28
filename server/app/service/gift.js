'use strict';
const BaseService = require('./base');

class GiftService extends BaseService {
  async list() {
    return this.run(async ctx => {
      const result = await ctx.model.Gift.findAll({});

      return result;
    });
  }

  async change(giftId) {
    return this.run(async ctx => {
      const result = await ctx.model.Gift.update({ dis: true }, {
        where: {
          id: giftId,
        },
      });
      return result;
    });
  }
}

module.exports = GiftService;
