<template>
    <el-dialog
      title="修改密码"
      :close-on-click-modal="false"
      :visible="pwdDialogVisible"
      append-to-body
      top="13%"
      width="25%"
      destroy-on-close
      :before-close="dialogHide">
       <el-form :model="form" label-width="120px" size="small" :rules="rules" ref="pwdForm">
         <el-form-item label="输入旧密码：" prop="oldPassword">
           <el-input  show-password v-model="form.oldPassword"></el-input>
         </el-form-item>
         <el-form-item label="输入新密码：" prop="newPassword">
           <el-input  show-password v-model="form.newPassword"></el-input>
         </el-form-item>
         <el-form-item label="确认新密码：" prop="confirmPassword">
           <el-input  show-password v-model="form.confirmPassword"></el-input>
         </el-form-item>
       </el-form>
      <div  class="footer">
        <el-button type="primary" size="small"  @click="changePassword">保存</el-button>
        <el-button type="info" size="small" @click="dialogHide">关闭</el-button>
      </div>
    </el-dialog>
</template>

<script>
    import {updatePassword} from "../../api/changePwd";

    export default {
      name: "changePasswordDialog",
      props:{
         pwdDialogVisible:Boolean,
      },
      data(){
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.form.newPassword) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
          return{
            form:{
              oldPassword:"",
              newPassword: "",
              confirmPassword:"",
            },
            rules: {
              oldPassword: [
                { required: true, message: '请输入旧密码', trigger: 'blur' },
                { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
              ],
              newPassword: [
                { message: '请输入密码', trigger: 'blur',required: true,},
                { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
              ],
              confirmPassword: [
                {required: true,validator: validatePass2, trigger: 'blur'},
              ],
            }
          }
      },
      methods:{
          changePassword(){
            this.$refs["pwdForm"].validate((valid) => {
              if (valid) {
                let params={
                  "userId": this.$store.state.user.userInfo.yhid,
                  "oldPassword": this.form.oldPassword,
                  "newPassword": this.form.newPassword,
                };
                updatePassword(params).then(res=>{
                  if(res){
                    this.$message({message:res.message,type:"success"});
                      this.dialogHide()
                  }
                })
              } else {
                console.log('error submit!!');
                return false;
              }
            });

          },
        dialogHide(){
            this.$emit("pwdDialogHide")
        }
      }
    }
</script>

<style scoped>
  /deep/ .el-dialog__header {
    /*padding:0;*/
    background-color: #498DF0;
    height: auto;
  }
  /deep/ .el-dialog__body {
    padding: 30px 40px 30px 10px;
  }
  .footer{
    padding-top: 20px;
    text-align: right;
  }
</style>
