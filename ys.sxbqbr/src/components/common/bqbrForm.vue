<template>
  <div class="bqbr-table">
    <div>
      <table>
        <tr>
          <td class="title" rowspan="2">灾害点基本信息</td>
          <td class="title">统一编号</td>
          <td @click="showYhdDialog">
            <el-input v-model="bqbrForm.tybh" size="mini" readonly></el-input>
          </td>
          <td class="title">灾害点名称</td>
          <td>
            <el-input v-model="bqbrForm.zhdmc" size="mini" readonly></el-input>
          </td>
          <td class="title">灾害类型</td>
          <td>
            <el-input v-model="bqbrForm.zhdlx" size="mini" readonly></el-input>
          </td>
        </tr>
        <tr>
          <td class="title">经度</td>
          <td>
            <el-input v-model="bqbrForm.x" size="mini" readonly></el-input>
          </td>
          <td class="title">纬度</td>
          <td>
            <el-input v-model="bqbrForm.y" size="mini" readonly></el-input>
          </td>
          <td class="title">地理位置</td>
          <td>
            <el-input v-model="bqbrForm.dlwz" size="mini" readonly></el-input>
          </td>
        </tr>

        <tr>
          <td class="title" rowspan="2">外形特征</td>
          <td class="title">崩滑体库岸类型</td>
          <td colspan="2">
            <el-input v-model="bqbrForm.bptkalx" size="mini"></el-input>
          </td>
          <td class="title">是否位于库区175m一下移民已迁</td>
          <td colspan="2">
            <el-input v-model="bqbrForm.sfwykqyx" size="mini"></el-input>
          </td>
        </tr>

        <tr>
          <td class="title">是否175m涉水范围</td>
          <td colspan="2">
            <el-input v-model="bqbrForm.sfssfw" size="mini"></el-input>
          </td>
          <td class="title">主要影响对象</td>
          <td colspan="2">
            <el-input v-model="bqbrForm.zyyxdx" size="mini"></el-input>
          </td>
        </tr>

        <tr>
          <td class="title">搬迁项目调整情况</td>
          <td class="title">调整部门</td>
          <td colspan="2">
            <el-input v-model="bqbrForm.tzbm" size="mini"></el-input>
          </td>
          <td class="title">调整后措施</td>
          <td colspan="2">
            <el-input v-model="bqbrForm.tzhcsbltz" size="mini"></el-input>
          </td>
        </tr>

        <tr>
          <td class="title" rowspan="4">生成环境与基本特征</td>
          <td class="title">地层岩性及产状</td>
          <td colspan="5">
            <el-input v-model="bqbrForm.dcyxjcz" type="textarea" :rows="2" size="mini"></el-input>
          </td>
        </tr>

        <tr>
          <td class="title">边界条件,形态特征</td>
          <td colspan="5">
            <el-input v-model="bqbrForm.bjtjxttz" type="textarea" :rows="2" size="mini"></el-input>
          </td>
        </tr>

        <tr>
          <td class="title">物质组成及结构特征</td>
          <td colspan="5">
            <el-input v-model="bqbrForm.wzzcjjgtz" type="textarea" :rows="2" size="mini"></el-input>
          </td>
        </tr>

        <tr>
          <td class="title">水文地质</td>
          <td colspan="5">
            <el-input v-model="bqbrForm.swdz" type="textarea" :rows="2" size="mini"></el-input>
          </td>
        </tr>

        <tr>
          <td class="title" rowspan="7">规划搬迁避让项目情况</td>
          <td class="title">搬迁避让项目实施部门</td>
          <td colspan="5">
            <el-input v-model="bqbrForm.bqbrxmssbm" size="mini"></el-input>
          </td>
        </tr>

        <tr>
          <td class="title">规划搬迁户数</td>
          <td colspan="2">
            <el-input
              v-model="bqbrForm.ghbqhs"
              size="mini"
              @keyup.native="onlyIntMixin"
              @blur="onlyNumberBlurMixin(bqbrForm,'ghbqhs',true)"
            ></el-input>
          </td>
          <td class="title">规划搬迁人数</td>
          <td colspan="2">
            <el-input
              v-model="bqbrForm.ghbqrs"
              size="mini"
              @keyup.native="onlyIntMixin"
              @blur="onlyNumberBlurMixin(bqbrForm,'ghbqrs',true)"
            ></el-input>
          </td>
        </tr>

        <tr>
          <td class="title">规划搬迁城市人数</td>
          <td>
            <el-input
              v-model="bqbrForm.csrs"
              size="mini"
              @keyup.native="onlyIntMixin"
              @blur="onlyNumberBlurMixin(bqbrForm,'csrs',true)"
            ></el-input>
          </td>
          <td class="title">规划搬迁城镇人数</td>
          <td>
            <el-input
              v-model="bqbrForm.czrs"
              size="mini"
              @keyup.native="onlyIntMixin"
              @blur="onlyNumberBlurMixin(bqbrForm,'czrs',true)"
            ></el-input>
          </td>
          <td class="title">规划搬迁乡村人数</td>
          <td>
            <el-input
              v-model="bqbrForm.xcrs"
              size="mini"
              @keyup.native="onlyIntMixin"
              @blur="onlyNumberBlurMixin(bqbrForm,'xcrs',true)"
            ></el-input>
          </td>
        </tr>

        <tr>
          <td class="title">已搬迁户数</td>
          <td colspan="2">
            <el-input
              v-model="bqbrForm.ybqhs"
              size="mini"
              @keyup.native="onlyIntMixin"
              @blur="onlyNumberBlurMixin(bqbrForm,'ybqhs',true)"
            ></el-input>
          </td>
          <td class="title">已搬迁人数</td>
          <td colspan="2">
            <el-input
              v-model="bqbrForm.ybqrs"
              size="mini"
              @keyup.native="onlyIntMixin"
              @blur="onlyNumberBlurMixin(bqbrForm,'ybqrs',true)"
            ></el-input>
          </td>
        </tr>

        <tr>
          <td class="title">已搬迁城市人数</td>
          <td>
            <el-input
              v-model="bqbrForm.ybqcs"
              size="mini"
              @keyup.native="onlyIntMixin"
              @blur="onlyNumberBlurMixin(bqbrForm,'ybqcs',true)"
            ></el-input>
          </td>
          <td class="title">已搬迁城镇人数</td>
          <td>
            <el-input
              v-model="bqbrForm.ybqcz"
              size="mini"
              @keyup.native="onlyIntMixin"
              @blur="onlyNumberBlurMixin(bqbrForm,'ybqcz',true)"
            ></el-input>
          </td>
          <td class="title">已搬迁乡村人数</td>
          <td>
            <el-input
              v-model="bqbrForm.ybqnc"
              size="mini"
              @keyup.native="onlyIntMixin"
              @blur="onlyNumberBlurMixin(bqbrForm,'ybqnc',true)"
            ></el-input>
          </td>
        </tr>

        <tr>
          <td class="title">未搬迁户数</td>
          <td colspan="2">
            <el-input
              v-model="bqbrForm.wbqhs"
              size="mini"
              @keyup.native="onlyIntMixin"
              @blur="onlyNumberBlurMixin(bqbrForm,'wbqhs',true)"
            ></el-input>
          </td>
          <td class="title">未搬迁人数</td>
          <td colspan="2">
            <el-input
              v-model="bqbrForm.wbqrs"
              size="mini"
              @keyup.native="onlyIntMixin"
              @blur="onlyNumberBlurMixin(bqbrForm,'wbqrs',true)"
            ></el-input>
          </td>
        </tr>

        <tr>
          <td class="title">未搬迁城市人数</td>
          <td>
            <el-input
              v-model="bqbrForm.wbqcs"
              size="mini"
              @keyup.native="onlyIntMixin"
              @blur="onlyNumberBlurMixin(bqbrForm,'wbqcs',true)"
            ></el-input>
          </td>
          <td class="title">未搬迁城镇人数</td>
          <td>
            <el-input
              v-model="bqbrForm.wbqcz"
              size="mini"
              @keyup.native="onlyIntMixin"
              @blur="onlyNumberBlurMixin(bqbrForm,'wbqcz',true)"
            ></el-input>
          </td>
          <td class="title">未搬迁乡村人数</td>
          <td>
            <el-input
              v-model="bqbrForm.wbqnc"
              size="mini"
              @keyup.native="onlyIntMixin"
              @blur="onlyNumberBlurMixin(bqbrForm,'wbqnc',true)"
            ></el-input>
          </td>
        </tr>

        <tr>
          <td class="title" rowspan="6">搬迁信息</td>
          <td class="title">集中选址安置户数</td>
          <td>
            <el-input
              v-model="bqbrForm.jzxzazhs"
              size="mini"
              @keyup.native="onlyIntMixin"
              @blur="onlyNumberBlurMixin(bqbrForm,'jzxzazhs',true)"
            ></el-input>
          </td>
          <td class="title">部分安置户数</td>
          <td>
            <el-input
              v-model="bqbrForm.bfazhs"
              size="mini"
              @keyup.native="onlyIntMixin"
              @blur="onlyNumberBlurMixin(bqbrForm,'bfazhs',true)"
            ></el-input>
          </td>
          <td class="title">分散安置户数</td>
          <td>
            <el-input
              v-model="bqbrForm.fsazhs"
              size="mini"
              @keyup.native="onlyIntMixin"
              @blur="onlyNumberBlurMixin(bqbrForm,'fsazhs',true)"
            ></el-input>
          </td>
        </tr>

        <tr>
          <td class="title">集中选址安置人数</td>
          <td>
            <el-input
              v-model="bqbrForm.jzxzazrs"
              size="mini"
              @keyup.native="onlyIntMixin"
              @blur="onlyNumberBlurMixin(bqbrForm,'jzxzazrs',true)"
            ></el-input>
          </td>
          <td class="title">部分安置人数</td>
          <td>
            <el-input
              v-model="bqbrForm.bfazrs"
              size="mini"
              @keyup.native="onlyIntMixin"
              @blur="onlyNumberBlurMixin(bqbrForm,'bfazrs',true)"
            ></el-input>
          </td>
          <td class="title">分散安置人数</td>
          <td>
            <el-input
              v-model="bqbrForm.fsazrs"
              size="mini"
              @keyup.native="onlyIntMixin"
              @blur="onlyNumberBlurMixin(bqbrForm,'fsazrs',true)"
            ></el-input>
          </td>
        </tr>

        <tr>
          <td class="title">未实施搬迁的理由</td>
          <td colspan="5">
            <el-input v-model="bqbrForm.wssbqly" type="textarea" :rows="2" size="mini"></el-input>
          </td>
        </tr>

        <tr>
          <td class="title">迁入地址</td>
          <td colspan="5">
            <el-input v-model="bqbrForm.qrdz" size="mini"></el-input>
          </td>
        </tr>

        <tr>
          <td class="title">迁入地地灾评估情况</td>
          <td colspan="5">
            <el-input v-model="bqbrForm.qrddzpgqk" type="textarea" :rows="2" size="mini"></el-input>
          </td>
        </tr>

        <tr>
          <td class="title">迁入地地灾危险性评估单位</td>
          <td colspan="2">
            <el-input v-model="bqbrForm.qrddzwxxpgdw" size="mini"></el-input>
          </td>
          <td class="title">评估单位质资等级编号</td>
          <td colspan="2">
            <el-input v-model="bqbrForm.pgdwzzdj" size="mini"></el-input>
          </td>
        </tr>

        <tr>
          <td class="title" rowspan="4">迁入信息</td>
          <td class="title">(主要)迁入地地址</td>
          <td colspan="5">
            <div class="qrddz">
              <div class="flex-block">
                <span class="address">(区县)</span>
                <el-input v-model="bqbrForm.zyqrddzqx" size="mini" class="only-bottom-line"></el-input>
              </div>
              <div class="flex-block">
                <span class="address">(乡镇)</span>
                <el-input v-model="bqbrForm.zyqrddzxz" size="mini" class="only-bottom-line"></el-input>
              </div>
              <div class="flex-block">
                <span class="address">(村)</span>
                <el-input v-model="bqbrForm.zyqrddzc" size="mini" class="only-bottom-line"></el-input>
              </div>
              <div class="flex-block">
                <span class="address">(组社)</span>
                <el-input v-model="bqbrForm.zyqrddzzs" size="mini" class="only-bottom-line"></el-input>
              </div>
            </div>
          </td>
        </tr>

        <tr>
          <td class="title">
            2003年6月蓄水以来崩滑体
            <br />变形情况及变形影响对象
          </td>
          <td colspan="5">
            <el-input v-model="bqbrForm.bhtbxqk" type="textarea" :rows="2" size="mini"></el-input>
          </td>
        </tr>

        <tr>
          <td class="title">崩滑体现今稳定性评价及预测</td>
          <td colspan="5">
            <el-input v-model="bqbrForm.bhtwdx" type="textarea" :rows="2" size="mini"></el-input>
          </td>
        </tr>

        <tr>
          <td class="title">备注</td>
          <td colspan="5">
            <el-input v-model="bqbrForm.bz" type="textarea" :rows="2" size="mini"></el-input>
          </td>
        </tr>

        <tr>
          <td class="title" rowspan="3">采取风险管理措施</td>
          <td class="title">监测类型</td>
          <td colspan="2">
            <el-input v-model="bqbrForm.jclx" size="mini"></el-input>
          </td>
          <td class="title">监测单位或现场监测人</td>
          <td colspan="2">
            <el-input v-model="bqbrForm.jcdwhxcjcr" size="mini"></el-input>
          </td>
        </tr>

        <tr>
          <td class="title">监测点数量及建设情况</td>
          <td colspan="2">
            <el-input v-model="bqbrForm.jcdsljjsqk" type="textarea" :rows="2" size="mini"></el-input>
          </td>
          <td class="title">预警措施、防灾撤离预案</td>
          <td colspan="2">
            <el-input v-model="bqbrForm.yjcsfzclya" type="textarea" :rows="2" size="mini"></el-input>
          </td>
        </tr>

        <tr>
          <td class="title">监测周期及现场监测运行</td>
          <td colspan="2">
            <el-input v-model="bqbrForm.jczqjxcjcyx" type="textarea" :rows="2" size="mini"></el-input>
          </td>
          <td class="title">近期监测变形数据</td>
          <td colspan="2">
            <el-input v-model="bqbrForm.jqjcbxsj" type="textarea" :rows="2" size="mini"></el-input>
          </td>
        </tr>

        <tr>
          <td class="title" rowspan="3">已实施搬迁信息</td>
          <td class="title">已实施搬迁人数</td>
          <td>
            <el-input
              v-model="bqbrForm.yssbqrs"
              size="mini"
              @keyup.native="onlyIntMixin"
              @blur="onlyNumberBlurMixin(bqbrForm,'yssbqrs',true)"
            ></el-input>
          </td>
          <td class="title">已实施搬迁时间</td>
          <td>
            <el-date-picker
              size="mini"
              v-model="bqbrForm.yssbqsj"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期"
            ></el-date-picker>
          </td>
          <td class="title">已实施临时搬迁人数</td>
          <td>
            <el-input
              v-model="bqbrForm.ysslsbqrs"
              size="mini"
              @keyup.native="onlyIntMixin"
              @blur="onlyNumberBlurMixin(bqbrForm,'ysslsbqrs',true)"
            ></el-input>
          </td>
        </tr>

        <tr>
          <td class="title">已实施临时搬迁时间</td>
          <td>
            <el-date-picker
              size="mini"
              v-model="bqbrForm.ysslsbqsj"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期"
            ></el-date-picker>
          </td>
          <td class="title">已实施应急撤离人数</td>
          <td>
            <el-input
              v-model="bqbrForm.yssyjclrs"
              size="mini"
              @keyup.native="onlyIntMixin"
              @blur="onlyNumberBlurMixin(bqbrForm,'yssyjclrs',true)"
            ></el-input>
          </td>
          <td class="title">已实施应急撤离时间</td>
          <td>
            <el-date-picker
              size="mini"
              v-model="bqbrForm.yssyjclsj"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期"
            ></el-date-picker>
          </td>
        </tr>

        <tr>
          <td class="title">其它</td>
          <td colspan="5">
            <el-input v-model="bqbrForm.qt" size="mini"></el-input>
          </td>
        </tr>

        <tr>
          <td class="title" rowspan="2">调查信息</td>
          <td class="title">调查单位</td>
          <td>
            <el-input v-model="bqbrForm.dcdw" size="mini"></el-input>
          </td>
          <td class="title">调查负责人</td>
          <td>
            <el-input v-model="bqbrForm.dcfzr" size="mini"></el-input>
          </td>
          <td class="title">调查人员</td>
          <td>
            <el-input v-model="bqbrForm.dcry" size="mini"></el-input>
          </td>
        </tr>

        <tr>
          <td class="title">审核人</td>
          <td>
            <el-input v-model="bqbrForm.spr" size="mini"></el-input>
          </td>
          <td class="title">填表日期</td>
          <td>
            <el-date-picker
              size="mini"
              v-model="bqbrForm.tbsj"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期"
            ></el-date-picker>
          </td>
          <td class="title">调查日期</td>
          <td>
            <el-date-picker
              size="mini"
              v-model="bqbrForm.dcrq"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期"
            ></el-date-picker>
          </td>
        </tr>
      </table>
    </div>

 <el-dialog
      :close-on-click-modal="false"
      :append-to-body="true"
      title="隐患点选择"
      :visible.sync="yhdDialogVisible"
      width="84%"
      :before-close="yhdHandleClose"
    >
  <yhd-select-form @closeDialog="yhdHandleClose" :yhdDialogVisible="yhdDialogVisible" @emitYhdData="getYhdData"></yhd-select-form>
    </el-dialog>
 

  </div>
