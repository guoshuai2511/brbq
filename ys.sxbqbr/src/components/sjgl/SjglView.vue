<template>
  <div class="sjglPage">
    <div class="sjglPage-header">
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
        >
          <el-option
            v-for="item in xzList"
            :label="item.xzqhmc"
            :value="item.xzqhdm"
            :key="item.xzqhdm"
          ></el-option>
        </el-select>
      </div>
      <div class="key">
        <label>关键字：</label>
        <el-input placeholder="请输入" v-model="keyWord" size="mini"></el-input>
      </div>
      <div class="button">
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
    <div class="sjglPage-content" ref="tableDiv" v-loading="tableLoading">
      <el-table
        stripe
        :data="tableData"
        :header-cell-style="headerCellStyle"
        :cell-style="cellStyle"
        style="width: 100%;"
      >
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column prop="tybh" label="灾害体统一编号"></el-table-column>
        <el-table-column prop="zhdmc" label="灾害体名称"></el-table-column>
        <el-table-column prop="dlwz" label="隐患位置"></el-table-column>
        <el-table-column prop="ybqhs" label="已搬迁户数"></el-table-column>
        <el-table-column prop="ybqrs" label="已搬迁人数"></el-table-column>
        <el-table-column prop="qrdz" label="迁入地址"></el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <i
              title="编辑"
              style="cursor: pointer; font-size: 14px; margin: 0 4px;"
              class="el-icon-edit-outline"
              @click="editClick(scope.row)"
            ></i>
            <i
              title="删除"
              style="cursor: pointer;color: red; font-size: 14px;margin: 0 4px;"
              class="el-icon-delete"
              @click="deleteClick(scope.row)"
            ></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="sjglPage-foot">
      <el-pagination
        background
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
        @current-change="handleCurrentChange"
        style="float: right; "
      ></el-pagination>
    </div>

    <!-- 详情弹窗 -->
    <el-dialog
      title="编辑搬迁避让"
      :visible.sync="panelShow"
      v-if="panelShow"
      width="80%"
      custom-class="panelClass"
      :close-on-click-modal="false"
      :before-close="panelClose"
    >
      <bqbr-form :isSaveClick="isSaveClick" :rowData="rowData" @operateFormData="editBqbrForm"></bqbr-form>

      <div class="buttons">
        <div class="button" @click="isSaveClick=true">保存</div>
        <div class="button" @click="panelShow=false">关闭</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deleteBqbrmx, updateBqbrmx, getBqbrmx, pageBqbrmx } from "@/api/sjlr";
import bqbrForm from "@/components/common/bqbrForm";
export default {
  name: "SjglView",
  components: {
    bqbrForm
  },
  data() {
    return {
      cellStyle: {
        "text-align": "center",
        padding: "5px 0",
        "font-size": "12px"
      },
      headerCellStyle: {
        "background-color": "#EBF1FD",
        color: "#4C8EEE",
        "text-align": "center",
        padding: "8px 0",
        "font-size": "12px"
      },
      tableData: [],
      xianValue: "",
      xzValue: "",
      xianList: [],
      xzList: [],
      keyWord: "",
      checkList: ["00", "01", "02", "03", "04", "06", "07"],
      checkAll: true,
      isIndeterminate: true,
      pageSize: null,
      pageNum: 1,
      total: 0,
      panelShow: false,
      isSaveClick: false,
      rowData: null,
      tableLoading: false
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
  watch: {
    checkAll(newVal) {
      if (newVal) {
        this.checkList = ["00", "01", "02", "03", "04", "06", "07"];
      } else {
        this.checkList = [];
      }
      this.searchClick();
    },
  },
  methods: {
    initData() {
      this.tableLoading = true;
      let params = {
        searchParams: this.keyWord,
        generalParamOne: this.paramsXzqh.toString(), //行政区划
        generalParamTwo: this.checkList.join(",") //灾害类型
        // generalParamThree:"C",//规模等级
        // generalParamFour:"B"//险情等级
      };
      pageBqbrmx(params).then(res => {
        if (res && res.status) {
          this.tableData = res.result.list;
          this.total = res.result.total;
          this.tableLoading = false;
        }
      });
    },
    searchClick() {
      this.initData();
      this.pageNum = 1;
    },
    editClick(rowData) {
      this.rowData = rowData
      this.panelShow = true;
      // this.getDetailData(rowData, "edit");
    },
    // getDetailData(data, type) {
    //   let params = {
    //     id: data.id
    //   };
    //   getBqbrmx(params).then(res => {
    //     if (res && res.status) {
    //       this.rowData = res.result;

    //       if (type === "edit") {
    //         this.panelShow = true;
    //       }
    //     }
    //   });
    // },
    editBqbrForm(bqbrFormData) {
      let params = bqbrFormData;
      updateBqbrmx(params).then(res => {
        if (res && res.status) {
          this.$message({
            type: "success",
            message: res.message
          });
          this.initData();
          this.panelClose();
        }
      });
    },
    deleteClick(rowData) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            id: rowData.id
          };
          deleteBqbrmx(params).then(res => {
            if (res && res.status) {
              this.$message({
                type: "success",
                message: res.message
              });
              this.initData();
            }
          });
        })
        .catch(() => {});
    },
    panelClose() {
      this.panelShow = false;
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
    getXzqhTree() {
      if (this.$store.state.user.userInfo.xzqhjb === "市级") {
        this.xianList = this.$store.state.user.userXzqhList.children;
      } else if (this.$store.state.user.userInfo.xzqhjb === "县级") {
        this.xzList = this.$store.state.user.userXzqhList.children;
      }
    },
    handleCurrentChange() {
      this.pageNum = val;
      this.initData();
    }
  },
  mounted() {
    this.getXzqhTree();

    let height = this.$refs.tableDiv.offsetHeight; //得到列表div的高度
    this.pageSize = Math.floor((height - 120) / 33); //计算列表行数

    this.initData();
  }
};
</script>

<style scoped lang="scss">
.sjglPage {
  background: #fff;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  padding: 10px;
  border-radius: 3px;
  .sjglPage-header {
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
    /*add by guo shuai start 2020-5-25 */
    /deep/ .el-input__inner{
      font-size:14px !important;
    }
     /*add by guo shuai end 2020-5-25 */
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
  .sjglPage-content {
    height: calc(100% - 120px);
    width: 100%;
  }
  .sjglPage-foot {
    height: 32px;
    width: 100%;
    margin-top: 12px;
  }
}
</style>
<style lang="scss">
.sjglPage .level .el-select {
  width: calc(100% - 42px);
}
.sjglPage .key .el-input {
  width: calc(100% - 54px);
}
.sjglPage .checkBox .el-checkbox-group {
  width: calc(100% - 130px);
  display: inline-block;
}
.sjglPage .checkBox .el-checkbox {
  margin-right: 12px;
}
.sjglPage .checkBox .el-checkbox__label {
  font-size: 12px;
}
.sjglPage .panelClass {
  margin: 50px auto !important;
  height: calc(100% - 100px);
}
</style>
