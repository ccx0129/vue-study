<template>
  <div ref="charDom"></div>
</template>

<script>
import echarts from "echarts";
import debounce from "lodash/debounce";
import { addListener, removeListener } from "resize-detector";
export default {
  name: "Chart",
  props: {
    option: {
      type: Object,
      default: () => {}
    }
  },
  //添加监听，当option变化时
  watch: {
    //方式一：非深度监听，如果option里面的值变化了是没办法直接监听到的，采用定时器解决
    option(val) {
      this.chart.setOption(val);
    }

    //方式二：深度监听，如果option里面的值变化了也可以监听到,缺点：非常耗性能，数据非常多时不适合
    // option:{
    //     handler(val)
    //     {
    //         this.chart.setOption(val);
    //     },
    //     deep:true
    // }
  },
  created() {
    //防抖处理，提高性能
    this.resize = debounce(this.resize, 300);
  },
  mounted() {
    this.renderChart();
    addListener(this.$refs.charDom, this.resize);
  },
  beforeDestroy() {
    //移除监听
    removeListener(this.$refs.charDom, this.resize);
    //第三方库也销毁掉，防止内存泄露
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    resize() {
      //不使用防抖时，会打印多次，消耗性能
      //console.log("123321456654")
      this.chart.resize();
    },
    renderChart() {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(this.$refs.charDom);
      this.chart.setOption(this.option);
    }
  }
};
</script>

<style scoped></style>
