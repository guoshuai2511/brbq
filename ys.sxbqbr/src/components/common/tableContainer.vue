<template>
  <div class="table-container">
    <el-table
      :data="tableData"
      style="width: 100%"
      :stripe="true"
      :header-cell-style="headerCellStyle"
      :cell-style="cellStyle"
    >
      <!-- 是否包含勾选框 -->
      <template v-if="hasSelection">
        <el-table-column type="selection" width="70px"></el-table-column>
      </template>
      <!-- 是否包含序号 -->
      <template v-if="hasIndex">
        <el-table-column type="index" label="序号" width="100px" :show-overflow-tooltip="true"></el-table-column>
      </template>

      <template v-for="item in tableTitle">
        <span v-if="item.type=='tsglStatus'">
          <el-table-column
            :label="item.name"
            :prop="item.key"
            :width="item.width"
            :show-overflow-tooltip="true"
          >
            <span slot-scope="scope">
              <span>
                已读
                <span style="color:rgb(138,198,143)">{{scope.row.hasRead}}</span>人,
              </span>
              <span>
                未读
                <span style="color:rgb(227,113,116)">{{scope.row.noRead}}</span>人
              </span>
            </span>
          </el-table-column>
        </span>

        <div v-else-if="item.type=='xpcglStatus'">
          <el-table-column
            :label="item.name"
            :prop="item.key"
            :width="item.width"
            :show-overflow-tooltip="true"
          >
            <div slot-scope="scope" style="color:rgb(36,218,115)">
              <div v-if="scope.row.clzt=='1'">
                <i class="el-icon-circle-check"></i>
                <span>&nbsp;已处理</span>
              </div>
              <div v-else style="color:rgb(255,112,78)">
                <i class="el-icon-circle-close"></i>
                <span>&nbsp;未处理</span>
              </div>
            </div>
          </el-table-column>
        </div>

        <template v-else-if="item.children">
          <el-table-column :label="item.name" :prop="item.key" :width="item.width">
            <template slot-scope="scope">
              <div class="images"  v-for="child in item.children">
                <img :src="child.url" alt="" @click="iconClick(child.method,scope.row)">
              </div>
            </template>
          </el-table-column>
        </template>

        <el-table-column v-else :prop="item.key" :label="item.name" :show-overflow-tooltip="true"></el-table-column>
      </template>
    </el-table>
  </span>
  </div>
</template>

<script>
export default {
  props: {
    tableData: Array,
    tableTitle: Array,
    hasSelection: Boolean,
    hasIndex: Boolean
  },
  data() {
    return {
      headerCellStyle: {
        color: "white",
        "background-color": "rgb(71,123,198)",
        "text-align": "center"
      },
      cellStyle: {
        "text-align": "center"
      }
    };
  },
  methods: {
    iconClick(methodName, rowData) {
      this.$emit("iconClick", methodName, rowData);
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.table-container {
  margin-top: 10px;

      .images{
        width: 18px;
    height: 18px;
    vertical-align: middle;
    cursor: pointer;
    display: inline-block;
    margin: 0px 10px;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>

<style lang="scss">
  .table-container {
    .el-table th{
    padding: 10px 0px 
    }
  .el-table td{
    padding: 6px 0px 
  }

  }
</style>