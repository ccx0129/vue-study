<template>
  <div>
    <Chart :option="charOption" style="height: 400px" />
  </div>
</template>

<script>
import Chart from "../../components/Chart";
// import random from 'lodash/random'
import request from "../../utils/request";
//import  axios from "axios";
export default {
  name: "Analysis.vue",
  components: {
    Chart
  },
  data() {
    return {
      charOption: {}
    };
  },
  mounted() {
    this.getChartsData();
    //定时3秒不停的改变series的data值
    // this.interval=setInterval(()=>{
    //   this.getChartsData();
    //   // this.charOption.series[0].data=this.charOption.series[0].data.map(()=>random(100));
    //   // //手动更新值(替代深度监听的方式)
    //   // this.charOption={...this.charOption};
    // },3000)
  },
  methods: {
    getChartsData() {
      request({
        //url: "/employee/basic/dashboard/chart",
        url: "/api/dashboard/chart",
        method: "get",
        params: { idVal: 123456 }
      }).then(response => {
        if (response) {
          this.charOption = {
            title: {
              text: "ECharts 入门示例"
            },
            tooltip: {},
            xAxis: {
              data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [
              {
                name: "销量",
                type: "bar",
                data: response.data.data
              }
            ]
          };
        }
      });
    }
  },
  beforeDestroy() {
    //记得销毁掉定时器
    clearInterval(this.interval);
  }
};
</script>

<style scoped></style>
