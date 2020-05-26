let Cesium = require('cesium/Cesium');
/**
 * 创建区图层
 */
function PointLayer(viewer,layerName) {
	this.layerName = layerName;
	this.pointArr = [];
	this.pointsParent = viewer.entities.getById(layerName);
	if (!this.pointsParent) {
		this.pointsParent = viewer.entities.add(new Cesium.Entity({
			id : layerName
		}));
	} else {
		this.pointsParent.show = true;
	}
};
/**
 * 设置图层显示状态
 */
PointLayer.prototype.setVisible = function(bool) {
  this.pointsParent.show = bool;
};
/**
 * 切换多边形的显示隐藏
 */
PointLayer.prototype.toggle = function() {
	this.pointsParent.show = !this.pointsParent.show;
};
/**
 * 删除所有多边形
 */
PointLayer.prototype.removeAll = function() {
	if (this.pointArr) {
		for (var i = 0; i < this.pointArr.length; i++) {
      viewer.entities.remove(this.pointArr[i]);
		}
		this.pointArr = [];
	}
};

/**
 * 为多边形添加鼠标点击回调函数
 *
 * @param callBack
 */
PointLayer.prototype.addCallBack = function(callBack) {
	if (typeof callBack === "function") {
		var scene = viewer.scene;
		var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
		var _this = this;
		handler.setInputAction((e)=> {
			// 获取鼠标位置的对象
			var pickedObject = scene.pick(e.position);
			if (Cesium.defined(pickedObject) && Cesium.defined(pickedObject.id) && (pickedObject.id.parent == _this.pointsParent)) {// 判断拾取的是不是这一类多边形
				var position = viewer.scene.globe.pick(viewer.camera.getPickRay(e.position), viewer.scene);// 获取鼠标位置
				callBack(pickedObject, pickedObject.primitive.position);
			}
		}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
	}
};

/**
 * 添加文字图片地标
 *
 * @param billboard
 * @param label
 */
PointLayer.prototype.addLableMark = function(imageUrl, label, position, description) {
	var point = viewer.entities.add({
		parent : this.pointsParent,
		position : position,
		billboard : {
      image : imageUrl,
      distanceDisplayCondition : new Cesium.DistanceDisplayCondition(0.0, 20000000.0),// 显示区间（最小最大显示高度）
      heightReference : Cesium.HeightReference.CLAMP_TO_GROUND
    },
		label : label,
		description : description,
		heightReference : Cesium.HeightReference.CLAMP_TO_GROUND
	});
	this.pointArr.push(point);
};

/**
 * 添加图片地标
 *
 * @param billboard
 * @param label
 */
PointLayer.prototype.addMark = function(billboard, position, description) {
	var point = viewer.entities.add({
		parent : this.pointsParent,
		position : position,
		billboard : billboard,
		description : description,
		heightReference : Cesium.HeightReference.CLAMP_TO_GROUND
	});
	this.pointArr.push(point);
};


/**
 * 添加文字地标
 *
 * @param billboard
 * @param label
 */
PointLayer.prototype.addLable = function(label, position, description) {
	var point = viewer.entities.add({
		parent : this.pointsParent,
		position : position,
		label : label,
		description : description,
		heightReference : Cesium.HeightReference.CLAMP_TO_GROUND
	});
	this.pointArr.push(point);
};

/**
 * 添加失量点地标
 *
 * @param billboard
 * @param label
 */
PointLayer.prototype.addPoint = function(position,point, description) {
	var point = viewer.entities.add({
		parent : this.pointsParent,
		position : position,
		description : description,
		point:point,
		heightReference : Cesium.HeightReference.CLAMP_TO_GROUND
	});
	this.pointArr.push(point);
};

/**
 * 添加失量点文字地标
 *
 * @param billboard
 * @param label
 */
PointLayer.prototype.addLabelPoint = function(position,point,label,description) {
	var point = viewer.entities.add({
		parent : this.pointsParent,
		position : position,
		label:label,
		description : description,
		point:point,
		heightReference : Cesium.HeightReference.CLAMP_TO_GROUND
	});
	this.pointArr.push(point);
};

// //////////////////以下为测试

var testPointLayer = null;

/**
 * 测试大批量添加Label
 */
function addLables() {
	if(!testPointLayer){
		testPointLayer = new PointLayer("testPointLayer");
	}

	// 添加地标
	for (var i = 0; i < 1000; i++) {
		var lat = 30 + Math.random() * 5;
		var lon = 114 + Math.random() * 5;

		var label = {
			text : 'Label测试' + i,
			font : '14px 宋体',
			fillColor : Cesium.Color.BLACK// 字体颜色
		};
		var description = "{lat:" + lat + "}";
		var position = Cesium.Cartesian3.fromDegrees(lon, lat);
		testPointLayer.addLable(label, position, description)
	}

	testPointLayer.addCallBack(function(o, p) {// 添加回调函数
		alert(o.id.description + o.id.label.text);
		popup.showAt(p, 347, 215);
	})

	flyToRectangle(114, 30, 119, 35);
}

/**
 * 测试量添加Point
 */
function addLabelPoints() {
	if(!testPointLayer){
		testPointLayer = new PointLayer("testPointLayer");
	}

	// 添加地标
	for (var i = 0; i < 1000; i++) {
		var lat = 30 + Math.random() * 5;
		var lon = 114 + Math.random() * 5;
		var point = {
            show : true, // default
            color : Cesium.Color.SKYBLUE, // default: WHITE
            pixelSize : 10, // default: 1
            outlineColor : Cesium.Color.YELLOW, // default: BLACK
            outlineWidth : 3 // default: 0
        };
		var label = {
				text : 'Label测试' + i,
				font : '14px 宋体',
				fillColor : Cesium.Color.BLACK// 字体颜色
			};
		var description = "{lat:" + lat + "}";
		var position = Cesium.Cartesian3.fromDegrees(lon, lat);
		testPointLayer.addLabelPoint(position,point,label,description)
	}

	testPointLayer.addCallBack(function(o, p) {// 添加回调函数
		popup.showAt(p, 347, 215);
	})

	flyToRectangle(114, 30, 119, 35);
}


/**
 * 测试量添加Point
 */
function addPoints() {
	if(!testPointLayer){
		testPointLayer = new PointLayer("testPointLayer");
	}

	// 添加地标
	for (var i = 0; i < 1000; i++) {
		var lat = 30 + Math.random() * 5;
		var lon = 114 + Math.random() * 5;
		var point = {
            show : true, // default
            color : Cesium.Color.SKYBLUE, // default: WHITE
            pixelSize : 10, // default: 1
            outlineColor : Cesium.Color.YELLOW, // default: BLACK
            outlineWidth : 3 // default: 0
        };
		var description = "{lat:" + lat + "}";
		var position = Cesium.Cartesian3.fromDegrees(lon, lat);
		testPointLayer.addPoint(position,point,description)
	}

	testPointLayer.addCallBack(function(o, p) {// 添加回调函数
		popup.showAt(p, 347, 215);
	})

	flyToRectangle(114, 30, 119, 35);
}



/**
 * 测试大批量添加Mark
 */
function addMarks() {
	if(!testPointLayer){
		testPointLayer = new PointLayer("testPointLayer");
	}

	var billboard = {
		image : 'images/1.png',
		distanceDisplayCondition : new Cesium.DistanceDisplayCondition(0.0, 20000000.0),// 显示区间（最小最大显示高度）
		heightReference : Cesium.HeightReference.CLAMP_TO_GROUND
	}

	// 添加地标
	for (var i = 0; i < 1000; i++) {
		var lat = 30 + Math.random() * 5;
		var lon = 114 + Math.random() * 5;

		var description = "{lat:" + lat + "}";
		var position = Cesium.Cartesian3.fromDegrees(lon, lat);
		testPointLayer.addMark(billboard, position, description)
	}

	testPointLayer.addCallBack(function(o, p) {// 添加回调函数
		popup.showAt(p, 347, 215);
	})

	flyToRectangle(114, 30, 119, 35);
}

/**
 * 测试大批量添加LabelMark
 */
function addLableMarks() {
	if(!testPointLayer){
		testPointLayer = new PointLayer("testPointLayer");
	}

	var billboard = {
		image : 'images/1.png',
		distanceDisplayCondition : new Cesium.DistanceDisplayCondition(0.0, 20000000.0),// 显示区间（最小最大显示高度）
		heightReference : Cesium.HeightReference.CLAMP_TO_GROUND
	}

	// 添加地标
	for (var i = 0; i < 1000; i++) {
		var lat = 30 + Math.random() * 5;
		var lon = 114 + Math.random() * 5;

		var label = {
			text : 'Label测试' + i,
			show : true,
			font : '14px 宋体',
			fillColor : Cesium.Color.WHITE,// 字体颜色
			outlineColor : Cesium.Color.BLACK,// 字体边框颜色
			horizontalOrigin : Cesium.HorizontalOrigin.LEFT,
			outlineWidth : 2,
			style : Cesium.LabelStyle.FILL_AND_OUTLINE,
			// backgroundColor:Cesium.Color.BISQUE,
			showBackground : true,// 是否有背景框
			pixelOffset : new Cesium.Cartesian2(10, 0),
			heightReference : Cesium.HeightReference.CLAMP_TO_GROUND
		};
		var description = "{lat:" + lat + "}";
		var position = Cesium.Cartesian3.fromDegrees(lon, lat);
		testPointLayer.addLableMark(billboard, label, position, description)
	}

	testPointLayer.addCallBack(function(o, p) {// 添加回调函数
		alert(o.id.description + o.id.label.text);
		popup.showAt(p, 347, 215);
	})

	flyToRectangle(114, 30, 119, 35);
}

/**
 * 切换点的显示隐藏
 */
function togglePoint() {
	testPointLayer.toggle();
}
/**
 * 删除点
 */
function deletePoints() {
	testPointLayer.removeAll();
}

export default PointLayer;
