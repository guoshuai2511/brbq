<template>
  <div class="popPage" :id="id">
    <div class="popPage-header">
      <label>{{featureData.zhdmc}}</label>
      <i class="el-icon-close" @click="closePopup"></i>
    </div>
    <div class="popPage-content">
      <div><label>隐患点名称：</label><span>{{featureData.zhdmc}}</span></div>
      <div><label>隐患位置：</label><span>{{featureData.dlwz}}</span></div>
      <div><label>已搬迁户数：</label><span>{{featureData.ybqhs}}</span></div>
      <div><label>已搬迁人数：</label><span>{{featureData.ybqrs}}</span></div>
      <div><label>迁入地址：</label><span>{{featureData.qrdz}}</span></div>
      <div class="detail" @click="showInfo(featureData.id)">查看详情</div>
    </div>
    <!-- 详情弹窗 -->
    <el-dialog title="数据详情查看"
               :visible.sync="panelShow"
               v-if="panelShow"
               width="62%"
               append-to-body
               custom-class="panelClass"
               :close-on-click-modal="false"
               :before-close="panelClose">
      <bqbr-form :isSaveClick="isSaveClick" :rowData="rowData" @operateFormData="editBqbrForm"></bqbr-form>
    </el-dialog>
  </div>
</template>

<script>
  import Overlay from 'ol/Overlay';
  import BqbrForm from "../common/bqbrForm";
  import {getBqbrmx} from "../../api/sjlr";
  export default {
    name: "popover",
    components: {BqbrForm},
    data(){
      return {
        overlay: null,
        panelShow:false,
        rowData:{}
      }
    },
    props:{
      featureData: Object,
      position:Array,
      map:Object,
      id:String
    },
    mounted() {
      if (this.map && !this.overlay) {
        this.overlay = new Overlay({
          element: document.getElementById(this.id),
          autoPan: true,
          autoPanAnimation: {
            duration: 250
          }
        });
        this.overlay.setPosition(undefined);
        this.map.map.addOverlay(this.overlay);
        this.map.popup = this.overlay;
      }
    },
    watch:{
      position(newP){
        this.overlay.setPosition(newP);
      },
      map(map){
        if(map&&!this.overlay){
          this.overlay = new Overlay({
            element: document.getElementById(this.id),
            autoPan: true,
            autoPanAnimation: {
              duration: 250
            }
          });
          this.overlay.setPosition(undefined);
          this.map.map.addOverlay(this.overlay);
          this.map.popup = this.overlay;
        }
      }
    },
    methods:{
      closePopup(){
        this.overlay.setPosition(undefined);
        return false;
      },
      showInfo(id){
        let params={id:id};
        getBqbrmx(params).then(res=>{
          this.rowData=res.result
        });
        this.panelShow = true;
      },
      panelClose(){
        this.panelShow = false;
      },
      editBqbrForm(){
      }
    }
  }
</script>

<style scoped lang="scss">
  .popPage{
    position: absolute;
    background-color: #FFFFFF;
    -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
    filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
    bottom: 28px;
    left: -47px;
    width: 280px;
    height: 240px;
    border-radius: 4px;
    .popPage-header{
      height: 32px;
      width: 100%;
      background: #498DF0;
      border-radius: 3px 3px 0 0;
      >label{
        display: inline-block;
        float: left;
        height: 32px;
        line-height: 32px;
        padding-left: 10px;
        width: calc(100% - 62px);
        color: #fff;
        font-size: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      >i{
        float: right;
        height: 18px;
        line-height: 18px;
        width: 18px;
        text-align: center;
        margin: 7px 10px;
        color: #fff;
        cursor: pointer;
      }
    }
    .popPage-content{
      height: calc(100% - 52px);
      width: calc(100% - 20px);
      padding: 10px;
      border-radius: 3px 3px 0 0;
    }
  }
  .popPage:before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  .popPage:after {
    border-top-color: #FFFFFF;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
  }
  .popPage:before {
    border-top-color: #FFFFFF;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
  }
  .detail{
    text-align: right;
    color: #4194ff;
    cursor: pointer;
    margin-right: 0;
    margin-top: 10px;
  }
  /deep/ .panelClass{
    margin: 100px auto!important;
    height: calc(100% - 200px);
  }
</style>