</template>


<script>
import numControlMixin from "@/mixin/numControlMixin";
import yhdSelectForm from "@/components/common/yhdSelectForm"

export default {
  mixins: [numControlMixin],
  components:{
    yhdSelectForm
  },
  props: {
    isSaveClick: Boolean,
    rowData: Object
  },
  data() {
    return {
      bqbrForm: {},
      yhdDialogVisible:false,
    };
  },
  watch: {
    isSaveClick() {
      if(this.bqbrForm.tybh){
        this.emitFormData();
      }else{
       this.$message("请先选择隐患点")
      }
    },
    rowData(newVal) {
      this.bqbrForm = newVal;
    }
  },
  methods: {
    emitFormData() {
      //对表单内容进行操作
      this.bqbrForm.zhdlx = this.zhlxTransToNum(this.bqbrForm.zhdlx);


      let bqbrFormData = JSON.parse(JSON.stringify(this.bqbrForm));
      this.$emit("operateFormData", bqbrFormData);
    },
   //打开隐患点弹窗
    showYhdDialog(){
      this.yhdDialogVisible = true
    },
    //关闭隐患点弹窗
    yhdHandleClose(){
      this.yhdDialogVisible = false
    },
    //获取隐患点信息
    getYhdData(data){
      //填充基本信息
      this.bqbrForm.tybh = data.ZHDWYBH;
      this.bqbrForm.zhdmc = data.ZHDMC;
      this.bqbrForm.zhdlx = this.zhlxTransToWord(data.ZHLX);
      this.bqbrForm.x = data.JD;
      this.bqbrForm.y = data.WD;
      this.bqbrForm.dlwz = data.DLWZ;
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
      }
    },
    zhlxTransToNum(value) {
      switch (value) {
        //编号
        case "不稳定斜坡":
          return "00";
        case "滑坡":
          return "01";
        case "崩塌":
          return "02";
        case "泥石流":
          return "03";
        case "地面塌陷":
          return "04";
        case "地裂缝":
          return "06";
        case "地面沉降":
          return "07";
      }
    },
  }
};
</script>


