<template>
  <div class="searchBox">
    <div class="searchBox-keyWord">
      <input placeholder="请输入查询关键字" v-model="keywords" >
      <i class="el-icon-search" @click="initData"></i>
    </div>
    <i class="el-icon-s-operation"
       :class="{btnStyle: btnStatus}"
       @click="btnStatus = !btnStatus"></i>
    <div class="searchBox-other" v-show="btnStatus">
      <div class="searchBox-other-header">
        <span :class="{select: tabSelect === 'xzqh'}" @click="tabSelect = 'xzqh'">行政区划</span>
        <span :class="{select: tabSelect === 'zhlx'}" @click="tabSelect = 'zhlx'">灾害类型</span>
        <span :class="{select: tabSelect === 'gmdj'}" @click="tabSelect = 'gmdj'">规模等级</span>
        <span :class="{select: tabSelect === 'xqdj'}" @click="tabSelect = 'xqdj'">险情等级</span>
      </div>
      <div class="searchBox-other-content">
        <template v-for="(item,index) in ceshiData[tabSelect]">
          <span :class="{select: chosenIndex[tabSelect] == index}" :key="index" @click="getChosen(item.val,index)">{{item.mc}}</span>
        </template>
      </div>
      <div class="searchBox-other-bottom">
        <button @click="initData">确 定</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "mapSearchTool",
    props: {
      keywordsf: String,
      xzqhf: String,
      zhlxf: String,
      gmdjf: String,
      xqdjf: String,
    },
    watch:{
      keywords(val){
        this.$emit("change","keywords",val)
      }
    },
    data() {
      return {
        keywords: this.keywordsf,
        xzqh: this.xzqhf,
        zhlx: this.zhlxf,
        gmdj: this.gmdjf,
        xqdj: this.xqdjf,
        btnStatus: false,
        tabSelect: "xzqh",
        ceshiData: {
          xzqh: [
            {mc: "全部", val: "1405"}, {mc: "市辖区", val: "140501"}, {mc: "城区", val: "140502"}, {
              mc: "沁水县",
              val: "140521"
            }, {mc: "阳城县", val: "140522"},
            {mc: "陵川县", val: "140524"}, {mc: "泽州县", val: "140525"}, {mc: "高平市", val: "140581"}
          ],
          zhlx: [
            {mc: "全部", val: ""}, {mc: "不稳定斜坡", val: "00"}, {mc: "崩塌", val: "02"}, {mc: "滑坡", val: "01"}, {
              mc: "泥石流",
              val: "03"
            }, {mc: "面塌陷", val: "04"},
            {mc: "地裂缝", val: "06"}, {mc: "地面沉降", val: "07"}, {mc: "其他", val: "10"},
          ],
          //A：巨型，B：大型，C：小型，D：中型，E：特大型
          gmdj: [
            {mc: "全部", val: ""}, {mc: "特大型", val: "D"}, {mc: "巨型", val: "A"}, {mc: "大型", val: "C"}, {
              mc: "中型", val: "B"}, {mc: "小型", val: "A"},{mc: "未知", val: "E"},
          ],
          //A：特大型，B：大型，C：中型，D：小型
          xqdj: [
            {mc: "全部", val: ""}, {mc: "特大型", val: "D"}, {mc: "巨型", val: "A"}, {mc: "大型", val: "C"}, {
              mc: "中型", val: "B"}, {mc: "小型", val: "A"},{mc: "未知", val: "E"},
          ],
        },
        chosenIndex: {xzqh: 0, zhlx: 0, gmdj: 0, xqdj: 0}
      }
    },
    methods: {
      getChosen(val, index) {
        this.chosenIndex[this.tabSelect] = index;
        this.$emit("change",this.tabSelect,val);
      },
      initData(){
        this.$emit("initData")
      }
    }
  }
</script>

<style scoped lang="scss">
  .searchBox {
    position: absolute;
    width: 300px;
    background: rgba(255, 255, 255, 0.8);
    z-index: 1;
    margin: 8px 0 0 8px;
    border-radius: 3px;
    .searchBox-keyWord {
      float: left;
      height: 28px;
      width: calc(100% - 56px);
      margin: 4px;
      > input {
        height: 26px;
        padding-left: 10px;
        width: calc(100% - 40px);
        border: 1px solid #498DF0;
        border-radius: 3px 0 0 3px;
        background: rgba(255, 255, 255, 0.4);
      }
      input:focus {
        outline: none;
      }
      > i {
        display: inline-block;
        float: right;
        height: 28px;
        line-height: 28px;
        width: 28px;
        background: #498DF0;
        text-align: center;
        color: #fff;
        font-size: 16px;
        border-radius: 0 3px 3px 0;
        cursor: pointer;
      }
    }
    > i {
      display: inline-block;
      float: right;
      height: 28px;
      line-height: 28px;
      width: 28px;
      font-size: 24px;
      text-align: center;
      margin: 4px 10px;
      cursor: pointer;
      color: #606266;
      border-radius: 3px;
    }
    .btnStyle {
      color: #498DF0;
    }
    .searchBox-other {
      height: 200px;
      width: 100%;
      margin-top: 46px;
      .searchBox-other-header {
        height: 26px;
        width: 100%;
        border-Bottom: 1px solid #498DF0;
        > span {
          display: inline-block;
          float: left;
          width: calc(25% - 1px);
          height: 25px;
          line-height: 25px;
          font-size: 12px;
          text-align: center;
          color: #606266;
          border: 1px solid #498DF0;
          border-left: none;
          border-bottom: none;
          cursor: pointer;
        }
        > span:nth-child(4) {
          border-right: none;
        }
        .select {
          background: #498DF0;
          color: #fff;
        }
      }
      .searchBox-other-content {
        height: calc(100% - 89px);
        width: calc(100% - 24px);
        padding: 12px;
        > span {
          display: inline-block;
          float: left;
          height: 28px;
          line-height: 28px;
          width: calc(25% - 10px);
          margin: 0 5px 8px 5px;
          font-size: 12px;
          border-radius: 3px;
          color: #606266;
          background: rgba(255, 255, 255, 0.8);
          text-align: center;
          cursor: pointer;
        }
        > .select {
          background: #498DF0;
          color: #fff;
        }
      }
      .searchBox-other-bottom {
        height: 28px;
        width: 100%;
        margin-bottom: 10px;
        text-align: center;
        > button {
          height: 28px;
          line-height: 28px;
          padding: 0 15px;
          background: #498DF0;
          color: #fff;
          cursor: pointer;
          border: none;
          border-radius: 3px;
        }
        > button:focus {
          outline: none;
        }
        > button:hover {
          opacity: 0.8;
        }
      }
    }
  }

</style>
