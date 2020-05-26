import Feature from 'ol/Feature';
import LineString from 'ol/geom/LineString';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';

function Polyline(map){
  this.map = map;
}
Polyline.prototype.addPolyline = function(data,layer,styleObj){
  let polylineLayer = layer;
  //实例化Vector要素，通过矢量图层添加到地图容器中
  let feature = new Feature({
    geometry: new LineString(data,'XY')
    //标注信息
    // markerInfo: markerInfo||''
  });
  feature.setStyle(styleFunction(styleObj));
  let source = polylineLayer.getSource();
  source.addFeature(feature);
}
let styleFunction = function(styleObj) {
  const style = new Style({
    stroke: new Stroke({
      color: styleObj.color||'#FFFFFF',
      width: styleObj.width||1,
      lineDash:[1,2,3,4,5,6]
    })
  });
  return style;
};
export default Polyline
