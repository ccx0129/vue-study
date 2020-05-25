import Vue from "vue";
import Vuex from "vuex";
import formModule from "./modules/formModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { formModule }
});