<style scoped lang="scss">
.bqbr-table {
  width: 100%;
  height: calc(100% - 65px);
  overflow: auto;
  table {
    table-layout: auto;
    width: 100%;
    border-collapse: collapse;
    thead {
      text-align: center;
    }
    tr {
      td {
        font-size: 13px;
        &[class="title"] {
          text-align: center;
          // white-space: nowrap;
          padding: 0px 10px;
          border: 1px solid rgb(194, 221, 239);
          background-color: rgb(240, 242, 245);
        }
      }
    }
  }
}
</style>

<style lang="scss">
.bqbr-table {
  .el-dialog__header {
    text-align: center !important;
  }
  table {
    tr {
      td {
        .el-input > .el-input__inner,
        .el-textarea > .el-textarea__inner {
          border-radius: 0px;
        }
        .qrddz {
          margin: 0 auto;
          display: flex;
          .flex-block {
            flex-grow: 1;
            margin: 0px 20px;
            .address {
              display: inline-block;
            }
            .only-bottom-line {
              display: inline-block;
              width: calc(100% - 60px);
              .el-input__inner {
                border-style: none;
                border-bottom-style: solid;
                border-bottom-width: thin;
                border-bottom-color: rgb(68, 169, 241);

                border-radius: 0px;
                text-align: center;
              }
            }
          }
        }
        .el-date-editor {
          width: 200px;
        }
      }
    }
  }
}
</style>

