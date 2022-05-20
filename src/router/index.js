import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    redirect: '/trace',
  }, {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/trace',
        name: 'trace',
        meta: {
          title: '开始溯源',
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/Trace.vue'),
      },
      {
        path: '/traceby/:code',
        name: 'traceby',
        meta: {
          title: '开始溯源',
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/Trace.vue'),
      },
      {
        path: 'accountOperate',
        name: 'accountOperate',
        meta: {
          title: '账户操作',
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/AccountOperate.vue'),
      },
      {
        path: '/globalTrace',
        name: 'globalTrace',
        meta: {
          title: '全局查询溯源',
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/GlobalTrace.vue'),
      }, {
        path: '/globalComplain',
        name: 'globalComplain',
        meta: {
          title: '全局查询投诉',
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/GlobalComplain.vue'),
      }, {
        path: '/globalHandleComplain',
        name: 'globalHandleComplain',
        meta: {
          title: '全局查询投诉处理',
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/GlobalHandleComplain.vue'),
      }, {
        path: '/globalSanction',
        name: 'globalSanction',
        meta: {
          title: '全局查询生产单位封禁',
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/GlobalSanction.vue'),
      },
      {
        path: '/unitInfo',
        name: 'unitInfo',
        meta: {
          title: '全局查询生产单位信息',
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/UnitInfo.vue'),
      }, {
        path: '/globalUnitRegister',
        name: 'globalUnitRegister',
        meta: {
          title: '全局查询用户注册',
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/GlobalUnitRegister.vue'),
      }, {
        path: '/score',
        name: 'score',
        meta: {
          title: '评分',
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/Score.vue'),
      }, {
        path: '/complain',
        name: 'complain',
        meta: {
          title: '投诉',
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/Complain.vue'),
      }, {
        path: '/handleComplain',
        name: 'handleComplain',
        meta: {
          title: '处理投诉',
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/HandleComplain.vue'),
      }, {
        path: '/confirm',
        name: 'confirm',
        meta: {
          title: '更新溯源信息',
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/Confirm.vue'),
      }, {
        path: '/generate',
        name: 'generate',
        meta: {
          title: '生成溯源码',
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/GenerateCode.vue'),
      }, {
        path: '/dashboard',
        name: 'dashboard',
        meta: {
          title: '系统首页',
        },
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
      }, {
        path: '/tabs',
        name: 'tabs',
        meta: {
          title: 'tab标签',
        },
        component: () => import(/* webpackChunkName: "tabs" */ '../views/Tabs.vue'),
      }, {
        path: '/permission',
        name: 'permission',
        meta: {
          title: '权限管理',
          permission: true,
        },
        component: () => import(/* webpackChunkName: "permission" */ '../views/Permission.vue'),
      }, {
        path: '/unitRegister',
        name: 'unitRegister',
        meta: {
          title: '生产单位注册',
          permission: true,
        },
        component: () => import(/* webpackChunkName: "permission" */ '../views/UnitRegister.vue'),
      }, {
        path: '/i18n',
        name: 'i18n',
        meta: {
          title: '国际化语言',
        },
        component: () => import(/* webpackChunkName: "i18n" */ '../views/I18n.vue'),
      }, {
        path: '/icon',
        name: 'icon',
        meta: {
          title: '自定义图标',
        },
        component: () => import(/* webpackChunkName: "icon" */ '../views/Icon.vue'),
      }, {
        path: '/404',
        name: '404',
        meta: {
          title: '找不到页面',
        },
        component: () => import(/* webpackChunkName: "404" */ '../views/404.vue'),
      }, {
        path: '/403',
        name: '403',
        meta: {
          title: '没有权限',
        },
        component: () => import(/* webpackChunkName: "403" */ '../views/403.vue'),
      },
    ],
  },
];

// const router = createRouter({
//   history: createWebHashHistory(),
//   routes,
// });

// router.beforeEach((to, from, next) => {
//   document.title = `${to.meta.title} | vue-manage-system`;
//   const role = localStorage.getItem('ms_username');
//   if (!role && to.path !== '/login') {
//     next('/login');
//   } else if (to.meta.permission) {
//     // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
//     if (role === 'admin') {
//       next();
//     } else {
//       next('/403');
//     }
//   } else {
//     next();
//   }
// });

export default router;
