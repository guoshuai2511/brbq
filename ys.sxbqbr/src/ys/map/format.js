import GeoJSON from 'ol/format/GeoJSON';

function Format(map){
  this.map = map;
}

/**
 * 转geojson数据为feature
 * @param jsonData
 * @returns {Array<import("../Feature.js"), FeatureLike>}
 */
Format.prototype.converGeoJsonToFeature = function (jsonData) {
  let jsonReader = new GeoJSON();
  let features = jsonReader.readFeatures(jsonData);
  return features;
}

export default Format;
