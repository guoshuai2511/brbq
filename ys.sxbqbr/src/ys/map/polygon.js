import Feature from 'ol/Feature';
import Poly from 'ol/geom/Polygon';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

function Polygon(map){
  this.map = map;
}
Polygon.prototype.addPolygon = function(data,layer,styleObj){
  let polygonLayer = layer;
  //实例化Vector要素，通过矢量图层添加到地图容器中
  let feature = new Feature({
    geometry: new Poly(data)
    //标注信息
    // markerInfo: markerInfo||''
  });
  feature.setStyle(styleFunction(styleObj));
  let source = polygonLayer.getSource();
  source.addFeature(feature);
}
let styleFunction = function(styleObj) {
  const style = new Style({
    stroke: new Stroke({
      color: styleObj.borderColor||'#FFFFFF',
      width: 1
    }),
    fill: new Fill({
      color: styleObj.color||"rgba(255,255,255,0.5)"
    })
  });
  return style;
};
export default Polygon
