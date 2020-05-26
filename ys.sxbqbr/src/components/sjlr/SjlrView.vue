<template>
  <div class="sjlrPage">
    <bqbr-form :isSaveClick="isSaveClick" @operateFormData="addBqbrForm"></bqbr-form>

    <div class="buttons">
      <div class="button" @click="saveClick">保存</div>
    </div>
  </div>
</template>

<script>
import bqbrForm from "@/components/common/bqbrForm";
import { insertBqbrmx } from "@/api/sjlr";
import { guid } from "@/utils/utils";

export default {
  name: "SjlrView",
  data() {
    return {
      bmClickType: "zljbqk",
      isSaveClick: false
    };
  },
  components: {
    bqbrForm
  },
  methods: {
    saveClick() {
      this.isSaveClick = !this.isSaveClick;
    },
    addBqbrForm(bqbrFormData) {
      let params = bqbrFormData;
      // params.id = this.getRandomNum()
      insertBqbrmx(params).then(res => {
        if (res && res.status) {
                   this.$message({
            type: "success",
            message: res.message
          });
        }
      });
    },
    getRandomNum() {
      return Math.floor(Math.random() * 100000);
    }
  }
};
</script>

<style scoped lang="scss">
.sjlrPage {
  background: #fff;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  padding: 10px;
  border-radius: 3px;
  .pageHeader-tab {
    height: 26px;
    line-height: 26px;
    margin-bottom: 11px;
    border-bottom: 1px solid #e3e3e3;
    > span {
      display: inline-block;
      font-size: 13px;
      text-align: center;
      border-radius: 4px 4px 0 0;
      border: 1px solid #e3e3e3;
      border-bottom: none;
      margin: 0 4px;
      padding: 0 10px;
      cursor: pointer;
      color: #5e6d82;
    }
    .select {
      background: #02a7f1;
      color: #fff;
    }
  }
  .pageContent-table {
    height: calc(100% - 80px);
    width: 100%;
    overflow-y: auto;
  }
  .pageFoot-btn {
    height: 30px;
    width: 100%;
    margin-top: 12px;
    text-align: center;
    > button {
      height: 30px;
      line-height: 30px;
      border: none;
      border-radius: 3px;
      text-align: center;
      padding: 0 26px;
      margin: 0 5px;
      cursor: pointer;
    }
    button:hover {
      opacity: 0.8;
    }
    button:focus {
      outline: none;
    }
    button:nth-child(1) {
      background: #498df0;
      color: #fff;
    }
  }
}
</style>
<style>
.pageContent-table .el-input__inner {
  border: none;
}
.pageContent-table .el-textarea__inner {
  border: none;
}
</style>
