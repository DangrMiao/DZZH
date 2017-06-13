//初始化路径
var baseUrl = CommonUtils.getBasePath();
//初始化Table
$('#map-search-data').bootstrapTable({
    url: 'map/list_map',         //请求后台的URL（*）
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
    	{field: 'id',title: 'id'}, 
        {field: 'name',title: '名称'}, 
        {field: 'location',title: '地址'}, 
        {field: 'governancetype',title: '治理类型'},
        {field: 'govertype',title: '灾害类型'}, 
        {field: 'scale',title: '规模'}, 
        {field: 'scalegrad',title: '规模等级'}, 
        {field: 'thisstage',title: '稳定性'}, 
        {field: 'strplancompletiontime',title: '计划时间'},
        //{field: 'level',title: '鉴定等级'},
        //{field: 'jznd',title: '建造年代'},
        //{field: 'zflb',title: '住房类别'}, 
        //{field: 'cs',title: '层数'}, 
        //{field: 'jzmj',title: '建筑面积'},
        //{field: 'js',title: '间数'}, 
        //{field: 'zdmj',title: '占地面积'}, 
        //{field: 'zfsyqk',title: '房屋使用情况'}, 
        //{field: 'wxdj',title: '危险性等级'}, 
       // {field: 'zt',title: '状态'},
        //{field: 'fcz',title: '房产证'}, 
        //{field: 'dismantle_time',title: '拆除时间'},
        //{field: 'reform_time',title: '改造时间'},  
        //{field: 'complete_time',title: '验收时间'},
        //{field: 'reform_type',title: '改造类型',formatter:type},
        
        //{field: 'tdxz',title: '土地性质'}, 
       
        //{field: 'x',title: 'X'},
        //{field: 'y',title: 'Y'}

    ],
    dataType: 'json',
    //传给后台的数据
    queryParams: function(params){
        if(params){
        	var res = FormUtils.getData("search-form-group-condition");
    		
            params.start = params.offset;
            params.rows = params.limit;
           
			// 查询条件		
			/*params.zdmj1 = (res.zdmj1 == '') ? "" : res.zdmj1;
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
			params.zt=res.zt;*/
			 
            //params.bh = $("#bh").val();
            //params.startime = $("#Startime").val();
            //params.endtime = $("#Endtime").val();
            params.district = res.district;
			params.name=res.name;
			params.scalegrad=res.scalegrad;
			params.thisstage=res.thisstage;
			params.governancetype=res.governancetype;
			
           
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
		//console.log(selections[0])
        if (selections[0].governancetypeid ==0){
    		$('#map-search-data-toorbar-zd-sxgx').css('display','inline-block');
    		$('#map-search-data-toorbar-bqbr-sxgx').css('display','none');
    		$('#map-search-data-toorbar-gczl-sxgx').css('display','none');
    		$('#map-search-data-toorbar-tjzlfa').css('display','inline-block');
    		$('#map-search-data-toorbar-bqry').css('display','none');
    		$('#map-search-data-toorbar-bqbr-zlsc').css('display','none');
    		$('#map-search-data-toorbar-bqbr-zlxz').css('display','none');
    		$('#map-search-data-toorbar-gczl-zlsc').css('display','none');
    		$('#map-search-data-toorbar-gczl-zlxz').css('display','none');
		}
        else if(selections[0].governancetypeid ==1){   	
        	$('#map-search-data-toorbar-zd-sxgx').css('display','none');
    		$('#map-search-data-toorbar-bqbr-sxgx').css('display','inline-block');
    		$('#map-search-data-toorbar-gczl-sxgx').css('display','none');
    		$('#map-search-data-toorbar-tjzlfa').css('display','none');
    		$('#map-search-data-toorbar-bqry').css('display','inline-block');
    		$('#map-search-data-toorbar-bqbr-zlsc').css('display','inline-block');
    		$('#map-search-data-toorbar-bqbr-zlxz').css('display','inline-block');
    		$('#map-search-data-toorbar-gczl-zlsc').css('display','none');
    		$('#map-search-data-toorbar-gczl-zlxz').css('display','none');
        	}
        else if(selections[0].governancetypeid ==2){
        	$('#map-search-data-toorbar-zd-sxgx').css('display','none');
    		$('#map-search-data-toorbar-bqbr-sxgx').css('display','none');
    		$('#map-search-data-toorbar-gczl-sxgx').css('display','inline-block');
    		$('#map-search-data-toorbar-tjzlfa').css('display','none');
    		$('#map-search-data-toorbar-bqry').css('display','none');
    		$('#map-search-data-toorbar-bqbr-zlsc').css('display','none');
    		$('#map-search-data-toorbar-bqbr-zlxz').css('display','none');
    		$('#map-search-data-toorbar-gczl-zlsc').css('display','inline-block');
    		$('#map-search-data-toorbar-gczl-zlxz').css('display','inline-block');
        	} 
		
		//console.log(Mmarker);
		if (Mmarker) {
    		map.removeOverLay(Mmarker);
		}
		map.centerAndZoom(new T.LngLat(selections[0].xcoordinate, selections[0].ycoordinate), 16);
    	var icon1 = new T.Icon({  
            iconUrl: "static/images/location.gif", 
            iconSize: new T.Point(40, 40), 
            iconAnchor: new T.Point(20, 32) 
        }); 
        //向地图上添加自定义标注 
    	Mmarker = new T.Marker(new T.LngLat(selections[0].xcoordinate, selections[0].ycoordinate), {icon: icon1}); 
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
        	 //console.log(selections[0])
        	FormUtils.loadForm('form-test-qlr', selections[0]);
        	$('#map-search-data-div').css('display','none');
	        	$("#qlr-close").on("click",function(){
	        		$('#map-search-data-div').css('display','block');
	        	})
        });

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
    //切换影像          待定
/*    $('#search-form-group-btn').on("click", function(){
    	  var map;
          var zoom = 8;
          var lay;
          var onlyMapLay;
              var imageURL = "http://t0.tianditu.cn/img_w/wmts?" +
                      "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
                      "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}";
              //创建自定义图层对象
              lay = new T.TileLayer(imageURL,{minZoom:1,maxZoom:18});
              var config = {layers: [lay]};
              //初始化地图对象
              map = new T.Map("mapDiv", config);
              //设置显示地图的中心点和级别
              map.centerAndZoom(new T.LngLat(116.40969, 39.89945), zoom);
              //允许鼠标滚轮缩放地图
              map.enableScrollWheelZoom();  
    });
    */
    
    
    
    
    var zoom = 12; 
    var circle;
    var circleTool,PolylineTool,PolygonTool,RectangleTool,handler;
    var NO=0,le;
    function ToolClose() {   	
        var config = {  
        		weight:3, //折线的宽度，以像素为单位  
            };
        
        circleTool = new T.CircleTool(map);
        PolylineTool = new T.PolylineTool(map,config);
        PolygonTool = new T.PolygonTool(map,config);
        RectangleTool = new T.RectangleTool(map,config);
        handler = new T.PaintBrushTool(map, { 
            keepdrawing: false, 
            style: { 
                weight: 3, 
            } 
        }); 

        RectangleTool.open();
        
        if (circle) {
    		map.removeLayer(circle);
		}
        circleTool.clear();
        RectangleTool.clear();
        handler.clear();
        
		PolylineTool.close();
		PolygonTool.close();
		RectangleTool.close();
		handler.close();
		
		var allLays = map.getOverlays();
		if (NO==0) {
			le = allLays.length;
		}
		NO++;
		if(allLays.length>le) {
			map.removeOverLay(allLays[le]);
		}		
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
    //“暂定”的属性更新
    $("#map-search-data-toorbar-zd-sxgx").on("click",function(){
    	//$('#form-test').form('load',selections[0]); 
    	//console.log(selections[0]);
    	selections = $('#map-search-data').bootstrapTable('getSelections');
    	//console.log(selections[0])
    	FormUtils.loadForm('form-start-sxgx', selections[0]);
    	$('#account-Manager-add-dialog-start-sxgx').modal('show');
    	$('#map-search-data-div').css('display','none');
        	$("#start-sxgx-close").on("click",function(){
        		$('#map-search-data-div').css('display','block');
        	})   	
    });
    //“暂定”的属性更新提交
    $("#start-save-submit").on("click",function(){
     	var params = FormUtils.getData("form-start-sxgx");
     	//console.log(selections[0])
     	//params.plancompletiontime=params.strplancompletiontime;
     	params.id=selections[0].id;
     	console.log(params)
     	Ajax.postJson(baseUrl+'map/update_map', params, function(data){
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
     	$('#account-Manager-add-dialog-start-sxgx').modal('hide');
     	$('#search-form-group').css('display','block');	
     	$('#map-search-data-div').css('display','block');	 
 	});
 
    //添加治理方案
   $("#map-search-data-toorbar-tjzlfa").on("click",function(){
    	//$('#form-test').form('load',selections[0]); 
	   selections = $('#map-search-data').bootstrapTable('getSelections');
    	$('#account-Manager-add-dialog-result').modal('show');
    	//FormUtils.loadForm('form-test-result', selections[0].name);
    	$('#map-search-data-div').css('display','none');
        	$("#ckjdjg-close").on("click",function(){
        		$('#map-search-data-div').css('display','block');
        	})
    });
   
   //添加治理方案提交
   $("#add-save-submit").on("click",function(){
	 selections = $('#map-search-data').bootstrapTable('getSelections');
   	var params = FormUtils.getData("form-test-result");
   	//params.plancompletiontime=params.strplancompletiontime;
   	params.hiddendanger_id=selections[0].id;
   	params.name = selections[0].name;
   	console.log(params)
   	if(params.governancetype=="1"){
	    		Ajax.postJson(baseUrl+'relocation/add_relocationProject', params, function(data){
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
   	}
	    else if(params.governancetype=="2"){
	    	Ajax.postJson(baseUrl+'engineer/add_engineerproject', params, function(data){
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
	    }
   	//刷新没问题
   	$('#map-search-data').bootstrapTable('refresh');
   	$('#account-Manager-add-dialog-result').modal('hide');
   	$('#search-form-group').css('display','block'); 
   	$('#map-search-data-div').css('display','block');
	});
   
   //搬迁避让属性更新
   $("#map-search-data-toorbar-bqbr-sxgx").on("click",function(){
   	selections = $('#map-search-data').bootstrapTable('getSelections');
   	var BqbrSxgxs={};
   	BqbrSxgxs.id = selections[0].id;
	    Ajax.getJson("relocation/search_relocation",BqbrSxgxs, function(data){
			console.log(data)
		$('#account-Manager-add-dialog-bqbr').modal('show');
		//FormUtils.loadForm('form-bqbr',data.rows[0]);
		$('#map-search-data-div').css('display','none');
		$('#search-form-group').css('display','none');
		$("#bqbr-close").on("click",function(){
			$('#search-form-group').css('display','block');	
			$('#map-search-data-div').css('display','block');
		  });
	   })
   });
});