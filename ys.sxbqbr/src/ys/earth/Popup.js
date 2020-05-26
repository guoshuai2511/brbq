let Cesium = require('cesium/Cesium');
function Popup(scene, id) {
	var container = document.getElementById(id);
	this.container = container;
	this.scenePosition = new Cesium.Cartesian3();
	var _this = this;
	scene.postRender.addEventListener(function() {
		if(container.style.display != 'none'){
			var canvasHeight = scene.canvas.height;
			var windowPosition = new Cesium.Cartesian2();
			Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, _this.scenePosition, windowPosition);
			container.style.top = (windowPosition.y-parseInt(container.style.height))+'px';
			container.style.left = (windowPosition.x-  parseInt(container.style.width)/2)+'px';
		}
	});
  container.style.display = 'none';
}
//气泡内容修改另外通过获取dom对象修改
Popup.prototype.showAt = function(position,width,height) {
	if(!position) {
    this.container.style.display = 'none';
		return;
	}
  this.container.style.display = 'block';
	this.container.style.width = width+'px';
	this.container.style.height = height+'px';
	this.scenePosition = Cesium.Cartesian3.clone(position);

};
//设置气泡的可见性
Popup.prototype.visibility = function(value) {
	if(value == true) {
		this.container.style.display = 'block';
	} else if(value == false) {
		this.container.style.display = 'none';
	}
};
export default Popup;



