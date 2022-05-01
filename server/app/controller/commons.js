'use strict';
const BaseController = require('./base');

class CommonsController extends BaseController {
  async citys() {
    const { ctx, app } = this;
    try {
      // const result = await app.httpclient.request('https://apis.imooc.com/?icode=B2060B086C0D78F9', {
      //   dataType: 'json'
      // });
      const result = {
        status: 200,
        data: {
          citys: [[
            { label: '北京', value: '10001' },
            { label: '成都', value: '10002' },
            { label: '重庆', value: '10003' },
            { label: '广州', value: '10004' },
            { label: '杭州', value: '10005' },
            { label: '南京', value: '10006' },
            { label: '上海', value: '10007' },
            { label: '深圳', value: '10008' },
            { label: '天津', value: '10009' },
            { label: '武汉', value: '10010' },
            { label: '西安', value: '10011' },

          ]],
        },
      };
      // console.log(result)
      if (result.status === 200) {
        console.log(result.data.citys);
        this.success(result.data.citys);
      } else {
        this.error('获取城市数据失败');
      }
    } catch (error) {
      this.error('获取城市数据失败');
    }
  }
}

module.exports = CommonsController;
