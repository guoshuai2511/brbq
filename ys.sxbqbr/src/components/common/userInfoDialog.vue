<template>
  <el-dialog
    title="用户信息"
    :close-on-click-modal="false"
    :visible="infoDialogVisible"
    append-to-body
    top="10%"
    width="40%"
    destroy-on-close
    :before-close="dialogHide">
    <div class="panel-content">
      <el-form label-width="110px" size="mini"  :model="userData" ref="userDataForm">
        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item label="用户名:" prop="yhm" >
              <el-input v-model="userData.yhm" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别:" prop="xb" >
              <el-radio-group v-model="userData.xb" disabled>
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item label="姓名:" prop="zsxm">
              <el-input v-model="userData.zsxm" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话:" prop="dh">
              <el-input v-model="userData.dh" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item label="所属行政区划:" prop="xzqhdm">
              <el-input v-model="userData.xzqhm" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱:" prop="yx">
              <el-input v-model="userData.yx" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item label="用户组:" prop="yhz">
              <el-select v-model="userData.yhz" style="width: 100%" disabled>
                <el-option
                  v-for="item in yhzOption"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户类型:" prop="yhlx">
              <el-select v-model="userData.yhlx" style="width: 100%" disabled>
                <el-option
                  v-for="item in yhlxOption"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="12">
            <el-form-item label="通讯地址:" prop="xjzd">
              <el-input v-model="userData.xjzd" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="激活状态:" prop="jhzt">
              <el-radio-group v-model="userData.jhzt" disabled>
                <el-radio :label="1">激活</el-radio>
                <el-radio :label="0">锁定</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="footer"><el-button type="info" size="small" @click="dialogHide">关闭</el-button></div>
  </el-dialog>
</template>

<script>
    export default {
        name: "userInfoDialog",
      props:{
        infoDialogVisible:Boolean
      },
      data(){
          return{
            userData:{},
            yhlxOption: [{id: "AA", label: "系统管理员"}, {id: "AB", label: "普通管理员"}, {id: "BB", label: "普通用户"},{id: "AP", label: "App用户"},
              {id: "C1", label: "省级管理员"}, {id: "C2", label: "市级管理员"}, {id: "C3", label: "县级管理员"},
              {id: "C4", label: "乡级管理员"},{id: "C5", label: "村级管理员"},
              {id: "D1", label: "乡镇分管领导"},{id: "D2", label: "国土所长"},{id: "D3", label: "村干部"},{id: "D4", label: "技术保障人员"},
              {id: "D5", label: "群测群防员"},{id: "YQ", label: "设备厂家用户"},],
            yhzOption: [{id: 'A', label: "系统管理员组"}, {id: "B", label: "省级管理员组"},{id: "C", label: "市级管理员组"},
              {id: "D", label: "县级管理员组"},{id: "E", label: "普通管理员组"},{id: "F", label: "普通用户组"},
              {id: "G", label: "App用户组"},{id: "H", label: "设备厂家组"},{id: "I", label: "协作公司组"},],
            treeData:[],
            jobOptionData:[]
          }
      },
      methods:{
        dialogHide(){
          this.$emit("infoDialogHide")
        }
      },
      mounted(){
          this.userData=this.$store.state.user.userInfo
        console.log(this.userData)
      }
    }
</script>

<style scoped>
  /deep/ .el-dialog__body {
    padding: 30px 40px 30px 10px;
  }
  .footer{
    padding-top: 20px;
    text-align: right;
  }
</style>
