import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  mock: false,
  proxy: {
    '/api': {
      'target': 'http://127.0.0.1:7001/',
      'changeOrigin': true
    }
  },
  history: {
    type: 'hash'
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/',
          component: './home/index',
          title: '首页'
        },
        {
          path: '/gift',
          component: './gift/index',
          title: '优惠券'
        },
        {
          path: '/goods',
          component: './goods/index',
          title: '上架'
        },
        {
          path: '/order',
          component: './order/index',
          title: '订单',
          auth: true
        },
        {
          path: '/user',
          component: './user/index',
          title: '我的',
          auth: true
        },
        {
          path: '/user/mine',
          component: './user/mine',
          title: '我的上架',
        },
        {
          path: '/user/pro',
          component: './user/pro',
          title: '用户协议'
        },
        {
          path: '/user/ques',
          component: './user/ques',
          title: '常见问题'
        },
        {
          path: '/user/tel',
          component: './user/tel',
          title: '联系客服'
        },
        {
          path: '/user/abt',
          component: './user/abt',
          title: '关于'
        },
        {
          path: '/user/edit',
          component: './user/edit',
          title: '设置用户'
        },
        {
          path: '/search',
          component: './search/index',
          title: '搜索'
        },
        {
          path: '/observer',
          component: './observer',
          title: 'observer'
        },
        {
          path: '/house',
          component: './house',
          title: '房屋详情'
        },
        {
          path: '/login',
          component: './login',
          title: '登录'
        },
        {
          path: '/register',
          component: './register',
          title: '注册'
        },
      ]
    }
  ],
});
