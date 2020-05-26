<template>
  <div class="img-list"
       v-loading.fullscreen.lock="loading"
       element-loading-text="文件正在加载中，请稍等..."
       element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="img-li-box" v-for="(item,key) in imgList" :key="key">
      <img class="img-li-b--url" :src="item.url">

      <!-- 放大icon -->
      <div class="img-li-b--layer">
        <i @click="handleFileEnlarge(item)" class="el-icon-view"></i>
        <i @click="handleFileRemove(item,key)" class="el-icon-delete"></i>
        <span>{{item.name}}</span>
      </div>
    </div>

    <!-- 上传进度 -->
    <div v-if="!pass && progress !== 0" class="img-li-box img-li-b--progress">
      <el-progress type="circle" :percentage="progress" :color="colors"></el-progress>
    </div>

    <!-- 其他类型上传按钮 -->
    <div class="img-li-b--upload">
      <el-upload class="img-li-b--upl--field"
                 ref="upload"
                 name="files"
                 list-type="picture-card"
                 :show-file-list="false"
                 :action="params.action"
                 :headers="params.tokenData"
                 :data="params.data"
                 :on-change="uploadOnChange"
                 :on-success="uploadOnSuccess">
        <i slot="default" class="el-icon-upload" @click="upFiles"></i>
      </el-upload>
    </div>

    <!-- 放大弹窗 -->
    <el-dialog :title="filePanelTitle"
               :visible.sync="isEnlargeImage"
               v-if="isEnlargeImage"
               append-to-body
               top="50px"
               width="66%">
      <div class="fileDisplay" style="width: 100%;max-height: 609px;">
        <img @click="isEnlargeImage=false" v-if="showStatus" :src="enlargeImage" style="width: 100%; max-height: 609px;">
        <iframe :src="enlargeImage" v-else style="height: 609px;width: 100%;border: none;"></iframe>
      </div>
    </el-dialog>
    <el-dialog
      :title="filePanelTitle"
      :visible.sync="showVideo"
      v-if="showVideo"
      append-to-body
      top="50px"
      width="66%">
      <sp-container
        :spData="spItem"
        spglType="spgl-vedio"
        ref="spitem"
      ></sp-container>
    </el-dialog>
  </div>
</template>

