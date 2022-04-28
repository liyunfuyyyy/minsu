'use strict';
const BaseService = require('./base');

class HouseService extends BaseService {
  commonAttr(app) {
    return {
      order: [
        [ 'showCount', 'DESC' ],
      ],
      attributes: {
        exclude: [ 'startTime', 'endTime', 'publishTime' ],
      },
      include: [
        {
          model: app.model.Imgs,
          limit: 1,
          attributes: [ 'url' ],
        },
      ],
    };
  }

  async hot() {
    return this.run(async (ctx, app) => {
      const result = await ctx.model.House.findAll({
        ...this.commonAttr(app),
        limit: 6,
      });

      return result;
    });
  }

  async delete(houseId) {
    return this.run(async ctx => {
      const result = await ctx.model.House.destroy({
        where: {
          id: houseId,
        },
      });
      return result;
    });
  }

  async mine(id) {
    return this.run(async (ctx, app) => {
      const result = await ctx.model.House.findAll({
        ...this.commonAttr(app),
        userId: id,
      });
      return result;
    });
  }

  // 添加民宿
  async add(params) {
    return this.run(async ctx => {
      // const result = await ctx.model.House.create(params);
      const { imgs, name, info, address, price, cityCode, startTime, endTime } = params;
      // 当前用户的userId
      const userId = ctx.userId;
      const publishTime = ctx.helper.time();
      const id = (new Date()).valueOf();
      // 添加民宿
      const result = await ctx.model.House.create({
        id,
        name,
        info, address,
        price: parseInt(price),
        cityCode,
        userId: parseInt(userId),
        publishTime,
        startTime,
        endTime,
      });
      console.log(imgs);
      // 添加图片
      for (const img of imgs) {
        const url = img.url;
        const houseId = id;
        const createTime = publishTime;
        console.log(url, createTime);
        await ctx.model.Imgs.create({
          url,
          houseId,
          createTime,
        });
      }
      return result;
    });
  }

  async search(params) {
    return this.run(async (ctx, app) => {
      const { lte, gte, like } = app.Sequelize.Op;
      const where = {
        cityCode: Array.isArray(params.code) ? params.code[0] : params.code,
        startTime: {
          [lte]: params.startTime,
        },
        endTime: {
          [gte]: params.endTime,
        },
        name: {
          [like]: '%' + params.houseName + '%',
        },
      };
      if (!params.houseName) {
        delete where.name;
      }
      const result = await ctx.model.House.findAll({
        ...this.commonAttr(app),
        limit: 8,
        offset: (params.pageNum - 1) * params.pageSize,
        where,
      });

      return result;
    });
  }

  async detail(id) {
    return this.run(async (ctx, app) => {
      const result = await ctx.model.House.findOne({
        where: {
          id,
        },
        include: [
          {
            model: app.model.Imgs,
            attributes: [ 'url' ],
          },
          {
            model: app.model.User,
            attributes: [ 'username', 'phone' ],
          },
        ],
      });

      await ctx.model.House.update({
        showCount: result.showCount + 1,
      }, {
        where: {
          id,
        },
      });
      return result;
    });
  }
}

module.exports = HouseService;
