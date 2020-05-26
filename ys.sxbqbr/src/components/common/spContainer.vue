<template>
  <div class="grid-content">
    <video-player  class="video-player vjs-custom-skin"
                   :class="spglType?'spgl-vedio':''"
                   ref="videoPlayer"
                   :playsinline="true"
                   :options="playerOptions"
    ></video-player>
  </div>
</template>

<script>
  import { videoPlayer } from 'vue-video-player'
  import 'video.js/dist/video-js.css'

  export default {
    name: "SyZxsp",
    props:['spData','spglType'],
    data(){
      return{
        playerOptions : {
          playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            src: "../../../static/test.mp4",  // 路径
            type: 'video/mp4'  // 类型
          }],
          poster: "../../../static/image/test.png", //你的封面地址
          // width: document.documentElement.clientWidth,
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true  //全屏按钮
          }
        }
      }
    },
    components: {
      videoPlayer
    },
    watch:{
      spData(){
        if(this.spData){
          console.log("spData",this.spData)
          this.initData()
        }
      }
    },
    methods:{
      initData(){
        // this.playerOptions.sources[0].src=this.spData.WJLJ;
        console.log(this.spData)
        if(this.spData.WJLJ){
          // this.playerOptions.sources[0].src="http://106.54.169.203:7101/api/ms-fileupdoload/gzdzFile/"+this.spData.WJLJ.replace('/home/file/','');
          this.playerOptions.sources[0].src=this.spData.WJLJ
          if(this.spData.SLT){
            // this.playerOptions.poster="http://106.54.169.203:7101/api/ms-fileupdoload/gzdzFile/"+this.spData.SLT.replace('/home/file/','');
            this.playerOptions.poster=this.spData.SLT
          }
        }

        // let param={
        //   wjid:this.spData
        // }
        // Download(param).then(res=>{
        //   console.log(res)
        //   this.playerOptions.sources[0].src=res
        // })
      }
    },
    mounted(){
      this.initData()
    }
  }
</script>

<style scoped>
  .grid-content {
    position: relative;
    height: 100% ;
    font-size: 14px;
    overflow: hidden;
  }

</style>
<style lang="scss">
  .video-js .vjs-big-play-button{
    height: 2em;
    line-height: 2em;
    width: 2em;
    left: calc(50% - 1em);
    top: calc(50% - 1em);
    border-radius: 1em;
    /*top: 1em;*/
    span{
      font-size: 24px;
    }
  }
  .spgl-vedio .video-js .vjs-big-play-button{
    height: 1.5em;
    line-height: 1.5em;
    width: 1.5em;
    left: calc(50% - 0.75em);
    top: calc(50% - 0.75em);
    border-radius: 0.75em;
  }
  .video-js.vjs-fluid, .video-js.vjs-16-9, .video-js.vjs-4-3{
    height: 100% !important;
  }
  .video-player.video-player.vjs-custom-skin{
    position: relative;
    height: 100%;
    width: 100%;
  }
  .video-js .vjs-big-play-button{

  }
  .video-js .vjs-control{
    width: 3em;
  }
  .vjs-poster{
    background-color: transparent;
  }
  .vjs_video_3-dimensions.vjs-fluid{
    padding-top: 52% !important;
  }
  .vjs-error .vjs-error-display .vjs-modal-dialog-content{
    font-size: 1.2em;
  }
  .vjs_video_433-dimensions.vjs-fluid{
    padding-top: 52% !important;
  }
</style>
