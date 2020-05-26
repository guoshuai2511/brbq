<template>
  <div class="searchBox">
    <div class="searchBox-keyWord">
      <input  placeholder="请输入查询关键字"></input>
      <i class="el-icon-search"></i>
    </div>
    <i class="el-icon-s-operation"
       :class="{btnStyle: btnStatus}"
       @click="btnStatus = !btnStatus"></i>
    <div class="searchBox-other" v-show="btnStatus">
      <div class="searchBox-other-header">
        <span :class="{select: tabSelect === 'xzqh'}" @click="tabSelect = 'xzqh'">行政区划</span>
        <span :class="{select: tabSelect === 'zhlx'}" @click="tabSelect = 'zhlx'">灾害类型</span>
        <span :class="{select: tabSelect === 'gmdx'}" @click="tabSelect = 'gmdx'">规模大小</span>
        <span :class="{select: tabSelect === 'xqdj'}" @click="tabSelect = 'xqdj'">险情等级</span>
      </div>
      <div class="searchBox-other-content">
        <template v-for="(item,index) in ceshiData[tabSelect]">
          <span :value="item.val" :key="index">{{item.mc}}</span>
        </template>
      </div>
      <div class="searchBox-other-bottom">
        <button>确 定</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "mapSearchTool",
    data(){
      return {
        btnStatus: false,
        tabSelect: "xzqh",
        ceshiData:{
          xzqh: [
            {mc: "市辖区",val: ""},{mc: "城区",val: ""},{mc: "沁水县",val: ""},{mc: "阳城县",val: ""},
            {mc: "陵川县",val: ""},{mc: "泽州县",val: ""},{mc: "高平市",val: ""}
          ],
          zhlx: [
            {mc: "崩塌",val: ""},{mc: "滑坡",val: ""},{mc: "泥石流",val: ""},{mc: "塌陷",val: ""},
          ],
          gmdx: [
            {mc: "特大型",val: ""},{mc: "大型",val: ""},{mc: "中型",val: ""},{mc: "小型",val: ""},
          ],
          xqdj: [
            {mc: "警报级",val: ""},{mc: "警示级",val: ""},{mc: "预警级",val: ""},{mc: "注意级",val: ""},{mc: "安全级",val: ""}
          ],
        },

      }
    }
  }
</script>

<style scoped lang="scss">
  .searchBox{
    position: absolute;
    width: 300px;
    background: rgba(255,255,255,0.8);
    z-index: 1;
    margin: 8px 0 0 8px;
    border-radius: 3px;
    .searchBox-keyWord{
      float: left;
      height: 28px;
      width: calc(100% - 56px);
      margin: 4px;
      >input{
        height: 26px;
        padding-left: 10px;
        width: calc(100% - 40px);
        border: 1px solid #498DF0;
        border-radius: 3px 0 0 3px;
        background: rgba(255,255,255,0.4);
      }
      input:focus{
        outline: none;
      }
      >i{
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
    >i{
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
    .btnStyle{
      color: #498DF0;
    }
    .searchBox-other{
      height: 200px;
      width: 100%;
      margin-top: 46px;
      .searchBox-other-header{
        height: 26px;
        width: 100%;
        border-Bottom: 1px solid #498DF0;
        >span{
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
        >span:nth-child(4){
          border-right: none;
        }
        .select{
          background: #498DF0;
          color: #fff;
        }
      }
      .searchBox-other-content{
        height: calc(100% - 89px);
        width: calc(100% - 24px);
        padding: 12px;
        >span{
          display: inline-block;
          float: left;
          height: 28px;
          line-height: 28px;
          width: calc(25% - 10px);
          margin: 0 5px 8px 5px;
          font-size: 12px;
          border-radius: 3px;
          color: #606266;
          background: rgba(255,255,255,0.8);
          text-align: center;
          cursor: pointer;
        }
      }
      .searchBox-other-bottom {
        height: 28px;
        width: 100%;
        margin-bottom: 10px;
        text-align: center;
        >button{
          height: 28px;
          line-height: 28px;
          padding: 0 15px;
          background: #498DF0;
          color: #fff;
          cursor: pointer;
          border: none;
          border-radius: 3px;
        }
        >button:focus{
          outline: none;
        }
        >button:hover{
          opacity: 0.8;
        }
      }
    }
  }
</style>
