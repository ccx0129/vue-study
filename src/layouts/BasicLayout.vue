<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layOut-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        :theme="navTheme"
        :trigger="null"
        v-model="collapsed"
        collapsible
        v-if="navLayout === 'left'"
        width="256px"
      >
        <div class="logo">Ant design vue pro</div>
        <SiderMenu :theme="navTheme" />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            class="triger"
            @click="collapsed = !collapsed"
          ></a-icon>
          <Header />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view />
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <SettingDrawer />
  </div>
</template>

<script>
import Header from "./Header";
import SiderMenu from "./SiderMenu";
import SettingDrawer from "../components/SettingDrawer";
import Footer from "./Footer";
export default {
  data() {
    return {
      collapsed: false
    };
  },
  name: "UserLayout.vue",
  components: { Header, SiderMenu, Footer, SettingDrawer },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    }
  }
};
</script>

<style scoped>
.triger {
  padding: 0 20px;
  line-height: 64px;
  font-size: 20px;
}
.triger:hover {
  background: #eeeeee;
}
.logo {
  height: 64px;
  line-height: 64px;
  text-align: center;
  overflow: hidden;
}
.nav-theme-dark >>> .logo {
  color: #ffffff;
}
</style>
