//初始化路径
var baseUrl = CommonUtils.getBasePath();
var type = function(value,row){
	 switch (value)
	 {
	 case "0":
	 	return "原拆原建";
	 case "1":
		return "修缮加固";
	 case "2":
		 return "拆除";
	 }
}

//初始化Table
$('#map-search-data').bootstrapTable({
    url: 'house/history_search',         //请求后台的URL（*）
    method: 'get',                      //请求方式（*）
    toolbar: '#map-search-data-toorbar',                //工具按钮用哪个容器
    striped: true,                      //是否显示行间隔色
    cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
    pagination: true,                   //是否显示分页（*）
    sortable: false,                     //是否启用排序
    sortOrder: "asc",                   //排序方式
    sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
    pageNumber: 1,                       //初始化加载第一页，默认第一页
    pageSize: 6,                       //每页的记录行数（*）
    paginationHAlign: 'left',
    paginationDetailHAlign: "right",
    //pageList: [10, 20, 50],        //可供选择的每页的行数（*）
    //showPaginationSwitch: true,
    singleSelect: true,
    minimumCountColumns: 2,             //最少允许的列数
    clickToSelect: true,                //是否启用点击选中行
    uniqueId: "id",                     //每一行的唯一标识，一般为主键列
    cardView: false,                    //是否显示详细视图
    detailView: false,                   //是否显示父子表
    height: 200,
    //经纬度点击事件
 /*   onClickRow:function(row,tr){
    	var map, zoom = 12;
    	//初始化地图对象 
    	map = new T.Map("mapDiv"); 
        
    	var icon1 = new T.Icon({ 
            iconUrl: "static/images/location.gif", 
            iconSize: new T.Point(40, 40), 
            iconAnchor: new T.Point(20, 32) 
        }); 
        //向地图上添加自定义标注 
        var marker = new T.Marker(new T.LngLat(row.x, row.y), {icon: icon1}); 
        map.addOverLay(marker); 
    },*/
    columns: [
    	{checkbox: true},
    	{field: 'id',title: 'ID'}, 
        {field: 'bh',title: '编号'}, 
        {field: 'xzjd',title: '乡镇街道'}, 
        {field: 'ssc',title: '所属村'},
        {field: 'mph',title: '门牌号'}, 
        {field: 'name',title: '户主'}, 
        {field: 'identity',title: '身份证号'}, 
        {field: 'phonenum',title: '联系电话'}, 
        {field: 'date',title: '鉴定时间'},
        {field: 'level',title: '鉴定等级'},
        //{field: 'jznd',title: '建造年代'},
        {field: 'zflb',title: '住房类别'}, 
        {field: 'cs',title: '层数'}, 
        {field: 'jzmj',title: '建筑面积'},
        {field: 'js',title: '间数'}, 
        {field: 'zdmj',title: '占地面积'}, 
        {field: 'zfsyqk',title: '房屋使用情况'}, 
        //{field: 'wxdj',title: '危险性等级'}, 
       // {field: 'zt',title: '状态'},
        {field: 'fcz',title: '房产证'}, 
        {field: 'dismantle_time',title: '拆除时间'},
        {field: 'reform_time',title: '改造时间'},  
        {field: 'complete_time',title: '验收时间'},
        {field: 'reform_type',title: '改造类型',formatter:type},
        
        //{field: 'tdxz',title: '土地性质'}, 
       
        {field: 'x',title: 'X'},
        {field: 'y',title: 'Y'}

    ],
    dataType: 'json',
    //传给后台的数据
    queryParams: function(params){
        if(params){
        	var res = FormUtils.getData("search-form-group-condition");
    		console.log(res)
            params.start = params.offset;
            params.rows = params.limit;
           
			// 查询条件		
			params.zdmj1 = (res.zdmj1 == '') ? "" : res.zdmj1;
			params.zdmj2 = (res.zdmj2 == '') ? "" : res.zdmj2;
			params.cs= res.cs;
			params.js1 = (res.js1 == '') ? "" : res.js1;
			params.js2 = (res.js2 == '') ? "" : res.js2;
			params.reform_type = res.reform_type;
			params.xzjd = res.xzjd;
			params.ssc = res.ssc;
			params.mph = res.mph;
			params.zflb = res.zflb;
			params.Startime=res.Startime;
			params.Endtime=res.Endtime;
			params.zt=res.zt;
			 
            //params.bh = $("#bh").val();
            //params.startime = $("#Startime").val();
            //params.endtime = $("#Endtime").val();
           
        }

        return params;
    },
    responseHandler: function(res){
        if(res.code > 0){
            return res;
        }else{
            return [];
        }
    }
});

