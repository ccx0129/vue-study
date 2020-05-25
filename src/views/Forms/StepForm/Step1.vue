<template>
  <div>
    <a-form layout="horizontal" :form="form">
      <a-form-item
        label="付款账户"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'payAccount',
            {
              initialValue: step.payAccount,
              rules: [{ required: true, message: '请输入付款账户' }]
            }
          ]"
          placeholder="请输入付款账户"
        ></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSubmit">
          下一步
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: "Step1",
  data() {
    //创建form实例
    this.form = this.$form.createForm(this);
    return {
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      }
    };
  },
  computed: {
    step() {
      return this.$store.state.formModule.step;
    }
  },
  methods: {
    handleSubmit() {
      //从this中取出form,$router,$store
      const { form, $router, $store } = this;
      form.validateFields((err, values) => {
        if (!err) {
          //第一步不需要提交异步数据，不调用action，这里提交mutations把表单数据存储到vuex的step字段中
          $store.commit({
            type: "formModule/saveStepFormData",
            payload: values
          });
          // $store.commit('form/saveStepFormData',{payload:values});
          //提交完成后，router跳转到第二步
          $router.push("/form/step-form/confirm");
        }
      });
    }
  }
};
</script>

<style scoped></style>
