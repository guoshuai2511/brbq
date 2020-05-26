<template>
    <div class="mapRightToolbar"
         @mouseenter="showEarthChange=true"
         @mouseleave="showEarthChange=false">
      <ul style="width: 100%">
        <li title="三维视图" @click=""></li>
      </ul>
    </div>
</template>

<script>

    export default {
      name: "ZhzsRightTool",
      props:{
        map:Object,
        ImgLayer:Object,
        TerLayer:Object,
      },
      data(){
          return {
            showEarthChange:false,
            isDixingtu:false
        }
      },
      methods:{
        //地形图、影像图切换
        changeTianditu(){
          this.isDixingtu=!this.isDixingtu;
          if(this.isDixingtu){
            // this.map.layer.addTianDiTuImgLayer('dixing');
            this.$emit('change','ter');
          }else{
            // this.map.layer.addTianDiTuImgLayer('yingxiang');
            this.$emit('change','img');
          }
        }
      },
    }
</script>

<style scoped lang="scss">
  .mapRightToolbar{
    position: absolute;
    right: 10px;
    bottom: 10px;
    height: auto;
    width: 30px;
    /*background: black;*/
    z-index: 1;
    ul{
      li{
        position: relative;
        float: right;
        margin-bottom: 5px;
        width: 30px;
        height: 30px;
        cursor: pointer;
        background-repeat: no-repeat;
        background-size: contain;
      }
      li:nth-child(1){
        background-image: url("../../assets/images/map/earth0.png");
      }
      li:nth-child(2){
        background-image: url("../../assets/images/map/earth0.png");
      }
      li:nth-child(1):hover{
        background-image: url("../../assets/images/map/earth.png");
      }
      li:nth-child(2):hover{
        background-image: url("../../assets/images/map/earth.png");
      }
    }
  }
</style>
