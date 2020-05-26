import {get as getProjection} from 'ol/proj'
import View from 'ol/View'
import Map from 'ol/Map'

/**
 * 地图初始化
 * @param containerId 容器id
 * @param centerCoor 中心点坐标（数组形式）
 * @param zoom       地图缩放级别
 * @param proj       地图坐标系
 * @returns {Map}    创建好的地图对象
 */
function init(containerId,centerCoor,zoom,proj){
  //坐标系
  const projection = proj||getProjection('EPSG:4326');
  //视图
  const view = new View({
    center:centerCoor||[0,0],
    projection:projection,
    zoom:zoom||0
  });
  //创建地图
  const map = new Map({
    target:containerId,
    view:view,
    controls: []
  });
  return map;
}
export default {
  init
}
