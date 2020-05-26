let Cesium = require('cesium/Cesium');
/**
 * 创建线图层
 */
function PolylineLayer(viewer, layerName) {
	this.layerName = layerName;
	this.lineArr = [];
	this.linesParent = viewer.entities.getById(layerName);
	if (!this.linesParent) {
		this.linesParent = viewer.entities.add(new Cesium.Entity({
			id : layerName
		}));
	}else{
		this.linesParent.show = true;
	}
};

/**
 * 添加线
 *
 * @param id
 * @param name
 * @param positions
 * @param width
 * @param color
 */
PolylineLayer.prototype.addPolyline = function(name, positions, width, color, isDashed) {
	var line = viewer.entities.add({
		name : name,
		parent : this.linesParent,
		polyline : {
			positions : Cesium.Cartesian3.fromDegreesArray(positions),
			width : width,
			material : isDashed?new Cesium.PolylineDashMaterialProperty({
        color:color,
        dashLength:20,
        dashPattern:255
      }):color,
			followSurface : true,
			perPositionHeight : true,
		}
	});
	this.lineArr.push(line);
};


/**
 * 添加发光的线
 *
 * @param id
 * @param name
 * @param positions
 * @param width
 * @param color
 */
PolylineLayer.prototype.addGlowline = function(name, positions, width, color,glowPower) {
	var line = viewer.entities.add({
		name : name,
		parent : this.linesParent,
		polyline : {
			positions : Cesium.Cartesian3.fromDegreesArrayHeights(positions),
			width : width,
			material : new Cesium.PolylineGlowMaterialProperty({
	            glowPower : glowPower,
	            color : color
	        })
		}
	});
	this.lineArr.push(line);
};

/**
 * 添加带箭头的线
 *
 * @param id
 * @param name
 * @param positions
 * @param width
 * @param color
 */
PolylineLayer.prototype.addArrowline = function(name, positions, width, color) {
	var line = viewer.entities.add({
		name : name,
		parent : this.linesParent,
		polyline : {
			positions : Cesium.Cartesian3.fromDegreesArrayHeights(positions),
			width : width,
			 material : new Cesium.PolylineArrowMaterialProperty(color)
		}
	});
	this.lineArr.push(line);
};

/**
 * 添加带边的线
 * @param name
 * @param positions
 * @param width
 * @param color
 * @param outLineWidth
 * @param outLineColor
 */
PolylineLayer.prototype.addOutline = function(name, positions, lineWidth, lineColor,outLineWidth,outLineColor) {
	var line = viewer.entities.add({
		name : name,
		parent : this.linesParent,
		polyline : {
			positions : Cesium.Cartesian3.fromDegreesArrayHeights(positions),
			width : 5,
			material : new Cesium.PolylineOutlineMaterialProperty({
	            color : Cesium.Color.ORANGE,
	            outlineWidth : 2,
	            outlineColor : Cesium.Color.BLACK
	        })
		}
	});
	this.lineArr.push(line);
};


/**
 * 设置图层显示状态
 */
PolylineLayer.prototype.setVisible = function(bool) {
	this.linesParent.show = bool;
};

/**
 * 切换线的显示隐藏
 */
PolylineLayer.prototype.toggle = function() {
	this.linesParent.show = !this.linesParent.show;
};
/**
 * 删除所有线
 */
PolylineLayer.prototype.removeAll = function() {
	if (this.lineArr) {
		for (var i = 0; i < this.lineArr.length; i++) {
      viewer.entities.remove(this.lineArr[i]);
		}
		this.lineArr = [];
	}
};
/**
 * 为线添加鼠标回调函数
 *
 * @param callBack
 */
PolylineLayer.prototype.addCallBack = function(callBack) {
	if (typeof callBack === "function") {

		var scene = viewer.scene;
		var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
		var _this = this;
		handler.setInputAction(function(e) {
			// 获取鼠标位置的对象
			var pickedObject = scene.pick(e.position);
			if (Cesium.defined(pickedObject) &&Cesium.defined(pickedObject.id)&& (pickedObject.id.parent == _this.linesParent)) {// 判断拾取的是不是这一类线

				var position = viewer.scene.globe.pick(viewer.camera.getPickRay(e.position),viewer.scene);
				callBack(pickedObject,position);
			}
		}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

	}
};

export default PolylineLayer;