$(function(){  
	var Mmarker;
	var selections
	$("#map-search-data").on("click",function(){
		selections = $('#map-search-data').bootstrapTable('getSelections');
		//console.log(selections[0]);
		//console.log(Mmarker);
		if (Mmarker) {
    		map.removeOverLay(Mmarker);
		}
		map.centerAndZoom(new T.LngLat(selections[0].x, selections[0].y), 16);
    	var icon1 = new T.Icon({ 
            iconUrl: "static/images/location.gif", 
            iconSize: new T.Point(40, 40), 
            iconAnchor: new T.Point(20, 32) 
        }); 
        //向地图上添加自定义标注 
    	Mmarker = new T.Marker(new T.LngLat(selections[0].x, selections[0].y), {icon: icon1}); 
        map.addOverLay(Mmarker); 
	    
    	$('#account-Manager-add-dialog-result').modal({
            keyboard: true,
            backdrop: "static",
            show:false
        });

    	$('#account-Manager-add-dialog-sxgx').modal({
            keyboard: true,
            backdrop: "static",
            show:false
        });     
        //权利人
    	//禁用空白处点击关闭
    	$('#account-Manager-add-dialog-qlr').modal({
            keyboard: true,
            backdrop: "static",
            show:false
        });
        $("#map-search-data-toorbar-qlr").on("click",function(){
        	//$('#form-test').form('load',selections[0]); 
        	$('#account-Manager-add-dialog-qlr').modal('show');
        	 console.log(selections[0])
        	FormUtils.loadForm('form-test-qlr', selections[0]);
        	$('#map-search-data-div').css('display','none');
	        	$("#qlr-close").on("click",function(){
	        		$('#map-search-data-div').css('display','block');
	        	})
	        	

        });
        //房屋鉴定结果
        $("#map-search-data-toorbar-ckjdjg").on("click",function(){
        	//$('#form-test').form('load',selections[0]); 
        	$('#account-Manager-add-dialog-result').modal('show');
        	FormUtils.loadForm('form-test-result', selections[0]);
        	$('#map-search-data-div').css('display','none');
	        	$("#ckjdjg-close").on("click",function(){
	        		$('#map-search-data-div').css('display','block');
	        	})
        });
	});

    //搜索栏关闭
    $('#search-form-group-close').on("click", function(){
    	$('#search-form-group').css('display','none'); 
    	$("#show-or-hide-toolbar-btn").trigger("click");
    });
    
    //搜索
    $('#search-form-group-search-btn').on("click", function(){

    	$('#map-search-data-div').css('display','block');
        $('#map-search-data').bootstrapTable('refresh');
    });

    
    //table关闭
    $('#map-search-data-toorbar-close').on("click", function(){
    	$('#map-search-data-div').css('display','none');
    
    });
    
    
    var zoom = 12; 
//    map = new T.Map("mapDiv");
    var circle;
    var circleTool,PolylineTool,PolygonTool,RectangleTool,handler;
    var NO=0,le;
    function ToolClose() {   	
        //设置显示地图的中心点和级别 
//        map.centerAndZoom(new T.LngLat(120.149920, 30.274190), zoom);
        var config = {  
//                strokeColor:"blue", //折线颜色  
//                fillColor:"#FFFFFF",    //填充颜色。当参数为空时，折线覆盖物将没有填充效果  
        		weight:3, //折线的宽度，以像素为单位  
//                strokeOpacity:0.5,  //折线的透明度，取值范围0 - 1  
//                fillOpacity:0.5,        //填充的透明度，取值范围0 - 1  
//                showLabel:false             //是否显示页面，默认为true.  
            };
        
        circleTool = new T.CircleTool(map);
        PolylineTool = new T.PolylineTool(map,config);
        PolygonTool = new T.PolygonTool(map,config);
        RectangleTool = new T.RectangleTool(map,config);
        handler = new T.PaintBrushTool(map, { 
            keepdrawing: false, 
            style: { 
//                color: "red", 
                weight: 3, 
//                opacity: 0.5, 
//                lineStyle: 'dashed' 

            } 
        }); 

        RectangleTool.open();
        
        if (circle) {
    		map.removeLayer(circle);
		}
        circleTool.clear();
//      PolylineTool.clear();
//      PolygonTool.clear();
        RectangleTool.clear();
        handler.clear();
        
//        circleTool.close();
		PolylineTool.close();
		PolygonTool.close();
		RectangleTool.close();
		handler.close();
		
		var allLays = map.getOverlays();
//		console.log(allLays);
		if (NO==0) {
			le = allLays.length;
		}
		NO++;
		if(allLays.length>le) {
			map.removeOverLay(allLays[le]);
		}		
//        map.clearOverLays();
        map.removeEventListener("click",MapClick);
	}

    function MapClick(e) 
	{
    	if (circle) {
    		map.removeLayer(circle);
		} 
		circle = new T.Circle(new T.LngLat(e.lnglat.getLng(), e.lnglat.getLat()),5,{color:"blue",weight:5,opacity:0.5,fillColor:"blue",fillOpacity:0.5,lineStyle:"solid"});		
		//向地图上添加小圆点
        map.addOverLay(circle);
	} 
    //点选
    $('#pointChoose').on("click", function(){
        ToolClose();
        map.addEventListener("click",MapClick);        
    });
    
    //线选
    $('#lineChoose').on("click", function(){
//    	PolylineTool = new T.PolylineTool(map);
    	ToolClose();
        PolylineTool.open();
    });
    
    //多边形选
    $('#polygonChoose').on("click", function(){
//		PolygonTool = new T.PolygonTool(map);
		ToolClose();
        PolygonTool.open();
        
    });

    //矩形选
    $('#rectangleChoose').on("click", function(){            	   	
//    	RectangleTool = new T.RectangleTool(map); 
    	ToolClose();
        RectangleTool.open();
    });
    
    //曲线选
    $('#curveChoose').on("click", function(){
//    	handler = new T.PaintBrushTool(map);
    	ToolClose();
        handler.open(); 
    });
    
    //清除选择
    $('#cancel').on("click", function(){
    	ToolClose();
    	map.enableDrag();
    });
    
	$('#account-Manager-add-dialog').modal({
        keyboard: true,
        backdrop: "static",
        show:false
    });
    //房屋概况信息
    $("#map-search-data-toorbar-fwgk").on("click",function(){
    	selections = $('#map-search-data').bootstrapTable('getSelections');
    	//$('#form-test').form('load',selections[0]); 
    	$('#account-Manager-add-dialog').modal('show');
    	FormUtils.loadForm('form-test', selections[0]);
    	$('#map-search-data-div').css('display','none');
        	$("#fwgk-close").on("click",function(){
        		$('#map-search-data-div').css('display','block');
        	})
    });
	 //图片展示
    $("#history-photo-display").on("click",function(){
    	//console.log(selections[0].bh);
    	var params = selections[0].bh; 
    	Ajax.postJson(baseUrl+"house/getOne?bh="+params,{},function(data){
    		//console.log(data);
		       	 if(data.rows.photoArray.length>0 ){
		     		$('#account-Manager-add-dialog-photo').modal('show');
		              var interval = 3000;
		              var viewer = document.getElementById('viewer');
		              var current = 0;
		              var len = data.rows.photoArray.length;
		              var setImage = function(){
		                  viewer.src = data.rows.photoArray[current];
		                  current = ++current>len-1? 0 : current;
		              };
		              setImage();
		              setInterval(setImage,interval);
		     	}
		     	 else{
		     		 $.gritter.add({
		                  title: '提示',
		                         text: '没有照片',
		                         time: 1000,
		                 });
		     	 }
    	});


    	//刷新有问题
    	//$('#map-search-data').bootstrapTable('refresh');
    	//$('#account-Manager-add-dialog-sxgx').modal('hide');
    	//$('#map-search-data-div').css('display','block');
    	 
	});
    
    //属性更新
    $("#map-search-data-toorbar-sxgx").on("click",function(){
    	//$('#form-test').form('load',selections[0]); 
    	//console.log(selections[0]);
    	selections = $('#map-search-data').bootstrapTable('getSelections');
    	$('#account-Manager-add-dialog-sxgx').modal('show');
    	FormUtils.loadForm('form-sxgx', selections[0]);
    	$('#map-search-data-div').css('display','none');
        	$("#sxgx-close").on("click",function(){
        		$('#map-search-data-div').css('display','block');
        	})   	
    });
    
    //属性更新提交
    $("#slhs-sxgx-submit").on("click",function(){
    	var params = FormUtils.getData("form-sxgx"); 
    	Ajax.postJson(baseUrl+'house/history_update', params, function(data){
    		if(data.code > 0){ 
                $.gritter.add({
	                title: '提示',
	                text: '保存成功',
	                time: 1000,	                

                }); 
            }else{                
                	$.gritter.add({
                 title: '提示',
                        text: '保存失败:' + data.message,
                        time: 1000,
                });
             }
    	});
    	//刷新有问题
    	$('#map-search-data').bootstrapTable('refresh');
    	$('#account-Manager-add-dialog-sxgx').modal('hide');
    	$('#map-search-data-div').css('display','block');
    	 
	});
    
	// 导表
	$("#map-search-data-toorbar-hdcbg").on("click",function() {
		var params = FormUtils.getData("search-form-group-condition");
		// 导表条件条件
		var zdmj1 = (params.zdmj1 == '') ? "" : params.zdmj1;
		var zdmj2 = (params.zdmj2 == '') ? "" : params.zdmj2;
		var cs = params.cs;
		var js1 = (params.js1 == '') ? "" : params.js1;
		var js2 = (params.js2 == '') ? "" : params.js2;
		var reform_type = params.reform_type;
		var xzjd = params.xzjd;
		var ssc = params.ssc;
		var mph = params.mph;
		var zflb = params.zflb;
		var Startime=params.Startime;
		var Endtime=params.Endtime;
		var zt=params.zt;
		window.location.href= baseUrl + 'history/excel?zdmj1='+zdmj1+'&zdmj2='+zdmj2+'&cs='+cs+'&js1='+js1+'&js2='+js2+'&reform_type='+reform_type+'&xzjd='+xzjd+'&ssc='+ssc+'&mph='+mph+'&zflb='+zflb+'&Startime='+Startime+'&Endtime='+Endtime+'&zt='+zt;
		$.gritter.add({
			title : '提示',
			text : '导出成功',
			time : 1000,
			speed: 2000, 
		});
	});

});