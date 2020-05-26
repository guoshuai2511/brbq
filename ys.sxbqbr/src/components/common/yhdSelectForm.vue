<template>

    <div class="yhd-select">
    <div class="page-header">
      <div class="level">
        <label>县：</label>
        <el-select
          v-model="xianValue"
          placeholder="请选择"
          size="mini"
          clearable
          @change="chooseXzqh('xian')"
        >
          <el-option
            v-for="item in xianList"
            :label="item.xzqhmc"
            :value="item.xzqhdm"
            :key="item.xzqhdm"
          ></el-option>
        </el-select>
      </div>
      <div class="level">
        <label>乡镇：</label>
        <el-select
          v-model="xzValue"
          placeholder="请选择"
          size="mini"
          clearable
          @change="chooseXzqh('xz')"
          style="width: calc(100% - 50px);"
        >
          <el-option
            v-for="item in xzList"
            :label="item.xzqhmc"
            :value="item.xzqhdm"
            :key="item.xzqhdm"
          ></el-option>
        </el-select>
      </div>
      <!-- delete by guoshuai start 2020-5-25
      <div class="year">
        <label>年度：</label>
        <el-select v-model="year" placeholder="请选择" size="mini" clearable @change="searchClick">
                 <el-option
              v-for="item in nfList"
              :label="item.name"
              :value="item.value"
              :key="item.value"
            ></el-option>
        </el-select>
      </div>
      delete by guoshuai end 2020-5-25-->
      <div class="key">
        <label>关键字：</label>
        <el-input placeholder="请输入" size="mini" v-model="keyWord" clearable></el-input>
      </div>
      <div style="margin-left:30px">
        <el-button type="primary" size="mini" @click="searchClick">查询</el-button>
      </div>
      <div class="checkBox">
        <label>灾害类型：</label>
        <el-checkbox label="全选" v-model="checkAll"></el-checkbox>
        <el-checkbox-group v-model="checkList" @change="searchClick">
          <el-checkbox label="02">崩塌</el-checkbox>
          <el-checkbox label="01">滑坡</el-checkbox>
          <el-checkbox label="00">斜坡</el-checkbox>
          <el-checkbox label="03">泥石流</el-checkbox>
          <el-checkbox label="06">地裂缝</el-checkbox>
          <el-checkbox label="07">地面沉降</el-checkbox>
          <el-checkbox label="04">地面塌陷</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="page-content" ref="tableDiv">
      <el-table
        :header-cell-style="headerCellStyle"
        :cell-style="cellStyle"
        :data="tableData"
        :stripe="true"
        v-loading="loading"
        style="width: 100%;"
      >
              <el-table-column label="选择" align="center">
          <template slot-scope="scope">
            <el-radio v-model="yhdRow" :label="scope.row.ZHDWYBH" @change="chooseYhd">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <!-- delete by guoshuai start 2020-5-25
        <el-table-column prop="ZHDWYBH" label="统一编号"></el-table-column>
        <el-table-column prop="XMBH" label="项目编号"></el-table-column>
        <el-table-column prop="ZHDMC" label="灾害名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="zhlxWord" label="灾害类型"></el-table-column>
        <el-table-column prop="DLWZ" label="地理位置" show-overflow-tooltip></el-table-column>
        <el-table-column prop="gmdjWord" label="规模等级"></el-table-column>
        delete by guoshuai end 2020-5-25-->
        <!-- add by guoshuai start 2020/5/25 威胁人口和威胁财产字段未提供-->
        <el-table-column prop="ZHDWYBH" label="统一编号"></el-table-column>
        <el-table-column prop="ZHDMC" label="隐患名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="zhlxWord" label="隐患类型" show-overflow-tooltip></el-table-column>
        <el-table-column prop="DLWZ" label="地理位置" show-overflow-tooltip></el-table-column>
        <el-table-column prop="gmdjWord" label="规模等级"></el-table-column>
        <el-table-column prop="gmdjWord" label="威胁人口"></el-table-column>
        <el-table-column prop="gmdjWord" label="威胁财产"></el-table-column>
        <!-- add by guoshuai end 2020/5/25-->
      </el-table>
    </div>
    <div class="page-foot">
      <el-pagination
        background
        :page-size="pageSize"
        :page-sizes="[pageSize]"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
        style="float: right; "
      ></el-pagination>
    </div>



    <div style=" display: flex;justify-content: center; padding: 10px 0">
      <div
        class="button"
        style="color: white; background-color: #32B16C;margin-right:20px"
        @click="emitYhdData"
      >确定</div>
      <div
        class="button"
        style="color: #b4b4b4;background-color: #e6e6e6;"
        @click="closeDialog"
      >取消</div>
    </div>

    </div>
