<template>
  <div id="mapId" class="ys-map">
    <map-earth-change-tool></map-earth-change-tool>
    <map-search-tool :keywordsf="keyWords" :xzqhf="xzqh" :gmdhf="gmdj" :xqdjf="xqdj" :zhlxf="zhlx" @initData="addMarkers" @change="change"></map-search-tool>
    <popover :featureData="featureData" :map="map" :id="popupId" :position="popupPosition"></popover>
  </div>
</template>

<script>
  import YsMap from '@/ys/map'
  import popover from '@/components/map/popover'
  import MapEarthChangeTool from '@/components/map/MapEarthChangeTool'
  import MapSearchTool from '@/components/map/MapSearchTool'
  import {getBoundaryData,getCenterData} from "../../../static/tempData/boundaryData"
  import {listBqbrPointByParams} from "../../api/symap";

  export default {
    name: "OlMap",
    data(){
      return{
        map: null,
        geoLayer: null,  //边界图层
        popupId:'popup' + Math.random()*100,
        popupPosition: undefined,
        featureData: {},
        mapData: [
          // {lon: 112.664,lat: 35.62,yhdMc: "谢家岩崩塌",gcbh: 2323,gcmc: "测试工程名称",gcwz: "测试位置1",jsje: 111,lx: "01"},
          // {lon: 112.167,lat: 35.533,yhdMc: "董封乡崩塌",gcbh: 3423,gcmc: "撒谎房价多少",gcwz: "测试位置2",jsje: 101,lx: "02"},
          // {lon: 112.271,lat: 35.421,yhdMc: "驾领乡崩塌",gcbh: 24325,gcmc: "测试工程名称",gcwz: "测试位置3",jsje: 63,lx: "01"},
          // {lon: 113.070,lat: 35.749,yhdMc: "北诗镇崩塌",gcbh: 12343,gcmc: "iwrhjshfd",gcwz: "测试位置4",jsje: 32,lx: "02"},
          // {lon: 112.791,lat: 35.666,yhdMc: "大阳镇崩塌",gcbh: 24354,gcmc: "dsjfhj",gcwz: "测试位置5",jsje: 87,lx: "01"},
          // {lon: 112.81,lat: 35.414,yhdMc: "道口村崩塌",gcbh: 65876,gcmc: "测试工程名称",gcwz: "测试位置6",jsje: 101,lx: "02"},
        ],
        keyWords:"",
        xzqh:"",
        zhlx:"",
        gmdj:"",
        xqdj:"",
      }
    },
    components:{
      popover,
      MapEarthChangeTool,
      MapSearchTool,
    },
    methods:{
      /**
       * 地图初始化
       */
      initMap(){
        const center = getCenterData('140500');
        this.map = new YsMap("mapId",center,8);
        this.map.layer.addTianDiTuImgLayer();
        this.geoLayer = this.map.layer.createVectorLayer('boundary');
        this.markerLayer = this.map.layer.createVectorLayer('marker'); //marker图层
        this.addBoundary();
        let _this = this;
        this.map.map.on('click', function(evt) {
          let feature = _this.map.map.forEachFeatureAtPixel(evt.pixel, function (feature) {
            return feature;
          });
          if (feature) {
            //当前要素的具体信息
            let markerInfo = feature.get('markerInfo')||'';
            console.log("地图点击",markerInfo);
            if(markerInfo&&markerInfo !== ""){
              _this.featureData = markerInfo;
              let lon = _this.featureData.x;
              let lat = _this.featureData.y;
              _this.popupPosition = [lon, lat];
            }
          }
        });
      },
      /**
       * 显示边界
       **/
      addBoundary() {
        let tempData = getBoundaryData('140500');
        let featuresObj = this.map.format.converGeoJsonToFeature(tempData);
        let center = getCenterData('140500');
        let source = this.geoLayer.getSource();
        source.clear();
        source.addFeatures(featuresObj);
        this.map.setCenter(center, 9);
      },
      /**
       * 批量添加marker
       */
      addMarkers(){
        let params={
          "searchParams":this.keyWords,  //搜索框
          "generalParamOne":this.xzqh?this.xzqh: this.$store.state.user.userInfo.xzqhdm, //行政区划
          "generalParamTwo":this.zhlx, //灾害类型
          "generalParamThree":this.gmdj,//规模等级
          "generalParamFour":this.xqdj//险情等级
        };
        listBqbrPointByParams(params).then(res=>{
          this.mapData=res.result
        }).then(()=>{
          //每次调用该函数，就对marker图层进行清理
          this.markerLayer.getSource().clear();
          //批量打点
          let _this = this;
          let lon = null;
          let lat = null;
          let imgUrl = null;
          this.mapData.forEach(item =>{
            lon = item.x;
            lat = item.y;
            imgUrl = "../../../static/marker/ban-icon.png";
            _this.map.marker.addMaker(lon,lat,this.markerLayer,{imgUrl:imgUrl,scale:0.7,rotate:1},item);
          });
        })
      },
      change(tab,val){
        switch (tab) {
          case "xzqh":
            this.xzqh=val;
            break;
          case "zhlx":
            this.zhlx=val;
            break;
          case "gmdj":
            this.gmdj = val;
            break;
          case "xqdj":
            this.xqdj = val;
            break;
          case "keywords":
            this.keyWords = val;
            break;
        }
      }
    },
    mounted(){
      this.initMap();
      this.addMarkers();
    }
  }
</script>

<style scoped lang="scss">
  .ys-map {
    position: relative;
    height: 100%;
    width:100%;
    background-color: #e5e5e5;
  }
</style>
