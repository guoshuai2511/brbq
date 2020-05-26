<template>
  <div :id="id" :style="{'width': width, 'height': height}"></div>
</template>

<script>
  export default {
    name: "Chart",
    props: {
      option: Object,
      id:String,
      width: {type: String, default: "100%"},
      height: {type: String, default: "100%"},
    },
    mounted() {
      // this.drawLine(this.option);
    },
    methods: {
      drawLine(option) {
        let myChart =this.$echarts.init(document.getElementById(this.id),"light");
        // 绘制图表
        myChart.setOption(option,{notMerge:true});
      }
    }
  }
</script>

<style scoped>

</style>