<script>
  import {searchFileList,delFile,imgFileLook,downloadFile} from '@/api/fileUpOrDownload'
  import spContainer from "./spContainer"
  export default {
    name: 'upload-list',
    components:{
      spContainer
    },
    props: {
      formName: String,
      btnName: String,
      ywbh: String,
    },
    data() {
      return {
        progress: 0, //上传进度
        pass: null, //是否上传成功
        isEnlargeImage: false, //放大图片
        enlargeImage: '', //放大图片地址
        imgList: [],
        fileAccept: '',
        showStatus: true,
        showVideo:false,
        spItem:{WJLJ:"",SLT:""},
        loading: false,
        params: {
          tokenData: null,
          action: 'api/ms-fileupdoload/updownLoad/Upload',
          data: {
            json: null,
            url: "",
          }
        },
        colors: [
          {color: '#f56c6c', percentage: 20},
          {color: '#e6a23c', percentage: 40},
          {color: '#5cb87a', percentage: 60},
          {color: '#1989fa', percentage: 80},
          {color: '#6f7ad3', percentage: 100}
        ]
      }
    },
    watch: {
      ywbh(){
        if(this.ywbh !== ""&&this.ywbh !== undefined){
          this.searchFiles();
        }
      }
    },
    methods: {
      upFiles(){//文件上传前，添加上传参数
        let token = this.$store.state.user.token;
        this.params.tokenData = {Authorization: token};

        this.params.data.json = JSON.stringify([{
          ywjlzj: this.ywbh,
          ywjlbm: this.formName,
          ywjlzdm: this.btnName,
        }]);
        this.params.data.url = '灾险情管理/'+ this.btnName +'/';
      },
      uploadOnChange(file) { //监听上传变化
        if (file.status === 'ready') {
          console.log("ready");
          this.pass = null;
          this.progress = 0;

          const interval = setInterval(() =>{
            if(this.progress >= 96){
              clearInterval(interval);
              return
            }
            this.progress += 1;
          },20);
        } else if (file.status === 'fail') {
          this.$message.error("图片上传出错，请刷新重试！")
        }
      },
      uploadOnSuccess(res, file) { //上传附件
        if(res.status){
          let fileInfo = res.result[0];
          let url = '/DisasterManageSystem/api/ms-fileupdoload/gzdzFile/' + fileInfo.wjlj.replace('/home/file/','');
          this.progress = 100;
          this.pass = true;
          this.$message.success("上传成功");
          let info = {
            name: file.name,  //文件名称
            serverUrl: url,  //服务器上的图片路径
            type: fileInfo.wjlx,  //文件类型，jpg、png、pdf等
            wjid: fileInfo.wjid,  //返回的文件id
          };

          //处理图标问题
          let imgType = ["jpg","jpeg","png","bmp","avi","rmvb","flv","mp4","3gp"];
          //将大写文件格式统一转成小写
          fileInfo.wjlx = fileInfo.wjlx.toLowerCase();
          console.log('type', fileInfo.wjlx);
          if(imgType.indexOf(fileInfo.wjlx) >= 0) {
            info['url'] = '/DisasterManageSystem/api/ms-fileupdoload/gzdzFile/' + fileInfo.slt.replace('/home/file/','');  //缩略图路径
          }else{
            info['url'] = this.setFileType(fileInfo.wjlx);
          }
          this.imgList.push(info);
        }else{
          this.$message({message: "图片上传出错，请重试！", type: 'error'});
          this.pass = true;
        }
      },
      handleFileEnlarge(info) { //放大图片
        this.filePanelTitle = info.name;
        let imgTypeOne = ["jpg","jpeg","png","bmp","avi","rmvb","flv","mp4","3gp"];  //图片、视频类型
        let imgTypeTwo = ["avi","rmvb","flv","mp4","3gp"];  //视频类型
        //将大写文件格式统一转成小写
        info.type = info.type.toLowerCase();
        if(imgTypeTwo.indexOf(info.type) >= 0){
          this.showVideo=true;
          this.spItem.WJLJ=info.serverUrl;
          this.spItem.SLT=info.url;
          // this.$refs.spitem.initData()
        }else if(imgTypeOne.indexOf(info.type) >= 0) {
          //判断是否是视频
          // 图片
            this.showStatus = true;
            this.enlargeImage = info.serverUrl;

          this.isEnlargeImage = !this.isEnlargeImage;
        }else if(info.type === 'pdf'){
          this.showStatus = false;
          this.enlargeImage = '/static/pdfjs/web/viewer.html?file='+ encodeURIComponent(info.serverUrl);
          this.isEnlargeImage = !this.isEnlargeImage;
        }else{  //其他类型的文件统一进行下载
          this.loading = true;
          let params = {wjid: info.wjid};
          downloadFile(params).then(res =>{
            const content = res;
            const blob = new Blob([content]); // 构造一个blob对象来处理数据
            const fileName = info.name;

            const link = document.createElement('a'); // 创建a标签
            link.download = fileName; // a标签添加属性
            link.style.display = 'none';
            link.href = URL.createObjectURL(blob);
            document.body.appendChild(link);
            link.click(); // 执行下载
            URL.revokeObjectURL(link.href); // 释放url
            document.body.removeChild(link); // 释放标签
            this.loading = false;
          });
        }
      },
      handleFileRemove(file, i) { //删除图片
        if (!file.url) {
          return false;
        }
        let that = this;
        this.$confirm('是否删除此文件？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            wjids: file.wjid
          };
          delFile(params).then(res => {
            if (res.status) {
              that.imgList.splice(i, 1);
              this.$message({
                type: 'success',
                message: '删除成功!',
              });
            }
          })
        }).catch((meg) => console.log(meg))
      },
      searchFiles(){  //查询文件列表
        let params = {
          generalParamOne: this.ywbh,
          generalParamTwo: this.formName,
          generalParamThree: this.btnName,
        };
        searchFileList(params).then(res =>{
          console.log(res);
          if(res.status){
            res.result.forEach(item =>{
              let name = item.yswjm + "." + item.wjlx;
              let url = '/DisasterManageSystem/api/ms-fileupdoload/gzdzFile/' + item.wjlj.replace('/home/file/','');  //图片路径
              let info = {
                name: name,  //文件名称
                serverUrl: url,  //服务器上的图片路径
                type: item.wjlx,  //文件类型，jpg、png、pdf等
                wjid: item.wjid,  //返回的文件id
              };

              //处理图标问题
              let imgType = ["jpg","jpeg","png","bmp","avi","rmvb","flv","mp4","3gp"];
              //将大写文件格式统一转成小写
              item.wjlx = item.wjlx.toLowerCase();
              console.log('type', item.wjlx);
              if(imgType.indexOf(item.wjlx) >= 0) {
                info['url'] = '/DisasterManageSystem/api/ms-fileupdoload/gzdzFile/' + item.slt.replace('/home/file/','');  //缩略图路径
              }else{
                info['url'] = this.setFileType(item.wjlx);
              }

              this.imgList.push(info);
            });
          }
        });
      },
      setFileType(type){ //处理文件类型，并匹配对应的图标
        let iconLink = "";
        if(type === 'pdf'){
          iconLink = '../../../static/iconList/pdfIcon.png';
        }else if(type === 'xlsx'||type === 'xls'){
          iconLink = '../../../static/iconList/excelIcon.png';
        }else if(type === 'docx'||type === 'doc'){
          iconLink = '../../../static/iconList/wordIcon.png';
        }else if(type === 'pptx'||type === 'ppt'){
          iconLink = '../../../static/iconList/pptIcon.png';
        }else if(type === 'zip'||type === 'rar'||type === '7z'){
          iconLink = '../../../static/iconList/rarIcon.png';
        }else if(type === 'txt'){
          iconLink = '../../../static/iconList/txtIcon.png';
        }else if(type === 'mp3'||type === 'wma'){
          iconLink = '../../../static/iconList/mp3Icon.png';
        }else{
          iconLink = '../../../static/iconList/otherIcon.png';
        }

        return iconLink;
      }
    },
    mounted(){
      if(this.ywbh !== ""&&this.ywbh !== undefined){
        this.searchFiles();
      }
    }
  }