</template>

<script>
import { queryDzjbxxPage } from "@/api/common";

export default {
      name: "yhd-select",
      props:{
        yhdDialogVisible:Boolean
      },
  data() {
    return {
      keyWord: "",
      xianValue: "",
      xzValue: "",
      year: "",
      checkAll: true,
      checkList: ["00", "01", "02", "03", "04", "06", "07"],
      headerCellStyle: {
        "background-color": "#EBF1FD",
        color: "#4C8EEE",
        "text-align": "center",
        padding: "10px 0",
        "font-size": "12px"
      },
      cellStyle: {
        "text-align": "center",
        padding: "5px 0",
        "font-size": "12px"
      },
      tableData: [],

      pageSize: null,
      pageNum: 1,
      total: null,

      loading: false,
      xianList: [],
      xzList: [],
      yhdSelectData:null,
      yhdRow:"",
      nfList:[]
    };
  },
    computed: {
    paramsXzqh() {
      if (this.xzValue) {
        return this.xzValue;
      } else if (this.xianValue) {
        return this.xianValue;
      } else {
        return this.$store.state.user.userInfo.xzqhdm;
      }
    }
  },
  watch:{
    yhdDialogVisible(newVal){
      if(newVal){
        this.initData()
        this.yhdRow = ""
        this.yhdSelectData = null
      }
    },
      checkAll(newVal) {
      if (newVal) {
        this.checkList = ["00", "01", "02", "03", "04", "06", "07"];
      } else {
        this.checkList = [];
      }
      this.searchClick();
    },
  },
methods:{
      //初始化列表数据
    initData() {
      this.loading = true;

      let height = this.$refs.tableDiv.offsetHeight; //得到列表div的高度
    this.pageSize = Math.floor((height - 18) / 34); //计算列表行数
      let params = {
        //前两个参数暂时没有地方用到
        generalParamOne: "", //灾害点唯一编号
        generalParamTwo: "", //项目编号
        generalParamThree: this.checkList.join(","), //灾害类型（字典）
        searchParams: this.keyWord, //关键字模糊查询
        xzqh: this.paramsXzqh, //选出来上次的行政区划
        // xzqhjb: this.xzqhjb,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      queryDzjbxxPage(params).then(res => {
        if (res && res.status) {
          this.loading = false;
          this.tableData = res.result.list;
          this.total = res.result.total;
          //数字转化为文字显示
          this.tableData.forEach(item => {
            item["zhlxWord"] = this.zhlxTransToWord(item.ZHLX);
            item["gmdjWord"] = this.gmdjTransToWord(item.GMDJ);
            item["xqdjWord"] = this.xqdjTransToWord(item.XQDJ);
            // item["dlwz"] = item.xsq + item.xz + item.c + item.z;
          });
        }
      });
    },
        chooseXzqh(level) {
      //选市级则需给县级对应的行政区划
      if (level === "xian") {
        this.xzValue = "";
        this.xzList = [];
        if (this.xianValue) {
          this.xzList = this.xianList.find(item => {
            return item.xzqhdm === this.xianValue;
          }).children;
        }
      }

      this.initData();
    },
      closeDialog(){
      this.$emit("closeDialog")
  },
      //查询点击事件
    searchClick() {
      this.pageNum = 1;
      this.initData();
    },
        //翻页
    handleCurrentChange(page) {
      this.pageNum = page;
      this.initData();
    },
    chooseYhd(){
      this.yhdSelectData = this.tableData.find(item=>{
        return item.ZHDWYBH === this.yhdRow
      })
    },
    emitYhdData(){
      if(this.yhdSelectData){
        this.$emit("emitYhdData",this.yhdSelectData)
        this.closeDialog()
      }else{
        this.$message("请先选择隐患点")
      }
    },

    //灾害类型编号转文字用在分页表格中
    zhlxTransToWord(value) {
      switch (value) {
        //编号
        case "00":
          return "不稳定斜坡";
        case "01":
          return "滑坡";
        case "02":
          return "崩塌";
        case "03":
          return "泥石流";
        case "04":
          return "地面塌陷";
        case "06":
          return "地裂缝";
        case "07":
          return "地面沉降";
        //字符
        case "bwdxp":
          return "不稳定斜坡";
        case "hp":
          return "滑坡";
        case "bt":
          return "崩塌";
        case "nsl":
          return "泥石流";
        case "dmtx":
          return "地面塌陷";
        case "dlf":
          return "地裂缝";
        case "dmcj":
          return "地面沉降";
      }
    },

    //规模等级编号转文字
    gmdjTransToWord(value) {
      switch (value) {
        case "A":
          return "巨型";
        case "B":
          return "大型";
        case "C":
          return "小型";
        case "D":
          return "中型";
        case "E":
          return "特大型";
        default:
          return "";
      }
    },

    //险情等级编号转文字
    xqdjTransToWord(value) {
      switch (value) {
        case "A":
          return "特大型";
        case "B":
          return "大型";
        case "C":
          return "中型";
        case "D":
          return "小型";
        default:
          return "";
      }
    },
        getXzqhTree() {
      if (this.$store.state.user.userInfo.xzqhjb === "市级") {
        this.xianList = this.$store.state.user.userXzqhList.children;
      } else if (this.$store.state.user.userInfo.xzqhjb === "县级") {
        this.xzList = this.$store.state.user.userXzqhList.children;
      }
    },
        getDcnfList() {
      let timeNow = new Date();
      let yearNow = timeNow.getFullYear();

      let yearArr = [];

      for (let i = 0; i < 22; i++) {
        yearArr.push({ name: yearNow.toString(), value: yearNow.toString() });
        yearNow--;
      }
      return yearArr;
    }
},
mounted(){
  this.getXzqhTree();
  this.nfList = this.getDcnfList();

  this.initData();
}
};
</script>

