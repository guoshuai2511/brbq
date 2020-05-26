import TileLayer from 'ol/layer/Tile'
import WMTS from 'ol/source/WMTS'
import TileWMS from 'ol/source/TileWMS'
import XYZ from "ol/source/XYZ";
import TileImage from "ol/source/TileImage";
import Source from "ol/source/Source";
import VectorSource from 'ol/source/Vector';
import ImageStatic from 'ol/source/ImageStatic';
import VectorLayer from "ol/layer/Vector";
import ImageLayer from 'ol/layer/Image';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style';
import Circle from 'ol/style/Circle';
import {Draw, Modify, Snap} from 'ol/interaction';
import {transformExtent} from 'ol/proj';
import olTilegrid from 'ol/tilegrid/TileGrid'
function Layer(map){
  this.map = map;
}

Layer.prototype.addGoogleImageLayer = function(){
  /*定义谷歌地球分辨率与瓦片网格*/
  var maxResolution = 180.0 / 256;
  var resolutions = [];
  for (var i = 1; i <= 20; i++) {
    resolutions[i] = Math.pow(2, 1 - i) * maxResolution;
  }

  var tilegrid = new olTilegrid({
    // extent:[-180,-90,180,90],
    origin: [-464.7383, -206.30749],
    resolutions: resolutions
  });

  /*加载谷歌地球瓦片不能用ol.source.XYZ，ol.source.XYZ针对谷歌地图（注意：是谷歌地图）而设计，
            而谷歌地球与谷歌地图用不同的投影、分辨率和瓦片网格。因此这里使用ol.source.TileImage来自行指定
            投影、分辨率、瓦片网格。*/
  var source = new TileImage({
    tileGrid: tilegrid,
    tileUrlFunction: function(tileCoord, pixelRatio, proj) {
      var z = tileCoord[0];
      var x = tileCoord[1];
      /*由于OpenLayers5依然没有提供定义瓦片网格编号在X/Y轴上增长方向的入口.
                    这里用了个小技巧来明确这一信息。*/
      var y = -tileCoord[2] - 1;

      return 'static/mapsWorld_tiles/' + z + '/' + x + '/' + y + '.png';
    }
  });

  const sffLineMap = new TileLayer({
    source:source
  });
  this.map.addLayer(sffLineMap);
  return sffLineMap;
}

/**
 * 添加天地图影像图
 */
Layer.prototype.addTianDiTuImgLayer = function (layerType) {
  const webKey = 'fe40e8bfa4d16f7a68afafe70ad0483e';
  const imgLayerUrl_dt = 'http://t{0-7}.tianditu.gov.cn/DataServer?T=img_c&X={x}&Y={y}&L={z}&tk='; //影像底图
  const imgLayerUrl_zj = 'http://t{0-7}.tianditu.gov.cn/DataServer?T=cia_c&X={x}&Y={y}&L={z}&tk='; //影像注记
  const layerDt = new TileLayer({
    source:new XYZ({
      url:imgLayerUrl_dt+webKey,
      wrapX:false,
      projection:'EPSG:4326'
    })
  });
  const layerZj = new TileLayer({
    source:new XYZ({
      url:imgLayerUrl_zj+webKey,
      wrapX:false,
      projection:'EPSG:4326'
    })
  });
  this.map.addLayer(layerDt);
  this.map.addLayer(layerZj);
  return [layerDt,layerZj];
};
/**
 * 添加天地图矢量图
 */
Layer.prototype.addTianDiTuVecLayer = function (layerType) {
  const webKey = 'fe40e8bfa4d16f7a68afafe70ad0483e';
  const imgLayerUrl_dt = 'http://t{0-7}.tianditu.gov.cn/DataServer?T=vec_c&X={x}&Y={y}&L={z}&tk='; //矢量底图
  const imgLayerUrl_zj = 'http://t{0-7}.tianditu.gov.cn/DataServer?T=cva_c&X={x}&Y={y}&L={z}&tk='; //矢量注记
  const layerDt = new TileLayer({
    source:new XYZ({
      url:imgLayerUrl_dt+webKey,
      wrapX:false,
      projection:'EPSG:4326'
    })
  });
  const layerZj = new TileLayer({
    source:new XYZ({
      url:imgLayerUrl_zj+webKey,
      wrapX:false,
      projection:'EPSG:4326'
    })
  });
  this.map.addLayer(layerDt);
  this.map.addLayer(layerZj);
  return [layerDt,layerZj];
};

/**
 * 添加天地图地形图
 */
