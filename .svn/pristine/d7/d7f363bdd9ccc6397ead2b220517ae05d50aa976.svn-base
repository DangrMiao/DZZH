var UI = {
	//绑定父元素下的控件点击事件，第二个参数属性为 class
	bindCilckEvents: function(selector, eventsParam){
		
	  	// 开始遍历 
	  	for ( var p in eventsParam ){ 
	  		// 方法
	  		if ( typeof (eventsParam[p]) == "function" ){ 
	  			
	  			$(selector + " ." + p).bind('click', eventsParam[p]);
		  	} else { 
		  		//nothing 
	  		} 
	  	}
	}
};

var CommonUtils = {
	getBasePath: function(){
		var pathName = window.location.pathname.substring(1);
        var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));
        
        if (webName == "") {
            return window.location.protocol + '//' + window.location.host + '/';
        }
        else {
            return window.location.protocol + '//' + window.location.host + '/' + webName + '/';
        }
        
	},
	deepCopy: function(source) {
		if(source ==='object'){
		    var result={};
		    for (var key in source) {
		    	result[key] = typeof source[key]==='object' ? deepCoyp(source[key]):source[key];
		     }
		   return result;
		}else if(source instanceof Array){
			return source.concat();
		}else{
			return source;
		}
	}
}

var Ajax ={
	getJsonp : function(url, data, callback){
		$.ajax({
			type: 'GET',
		    url: url,
		    data: data ,
		    dataType: 'jsonp',
		    cache: false,
		    success: function(data){
		    	callback(data);
		    }
		});
	},
	getJson: function(url, data, callback){
		$.ajax({
			type: 'GET',
		    url: url,
		    data: data ,
		    dataType: 'json',
		    cache: false,
		    success: function(data){
		    	
		    	callback(data);
		    }
		});
	},
	postJson: function(url, data, callback){
		
		$.ajax({
			type: 'POST',
		    url: url,
		    data: data ,
		    dataType: 'json',
		    cache: false,   
		    success: function(data){
		    	if(data.code == -100){
		    		
		    		window.location.href= CommonUtils.getBasePath() + "login.html";
		    	}else{
		    		callback(data);
		    	}
		    }
		});
	},
	postJsonNoCheck: function(url, data, callback){
		$.ajax({
			type: 'POST',
		    url: url,
		    data: data ,
		    dataType: 'json',
		    cache: false,   
		    success: function(data){
		    	callback(data);
		    }
		});
	}
}

