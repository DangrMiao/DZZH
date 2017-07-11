var map = new TMap("mapDiv");
$(function() {
//	var iconMarkers=[];
	//var data = {name:"",governancetype:""};
    $.ajax({
        type: "POST",
        url: "map/list_map",
       // data:data,
        dataType: "json",
        success: function(data){ 
       		loadMap();
       	    drawTMakers(data.rows);  
       	    //console.log(data.rows)
       	    addTEvent(iconMarkers,data.rows);  		            
          }
     });
    areas();

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
    	map.enableHandleMouseScroll();
        //瑞安市 120.646360,27.776520
        //杭州市 120.149920,30.274190
        map.centerAndZoom(new TLngLat(120.149920, 30.274190), zoom);
    }
});


function drawTMakers(lnglats){    	   	
	iconMarkers=[];
	if (lnglats.length != 0) {  
    	var iconD = new TIcon(
           "static/images/levelD.png", 
            new TSize(12, 12), 
            {anchor: new TPixel(6, 18)} 
        );
/*    	var iconB = new T.Icon({ 
            iconUrl: "static/images/levelB.png", 
            iconSize: new T.Point(12, 12), 
            iconAnchor: new T.Point(6, 18) 
        });*/
    	var iconC = new TIcon( 
            "static/images/levelA.png", 
             new TSize(12, 12), 
            {anchor: new TPixel(6, 18)} 
        );  
    	
    for (var i = 0; i < lnglats.length; i = i + 1) {
	    if (lnglats[i].Handle == 0) {  
        	marker = new TMarker(new TLngLat(lnglats[i].xcoordinate, lnglats[i].ycoordinate), {icon: iconD});
        	map.addOverLay(marker);
        	iconMarkers.push(marker);  
        } 
	    /*else if (lnglats[i].governancetypeid == 1) {
        	
        	marker = new T.Marker(new T.LngLat(lnglats[i].xcoordinate, lnglats[i].ycoordinate), {icon: iconB});
        	map.addOverLay(marker);
        	iconMarkers.push(marker);
		}*/ 
	    else if (lnglats[i].Handle == 1) {
        	marker = new TMarker(new TLngLat(lnglats[i].xcoordinate, lnglats[i].ycoordinate), {icon: iconC});
        	map.addOverLay(marker);
        	iconMarkers.push(marker);
		} 
	    if (iconMarkers[i]) {
	    	iconMarkers[i].id=lnglats[i].id;	 
		}
	    iconMarkers[i].reform_type=lnglats[i].reform_type;
    } 
    map.centerAndZoom(new TLngLat(118.8350, 29.1133), 10); 
    
    //debugger;
//    var markers = new T.MarkerClusterer(map, {markers: iconMarkers}); 
//    markers.setGridSize(150);
//    map.centerAndZoom(new T.LngLat(118.8350, 29.1133), 10);
//    markers.setMaxZoom(15);
   }    
    //console.log(iconMarkers); 
}  
 
