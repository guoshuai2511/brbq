import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

function Marker(map){
  this.map = map;
}
Marker.prototype.addMaker = function(lon,lat,layer,styleObj,markerInfo){
  let markerLayer = layer;
  //实例化Vector要素，通过矢量图层添加到地图容器中
  let feature = new Feature({
    geometry: new Point([lon,lat]),
    //标注信息
    markerInfo: markerInfo||''
  });
  feature.setStyle(createMarkerStyle(styleObj));
  let source = markerLayer.getSource();
  source.addFeature(feature);
}
function createMarkerStyle(styleObj){
  let style = {};
  //图标
  if(styleObj.imgUrl){
    let offsetX = styleObj.imgOffsetX || 0;
    let offsetY = styleObj.imgOffsetY || 0;
    style.image = new Icon({
      // anchor: [0.5, 20],
      // //设置图标点
      // anchor: [1, 80],
      // //图标起点
      // anchorOrigin: 'top-left',
      // //指定x值为图标点的x值
      // anchorXUnits: 'fraction',
      // //指定Y值为像素的值
      // anchorYUnits: 'pixels',
      // //偏移
      // offsetOrigin: 'top-left',
      scale:styleObj.scale||1,
      src:styleObj.imgUrl,
      offset:[offsetX,offsetY]
    });
  }else{
    style.fill = new Fill({
      color:styleObj.pFillColor||'#b8110b'
    });
    style.stroke = new Stroke({
      color:styleObj.pBorderColor||'#FFFFFF',
      width: styleObj.pBorderWidth||'2'
    });
  }
  // if(){
  //
  // }
  return new Style(style);
}
function getVectorLayer(layerName,layerZIndex,marker) {
  let markerLayer;
  if(!layerName){//若没有传图层名 则使用默认值
    layerName = 'ysMarkerLayer';
  }
  markerLayer = marker.map.layer.getLayerByName(layerName); //根据图层名获取图层
  if(!markerLayer){//判断图层是否存在
    markerLayer = marker.map.layer.createVectorLayer();
    markerLayer.set('layerName',layerName,true);
  }
  markerLayer.setZIndex(layerZIndex);
  return markerLayer;
}

export default Marker
