import 'ol/ol.css'

import ysLayer from './layer'
import ysMap from './map'
import ysMarker from './marker'
import ysFormat from './format'
import ysPolygon from './polygon'
import ysPolyline from './polyline'

function Map(containerId,centerCoor,zoom,proj){
  this.map = ysMap.init(containerId,centerCoor,zoom,proj);
  this.view = this.map.getView();
  this.layer = new ysLayer(this.map);
  this.marker = new ysMarker(this.map);
  this.format = new ysFormat(this.map);
  this.polygon = new ysPolygon(this.map);
  this.polyline = new ysPolyline(this.map);
}

/**
 * 设置显示中心
 * @param lon 经度
 * @param lat 纬度
 * @param zoom 缩放级别
 */
Map.prototype.setCenter = function(lonlat,zoom){
  this.view.setCenter(lonlat);
  if(zoom){
    this.view.setZoom(zoom);
  }

};

Map.prototype.panTo = function(lonlat,zoom){
  if(zoom){
    this.view.setZoom(zoom);
  }
  this.view.animate({
    center: lonlat,
    duration: 1000
  });

};


export default Map