Layer.prototype.addTianDiTuTerLayer = function () {
  const webKey = 'fe40e8bfa4d16f7a68afafe70ad0483e';
  const imgLayerUrl_dt = 'http://t{0-7}.tianditu.gov.cn/DataServer?T=ter_c&X={x}&Y={y}&L={z}&tk='; //地形底图
  const imgLayerUrl_zj = 'http://t{0-7}.tianditu.gov.cn/DataServer?T=cta_c&X={x}&Y={y}&L={z}&tk='; //地形注记
  const layerDt = new TileLayer({
    source:new XYZ({
      url:imgLayerUrl_dt+webKey,
      wrapX:false,
      projection:'EPSG:4326'
    })
  });
  const layerZj = new TileLayer({
    source:new XYZ({
      url:imgLayerUrl_zj+webKey,
      wrapX:false,
      projection:'EPSG:4326'
    })
  });
  this.map.addLayer(layerDt);
  this.map.addLayer(layerZj);
  return [layerDt,layerZj];
};
/**
 * 根据图层名获取图层
 * @param layerName
 * @returns {T|*}
 */
Layer.prototype.getLayerByName = function(layerName){
  let layerArr = this.map.getLayers().array_;
  for (let k = 0; k < layerArr.length; k++) {
    if (layerArr[k].values_.layerName == layerName || layerArr[k].layerName == layerName) {
      return layerArr[k];
    }
  }
}

/**
 * 创建矢量图层
 * @param layerName
 * @returns {VectorLayer}
 */
Layer.prototype.createVectorLayer = function (layerName) {
  this.map.removeLayer(layerName);
  let source = new VectorSource({
    wrapX: false
  });
  let vectorLayer = new VectorLayer({
    source: source,
    zIndex: 10,
    style:styleFunction
  });

  vectorLayer.set('layerName',layerName);
  this.map.addLayer(vectorLayer);
  return vectorLayer;
}

/**
 * 创建图片图层
 * @param layerName
 * @returns {VectorLayer}
 */
Layer.prototype.createImageLayer = function (layerName,url,extent) {
  this.map.removeLayer(layerName);
  let source = new ImageStatic({
    url: url,//地址
    imageExtent: extent
  });
  let imageLayer = new ImageLayer({
    source: source,
    zIndex: 10,
    style:styleFunction
  });

  imageLayer.set('layerName',layerName);
  this.map.addLayer(imageLayer);
  return imageLayer;
}

/**
 * 创建绘制底图
 * @param layerName
 * @param feature
 * @returns {VectorLayer}
 */
Layer.prototype.createDrawLayer = function (layerName,feature) {
  this.map.removeLayer(layerName);

  let source = new VectorSource({
    wrapX: false
  });
  // let draw = new Draw({
  //   source: source,
  //   type: type,
  // });
  //
  // this.map.addInteraction(draw);

  let vectorLayer = new VectorLayer({
    source: source,
    style:styleFunction,
  });
  if(feature){
    source.addFeature(feature);
  }
  vectorLayer.set('layerName',layerName);
  this.map.addLayer(vectorLayer);
  return vectorLayer;
};

/**
 * 创建绘制样式
 * @returns {Style}
 */
function createDrawStyle(){
  let style = {};
  style.fill = new Fill({
    color: [143, 57, 57, 0.6]
  });
  style.stroke = new Stroke({
    width: 2,
    color: [255, 0, 0, 1]
  });

  return new Style(style);
}

export default Layer


var image = new CircleStyle({
  radius: 5,
  fill: null,
  stroke: new Stroke({color: 'red', width: 1})
});

var styles = {
  'Point': new Style({
    image: image
  }),
  'LineString': new Style({
    stroke: new Stroke({
      color: 'green',
      width: 1
    })
  }),
  'MultiLineString': new Style({
    stroke: new Stroke({
      color: 'green',
      width: 1
    })
  }),
  'MultiPoint': new Style({
    image: image
  }),
  'MultiPolygon': new Style({
    stroke: new Stroke({
      color: '#b848b7',
      width: 3
    })
  }),
  'Polygon': new Style({
    stroke: new Stroke({
      color: '#b848b7',
      width: 3
    })
  }),
  'GeometryCollection': new Style({
    stroke: new Stroke({
      color: 'magenta',
      width: 2
    }),
    fill: new Fill({
      color: 'magenta'
    }),
    image: new CircleStyle({
      radius: 10,
      fill: null,
      stroke: new Stroke({
        color: 'magenta'
      })
    })
  }),
  'Circle': new Style({
    stroke: new Stroke({
      color: 'red',
      width: 2
    }),
    fill: new Fill({
      color: 'rgba(255,0,0,0.2)'
    })
  })
};

var styleFunction = function(feature) {
  let style =  styles[feature.getGeometry().getType()];//grade
  let grade = feature.get('grade');
  if(grade){
    const color = {
      3:'255,244,92',
      4:'255,138,0',
      5:'231,0,18'
    };
    style = new Style({
      stroke: new Stroke({
        color: 'rgb('+ color[grade] +')',
        width: 1
      }),
      fill: new Fill({
        color: 'rgba('+ color[grade] +', 0.8)'
      })
    });
  };
  return style;
};
