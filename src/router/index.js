import Vue from "vue";
import VueRouter from "vue-router";
import findLast from "lodash/findLast";
import { notification } from "ant-design-vue";
import NotFind from "../views/404.vue";
import ForBidden from "../views/403.vue";
import Nprogress from "nprogress";
import { check, isLogin } from "../utils/auth";
import "nprogress/nprogress.css";
Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    hideInMenu: true,
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/UserLayout.vue"),
    children: [
      {
        path: "/user",
        redirect: "/user/login"
      },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Login.vue")
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(
            /* webpackChunkName: "register" */ "../views/User/Register.vue"
          )
      }
    ]
  },
  {
    path: "/",
    meta: { authority: ["user", "admin"] },
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/BasicLayout"),
    children: [
      {
        path: "/",
        redirect: "/dashboard/analysis"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { icon: "dashboard", title: "仪表盘" },
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: { title: "分析页" },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/Analysis"
              )
          }
        ]
      },
      {
        path: "/form",
        name: "form",
        component: { render: h => h("router-view") },
        meta: { icon: "form", title: "表单", authority: ["user"] },
        children: [
          {
            path: "/form/basic-form",
            name: "basicform",
            meta: { title: "基础表单" },
            component: () =>
              import(/* webpackChunkName: "form" */ "../views/Forms/BasicForm")
          },
          {
            path: "/form/step-form",
            name: "stepform",
            meta: { title: "分布表单" },
            hideChildrenInMenu: true,
            component: () =>
              import(/* webpackChunkName: "form" */ "../views/Forms/StepForm"),
            children: [
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info"
              },
              {
                path: "/form/step-form/info",
                name: "info",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step1.vue"
                  )
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step2.vue"
                  )
              },
              {
                path: "/form/step-form/result",
                name: "result",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step3.vue"
                  )
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: "/403",
    name: "403",
    hideInMenu: true,
    component: ForBidden
  },
  {
    path: "*",
    name: "404",
    hideInMenu: true,
    component: NotFind
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

//路由首位
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    Nprogress.start();
  }
  //alert(to.matched);
  const record = findLast(to.matched, record => record.meta.authority);
  //没有权限时
  if (record && !check(record.meta.authority)) {
    //未登录时跳转到登录页面
    if (!isLogin() && to.path !== "/user/login") {
      next({
        path: "/user/login"
      });
    }
    //已经登录了，跳转到403页面
    else if (to.path !== "/403") {
      notification["error"]({
        message: "403",
        description: "您没有权限访问，请联系管理员"
      });
      next({
        path: "/403"
      });
    }
    //暂停
    Nprogress.done();
  }
  next();
});
router.afterEach(() => {
  Nprogress.done();
});

export default router;