</script>

<style lang="scss">
  .img-list {
    overflow: hidden;
    width: 100%;
    padding: 4px 0;

    //调整上传按钮样式
    .el-upload--picture-card{
      height: 68px;
      width: 68px;
      line-height: 66px;
      border-radius: 8px;
      text-align: center;
      >i{
        line-height: 66px;
      }
      >i:hover{
        color: #409EFF;
      }
    }

    // 文件列表
    .img-li-box {
      float: left;
      text-align: left;
      position: relative;
      display: inline-block;
      width: 68px;
      height: 68px;
      margin-right: 10px;
      border-radius: 4px;
      transition: all .3s;

      // 图片
      .img-li-b--url {
        display: block;
        width: 100%;
        height: 68px;
        margin: 0 auto;
        border-radius: 4px;
      }

      // 底部
      .img-li-b--bottom {
        margin-top: 10px;

        // 名称
        .img-li-b--name {
          width: 90%;
          text-overflow: ellipsis;
          overflow: hidden;
          height: 25px;
          line-height: 25px;
        }
      }

      // 删除按钮
      .img-li-b--delete {
        position: absolute;
        bottom: 10px;
        right: 10px;
        color: #8492a6;
        cursor: pointer;
        font-size: 1.1em;
      }

      // 放大遮罩层
      .img-li-b--layer {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        color: #fff;
        text-align: center;
        z-index: 5;
        border-radius: 4px;
        background-color: rgba(0, 0, 0, .4);

        // 放大按钮
        i {
          margin: 16px 5px 0 5px;
          font-size: 14px;
        }
        span{
          display: inline-block;
          height: 16px;
          line-height: 16px;
          width: 62px;
          margin: 18px 3px 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .img-li-b--delete,
      .img-li-b--layer {
        opacity: 0;
        transition: all .3s;
      }

      // 悬浮可见删除 or 放大按钮
      &:hover {
        .img-li-b--delete,
        .img-li-b--layer {
          opacity: 1;
        }
      }

      // 上传进度
      &.img-li-b--progress {
        text-align: center;
        width: 66px;
        .el-progress-circle{
          width: 66px!important;
          height: 66px!important;
        }
      }
    }
  }
</style>
