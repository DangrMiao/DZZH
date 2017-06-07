var map = new T.Map("mapDiv");


$(function() {
	var iconMarkers=[];
	//var data = {name:"",governancetype:""};
    $.ajax({
        type: "POST",
        url: "relocation/list_relocationProject",
       // data:data,
        dataType: "json",
        success: function(data){ 
       		loadMap();
       	    drawTMakers(data.rows);  
       	    console.log(data.rows);
       	    addTEvent(iconMarkers,data.rows);  		            
          }
     });
    
    var label;
    //绘制多个marker。
    var marker;
    function drawTMakers(lnglats){    	   	
        if (lnglats.length != 0) {  
        	var iconA = new T.Icon({ 
                iconUrl: "static/images/levelA.png", 
                iconSize: new T.Point(12, 12), 
                iconAnchor: new T.Point(6, 18) 
            });
        	var iconB = new T.Icon({ 
                iconUrl: "static/images/levelB.png", 
                iconSize: new T.Point(12, 12), 
                iconAnchor: new T.Point(6, 18) 
            });
        	var iconC = new T.Icon({ 
                iconUrl: "static/images/levelC.png", 
                iconSize: new T.Point(12, 12), 
                iconAnchor: new T.Point(6, 18) 
            });  
        	
        for (var i = 0; i < lnglats.length; i = i + 1) {
    	   if (lnglats[i].color == -1) {  
	        	marker = new T.Marker(new T.LngLat(lnglats[i].xcoordinate, lnglats[i].ycoordinate), {icon: iconA});
	        	map.addOverLay(marker);
	        	iconMarkers.push(marker);  
           } else if (lnglats[i].color == 1) {
            	marker = new T.Marker(new T.LngLat(lnglats[i].xcoordinate, lnglats[i].ycoordinate), {icon: iconB});
	        	map.addOverLay(marker);
	        	iconMarkers.push(marker);
			} else if (lnglats[i].color == 0) {
            	marker = new T.Marker(new T.LngLat(lnglats[i].xcoordinate, lnglats[i].ycoordinate), {icon: iconC});
	        	map.addOverLay(marker);
	        	iconMarkers.push(marker);
			} 
    	    
    	    iconMarkers[i].id=i;
    	    iconMarkers[i].reform_type=lnglats[i].reform_type;
        } 
        map.centerAndZoom(new T.LngLat(118.8350, 29.1133), 18);        
        var markers = new T.MarkerClusterer(map, {markers: iconMarkers}); 
        markers.setGridSize(150);
        map.centerAndZoom(new T.LngLat(118.8350, 29.1133), 12);
        markers.setMaxZoom(15);
       }    
        //console.log(iconMarkers); 
    }  
     
    function onMouseOver(m) {    
        label = new T.Label({
            text: "待定",
            position: new T.LngLat(m.wr.lng, m.wr.lat),
            offset: new T.Point(-10, 15)
        });
        labelA = new T.Label({
            text: "A级",
            position: new T.LngLat(m.wr.lng, m.wr.lat),
            offset: new T.Point(-10, 15)
        });
        labelB = new T.Label({
            text: "B级",
            position: new T.LngLat(m.wr.lng, m.wr.lat),
            offset: new T.Point(-10, 15)
        });
        labelC = new T.Label({
            text: "C级",
            position: new T.LngLat(m.wr.lng, m.wr.lat),
            offset: new T.Point(-10, 15)
        });
        labelD = new T.Label({
            text: "D级",
            position: new T.LngLat(m.wr.lng, m.wr.lat),
            offset: new T.Point(-10, 15)
        });
        if (m.wxdj==0) {        	
            map.addOverLay(label);//创建文本对象
		}else if (m.wxdj==1) {
			map.addOverLay(labelA);
		}else if (m.wxdj==2) {
			map.addOverLay(labelB);
		}else if (m.wxdj==3) {
			map.addOverLay(labelC);
		}else if (m.wxdj==4) {
			map.addOverLay(labelD);
		}       
    } 
    
    //鼠标从图标移动出去的时候执行  
    function onClose() {  
        clearTimeout(timer);//关闭定时器。  
        map.removeOverLay(label);//移除文本对象。
        map.removeOverLay(labelA);
        map.removeOverLay(labelB);
        map.removeOverLay(labelC);
        map.removeOverLay(labelD);
    }  
    var w=0;
    function f_wave(m) {
    	w=w-4;
    	console.log(m.target.Ir.style);
//    	m.target.Ir.style.filter="Wave(Freq=1,LightStrength=20,Phase="+w+")";
    	m.target.Ir.style.filter="Wave(Phase=\"4\")";
    	console.log(m.target.Ir.style.filter);
//	    setTimeout(mover,100);
//	    function mover() {  
//	    	f_wave(m);  
//           } 
    }
    function PointClick(e) 
	{
//    	f_wave();
//    	map.centerAndZoom(new T.LngLat(e.lnglat.lng, e.lnglat.lat), 18);
    	console.log(e.lnglat);
	}
    
    //加载PointClick、mouseover与mouseout事件。   
    //iconMakers是已添加的标注对象。  
    //lnglats是每个点的数据对象。通常iconMakers的length等于lnglats的length。  
    //eventFn是传入 鼠标移动上去要调用哪个函数。默认是onMouseOver。主要是用于鼠标移动到点上可以显示出不同样式的窗口。  
    function addTEvent(iconMakers,lnglats,eventFn){  
        var arrLen = lnglats.length;  
        var i,eventFn = eventFn || onMouseOver;  
        for (var i = 0;  i<arrLen; i++) {  
            iconMakers[i].id=i; 
            // 绑定事件  
            (function() {  
                var m = iconMakers[i];
//                m.addEventListener("click",f_wave);
                m.addEventListener("click",PointClick);
            	m.addEventListener("mouseover",function() {  
		        	
                	timer = setTimeout(mover, 500);//setTimeout不能带参数，所以用下面的方法处理。  
                	function mover() {  
                        eventFn(m);  
                       }                	
                   }); 
            	 m.addEventListener("mouseout", onClose); 
            })();  
        }  
    } 
    
    //获取乡镇区域信息, ！！！！！！代码不要删除！！！！！！
    Ajax.getJson("street/list", {} , function(data){
        
        if(data.code < 1){
            return;
        }
        var streetList = data.rows;
        //console.log(streetList);
        if(streetList && streetList.length > 0){
            for(var i = 0; i < streetList.length; i++){
                var region = streetList[i];
                
                var points = region.points;
               
                //创建面对象
                //console.log(points);
                var polygonOptions = { 
                    color: "red", 
                    weight: 2, 
                    opacity: 0.5, 
                    fillColor: "#FFFFFF", 
                    fillOpacity: 0, 
                    lineStyle: 'dashed',
                    //name: region.name,
                    //id: region.id,
                    //streetcode: region.areacode
                };
                polygon = new T.Polygon(points,polygonOptions);
                //polygon.addEventListener("click", RegionSelector.onRegionClick);
                //向地图上添加面
                map.addOverLay(polygon);
            }
        }
    });

    //获取行政村的信息
    Ajax.getJson("village/list", {} , function(data){
        
        if(data.code < 1){
            return;
        }
        var villageList = data.rows;
        //console.log(streetList);
        if(villageList && villageList.length > 0){
            for(var i = 0; i < villageList.length; i++){
                var region = villageList[i];
                var points = region.boundaryPoints;
                if(!points || points.length == 0){
                    return;
                }
                //创建面对象
                //console.log(points);
                var polygonOptions = { 
                    color: "red", 
                    weight: 2, 
                    opacity: 0.5, 
                    fillColor: "#FFFFFF", 
                    fillOpacity: 0, 
                    lineStyle: 'dashed',
                    name: region.name,
                    id: region.id,
                    code:region.code,
                    street: region.street
                };
                //debugger;
                polygon = new T.Polygon(points,polygonOptions);
                polygon.addEventListener("click", RegionSelector.onRegionClick);
                //向地图上添加面
                map.addOverLay(polygon);
            }
        }
    });


    //图例的隐藏和显示
    var legendShow = true;
    $('#map-legend-btn').on("click", function(){
        if(legendShow){
            $("#map-legend").animate({bottom: -165}, "fast", function(){
                legendShow = false;
            });
        }else{
            //showToolbar();
            $("#map-legend").animate({bottom: 0}, "fast", function(){
            	legendShow = true;
            });
        }
    });
    
    function loadMap() {
//        map = new T.Map('mapDiv');
    	var zoom = 12;
        //瑞安市 120.646360,27.776520
        //杭州市 120.149920,30.274190
        map.centerAndZoom(new T.LngLat(120.149920, 30.274190), zoom);
    }
});

/**
 * 位置选择器，当点击地区的覆盖层时，会调用这个方法，show一个对话框
 * 点击确定后，再调用执行的方法,这样做的目的是不用每次给每一个覆盖物加上事件监听然后注销
 */
var RegionSelector = {
    onRegionClick: function(data){
        //console.log(data);
        var params = {}
        params.lat = data.lnglat.lat;
        params.lon = data.lnglat.lng;
        params.name = data.target.options.name;
        params.id = data.target.options.id;
        params.street = data.target.options.street;
        params.code = data.target.options.code;
        //console.log(params);
        RegionSelector.data = params;
        //直接进入回调
        if(RegionSelector.callback){
            RegionSelector.callback(RegionSelector.data);
        }else{
            console.log("没有回调");
        }
    },
    //点击之后要做的事情 params{lat, lon, street id, street name}
    callback: null,
    startSelect: function(callback){
        RegionSelector.callback = callback;
        $('#mapDiv path').css('cursor', "crosshair");
        this.data = null;
    },
    data: null,
    cancel: function(){
         RegionSelector.callback = null;
         $('#mapDiv path').css('cursor', "pointer");
    }
}