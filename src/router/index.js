/**
 * @copyright liaojianxiang 1298508511@qq.com
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到，vip文档中已提供路由的基础图标与小清新图标的配置方案，请仔细阅读
 */

import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/layouts";
import EmptyLayout from "@/layouts/EmptyLayout";
import { publicPath, routerMode } from "@/config/settings";

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/register",
    component: () => import("@/views/register/index"),
    hidden: true,
  },
  {
    path: "/401",
    name: "401",
    component: () => import("@/views/401"),
    hidden: true,
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404"),
    hidden: true,
  },
];

export const asyncRoutes = [
  //主页，初次进入弹出的页面
  {
    path: "/",
    component: Layout,
    redirect: "index",
    children: [
      {
        path: "index",
        name: "Index",
        component: () => import("@/views/index/newIndex"),
        meta: {
          title: "主页",
          icon: "home",
          affix: true,
        },
      },
    ],
  },
  {
    //个人中心
    path: "/personalCenter",
    component: Layout,
    hidden: true,
    redirect: "personalCenter",
    children: [
      {
        path: "personalCenter",
        name: "PersonalCenter",
        component: () => import("@/views/personalCenter/index"),
        meta: {
          title: "个人中心",
          icon: "user",
        },
      },
    ],
  },

  {
    //数据分布
    path: "/distribution",
    component: Layout,
    redirect: "noRedirect",
    name: "distribution",
    meta: { title: " 分布", permissions: ["admin"] },
    children: [
      {
        path: "index",
        name: "index",
        component: () => import("@/views/distribution/index"),
        meta: {
          title: "地震分布",
          permissions: ["admin"],
          icon: "map-marker-alt",
        },
      },
      {
        path: "map",
        component: () => import("@/views/distribution/map/index"),
        name: "Map",
        hidden: true,
        meta: {
          title: "地图标注",
          permissions: ["admin"],
        },
      },
      {
        path: "mapD",
        component: () => import("@/views/distribution/map/bmap"),
        name: "MapD",
        hidden: true,
        meta: {
          title: "页面测试",
          permissions: ["admin"],
        },
      },
      {
        path: "dizhi",
        component: () => import("@/views/distribution/dizhi"),
        name: "dizhi",
        hidden: true,
        meta: {
          title: "地址详情",
          permissions: ["admin"],
        },
      },
    ],
  },
  {
    path: "/data",
    component: Layout,
    redirect: "noRedirect",
    name: "data",
    alwaysShow: true,
    meta: { title: "地震数据", icon: "list", permissions: ["admin"] },
    children: [
      {
        path: "index",
        name: "index",
        component: () => import("@/views/data/index"),
        meta: {
          title: "地震事件",
          permissions: ["admin"],
        },
      },
      {
        path: "zuixin",
        name: "zuixin",
        component: () => import("@/views/data/zuixin"),
        meta: {
          title: "舆情信息",
          permissions: ["admin"],
        },
      },
      {
        path: "hot",
        name: "hot",
        component: () => import("@/views/data/hot"),
        meta: {
          title: "热门事件",
          permissions: ["admin"],
        },
      },
      {
        path: "xiangqing",
        name: "xiangqing",
        component: () => import("@/views/data/xiangqing"),
        meta: {
          title: "地震事件详情",
          permissions: ["admin"],
        },
      },
    ],
  },
  {
    //管理配置
    path: "/personnelManagement",
    component: Layout,
    redirect: "noRedirect",
    name: "PersonnelManagement",
    meta: { title: "管理", icon: "users-cog", permissions: ["admin"] },
    children: [
      {
        path: "userManagement",
        name: "UserManagement",
        component: () =>
          import("@/views/personnelManagement/userManagement/index"),
        meta: { title: "用户管理" },
      },
      {
        path: "roleManagement",
        name: "RoleManagement",
        component: () =>
          import("@/views/personnelManagement/roleManagement/index"),
        meta: { title: "角色管理" },
      },
      {
        path: "menuManagement",
        name: "MenuManagement",
        hidden: true,
        component: () =>
          import("@/views/personnelManagement/menuManagement/index"),
        meta: { title: "菜单管理", badge: "New" },
      },
    ],
  },
  {
    path: "/vab",
    component: Layout,
    redirect: "noRedirect",
    name: "Vab",
    hidden: true,
    meta: { title: "组件", icon: "box-open" },
    children: [
      {
        path:
          "https://github.com/chuzhixin/vue-admin-beautiful?utm_source=gold_browser_extension",
        name: "ExternalLink",
        meta: {
          title: "外链",
          target: "_blank",
          permissions: ["admin", "editor"],
          badge: "New",
        },
      },
      {
        path: "permissions",
        name: "Permission",
        component: () => import("@/views/vab/permissions/index"),
        meta: {
          title: "权限控制",
          permissions: ["admin", "editor"],
        },
      },
      {
        path: "icon",
        component: EmptyLayout,
        redirect: "noRedirect",
        name: "Icon",
        meta: {
          title: "图标",
          permissions: ["admin"],
        },
        children: [
          {
            path: "awesomeIcon",
            name: "AwesomeIcon",
            component: () => import("@/views/vab/icon/index"),
            meta: { title: "常规图标" },
          },
          {
            path: "remixIcon",
            name: "RemixIcon",
            component: () => import("@/views/vab/icon/remixIcon"),
            meta: { title: "小清新图标" },
          },
          {
            path: "colorfulIcon",
            name: "ColorfulIcon",
            component: () => import("@/views/vab/icon/colorfulIcon"),
            meta: { title: "多彩图标" },
          },
        ],
      },
      {
        path: "table",
        component: EmptyLayout,
        redirect: "noRedirect",
        name: "Table",
        meta: {
          title: "表格",
          permissions: ["admin"],
        },
        children: [
          {
            path: "comprehensiveTable",
            name: "ComprehensiveTable",
            component: () => import("@/views/vab/table/index"),
            meta: { title: "综合表格" },
          },
          {
            path: "inlineEditTable",
            name: "InlineEditTable",
            component: () => import("@/views/vab/table/inlineEditTable"),
            meta: { title: "行内编辑" },
          },
        ],
      },

      {
        path: "webSocket",
        name: "WebSocket",
        component: () => import("@/views/vab/webSocket/index"),
        meta: { title: "webSocket", permissions: ["admin"] },
      },
      {
        path: "form",
        name: "Form",
        component: () => import("@/views/vab/form/index"),
        meta: { title: "表单", permissions: ["admin"] },
      },
      {
        path: "element",
        name: "Element",
        component: () => import("@/views/vab/element/index"),
        meta: { title: "常用组件", permissions: ["admin"] },
      },
      {
        path: "tree",
        name: "Tree",
        component: () => import("@/views/vab/tree/index"),
        meta: { title: "树", permissions: ["admin"] },
      },
      {
        path: "card",
        name: "Card",
        component: () => import("@/views/vab/card/index"),
        meta: { title: "卡片", permissions: ["admin"] },
      },

      {
        path: "betterScroll",
        name: "BetterScroll",
        component: () => import("@/views/vab/betterScroll/index"),
        meta: {
          title: "滚动侦测",
          permissions: ["admin"],
        },
      },
      {
        path: "verify",
        name: "Verify",
        component: () => import("@/views/vab/verify/index"),
        meta: { title: "验证码", permissions: ["admin"] },
      },
      {
        path: "menu1",
        component: () => import("@/views/vab/nested/menu1/index"),
        name: "Menu1",
        alwaysShow: true,
        meta: {
          title: "嵌套路由 1",
          permissions: ["admin"],
        },
        children: [
          {
            path: "menu1-1",
            name: "Menu1-1",
            alwaysShow: true,
            meta: { title: "嵌套路由 1-1" },
            component: () => import("@/views/vab/nested/menu1/menu1-1/index"),

            children: [
              {
                path: "menu1-1-1",
                name: "Menu1-1-1",
                meta: { title: "嵌套路由 1-1-1" },
                component: () =>
                  import("@/views/vab/nested/menu1/menu1-1/menu1-1-1/index"),
              },
            ],
          },
        ],
      },
      {
        path: "magnifier",
        name: "Magnifier",
        component: () => import("@/views/vab/magnifier/index"),
        meta: { title: "放大镜", permissions: ["admin"] },
      },
      {
        path: "echarts",
        name: "Echarts",
        component: () => import("@/views/vab/echarts/index"),
        meta: { title: "图表", permissions: ["admin"] },
      },

      {
        path: "loading",
        name: "Loading",
        component: () => import("@/views/vab/loading/index"),
        meta: { title: "loading", permissions: ["admin"] },
      },
      {
        path: "player",
        name: "Player",
        component: () => import("@/views/vab/player/index"),
        meta: { title: "视频播放器", permissions: ["admin"] },
      },
      {
        path: "markdownEditor",
        name: "MarkdownEditor",
        component: () => import("@/views/vab/markdownEditor/index"),
        meta: { title: "markdown编辑器", permissions: ["admin"] },
      },
      {
        path: "editor",
        name: "Editor",
        component: () => import("@/views/vab/editor/index"),
        meta: {
          title: "富文本编辑器",
          permissions: ["admin"],
          badge: "New",
        },
      },
      {
        path: "qrCode",
        name: "QrCode",
        component: () => import("@/views/vab/qrCode/index"),
        meta: { title: "二维码", permissions: ["admin"] },
      },
      {
        path: "backToTop",
        name: "BackToTop",
        component: () => import("@/views/vab/backToTop/index"),
        meta: { title: "返回顶部", permissions: ["admin"] },
      },
      {
        path: "lodash",
        name: "Lodash",
        component: () => import("@/views/vab/lodash/index"),
        meta: { title: "lodash", permissions: ["admin"] },
      },
      {
        path: "imgComparison",
        name: "ImgComparison",
        component: () => import("@/views/vab/imgComparison/index"),
        meta: { title: "图像拖拽比对", permissions: ["admin"] },
      },
      {
        path: "codeGenerator",
        name: "CodeGenerator",
        component: () => import("@/views/vab/codeGenerator/index"),
        meta: { title: "代码生成机", permissions: ["admin"] },
      },
      {
        path: "markdown",
        name: "Markdown",
        component: () => import("@/views/vab/markdown/index"),
        meta: { title: "markdown阅读器", permissions: ["admin"] },
      },
      {
        path: "smallComponents",
        name: "SmallComponents",
        component: () => import("@/views/vab/smallComponents/index"),
        meta: { title: "小组件", permissions: ["admin"] },
      },

      {
        path: "upload",
        name: "Upload",
        component: () => import("@/views/vab/upload/index"),
        meta: { title: "上传", permissions: ["admin"] },
      },
      {
        path: "sticky",
        name: "Sticky",
        component: () => import("@/views/vab/sticky/index"),
        meta: { title: "sticky吸附", permissions: ["admin"] },
      },
      {
        path: "log",
        name: "Log",
        component: () => import("@/views/vab/errorLog/index"),
        meta: { title: "错误日志模拟", permissions: ["admin"] },
      },

      {
        path: "blacklist",
        name: "Blacklist",
        component: () => import("@/views/vab/blacklist/index"),
        meta: { title: "测试模块", permissions: ["admin"] },
      },
    ],
  },
  {
    //关于和使用说明文档：Documentation
    path: "/about",
    component: Layout,
    hidden: false,
    redirect: "about",
    children: [
      {
        path: "about",
        name: "about",
        component: () => import("@/views/about/index"),
        meta: {
          title: " 关于",
          icon: "bookmark",
          permissions: ["admin"],
        },
      },
    ],
  },
  {
    path: "/mall",
    component: Layout,
    redirect: "noRedirect",
    name: "Mall",
    hidden: true,
    meta: {
      title: "商城操作",
      icon: "shopping-cart",
      permissions: ["admin"],
    },

    children: [
      {
        path: "pay",
        name: "Pay",
        component: () => import("@/views/mall/pay/index"),
        meta: {
          title: "支付",
          noKeepAlive: true,
        },
        children: null,
      },
      {
        path: "goodsList",
        name: "GoodsList",
        component: () => import("@/views/mall/goodsList/index"),
        meta: {
          title: "商品列表",
        },
      },
      {
        path: "goodsDetail",
        name: "GoodsDetail",
        component: () => import("@/views/mall/goodsDetail/index"),
        meta: {
          title: "商品详情",
        },
      },
    ],
  },
  {
    path: "/error",
    component: EmptyLayout,
    redirect: "noRedirect",
    name: "Error",
    hidden: true,
    meta: { title: "错误页", icon: "bug" },
    children: [
      {
        path: "401",
        name: "Error401",
        component: () => import("@/views/401"),
        meta: { title: "401" },
      },
      {
        path: "404",
        name: "Error404",
        component: () => import("@/views/404"),
        meta: { title: "404" },
      },
    ],
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true,
  },
];

const router = new VueRouter({
  base: publicPath,
  mode: routerMode,
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRoutes,
});
//注释的地方是允许路由重复点击，如果你觉得框架路由跳转规范太过严格可选择放开
/* const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
}; */

export function resetRouter() {
  router.matcher = new VueRouter({
    base: publicPath,
    mode: routerMode,
    scrollBehavior: () => ({
      y: 0,
    }),
    routes: constantRoutes,
  }).matcher;
}

export default router;
