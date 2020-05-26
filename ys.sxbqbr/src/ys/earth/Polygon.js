let Cesium = require('cesium/Cesium');
/**
 * 创建区图层
 */
function PolygonLayer(viewer, layerName) {
	this.layerName = layerName;
	this.polygonArr = [];
	this.polygonsParent = viewer.entities.getById(layerName);
	if (!this.polygonsParent) {
		this.polygonsParent = viewer.entities.add(new Cesium.Entity({
			id : layerName
		}));
	}else{
		this.polygonsParent.show = true;
	}
};
/**
 * 设置图层显示状态
 */
PolygonLayer.prototype.setVisible = function(bool) {
  this.polygonsParent.show = bool;
};
/**
 * 切换多边形的显示隐藏
 */
PolygonLayer.prototype.toggle = function() {
	this.polygonsParent.show = !this.polygonsParent.show;
};
/**
 * 删除所有多边形
 */
PolygonLayer.prototype.removeAll = function() {
	if (this.polygonArr) {
		for (var i = 0; i < this.polygonArr.length; i++) {
			viewer.entities.remove(this.polygonArr[i]);
		}
		this.polygonArr = [];
	}
};

/**
 * 为多边形添加鼠标点击回调函数
 *
 * @param callBack
 */
PolygonLayer.prototype.addCallBack = function(callBack) {
	if (typeof callBack === "function") {
		var scene = viewer.scene;
		var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
		var _this = this;
		handler.setInputAction(function(e) {
			// 获取鼠标位置的对象
			var pickedObject = scene.pick(e.position);
			if (Cesium.defined(pickedObject) &&Cesium.defined(pickedObject.id)&& (pickedObject.id.parent == _this.polygonsParent)) {// 判断拾取的是不是这一类多边形
				var position = viewer.scene.globe.pick(viewer.camera.getPickRay(e.position),viewer.scene);//获取鼠标位置
				callBack(pickedObject,position);
			}
		}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
	}
};

/**
 * 添加多边形
 *
 * @param id
 * @param name
 * @param positions
 * @param width
 * @param color
 */
PolygonLayer.prototype.addPolygon = function(name, positions, style,description,minDistance,maxDistance) {
	var polygon = viewer.entities.add({
		name : name,
		parent : this.polygonsParent,
		polygon : {
			hierarchy : Cesium.Cartesian3.fromDegreesArray(positions),
			// fill:true,
            material : Cesium.Color.fromAlpha(style.color,.4),
			// distanceDisplayCondition:new Cesium.DistanceDisplayCondition(minDistance,maxDistance),
            outline : true,
            height:0,
            outlineWidth : 3.0,
            outlineColor : Cesium.Color.fromAlpha( style.borderColor, .4 )
		},
		description:description
	});
	this.polygonArr.push(polygon);
};

/**
 * addPolygonWithHoles  添加带洞的多边形
 * @param name
 * @param positions
 * @param holes
 * @param color
 * @param description
 * @param minDistance
 * @param maxDistance
 */
PolygonLayer.prototype.addPolygonWithHoles = function(name, positions,holes,color,description,minDistance,maxDistance) {
    var holePositions = holes.map(function(hole) {
    	return {positions : Cesium.Cartesian3.fromDegreesArray(hole)};
    });

    var polygon = viewer.entities.add({
        name : name,
        parent : this.polygonsParent,
        polygon : {
            hierarchy : {
            	positions:Cesium.Cartesian3.fromDegreesArray(positions),
				holes: holePositions
			},
            // fill:true,
            material : color,
            // distanceDisplayCondition:new Cesium.DistanceDisplayCondition(minDistance,maxDistance),
            outline : true,
            height:0,
            // outlineWidth : 10.0,
            // outlineColor : Cesium.Color.fromAlpha( Cesium.Color.fromCssColorString('#f0e312'), .4 )
        },
        description:description
    });
    this.polygonArr.push(polygon);
}
export default PolygonLayer;
// ////////////////////以下为测试
//
// var testPolygonLayer = null;
// /**
//  * 大批量添加多边形
//  */
// function addPolygons() {
// 	testPolygonLayer = new PolygonLayer("testPolygonLayer");
//
// 	var colorArr = [ Cesium.Color.RED.withAlpha(0.5), Cesium.Color.ORANGE.withAlpha(0.5) ];
// 	var d = 5;
// 	var index = 0;
// 	for (var lon = 100; lon < 150.0; lon += d) {
// 		for (var lat = 0; lat < 50.0; lat += d) {
// 			if (index == 0) {
// 				index = 1;
// 			} else {
// 				index = 0;
// 			}
// 			positions = [ lon, lat,lon + d, lat, lon + d, lat + d, lon, lat + d ];
// 			var name= 'Red polygon on surface' + lat;
// 			var color = colorArr[index];
// 			var minDistance=0
// 			var maxDistance=20000000;
// 			var description="text:123,lat:"+lat;
// 			testPolygonLayer.addPolygon (name, positions, color,description,minDistance,maxDistance)
// 		}
// 	}
//
// 	testPolygonLayer.addCallBack(function(o,p){//添加回调函数
// //		alert(o.id.description + o.id.name);
// 		popup.showAt(p, 347, 215);
// 	})
//
// 	flyToRectangle(100, 0, 150, 50);
// }
//
// /**
//  * 切换多边形的显示隐藏
//  */
// function togglePolygon() {
// 	testPolygonLayer.toggle();
// }
// /**
//  * 删除多边形
//  */
// function deletePolygons(){
// 	testPolygonLayer.removeAll();
// }
// /**
//  * 添加多边形
//  */
// function addPolygon() {
// 	var redPolygon = viewer.entities.add({
// 		name : 'Red polygon on surface',
// 		polygon : {
// 			hierarchy : Cesium.Cartesian3.fromDegreesArray([ 114.0, 30.0,
// 					115.0, 30.0, 115.0, 31.0, 114.0, 31.0 ]),
// 			material : Cesium.Color.ORANGE.withAlpha(0.5)
// 		// outline : true, //贴地表 多边形边框无效
// 		// outlineWidth:3,
// 		// outlineColor : Cesium.Color.RED,
// 		// perPositionHeight:false,
// 		// height:0
// 		}
// 	});
//
// 	flyToRectangle(114, 30, 115, 31);
// }




