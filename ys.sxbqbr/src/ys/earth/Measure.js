let Cesium = require('cesium/Cesium');
/**
 * 量算工具
 **/
const radiansPerDegree = Math.PI / 180.0;//角度转化为弧度(rad)
const degreesPerRadian = 180.0 / Math.PI;//弧度转化为角度
const measure = {
    handler:null,
    shapeArr:[],
    drawStart:false,
    activeShapePoints:[],
    activeShape:null,
    rectangle:null,
    queryByRectangle(viewer, calback){
        const _this = this;
        this.disable();
        // 取消双击事件-追踪该位置
        viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
        this.handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
        //鼠标左键
        this.handler.setInputAction(event=>{
            const ray = viewer.camera.getPickRay(event.position);
            if (!ray) return null;
            const earthPosition = viewer.scene.globe.pick(ray, viewer.scene);
            // `earthPosition` will be undefined if our mouse is not over the globe.
            if (Cesium.defined(earthPosition)) {
                if (_this.activeShapePoints.length === 0) {
                    _this.drawStart = true;
                    _this.activeShapePoints.push(earthPosition);
                    const dynamicPositions = new Cesium.CallbackProperty(function () {
                        return _this.activeShapePoints;
                    }, false);
                    _this.activeShape = _this.drawRectangle(viewer,dynamicPositions);//绘制动态图
                }else{
                    _this.activeShapePoints.pop();
                    _this.activeShapePoints.push(earthPosition);
                    if(calback){
                        calback(_this.converCartesian3ToLonLat(viewer,_this.activeShapePoints[0]),_this.converCartesian3ToLonLat(viewer,earthPosition));
                    }
                    _this.terminateShape(viewer);
                    _this.drawStart = false;
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        //鼠标移动
        this.handler.setInputAction(event=> {
            if (_this.drawStart) {
                // var newPosition = viewer.scene.pickPosition(event.endPosition);
                const ray = viewer.camera.getPickRay(event.endPosition);
                if (!ray) return null;
                const newPosition = viewer.scene.globe.pick(ray, viewer.scene);
                if (Cesium.defined(newPosition)) {
                    if(_this.activeShapePoints.length>1){
                        _this.activeShapePoints.pop();
                    }
                    _this.activeShapePoints.push(newPosition);
                }
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    },
    converCartesian3ToLonLat(viewer, cartesian3){
        const ellipsoid=viewer.scene.globe.ellipsoid;
        const cartographic=ellipsoid.cartesianToCartographic(cartesian3);
        const lat=Cesium.Math.toDegrees(cartographic.latitude);
        const lng=Cesium.Math.toDegrees(cartographic.longitude);
        const alt=cartographic.height;
        return [lng,lat, alt];
    },
    terminateShape:function (viewer) {
        // this.activeShapePoints.pop();//去除最后一个动态点
        if(this.activeShapePoints.length){
            this.rectangle = this.drawRectangle(viewer,this.activeShapePoints);//绘制最终图
        }
        viewer.entities.remove(this.activeShape);//去除动态图形
        this.activeShape = undefined;
        this.activeShapePoints = [];
        this.disable();
    },
    removeRectangle(viewer){
        if(this.rectangle){
            viewer.entities.remove(this.rectangle);
            this.rectangle = null;
        }
    },
    //绘制图形
    drawRectangle(viewer,positionData){
        let shape;
        //当positionData为数组时绘制最终图，如果为function则绘制动态图
        const arr = typeof positionData.getValue === 'function' ? positionData.getValue(0) : positionData;
        shape = viewer.entities.add({
            name: 'Blue translucent, rotated, and extruded ellipse with outline',
            rectangle : {
                coordinates :  new Cesium.CallbackProperty(function () {
                    const obj=Cesium.Rectangle.fromCartesianArray(arr);
                    //if(obj.west==obj.east){ obj.east+=0.000001};
                    //if(obj.south==obj.north){obj.north+=0.000001};
                    return obj;
                }, false),
                material : Cesium.Color.RED.withAlpha(0.1),
                outline : true,
                outlineWidth:10,
                outlineColor : Cesium.Color.RED
            }
        });
        return shape;
    },
    addText(viewer){
        const $this = this;
        this.disable();
        // 取消双击事件-追踪该位置
        viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

        this.handler = new Cesium.ScreenSpaceEventHandler(viewer.scene._imageryLayerCollection);
        this.handler.setInputAction(function (movement) {
            // tooltip.style.display = "none";
            // cartesian = viewer.scene.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
            // cartesian = viewer.scene.pickPosition(movement.position);
            const ray = viewer.camera.getPickRay(movement.position);
            const cartesian = viewer.scene.globe.pick(ray, viewer.scene);
            // parent.layui.layer.prompt({
            //     title: '请输入注记内容'
            // },function(value, index, elem){
            //     // alert(value); //得到value
            //     if(value){
            //         var shape = {
            //             name: '空间直线距离',
            //             // position: Cesium.Cartesian3.fromDegrees(cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180,cartographic.height),
            //             position: cartesian,
            //             label: {
            //                 text: value,
            //                 font: '18px sans-serif',
            //                 fillColor: Cesium.Color.GOLD,
            //                 style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            //                 outlineWidth: 2,
            //                 verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            //                 // pixelOffset: new Cesium.Cartesian2(20, -20),
            //             }
            //         }
            //         floatingPoint = viewer.entities.add(shape);
            //         $this.shapeArr.push(floatingPoint);
            //     }
            //     parent.layui.layer.close(index);
            //     $this.disable();
            // });
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    },
    //测量空间直线距离
    measureLineSpace(viewer){
        const $this = this;
        this.disable();
        // 取消双击事件-追踪该位置
        viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

        this.handler = new Cesium.ScreenSpaceEventHandler(viewer.scene._imageryLayerCollection);
        const positions = [];
        let poly = null;
        let distance = 0;
        let cartesian = null;
        let floatingPoint;

        this.handler.setInputAction((movement) =>{
            const ray = viewer.camera.getPickRay(movement.endPosition);
            cartesian = viewer.scene.globe.pick(ray, viewer.scene);
            //cartesian = viewer.scene.camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid);
            if (positions.length >= 2) {
                if (!Cesium.defined(poly)) {
                    poly = new PolyLinePrimitive(positions);
                } else {
                    positions.pop();
                    // cartesian.y += (1 + Math.random());
                    positions.push(cartesian);
                }
                distance = $this.getSpaceDistance(positions);
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

        this.handler.setInputAction(function (movement) {
            const ray = viewer.camera.getPickRay(movement.position);
            cartesian = viewer.scene.globe.pick(ray, viewer.scene);
            if (positions.length == 0) {
                positions.push(cartesian.clone());
            }
            positions.push(cartesian);
            //在三维场景中添加Label
            //   const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            const textDisance = distance + "米";
            // console.log(textDisance + ",lng:" + cartographic.longitude/Math.PI*180.0);
            const shape = {
                name: '空间直线距离',
                // position: Cesium.Cartesian3.fromDegrees(cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180,cartographic.height),
                position: positions[positions.length - 1],
                point: {
                    pixelSize: 5,
                    color: Cesium.Color.RED,
                    outlineColor: Cesium.Color.WHITE,
                    outlineWidth: 2,
                },
                label: {
                    text: textDisance,
                    font: '18px sans-serif',
                    fillColor: Cesium.Color.GOLD,
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                    outlineWidth: 2,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    pixelOffset: new Cesium.Cartesian2(20, -20),
                }
            }
            floatingPoint = viewer.entities.add(shape);
            $this.shapeArr.push(floatingPoint);
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        this.handler.setInputAction(function (movement) {
            $this.handler.destroy(); //关闭事件句柄
            positions.pop(); //最后一个点无效
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    },
    //空间两点距离计算函数
    getSpaceDistance(positions) {
        let distance = 0;
        for (let i = 0; i < positions.length - 1; i++) {
          const point1cartographic = Cesium.Cartographic.fromCartesian(positions[i]);
          const point2cartographic = Cesium.Cartographic.fromCartesian(positions[i + 1]);
          /**根据经纬度计算出距离**/
          const geodesic = new Cesium.EllipsoidGeodesic();
          geodesic.setEndPoints(point1cartographic, point2cartographic);
          let s = geodesic.surfaceDistance;
          //返回两点之间的距离
          s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2));
          distance = distance + s;
        }
        return distance.toFixed(2);
    },
    measureAreaSpace(viewer){
        const $this = this;
        this.disable();
        // 取消双击事件-追踪该位
        viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
        // 鼠标事件
        this.handler = new Cesium.ScreenSpaceEventHandler(viewer.scene._imageryLayerCollection);
        const positions = [];
        const tempPoints = [];
        let polygon = null;
        // var tooltip = document.getElementById("toolTip");
        let cartesian = null;
        let floatingPoint;//浮动点
        // tooltip.style.display = "block";

        this.handler.setInputAction((movement)=>{
            const ray = viewer.camera.getPickRay(movement.endPosition);
            cartesian = viewer.scene.globe.pick(ray, viewer.scene);
            //cartesian = viewer.scene.camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid);
            if(positions.length >=3){
                if (!Cesium.defined(polygon)) {
                    polygon = new PolygonPrimitive(viewer, positions);
                }else{
                    positions.pop();
                    // cartesian.y += (1 + Math.random());
                    positions.push(cartesian);
                }
                // tooltip.innerHTML='<p>'+distance+'米</p>';
            }
        },Cesium.ScreenSpaceEventType.MOUSE_MOVE);

        this.handler.setInputAction((movement)=>{
            // tooltip.style.display = "none";
            // cartesian = viewer.scene.pickPosition(movement.position);
            const ray = viewer.camera.getPickRay(movement.position);
            cartesian = viewer.scene.globe.pick(ray, viewer.scene);
            // cartesian = viewer.scene.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
            if(positions.length == 0) {
                positions.push(cartesian.clone());
            }
            //positions.pop();
            positions.push(cartesian);
            //在三维场景中添加点
            const cartographic = Cesium.Cartographic.fromCartesian(positions[positions.length - 1]);
            const longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
            const latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
            const heightString = cartographic.height;
            tempPoints.push({ lon: longitudeString, lat: latitudeString ,hei:heightString});
            floatingPoint = viewer.entities.add({
                name : '多边形面积',
                position : positions[positions.length - 1],
                point : {
                    pixelSize : 5,
                    color : Cesium.Color.RED,
                    outlineColor : Cesium.Color.WHITE,
                    outlineWidth : 2,
                    heightReference:Cesium.HeightReference.CLAMP_TO_GROUND
                }
            });
            $this.shapeArr.push(floatingPoint);
        },Cesium.ScreenSpaceEventType.LEFT_CLICK);

        this.handler.setInputAction((movement)=>{
            $this.handler.destroy();
            positions.pop();
            const textArea = $this.getArea(tempPoints,positions) + "平方公里";
            const shape = viewer.entities.add({
                name : '多边形面积',
                position : positions[positions.length - 1],
                label : {
                    text : textArea,
                    font : '18px sans-serif',
                    fillColor : Cesium.Color.GOLD,
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                    outlineWidth : 2,
                    verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
                    pixelOffset : new Cesium.Cartesian2(20, -40),
                    heightReference:Cesium.HeightReference.CLAMP_TO_GROUND
                }
            });
            this.shapeArr.push(shape);
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK );
    },
    //计算多边形面积
    getArea(points,positions) {

        let res = 0;
        //拆分三角曲面

        for (let i = 0; i < points.length - 2; i++) {
          const j = (i + 1) % points.length;
          const k = (i + 2) % points.length;
          const totalAngle = this.Angle(points[i], points[j], points[k]);


          const dis_temp1 = this.distance(positions[i], positions[j]);
          const dis_temp2 = this.distance(positions[j], positions[k]);
          res += dis_temp1 * dis_temp2 * Math.abs(Math.sin(totalAngle)) ;
        }
        return (res/1000000.0).toFixed(4);
    },
    /*角度*/
    Angle(p1, p2, p3) {
      const bearing21 = this.Bearing(p2, p1);
      const bearing23 = this.Bearing(p2, p3);
      let angle = bearing21 - bearing23;
      if (angle < 0) {
          angle += 360;
      }
      return angle;
    },
    /*方向*/
    Bearing(from, to) {
      const lat1 = from.lat * radiansPerDegree;
      const lon1 = from.lon * radiansPerDegree;
      const lat2 = to.lat * radiansPerDegree;
      const lon2 = to.lon * radiansPerDegree;
      let angle = -Math.atan2(Math.sin(lon1 - lon2) * Math.cos(lat2), Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2));
      if (angle < 0) {
          angle += Math.PI * 2.0;
      }
      angle = angle * degreesPerRadian;//角度
      return angle;
    },
    distance(point1,point2){
        const point1cartographic = Cesium.Cartographic.fromCartesian(point1);
        const point2cartographic = Cesium.Cartographic.fromCartesian(point2);
        /**根据经纬度计算出距离**/
        const geodesic = new Cesium.EllipsoidGeodesic();
        geodesic.setEndPoints(point1cartographic, point2cartographic);
        let s = geodesic.surfaceDistance;
        //console.log(Math.sqrt(Math.pow(distance, 2) + Math.pow(endheight, 2)));
        //返回两点之间的距离
        s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2));
        return s;
    },
    clear(viewer){
        for (let i = 0; i < this.shapeArr.length; i++) {
            viewer.entities.remove(this.shapeArr[i]);
        }
        this.shapeArr = [];
        this.disable();
    },
    disable() {
        if(this.handler){
            this.handler.destroy();
            this.handler = null;
        }
    }
}
const PolyLinePrimitive = (function () {
    function _(positions) {
        this.options = {
            name: '直线',
            polyline: {
                show: true,
                positions: [],
                material: Cesium.Color.CHARTREUSE,
                width: 3,
                clampToGround: true
            }
        };
        this.positions = positions;
        this._init();
    }

    _.prototype._init = function () {
        var _self = this;
        var _update = function () {
            return _self.positions;
        };
        //实时更新polyline.positions
        this.options.polyline.positions = new Cesium.CallbackProperty(_update, false);
        var shape = viewer.entities.add(this.options);
        measure.shapeArr.push(shape);
    };

    return _;
})();
let PolygonPrimitive = (function(){
    function _(viewer, positions){
        this.options = {
            name:'多边形',
            polygon : {
                hierarchy : [],
                // perPositionHeight : true,
                material : Cesium.Color.GREEN.withAlpha(0.5),
                // heightReference:20000
            }
        };
        this.hierarchy = positions;
        this._init(viewer);
    }

    _.prototype._init = function(viewer){
        var _self = this;
        var _update = function(){
            return _self.hierarchy;
        };
        //实时更新polygon.hierarchy
        this.options.polygon.hierarchy = new Cesium.CallbackProperty(_update,false);
        var shape = viewer.entities.add(this.options);
        measure.shapeArr.push(shape);
    };
    return _;
})();
export default measure;