<style scoped lang="scss">
.yhd-select {
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  background-color: #fff;
  padding: 10px;
  border-radius: 3px;
  .page-header {
    height: 76px;
    width: 100%;
    > div {
      height: 28px;
      width: calc(18% - 6px);
      float: left;
      padding-left: 6px;
      margin-bottom: 10px;
      > label {
        display: inline-block;
        height: 28px;
        line-height: 28px;
        font-size: 12px;
      }
    }
    .checkBox {
      width: 66%;
    }
    .button {
      width: 8%;
    }
    .button-right {
      float: right;
      width: 130px;
    }
  }
  .page-content {
    height: calc(100% - 120px);
    min-height: 200px;
    max-height: 200px;
    width: 100%;
  }
  .page-foot {
    height: 32px;
    width: 100%;
    margin-top: 12px;
  }

 .button {
    line-height: 35px;
    height: 35px;
    width: 120px;
    margin: 0 30px;
    text-align: center;
    vertical-align: middle;
    border-radius: 3px;
    cursor: pointer;
  }
}
</style>
<style lang="scss">
.yhd-select .level .el-select {
  width: calc(100% - 30px);
}
.yhd-select .year .el-select {
  width: calc(100% - 42px);
}
.yhd-select .key .el-input {
  width: calc(100% - 54px);
}
.yhd-select .checkBox .el-checkbox-group {
  width: calc(100% - 130px);
  display: inline-block;
}
.yhd-select .checkBox .el-checkbox {
  margin-right: 12px;
}
.yhd-select .checkBox .el-checkbox__label {
  font-size: 12px;
}
</style>
