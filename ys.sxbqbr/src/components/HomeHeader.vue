<template>
  <el-col :span="24" class="header">
    <div class="logo">
      <img src="@/assets/images/head/logo.png"/>
    </div>
    <div class="userinfo-container">
      <el-dropdown trigger="click">
          <span class=" el-dropdown-link userinfo-text">
            <i class="el-icon-user-solid"></i>{{userName}}
            <i class="el-icon-caret-bottom"></i>
          </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <div @click="showInfo"><span style="color: #555;font-size: 14px;">个人信息</span></div>
          </el-dropdown-item>
          <el-dropdown-item>
            <div @click="changePWD"><span style="color: #555;font-size: 14px;">修改密码</span></div>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <change-password-dialog
      :pwdDialogVisible="pwdDialogVisible"
      @pwdDialogHide="dialogHide">
    </change-password-dialog>
    <user-info-dialog
      v-if="infoDialogVisible"
      :infoDialogVisible="infoDialogVisible"
      @infoDialogHide="dialogHide">
    </user-info-dialog>
  </el-col>
</template>

<script>
  import { delCookie} from '@/utils/cookie'
  import ChangePasswordDialog from "./common/changePasswordDialog";
  import UserInfoDialog from "./common/userInfoDialog";
    export default {
      name: "Header",
      components: {UserInfoDialog, ChangePasswordDialog},
      props: {
        userName: String,
      },
      data(){
          return {
            pwdDialogVisible:false,
            infoDialogVisible:false
          }
      },
      methods:{
        logout(){
          //清空所有当前用户数据
          this.$store.dispatch('user/logoutAct');
          document.cookie = "";  //退出系统前对cookie进行清空
          let redirectUrl = this.$store.state.user.loginUrl+ this.$store.state.user.systemUrl;
          window.location.href = this.$store.state.user.outLoginUrl+ redirectUrl;
        },
        changePWD(){
          this.pwdDialogVisible=true
        },
        dialogHide(){
          this.pwdDialogVisible=false;
          this.infoDialogVisible=false
        },
        showInfo(){
          this.infoDialogVisible=true
        }
      }
    }
</script>

<style scoped lang="scss">
  .header {
    height: 62px;
    line-height: 62px;
    background-color: #498DF0;
    padding: 0;
  }
  .logo {
    float: left;
    height: 62px;
    padding-left: 20px;
    >img{
      vertical-align: middle;
    }
  }
  .userinfo-container {
    float: right;
    padding-right: 30px;
    padding-left: 10px;
    height: 62px;
  .userinfo-text {
    color: #fff;
    cursor: pointer;
  }
  }
</style>
