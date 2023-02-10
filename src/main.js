import Vue from "vue";
import App from "./App";
import store from "./store";
import router from "./router";
import "./plugins";

import VueHorizontalTimeline from "vue-horizontal-timeline";
Vue.use(VueHorizontalTimeline);

/**
 * @copyright liaojianxiang 1298508511@qq.com
 * @description 生产环境默认都使用mock，如果正式用于生产环境时，记得去掉
 */

if (process.env.NODE_ENV === "production") {
  const { mockXHR } = require("@/config/static");
  mockXHR();
}

Vue.config.productionTip = false;

new Vue({
  el: "#vue-admin-beautiful",
  router,
  store,
  render: (h) => h(App),
});