function onMouseOver(m) {    
    label = new TLabel({
        text: "待定",
        position: new TLngLat(m.wr.lng, m.wr.lat),
        offset: new TPixel(-10, 15)
    });
    labelA = new TLabel({
        text: "A级",
        position: new TLngLat(m.wr.lng, m.wr.lat),
        offset: new TPixel(-10, 15)
    });
    labelB = new TLabel({
        text: "B级",
        position: new TLngLat(m.wr.lng, m.wr.lat),
        offset: new TPixel(-10, 15)
    });
    labelC = new TLabel({
        text: "C级",
        position: new TLngLat(m.wr.lng, m.wr.lat),
        offset: new TPixel(-10, 15)
    });
    labelD = new TLabel({
        text: "D级",
        position: new TLngLat(m.wr.lng, m.wr.lat),
        offset: new TPixel(-10, 15)
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
function ointClick(e){
	var params={};
	console.log(e.target)
	params.id=e.target.id;
	//debugger;
	//获取房屋信息 
    Ajax.getJson("map/search_map",params, function(data){
     
    	if (data.rows[0].governancetypeid ==0){ 
    		$('#account-Manager-add-dialog-start-sxgx').modal('show');
			FormUtils.loadForm('form-start-sxgx',data.rows[0]);
			//$('#map-search-data-div').css('display','none');
			//$('#search-form-group').css('display','none');
			$("#start-sxgx-close").on("click",function(){
        		$('#search-form-group').css('display','block');	
        		$('#map-search-data-div').css('display','block');
        	})
		}
    	else if(data.rows[0].governancetypeid ==1){
    		var datases = {}
    		datases.hiddendanger_id = params.id;
    		console.log(datases)
    		Ajax.getJson("relocation/search_relocation",datases, function(datas){
    			datas.rows[0].Handle = data.rows[0].Handle;;	
    			console.log(datas)
    		$('#account-Manager-add-dialog-bqbr-second').modal('show');
    		treeConframe.window.goto_treenode_by_projectid(datas.rows[0].id,1);
			FormUtils.loadForm('form-second-bqbr',datas.rows[0]);
			//$('#map-search-data-div').css('display','none');
			//$('#search-form-group').css('display','none');
			$("#bqbr-second-close").on("click",function(){
        		$('#search-form-group').css('display','block');	
        		$('#map-search-data-div').css('display','block');
        	  });
    	   })
    	}
    	else if(data.rows[0].governancetypeid ==2){
    		var datases = {}
    		datases.hiddendanger_id = params.id;
    		console.log(datases)
    		Ajax.getJson("engineer/search_engineer",datases, function(datas){
    			//
    			datas.rows[0].Handle = data.rows[0].Handle;;	
    			console.log(datas)
    		$('#account-Manager-add-dialog-gczl-sxgx-second').modal('show');
    		treeConframe1.window.goto_treenode_by_projectid(datas.rows[0].id,2);
			FormUtils.loadForm('form-second-gczl',datas.rows[0]);
			//$('#map-search-data-div').css('display','none');
			//$('#search-form-group').css('display','none');
			$("#gczl-sxgx-second-close").on("click",function(){
        		$('#search-form-group').css('display','block');	 
        		$('#map-search-data-div').css('display','block');
        	  });
    	   })
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
        //iconMakers[i].id=i; 
        // 绑定事件  
        (function() {  
            var m = iconMakers[i];
//          m.addEventListener("click",f_wave);
            TEvent.addListener(m,"click",PointClick);
            
//        	m.addListener("mouseover",function() {  
//	        	
//            	timer = setTimeout(mover, 500);//setTimeout不能带参数，所以用下面的方法处理。  
//            	function mover() {  
//                    eventFn(m);  
//                   }                	
//               }); 
        	 //m.addListener("mouseout", onClose); 
        })();  
    }  
}

function areas() { 
	var strpoint="118.881543, 28.525973,118.873303, 28.525825,118.869142, 28.537293,118.860175, 28.539116,118.855429, 28.547363,118.842238, 28.546632,118.829584, 28.55412,118.810707, 28.540109,118.804157, 28.540904,118.797585, 28.56504,118.799147, 28.582107,118.813986, 28.60844,118.809539, 28.634945,118.801652, 28.64653,118.801425, 28.666191,118.792635, 28.68691,118.798802, 28.708993,118.790108, 28.720098,118.791647, 28.768005,118.778172, 28.77076,118.77854, 28.776823,118.753471, 28.810572,118.74728, 28.835846,118.74786, 28.841287,118.760961, 28.844179,118.761787, 28.853501,118.776573, 28.862264,118.783991, 28.893326,118.800123, 28.895911,118.815106, 28.905279,118.833937, 28.905785,118.840918, 28.894041,118.867577, 28.870084,118.879952, 28.853541,118.899322, 28.845634,118.899151, 28.838053,118.911154, 28.838523,118.918319, 28.832915,118.947263, 28.839173,118.945223, 28.880626,118.937584, 28.905535,118.946052, 28.920682,118.931444, 28.923202,118.927641, 28.927289,118.932999, 28.9366,118.933525, 28.958311,118.928977, 28.9738,118.912009, 28.975346,118.906822, 28.982676,118.890368, 28.983893,118.881295, 28.995252,118.884417, 29.016266,118.889079, 29.024813,118.905615, 29.032894,118.90657, 29.042764,118.892118, 29.075298,118.882368, 29.075148,118.878984, 29.078713,118.861207, 29.1089,118.860797, 29.12171,118.848986, 29.132863,118.853802, 29.154409,118.844986, 29.15075,118.837973, 29.155092,118.83979, 29.166667,118.833784, 29.175799,118.840408, 29.184472,118.838806, 29.186907,118.819166, 29.188067,118.805774, 29.193568,118.78903, 29.194052,118.768805, 29.199769,118.761824, 29.213429,118.762395, 29.220791,118.772356, 29.228398,118.771788, 29.241506,118.768113, 29.247224,118.771835, 29.257354,118.782619, 29.258292,118.790413, 29.26608,118.791633, 29.272761,118.818187, 29.28723,118.831137, 29.285777,118.835297, 29.295261,118.861096, 29.308994,118.86711, 29.322026,118.875773, 29.328782,118.882602, 29.332579,118.894473, 29.329263,118.906775, 29.339236,118.933692, 29.316462,118.94852, 29.313402,118.955572, 29.306117,118.968567, 29.301253,118.967316, 29.296994,118.954599, 29.28769,118.967955, 29.27404,118.972263, 29.27465,118.984847, 29.264528,118.993547, 29.250295,118.99127, 29.23559,119.008081, 29.213645,119.055709, 29.228313,119.055916, 29.221793,119.049534, 29.215002,119.063027, 29.199209,119.063275, 29.186919,119.055325, 29.17728,119.064726, 29.168096,119.082984, 29.16226,119.087497, 29.150406,119.081336, 29.136188,119.086295, 29.127239,119.086381, 29.118462,119.102832, 29.104246,119.097939, 29.096703,119.067302, 29.077505,119.050574, 29.056839,119.062231, 29.042547,119.076078, 29.039343,119.079357, 29.025135,119.08759, 29.016281,119.098336, 29.015484,119.103325, 29.010268,119.097489, 28.998424,119.090786, 29.000549,119.085788, 28.998295,119.079575, 28.983762,119.072495, 28.977644,119.074704, 28.970601,119.089662, 28.965071,119.11835, 28.943768,119.123549, 28.931196,119.11583, 28.917871,119.121554, 28.907862,119.121352, 28.884176,119.111107, 28.870326,119.110913, 28.863738,119.11539, 28.858798,119.104469, 28.838841,119.108149, 28.829359,119.099309, 28.827163,119.079664, 28.812562,119.072795, 28.799004,119.073462, 28.790196,119.082251, 28.781455,119.085105, 28.77296,119.082443, 28.763812,119.070085, 28.752487,119.069708, 28.738881,119.054812, 28.729341,119.048701, 28.718497,119.032872, 28.714393,119.012918, 28.700889,119.006592, 28.689829,118.998544, 28.684481,118.968904, 28.647982,118.95941, 28.653663,118.950422, 28.650009,118.946216, 28.652099,118.934436, 28.644927,118.93138, 28.630112,118.920653, 28.618686,118.92224, 28.606543,118.91603, 28.602649,118.914494, 28.596505,118.913199, 28.580378,118.917867, 28.578273,118.920189, 28.572192,118.881543, 28.525973";
    //初始化地图对象
    var arrpoint=strpoint.split(",");
    var points = [];
	 for(var i=0;i<arrpoint.length;i=i+2)
    {
      points.push(new TLngLat(arrpoint[i], arrpoint[i+1]));
    }
      //创建面对象
   var polygon = new TPolygon(points,{
          strokeColor: "blue", strokeWeight: 3, strokeOpacity: 0.5, fillColor: "#FFFFFF", fillOpacity: 0
      });		
	map.addOverLay(polygon);
} 
