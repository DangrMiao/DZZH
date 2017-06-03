var map = new T.Map("mapDiv");
$(function() {
    //var map;
    var zoom = 12;
    loadMap();

    var iconMarkers=[];
    var label,marker;
    var mSize=map.getSize();
//    var lnglats = [  
//    	{"B":"30.274190","L":"120.149920","PName":"A","wxdj":0},
//    	{"B":"30.274190","L":"120.150920","PName":"B","wxdj":4},
//    	{"B":"30.284190","L":"120.209920","PName":"B","wxdj":4},
//    	];
    
    //获取房屋信息, 
    Ajax.getJson("house/page", {} , function(data){
    	drawTMakers(data.rows,mSize);
//        addTEvent(iconMarkers,data.rows);
    });

    //绘制多个marker。
    function drawTMakers(lnglats,mSize){    	   	
        if (lnglats.length != 0) {  
        	var icon = new T.Icon({ 
                iconUrl: "static/images/undetermined.png", 
                iconSize: new T.Point(14, 14), 
                iconAnchor: new T.Point(7, 7) 
            });
        	var iconA = new T.Icon({ 
                iconUrl: "static/images/levelA.png", 
                iconSize: new T.Point(12, 12), 
                iconAnchor: new T.Point(12, 12) 
            });
        	var iconB = new T.Icon({ 
                iconUrl: "static/images/levelB.png", 
                iconSize: new T.Point(12, 12), 
                iconAnchor: new T.Point(12, 12) 
            });
        	var iconC = new T.Icon({ 
                iconUrl: "static/images/levelC.png", 
                iconSize: new T.Point(12, 12), 
                iconAnchor: new T.Point(12, 12) 
            });
        	var iconD = new T.Icon({ 
                iconUrl: "static/images/levelD.png", 
                iconSize: new T.Point(12, 12), 
                iconAnchor: new T.Point(12, 12) 
            });
        	//海量密集点
//        	var ll = [[120.129920,30.254190],[120.139920,30.254190]];
//        	var lng=[];
//        	for (var i = 0; i < ll.length; i++) {
//                    var data = new T.LngLat(ll[i][0], ll[i][1]);
//                    lng.push(data);
    //
//                }
//        	var _CloudCollection;
//        	if (document.createElement('canvas').getContext) {  // 判断当前浏览器是否支持绘制海量点
//                _CloudCollection = new T.CloudMarkerCollection(lng, {
//                    color: 'blue',
//                    SizeType: TDT_POINT_SIZE_SMALL
//                })
//                console.log(_CloudCollection);
//                map.addOverLay(_CloudCollection);
//            }
//            else {
//                alert('请在chrome、safari、IE8+以上浏览器查看本示例');
//            }   
        for (var i = 0; i < lnglats.length; i = i + 1) {  
    	    if (lnglats[i].level == "待定" || lnglats[i].level == "") {  
            	marker = new T.Marker(new T.LngLat(lnglats[i].x, lnglats[i].y), {icon: icon});
            	var p=map.lngLatToContainerPoint(marker.wr);        	
            	if (p.x<mSize.x && p.x>0 && p.y<mSize.y && p.y>0) {
//            		console.log("视野内");
    			}        	
            	map.addOverLay(marker);
            	iconMarkers.push(marker);  
            } else if (lnglats[i].level == "A") {
            	marker = new T.Marker(new T.LngLat(lnglats[i].x, lnglats[i].y), {icon: iconA});
            	map.addOverLay(marker);
            	iconMarkers.push(marker);
    		} else if (lnglats[i].level == "B") {
            	marker = new T.Marker(new T.LngLat(lnglats[i].x, lnglats[i].y), {icon: iconB});
            	map.addOverLay(marker);
            	iconMarkers.push(marker);
    		} else if (lnglats[i].level == "C") {
            	marker = new T.Marker(new T.LngLat(lnglats[i].x, lnglats[i].y), {icon: iconC});
            	map.addOverLay(marker);
            	iconMarkers.push(marker);
    		} else if (lnglats[i].level == "D") {
            	marker = new T.Marker(new T.LngLat(lnglats[i].x, lnglats[i].y), {icon: iconD});
            	map.addOverLay(marker);
            	iconMarkers.push(marker);
    		}
    	    if (iconMarkers[i]) {
    	    	iconMarkers[i].bh=lnglats[i].bh;
			}	 
    	    if (lnglats[i].level) {
    	    	iconMarkers[i].level=lnglats[i].level;
			}
           } 
        map.centerAndZoom(new T.LngLat(120.149920, 30.274190), 18);                
        var markers = new T.MarkerClusterer(map, {markers: iconMarkers}); 
        markers.setGridSize(120);
        map.centerAndZoom(new T.LngLat(120.149920, 30.274190), 12);
        markers.setMaxZoom(15);
       }    
        addTEvent(iconMarkers,lnglats);
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
        console.log(m);
        if (m.level=="待定" || m.level=="") {        	
        	console.log(111);
        	map.addOverLay(label);//创建文本对象
    	}else if (m.level=="A") {
    		map.addOverLay(labelA);
    	}else if (m.level=="B") {
    		map.addOverLay(labelB);
    	}else if (m.level=="C") {
    		map.addOverLay(labelC);
    	}else if (m.level=="D") {
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

    function PointClick(e) 
    {
    	var params={};
    	params.bh=e.target.bh;
    	//获取房屋信息 
        Ajax.getJson("house/page",params, function(data){
        	if (data.rows[0]!=undefined) {
        		$('#account-Manager-add-dialog-wffwgk').modal('show');
    			FormUtils.loadForm('form-wffwgk',data.rows[0]);
    			$('#map-search-data-div').css('display','none');
    			$('#search-form-group').css('display','none');
			}
        	
        });

    }

    //加载PointClick、mouseover与mouseout事件。   
    //iconMakers是已添加的标注对象。  
    //lnglats是每个点的数据对象。通常iconMakers的length等于lnglats的length。  
    //eventFn是传入 鼠标移动上去要调用哪个函数。默认是onMouseOver。主要是用于鼠标移动到点上可以显示出不同样式的窗口。  
    function addTEvent(iconMakers,lnglats,eventFn){  
        var arrLen = lnglats.length;  
        var i,eventFn = eventFn || onMouseOver;  
        for (var i = 0;  i<arrLen; i++) {   
            // 绑定事件  
            (function() {  
                var m = iconMakers[i];
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

//    //图例--D级checkbox
//    $('#map-legend-levelD').on("click", function(){
//    	if (this.checked) { 
//    		for (var i = 0; i < iconMarkers.length; i++) {
//    			if (iconMarkers[i].wxdj==4) {
//    				map.addOverLay(iconMarkers[i]);
//    				iconMarkers[i].setOpacity(1);
//    			}   			
//			}
//		}
//		else { 
//			for (var i = 0; i < iconMarkers.length; i++) {
//    			if (iconMarkers[i].wxdj==4) {
////    				map.removeOverLay(iconMarkers[i]);
//    				iconMarkers[i].setOpacity(0);
//    				console.log(iconMarkers[i]);
//    			}
//			}
//		} 
//    });
    
    //获取乡镇区域信息, 
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

    //工具栏的隐藏和显示
    var isShow = true;
    $('#show-or-hide-toolbar-btn').on("click", function(){
        if(isShow){
            //hideToolbar();
            $("#toolBar").animate({left: -400}, "fast", function(){
                $("#toolbar-hide-btn-img").attr("src", "static/images/map/show.png");
                isShow = false;
            });
        }else{

            //showToolbar();
            $("#toolBar").animate({left: 0}, "fast", function(){
                isShow = true;
                $("#toolbar-hide-btn-img").attr("src", "static/images/map/hide.png");
            });

        	$('#search-form-group').css('display','none'); 

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