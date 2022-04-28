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
          citys: [[{ label: '杭州', value: '10001' }, { label: '苏州', value: '10002' }]],
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