//var iconMarkers=[];
//var label;
////绘制多个marker。
//var marker;
//function drawTMakers(lnglats,mSize){    	   	
//    if (lnglats.length != 0) {  
//    	var icon = new T.Icon({ 
//            iconUrl: "static/images/undetermined.png", 
//            iconSize: new T.Point(14, 14), 
//            iconAnchor: new T.Point(7, 7) 
//        });
//    	var iconA = new T.Icon({ 
//            iconUrl: "static/images/levelA.png", 
//            iconSize: new T.Point(12, 12), 
//            iconAnchor: new T.Point(12, 12) 
//        });
//    	var iconB = new T.Icon({ 
//            iconUrl: "static/images/levelB.png", 
//            iconSize: new T.Point(12, 12), 
//            iconAnchor: new T.Point(12, 12) 
//        });
//    	var iconC = new T.Icon({ 
//            iconUrl: "static/images/levelC.png", 
//            iconSize: new T.Point(12, 12), 
//            iconAnchor: new T.Point(12, 12) 
//        });
//    	var iconD = new T.Icon({ 
//            iconUrl: "static/images/levelD.png", 
//            iconSize: new T.Point(12, 12), 
//            iconAnchor: new T.Point(12, 12) 
//        });
//    	//海量密集点
////    	var ll = [[120.129920,30.254190],[120.139920,30.254190]];
////    	var lng=[];
////    	for (var i = 0; i < ll.length; i++) {
////                var data = new T.LngLat(ll[i][0], ll[i][1]);
////                lng.push(data);
////
////            }
////    	var _CloudCollection;
////    	if (document.createElement('canvas').getContext) {  // 判断当前浏览器是否支持绘制海量点
////            _CloudCollection = new T.CloudMarkerCollection(lng, {
////                color: 'blue',
////                SizeType: TDT_POINT_SIZE_SMALL
////            })
////            console.log(_CloudCollection);
////            map.addOverLay(_CloudCollection);
////        }
////        else {
////            alert('请在chrome、safari、IE8+以上浏览器查看本示例');
////        }   
//    for (var i = 0; i < lnglats.length; i = i + 1) {  
//	    if (lnglats[i].level == "待定") {  
//        	marker = new T.Marker(new T.LngLat(lnglats[i].x, lnglats[i].y), {icon: icon});
//        	var p=map.lngLatToContainerPoint(marker.wr);        	
//        	if (p.x<mSize.x && p.x>0 && p.y<mSize.y && p.y>0) {
//        		console.log(11);
//			}        	
//        	map.addOverLay(marker);
//        	iconMarkers.push(marker);  
//        } else if (lnglats[i].level == "A") {
//        	marker = new T.Marker(new T.LngLat(lnglats[i].x, lnglats[i].y), {icon: iconA});
//        	map.addOverLay(marker);
//        	iconMarkers.push(marker);
//		} else if (lnglats[i].level == "B") {
//        	marker = new T.Marker(new T.LngLat(lnglats[i].x, lnglats[i].y), {icon: iconB});
//        	map.addOverLay(marker);
//        	iconMarkers.push(marker);
//		} else if (lnglats[i].level == "C") {
//        	marker = new T.Marker(new T.LngLat(lnglats[i].x, lnglats[i].y), {icon: iconC});
//        	map.addOverLay(marker);
//        	iconMarkers.push(marker);
//		} else if (lnglats[i].level == "D") {
//        	marker = new T.Marker(new T.LngLat(lnglats[i].x, lnglats[i].y), {icon: iconD});
//        	map.addOverLay(marker);
//        	iconMarkers.push(marker);
//		}     
//	    if (iconMarkers[i]) {
//	    	iconMarkers[i].id=i;
//		}
//	    
//	    if (lnglats[i].level) {
//	    	iconMarkers[i].level=lnglats[i].level;
//		}
//	    
//       } 
//    map.centerAndZoom(new T.LngLat(120.149920, 30.274190), 18);                
//    var markers = new T.MarkerClusterer(map, {markers: iconMarkers}); 
//    markers.setGridSize(150);
//    map.centerAndZoom(new T.LngLat(120.149920, 30.274190), 12);
//    markers.setMaxZoom(15);
//   }    
//    console.log(iconMarkers);
//    addTEvent(iconMarkers,lnglats);
//}  
//
//function onMouseOver(m) {    
//    label = new T.Label({
//        text: "待定",
//        position: new T.LngLat(m.wr.lng, m.wr.lat),
//        offset: new T.Point(-10, 15)
//    });
//    labelA = new T.Label({
//        text: "A级",
//        position: new T.LngLat(m.wr.lng, m.wr.lat),
//        offset: new T.Point(-10, 15)
//    });
//    labelB = new T.Label({
//        text: "B级",
//        position: new T.LngLat(m.wr.lng, m.wr.lat),
//        offset: new T.Point(-10, 15)
//    });
//    labelC = new T.Label({
//        text: "C级",
//        position: new T.LngLat(m.wr.lng, m.wr.lat),
//        offset: new T.Point(-10, 15)
//    });
//    labelD = new T.Label({
//        text: "D级",
//        position: new T.LngLat(m.wr.lng, m.wr.lat),
//        offset: new T.Point(-10, 15)
//    });
//    if (m.level=="待定") {        	
//        map.addOverLay(label);//创建文本对象
//	}else if (m.level=="A") {
//		map.addOverLay(labelA);
//	}else if (m.level=="B") {
//		map.addOverLay(labelB);
//	}else if (m.level=="C") {
//		map.addOverLay(labelC);
//	}else if (m.level=="D") {
//		map.addOverLay(labelD);
//	}       
//} 
//
////鼠标从图标移动出去的时候执行  
//function onClose() {  
//    clearTimeout(timer);//关闭定时器。  
//    map.removeOverLay(label);//移除文本对象。
//    map.removeOverLay(labelA);
//    map.removeOverLay(labelB);
//    map.removeOverLay(labelC);
//    map.removeOverLay(labelD);
//}  
//
//function PointClick(e) 
//{
//	console.log(e);
//	console.log(e.lnglat);
//}
//
////加载PointClick、mouseover与mouseout事件。   
////iconMakers是已添加的标注对象。  
////lnglats是每个点的数据对象。通常iconMakers的length等于lnglats的length。  
////eventFn是传入 鼠标移动上去要调用哪个函数。默认是onMouseOver。主要是用于鼠标移动到点上可以显示出不同样式的窗口。  
//function addTEvent(iconMakers,lnglats,eventFn){  
//    var arrLen = lnglats.length;  
//    var i,eventFn = eventFn || onMouseOver;  
//    for (var i = 0;  i<arrLen; i++) {  
//        iconMakers[i].id=i; 
//        // 绑定事件  
//        (function() {  
//            var m = iconMakers[i];
//            m.addEventListener("click",PointClick);
//        	m.addEventListener("mouseover",function() {  
//	        	
//            	timer = setTimeout(mover, 500);//setTimeout不能带参数，所以用下面的方法处理。  
//            	function mover() {  
//                    eventFn(m);  
//                   }                	
//               }); 
//        	 m.addEventListener("mouseout", onClose); 
//        })();  
//    }  
//} 

