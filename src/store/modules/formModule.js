import router from "../../router";
import request from "../../utils/request";

const state = {
  step: {
    payAccount: "123456",
    receiverAccount: {
      type: "alipay",
      number: ""
    }
  }
};

const actions = {
  //async 函数返回的 Promise 对象，必须等到内部所有的 await 命令的 Promise 对象执行完，才会发生状态改变
  // 也就是说，只有当 async 函数内部的异步操作都执行完，才会执行 then 方法的回调
  async submitStepForm({ commit }, { payload }) {
    //当请求失败时，request封装的catch会捕获异常，出现异常就不会继续执行下面的commit代码了
    await request({
      url: "/api/form/submit",
      method: "POST",
      data: payload
    });
    commit("saveStepFormData", { payload });
    router.push("/form/step-form/result");
  }

  // submitStepForm({commit},{payload}){
  //     commit('saveStepFormData',{payload});
  //     router.push("/form/step-form/result")
  // }
};

const mutations = {
  saveStepFormData(state, { payload }) {
    state.step = {
      ...payload
    };
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
