<template>
  <div class="tckz-container" :class="customClass">
    <div class="clickType">
      <label>选择类型</label>
      <el-select v-model="zblx" placeholder="请选择" size="mini" clearable>
        <el-option v-for="item in selectType"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>

  export default {
    props:{
      customClass:String
    },
    data() {
      return {
        zblx: "A", //周边类型
        selectType: [
          {label: '避难场所', value: 'A'},
          {label: '紧急转移路线', value: 'B'},
          {label: '企事业单位', value: 'C'},
          {label: '学校', value: 'D'},
          {label: '危险区域', value: 'E'},
        ],
      }
    },
    watch:{
      zblx(newVal){
        this.$emit("changeZblx",newVal)
      }
    },
    methods: {

    }
  }
</script>
<style scoped lang="scss">
  .tckz-container {
    position: absolute;
    top: 10px;
    height: 28px;
    z-index: 1;
    .clickType{
      width: 210px;
      height: 28px;
      margin-left: 15px;
      >label{
        display: inline-block;
        width: 52px;
        height: 28px;
        line-height: 28px;
        padding: 0 6px;
        background-color: #02A7F0;
        color: #fff;
        font-size: 13px;
      }
    }
  }
</style>
<style>
  .tckz-container .clickType .el-select{
    width: calc(100% - 72px);
  }
</style>