/**
 * 表单工具类
 */
var FormUtils = {
	loadCombobox: function(id, url, valueField, textField, params){
		Ajax.postJson(url, params, function(data){
			if(data.code > 0 && data.rows && data.rows.length > 0){
				var html = "";
				data.rows.forEach(function(element, index) {
					html += '<option value=' + element[valueField] + '>' + element[textField] + '</option>';
				}, this);
				$('#' + id).html(html);
			}
		});
	},
	loadForm: function(id, data){
		var form = $('#' + id);
        $.each(data, function (name, ival) {
            var $oinput = form.find("input[name=" + name + "]");
            if ($oinput.attr("type") == "checkbox") {
                if (ival !== null) {
                    var checkboxObj = form.find("[name=" + name + "]");
                    var checkArray = ival.split(";");
                    for (var i = 0; i < checkboxObj.length; i++) {
                        for (var j = 0; j < checkArray.length; j++) {
                            if (checkboxObj[i].value == checkArray[j]) {
                                checkboxObj[i].click();
                            }
                        }
                    }
                }
            }
            else if ($oinput.attr("type") == "radio") {
                $oinput.each(function () {
                    var radioObj = form.find("[name=" + name + "]");
                    for (var i = 0; i < radioObj.length; i++) {
                        if (radioObj[i].value == ival) {
                            radioObj[i].click();
                        }
                    }
                });
            }
            else if ($oinput.attr("type") == "textarea") {
                form.find("[name=" + name + "]").html(ival);
            }
            else {
                form.find("[name=" + name + "]").val(ival);
            }
        })
	},
	getData: function(id){
		var serializeObj={};  
		var array= $('#' + id).serializeArray();  
		//var str=this.serialize();
		//console.log(array);
		array.forEach(function(element, index){  
			if(serializeObj[element.name]){  
				if($.isArray(serializeObj[element.name])){  
					serializeObj[element.name].push(element.value);  
				}else{  
					serializeObj[element.name]=[serializeObj[element.name],element.value];  
				}  
			}else{  
				serializeObj[element.name]=element.value;   
			}  
		}, this);  
		return serializeObj;  
	},
	clearForm: function(id){
		$('#' + id).find(':input').each(  
			function(){  
				switch(this.type){  
					case 'passsword':
					case 'select-multiple':
					case 'select-one':
					case 'text':
					case "number":
					case 'textarea':
						$(this).val('');  
						break;  
					case 'checkbox':  
					case 'radio':  
						this.checked = false;  
				}  
			}     
		);  
	}
}

//可关闭的tab页,基于bootstrap
var CloseableTable = function(id){
	//初始化tab页
	//this.domObj = $('#' + id);
	var dom = $('#' + id);
	dom.css('display', "flex");
	dom.css('flex-direction', "column");
	//this.domId = id;

	//生成主体
	this.header = $('<ul class="nav nav-tabs"></ul>');
	this.body = $('<div class="tab-content" style="flex:1;padding: 0px;"></div>');
	dom.append(this.header);
	dom.append(this.body);

	//关闭按钮
	dom.on('click', ".close-tab", this, function(eventObj){
		var target = $(eventObj.target);
		var tab = eventObj.data;
		var targetId = target.data("id");

		//寻找节点
		var header = $('#' + targetId);
		var body = tab.header.find("." + targetId);

		//激活前一个
		var preBody = header.prev();
		preBody.addClass("active");
		var preHeader = body.prev();
		preHeader.addClass("active");

		//remove掉
		header.remove();
		body.remove();
	});

	/**
	 * 添加tab页
	 */
	this.add = function(name, url, tabId, closable){
		//取消已经存在的选中状态
		this.header.find("li").removeClass("active");
		this.body.find(".tab-pane").removeClass("active");

		//添加content
		var content = $('<div class="tab-pane fade in active" id="' + tabId + '"></div>');
		this.body.append(content);
		content.load(url);

		//添加头
		var header = '<li class="active ' + tabId + '"><a href="#' + tabId + '" data-toggle="tab">' + name;
		if(closable){
			header += '<i class="close-tab" data-id="' + tabId + '">&times;</i>'
		}
		header += '</a></li>';
		this.header.append(header);
	}
}