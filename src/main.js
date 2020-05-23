import Vue from "vue";
import {
  Button,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Form,
  Input
} from "ant-design-vue";
import Authorized from "./components/Authorized";
import Auth from "./directives/auth";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//import "ant-design-vue/dist/antd.less"
//import "ant-design-vue/lib/button/style"

Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(Form);
Vue.use(Input);
//注册指令
Vue.use(Auth);
//全局注册
Vue.component("Authorized", Authorized);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
