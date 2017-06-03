//初始化路径
var baseUrl = CommonUtils.getBasePath();
var systemEdit = function(value,row){
	if(value!=null){
		var html = '<a href="javascript:void(0)" class="systemEdit-ckzp" data-id="'+ value + '"  >'+value+'</a>'
		return html;
	}else{
		return "-";
	}
	
}
//图片展示
$("#House--ckfj-data-div").on("click",".systemEdit-ckzp",function(){
	var selections = $('#House--ckfj-data').bootstrapTable('getSelections');     		
	$('#account-Manager-add-dialog-photos').modal('show');
	     		$("#viewers").attr("src",baseUrl+"file/download/"+selections[0].photo);//用户头像 
});

// 初始化Table
$('#map-search-data').bootstrapTable({
	url : 'house/page', // 请求后台的URL（*）
	method : 'get', // 请求方式（*）
	toolbar : '#map-search-data-toorbar', // 工具按钮用哪个容器
	striped : true, // 是否显示行间隔色
	cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
	pagination : true, // 是否显示分页（*）
	sortable : false, // 是否启用排序
	sortOrder : "asc", // 排序方式
	sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
	pageNumber : 1, // 初始化加载第一页，默认第一页
	pageSize : 10, // 每页的记录行数（*）
	paginationHAlign : 'left',
	paginationDetailHAlign : "right",
	// pageList: [10, 20, 50], //可供选择的每页的行数（*）
	silent: true,
	singleSelect : true,
	minimumCountColumns : 2, // 最少允许的列数
	clickToSelect : true, // 是否启用点击选中行
	uniqueId : "id", // 每一行的唯一标识，一般为主键列
	cardView : false, // 是否显示详细视图
	detailView : false, // 是否显示父子表
	height : 200,
	columns : [
		{checkbox : true}, 
		{field : 'id',title : 'id'}, 
		{field : 'bh',title : '编号'}, 
		{field : 'xzjd',title : '乡镇街道'}, 
		{field : 'ssc',title : '所属村'}, 
		{field : 'mph',title : '门牌号'}, 
		{field : 'name',title : '户主'}, 
		{field : 'identity',title : '身份证号'}, 
		{field : 'phonenum',title : '联系电话'}, 
		{field : 'jznd',title : '建造年代'}, 
		{field : 'zflb',title : '住房类别'}, 
		{field : 'cs',title : '层数'}, 
		{field : 'jzmj',title : '建筑面积'}, 
		{field : 'js',title : '间数'}, 
		{field : 'zdmj',title : '占地面积'},
		{field : 'level',title : '鉴定等级'},
		{field : 'zfsyqk',title : '房屋使用情况'}, 
		{field : 'jglx',title : '结构类型'}, 
		{field : 'tdxz',title : '土地性质'}, 
		{field : 'fcz',title : '房产证'}, 
		{field : 'x',title : 'X'}, 
		{field : 'y',title : 'Y'}, 
	],

	dataType : 'json',
	queryParams : function(params) {
		if (params) {
			var params = FormUtils.getData("search-form-group-condition");
			//console.log(params)
			params.start = params.offset;
			params.rows = params.limit;
			// 查询条件		
			/*params.zdmj1 = (data.zdmj1 == '') ? "" : data.zdmj1;
			params.zdmj2 = (data.zdmj2 == '') ? "" : data.zdmj2;
			params.jzmj1 = (data.jzmj1 == '') ? "" : data.jzmj1;
			params.jzmj2 = (data.jzmj2 == '') ? "" : data.jzmj2;
			params.js1 = (data.js1 == '') ? "" : data.js1;
			params.js2 = (data.js2 == '') ? "" : data.js2;		
			params.jznd = data.jznd;
			params.zfsyqk = data.zfsyqk;
			params.tdxz = data.tdxz;
			params.xzjd = data.xzjd;
			params.ssc = data.ssc;
			params.mph = data.mph;
			params.jglx = data.jglx;
			params.zflb = data.zflb;*/
			/*params.cs=data.cs;*/
			params.level=params.wxxdj;
			params.zt=$("#search-form-group-search-btn").val();
		}
		return params;
	},
	responseHandler : function(res) {
		if (res.code > 0) {
			return res;
		} else {
			return [];
		}
	},
});

$(function() {
	var Ymarker;
	var selections;
	$("#map-search-data").on("click",function() {
	   selections= $('#map-search-data').bootstrapTable('getSelections');
		// console.log(selections);
		if (Ymarker) {
			map.removeOverLay(Ymarker);
		}
		map.centerAndZoom(new T.LngLat(selections[0].x,
				selections[0].y), 16);
		var icon1 = new T.Icon({
			iconUrl : "static/images/location.gif",
			iconSize : new T.Point(40, 40),
			iconAnchor : new T.Point(20, 32)
		});
		// 向地图上添加自定义标注
		Ymarker = new T.Marker(new T.LngLat(selections[0].x,
				selections[0].y), {
			icon : icon1
		});
		map.addOverLay(Ymarker);
		
    	$('#account-Manager-add-dialog-wffwgk').modal({
            keyboard: true,
            backdrop: "static",
            show:false
        });

    	$('#account-Manager-add-dialog-qlr').modal({
            keyboard: true,
            backdrop: "static",
            show:false
    	 }); 
		// 房屋鉴定模块
		// 2、房屋概况
		$("#map-search-data-toorbar-fwgk").on("click",function() {
			// $('#form-test').form('load',selections[0]);
			selections= $('#map-search-data').bootstrapTable('getSelections');
			$('#account-Manager-add-dialog-wffwgk').modal('show');
			FormUtils.loadForm('form-wffwgk',selections[0]);
			$('#map-search-data-div').css('display','none');
			$('#search-form-group').css('display','none');
			$("#wffwgk-close").on("click",function() {
				$('#map-search-data-div').css('display', 'block');
				$('#search-form-group').css('display', 'block');
			})
		});

	// 4、权利人
	$("#map-search-data-toorbar-qlr").on("click",function() {
		// $('#form-test').form('load',selections[0]);
		selections= $('#map-search-data').bootstrapTable('getSelections');
		$('#account-Manager-add-dialog-qlr').modal('show');
		FormUtils.loadForm('form-qlr',selections[0]);
		$('#map-search-data-div').css('display','none');
		$('#search-form-group').css('display','none');
		$("#qlr-close").on("click",function() {
			$('#map-search-data-div').css('display', 'block');
			$('#search-form-group').css('display', 'block');
		})
	});
});
	
	 //图片展示
    $("#history-photos-display").on("click",function(){
    	var params = selections[0].bh; 
    	console.log(params)
    	Ajax.postJson(baseUrl+"house/getOne?bh="+params,{},function(data){
		       	 if(data.rows.photoArray.length>0 ){
		     		$('#account-Manager-add-dialog-photos').modal('show');
		              var interval = 3000;
		              var viewer = document.getElementById('viewers');
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
	});
    
	$('#account-Manager-add-dialog-sxgx').modal({
        keyboard: true,
        backdrop: "static",
        show:false
	 }); 
	// 3、属性更新
	$("#map-search-data-toorbar-sxgx").on("click",function() {
		// $('#form-test').form('load',selections[0]);
		selections= $('#map-search-data').bootstrapTable('getSelections');
		console.log(selections[0])
		$('#account-Manager-add-dialog-sxgx').modal('show');
		FormUtils.loadForm('form-sxgx',selections[0]);
		$('#map-search-data-div').css('display', 'none');
		$('#search-form-group').css('display', 'none');
		$("#sxgx-close").on("click",function() {
			$('#map-search-data-div').css('display','block');
			$('#search-form-group').css('display','block');
		})		
		// 保存
		$("#submit-sxgx-save").on("click",function() {
		var params = FormUtils.getData("form-sxgx");
		
		Ajax.postJson(baseUrl+ 'house/wf_update',params,function(data) {
			if (data.code > 0) {
				$.gritter.add({
							title : '提示',
							text : '保存成功',
							time : 1000,
						});
			} else {
				$.gritter.add({
							title : '提示',
							text : '保存失败:'+ data.message,
							time : 1000,
						});
			}
		});
		// 刷新有问题
		// $('#map-search-data').bootstrapTable('refresh');
		$('#account-Manager-add-dialog-sxgx').modal('hide');
		$('#search-form-group').css('display','block');
		$('#map-search-data-div').css('display','block');

	});
});
	$('#account-Manager-add-dialog-ckjdjg').modal({
        keyboard: true,
        backdrop: "static",
        show:false
	 });
	// 5、查看鉴定结果
	$("#map-search-data-toorbar-ckjdjg").on("click",function() {
		// $('#form-test').form('load',selections[0]);
		selections= $('#map-search-data').bootstrapTable('getSelections');
		$('#account-Manager-add-dialog-ckjdjg').modal('show');
		var params = FormUtils.loadForm('form-ckjdjg',selections[0]);
		
		$('#map-search-data-div').css('display','none');
		$('#search-form-group').css('display','none');
		$("#ckjdjg-close").on("click",function() {
			$('#map-search-data-div').css('display', 'block');
			$('#search-form-group').css('display', 'block');
		})
	});
	//查看附件	
	$("#form-horizontal-ckfj").on("click",function() {
		selections= $('#map-search-data').bootstrapTable('getSelections');
		// $('#form-test').form('load',selections[0]);
		/*var params = FormUtils.getData("form-ckjdjg");*/
		$('#House-Manager-ckfj-dialog').modal('show');
		$('#House--ckfj-data').bootstrapTable({
			url : 'house/listfile', // 请求后台的URL（*）
			method : 'get', // 请求方式（*）
			striped : true, // 是否显示行间隔色
			cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
			pagination : false, // 是否显示分页（*）
			sortable : false, // 是否启用排序
			sortOrder : "asc", // 排序方式
			sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
			pageNumber : 1, // 初始化加载第一页，默认第一页
			pageSize : 5, // 每页的记录行数（*）
			paginationHAlign : 'left',
			paginationDetailHAlign : "right",
			// pageList: [10, 20, 50], //可供选择的每页的行数（*）
			// showPaginationSwitch: true,
			height : 300,
			singleSelect : true,
			minimumCountColumns : 2, // 最少允许的列数
			clickToSelect : true, // 是否启用点击选中行
			uniqueId : "id", // 每一行的唯一标识，一般为主键列
			cardView : false, // 是否显示详细视图
			detailView : false, // 是否显示父子表
			columns: [
				{
					checkbox : true
				},
				{field: 'file',title: '文件(点击下载)',formatter:function(v,row){
					if (v && v!="") {
						return '<a href="' + baseUrl + 'file/download/' + v + '" >'+v+'</a>';
					}
				}},
				{field: 'photo',title: '照片(点击预览)',formatter:systemEdit},
				
				
		    ],
			dataType : 'json',
			queryParams : function(params) {
				if (params) {
					var data = FormUtils.getData("form-ckjdjg");
					params.start = params.offset;
					params.rows = params.limit;
					params.house_code=data.bh;
				}
				return params;
			},
			responseHandler : function(res) {
				if (res.code > 0) {
					return res;
				} else {
					return [];
				}
			},
		});		
	});
	
	$('#account-Manager-add-dialog-wfjd').modal({
        keyboard: true,
        backdrop: "static",
        show:false
	 });
    // 6、危房鉴定
    $("#map-search-data-toorbar-wfjd").on("click",function(){
    	selections = $('#map-search-data').bootstrapTable('getSelections');
    	$('#account-Manager-add-dialog-wfjd').modal('show');
    	FormUtils.loadForm('form-wfjd', selections[0]);
    	
    	$('#map-search-data-div').css('display','none');
    	$('#search-form-group').css('display','none');
    	$("#wfjd-close").on("click",function(){
    		$('#map-search-data-div').css('display','block');
    		$('#search-form-group').css('display','block');
    	})
    }); 
    
    $("#wfjd-save-submit").on("click",function() {
    	selections= $('#map-search-data').bootstrapTable('getSelections');
    	var params = FormUtils.getData("form-wfjd");
    	$('#form-wfjd').validate({ 
    		showErrors: function(errorMap,errorList){
                if(errorList && errorList.length && errorList.length > 0){
                    var error = errorList[0];
                    //$('#house-info-panel .validate-tips-label').text(error.message);
                }
            },             
            //验证成功后提交
            submitHandler: function(form){
            	$.ajaxFileUpload ({
                    url :baseUrl+'test/file.do',
                    secureuri :false,
                    fileElementId :'fileupload',
                    dataType : 'json',
        			type:"post",
        			data:{date:$('#date').val(), company:$('#company').val(), identifier:$('#identifier').val(), level:$('#level').val(), houseCode:$('#bh').val(),zt:"1"},　　　　　　　　　 	           
        			success : function (data, status){
        				console.log($('#date').val())
        				console.log(data);
        	            	if (data.code>0) {
        	            		$.gritter.add({
        		        			title : '提示',
        		        			text : '鉴定成功',
        		        			time : 1000,
        		        		});
        	            		$('#map-search-data').bootstrapTable('refresh');
        	            		$('#search-form-group').css('display','block');
        	            		$('#account-Manager-add-dialog-wfjd').modal('hide');       	            		
        	            		$('#map-search-data-div').css('display','block');
        					}else {
        						$.gritter.add({
        		        			title : '提示',
        		        			text : data.message,
        		        			time : 1000,
        		        		});
        					}
        	        	   
        	            },
        	            error: function (data, status, e)
        	            {
        	            	console.log(e);
        	            }
                });
            },        
        });
		
	})
	
	$('#account-Manager-add-dialog-fwcz').modal({
        keyboard: true,
        backdrop: "static",
        show:false
	 });
	// 7、房屋处置
	$("#map-search-data-toorbar-fwcz").on("click",function() {
		// $('#form-test').form('load',selections[0]);
		selections= $('#map-search-data').bootstrapTable('getSelections');
		$('#account-Manager-add-dialog-fwcz').modal('show');
		FormUtils.loadForm('form-fwcz',selections[0]);
		$('#map-search-data-div').css('display', 'none');
		$('#search-form-group').css('display', 'none');
		$("#fwcz-close").on("click",function() {
			$('#map-search-data-div').css('display','block');
			$('#search-form-group').css('display','block');
		})
		
	});
	// 房屋处置保存
	$("#submit-fwcz-save").on("click",function() {
		var params = FormUtils.getData("form-fwcz1");
		// 参数转换,后台是houseCode（房屋编号）,前台是bh（编号）
		params.houseCode = selections[0].bh;
		$('#form-fwcz1').validate({ 
    		showErrors: function(errorMap,errorList){
                if(errorList && errorList.length && errorList.length > 0){
                    var error = errorList[0];
                    //$('#house-info-panel .validate-tips-label').text(error.message);
                }
            },             
            //验证成功后提交
            submitHandler: function(form){
            	Ajax.postJson(baseUrl+ 'house/disposes/disposes',params,function(data) {
            		if (data.code > 0) {
    					$.gritter.add({
    								title : '提示',
    								text : '保存成功',
    								time : 1000,
    							});
    					$('#map-search-data').bootstrapTable('refresh');
    					$('#search-form-group').css('display','block');
    					$('#account-Manager-add-dialog-fwcz').modal('hide');
    					$('#map-search-data-div').css('display','block');
    				} else {
    					$.gritter.add({
    								title : '提示',
    								text : '保存失败:'+ data.message,
    								time : 1000,
    							});
    				}
    			});
            }
		});			

	});
	
	// 地基监测查询
	$('#djjc-search-btn').on("click", function() {
		$("#show-or-hide-toolbar-btn").trigger("click");
		$('#search-form-group').css('display', 'block');
		$('.search-form').css('display', 'none');
		$('#search-form-group-condition').css('display', 'block');
		$('#search-form-group-search-btn').css('display', 'block');
		$('#search-form-group-householder-search-btn').css('display', 'none');
		$('#householder-map-search-data-div').css('display', 'none');
		$('.map-search-data-type').css('display', 'none');
		$('#map-search-data-toorbar-djjc').css('display', 'inline-block');
		$('#map-search-data-div').css('display', 'none');
		$('#search-form-group-search-btn').attr('value',"");

	});

	// 房屋鉴定查询
	$('#fwjd-search-btn').on("click", function() {
		$("#show-or-hide-toolbar-btn").trigger("click");
		$('#search-form-group').css('display', 'block');
		$('.search-form').css('display', 'none');
		$('#search-form-group-condition').css('display', 'block');
		$('#search-form-group-search-btn').css('display', 'block');
		$('#search-form-group-householder-search-btn').css('display', 'none');
		$('#householder-map-search-data-div').css('display', 'none');
		$('#map-search-data-div').css('display', 'none');
		$('.map-search-data-type').css('display', 'none');
		$('#map-search-data-toorbar-wfjd').css('display', 'inline-block');
		$('#search-form-group-search-btn').attr('value',0);

	});

	// 危房处置查询
	$('#wfcz-search-btn').on("click", function() {
		$("#show-or-hide-toolbar-btn").trigger("click");
		$('#search-form-group').css('display', 'block');
		$('.search-form').css('display', 'none');
		$('#search-form-group-condition').css('display', 'block');
		$('#search-form-group-search-btn').css('display', 'block');
		$('#search-form-group-householder-search-btn').css('display', 'none');
		$('#householder-map-search-data-div').css('display', 'none');
		$('#map-search-data-div').css('display', 'none');
		$('.map-search-data-type').css('display', 'none');
		$('#map-search-data-toorbar-fwcz').css('display', 'inline-block');
		$('#search-form-group-search-btn').attr('value',1);
	});

	// 条件查询
	$('#condition-search-btn').on("click", function() {
		$("#show-or-hide-toolbar-btn").trigger("click");
		$('#search-form-group').css('display', 'block');
		$('.search-form').css('display', 'none');
		$('#search-form-group-condition').css('display', 'block');
		$('.map-search-data-type').css('display', 'none');
		$('#search-form-group-search-btn').attr('value','');

	});

	// 空间查询
	$('#space-search-btn').on("click", function() {
		$("#show-or-hide-toolbar-btn").trigger("click");
		$('#search-form-group').css('display', 'block');
		$('.search-form').css('display', 'none');
		$('#search-form-group-space').css('display', 'block');
		$('.map-search-data-type').css('display', 'none');
	});

	// 搜索栏关闭
	$('#search-form-group-close').on("click", function() {
		$('#search-form-group').css('display', 'none');
		$("#show-or-hide-toolbar-btn").trigger("click");
	});

	// 条件搜索
	$('#search-form-group-search-btn').on("click", function() {
//		if ($("#search-form-group-search-btn").val()==1) {
//			
//		}else {
//			$('#map-search-data').bootstrapTable('hideColumn', '');
//		}
		$('#map-search-data-div').css('display', 'block');		
		$('#map-search-data').bootstrapTable('refresh');
//		var params = FormUtils.getData("search-form-group-condition");
	});

	// table关闭
	$('#map-search-data-toorbar-close').on("click", function() {
		$('#map-search-data-div').css('display', 'none');
	});

	var zoom = 12;
	// map = new T.Map("mapDiv");
	var circle;
	var circleTool, PolylineTool, PolygonTool, RectangleTool, handler;
	var NO = 0, le;
	function ToolClose() {
		var config = {
			// strokeColor:"blue", //折线颜色
			// fillColor:"#FFFFFF", //填充颜色。当参数为空时，折线覆盖物将没有填充效果
			weight : 3, // 折线的宽度，以像素为单位
		// strokeOpacity:0.5, //折线的透明度，取值范围0 - 1
		// fillOpacity:0.5, //填充的透明度，取值范围0 - 1
		// showLabel:false //是否显示页面，默认为true.
		};
		circleTool = new T.CircleTool(map);
		PolylineTool = new T.PolylineTool(map, config);
		PolygonTool = new T.PolygonTool(map, config);
		RectangleTool = new T.RectangleTool(map, config);
		handler = new T.PaintBrushTool(map, {
			keepdrawing : false,
			style : {
				// color: "red",
				weight : 3,
			// opacity: 0.5,
			// lineStyle: 'dashed'

			}
		});
		if (circle) {
			map.removeLayer(circle);
		}
		// circleTool.clear();
		// // PolylineTool.clear();
		// // PolygonTool.clear();
		// RectangleTool.clear();
		// handler.clear();

		// circleTool.close();
		// PolylineTool.close();
		// PolygonTool.close();
		// RectangleTool.close();
		// handler.close();

		var allLays = map.getOverlays();
		if (NO == 0) {
			le = allLays.length;
		}
		NO++;
		// console.log(allLays);
		if (allLays.length > le) {
			// console.log(allLays[le]);
			map.removeOverLay(allLays[le]);
		}

		circle = "";
		// map.clearOverLays();
		map.removeEventListener("click", MapClick);
	}

	// 空间搜索
	$('#search-form-group-space-search-btn').on("click", function() {
		$('#map-search-data-div').css('display', 'block');
		// var allLays = map.getOverlays();
		// var lastT = allLays[allLays.length-1];

		// if (RectangleTool.getRectangles()!=null &&
		// RectangleTool.getRectangles().length!=0) { //矩形选图形
		// var rect=RectangleTool.getRectangles()[0];
		// var wS=rect.LR.Kq; //矩形西南角经纬度
		// var eN=rect.LR.kq; //矩形东北角经纬度
		// }

		// 检查类型
		if (circle) { // 点选图形
			var c = circle.getCenter();// 圆心经纬度，半径固定为5
			console.log(circle, c);
			console.log("圆");
		} else {
			try {
				var line = PolylineTool.getPolylines()[0]; // 线选图形
				var lineArea = line.getBounds();// 外包矩形，Kq为西南角经纬度，kq为东北角经纬度。
				var pts = line.getLngLats(); // 所画线的点
				// for(var i = 0; i < pts.length - 1; i++){
				// var curPt = pts[i];
				// var nextPt = pts[i + 1];
				// //首先判断point是否在curPt和nextPt之间，即：此判断该点是否在该线段的外包矩形内
				// if (point.lng >= Math.min(curPt.lng, nextPt.lng) && point.lng
				// <= Math.max(curPt.lng, nextPt.lng) &&
				// point.lat >= Math.min(curPt.lat, nextPt.lat) && point.lat <=
				// Math.max(curPt.lat, nextPt.lat)){
				// //判断点是否在直线上公式
				// var precision = (curPt.lng - point.lng) * (nextPt.lat -
				// point.lat) -
				// (nextPt.lng - point.lng) * (curPt.lat - point.lat);
				// if(precision < 2e-10 && precision > -2e-10){//实质判断是否接近0
				// return true;
				// }
				// }
				// }
				console.log(line, lineArea, pts);
			} catch (e) {
			}

			// 矩形选图形
			try {
				var rect = RectangleTool.getRectangles()[0];
				var wS = rect.LR.Kq; // 矩形西南角经纬度
				var eN = rect.LR.kq; // 矩形东北角经纬度
				console.log(rect, "矩形");
			} catch (e) {
			}

			// 多边形选图形
			try {
				var pol = PolygonTool.getPolygons()[0];
				var pgArea = pol.getBounds();
				var pts = pol.getLngLats();
				console.log(pol, pgArea);
			} catch (e) {
			}

			// 任意选图形
			try {
				var han = handler.getLayers()[0];
				if (han) {
					var hArea = han.getBounds();
					var pts = han.getLngLats();
					console.log(han, hArea, pts);
				}

			} catch (e) {
			}
		}

		// if (data.rows[i].x>wS.lng && data.rows[i].x<eN.lng &&
		// data.rows[i].y>wS.lat && data.rows[i].y<eN.lat) {
		// console.log("点"+i+"在范围内");
		// }

		// var point=new T.LngLat(data.rows[i].x, data.rows[i].y);
		// var p2=map.lngLatToContainerPoint(point);
		// var dis = (p2.x-p1.x)*(p2.x-p1.x)+(p2.y-p1.y)*(p2.y-p1.y);
		// var dis =
		// (data.rows[i].x-c.lng)*(data.rows[i].x-c.lng)+(data.rows[i].y-c.lat)*(data.rows[i].y-c.lat);

		// $('#map-search-data').bootstrapTable('refresh');
	});

	function MapClick(e) {
		if (circle) {
			map.removeLayer(circle);
		}
		circle = new T.Circle(
				new T.LngLat(e.lnglat.getLng(), e.lnglat.getLat()), 5, {
					color : "blue",
					weight : 5,
					opacity : 0.5,
					fillColor : "blue",
					fillOpacity : 0.5,
					lineStyle : "solid"
				});
		// 向地图上添加小圆点
		map.addOverLay(circle);
	}
	// 点选
	$('#pointChoose').on("click", function() {
		ToolClose();
		map.addEventListener("click", MapClick);
	});

	// 线选
	$('#lineChoose').on("click", function() {
		// PolylineTool = new T.PolylineTool(map);
		ToolClose();
		PolylineTool.open();
	});

	// 多边形选
	$('#polygonChoose').on("click", function() {
		// PolygonTool = new T.PolygonTool(map);
		ToolClose();
		PolygonTool.open();

	});

	// 矩形选
	$('#rectangleChoose').on("click", function() {
		// RectangleTool = new T.RectangleTool(map);
		ToolClose();
		RectangleTool.open();
	});

	// 曲线选
	$('#curveChoose').on("click", function() {
		// handler = new T.PaintBrushTool(map);
		ToolClose();
		handler.open();
	});

	// 清除选择
	$('#cancel').on("click", function() {
		ToolClose();
	});

	// 缓冲半径变化
	$('#space-search-hcbj').bind('input', function() {
		var hcbj = $('#space-search-hcbj').val();
		var allLays = map.getOverlays();
		var lastT = allLays[allLays.length - 1];
		if (hcbj != "") {
			lastT.options.weight = hcbj;
			map.removeLayer(lastT);
			map.addOverLay(lastT);
		}
	});
	
	// 导表
	$("#map-search-data-toorbar-dcbg").on("click",function() {		
		var params = FormUtils.getData("search-form-group-condition");
		// 导表条件条件
		var level=params.wxxdj;
		var zt=$("#search-form-group-search-btn").val();
		var zflb = params.zflb;
		console.log($('#search-form-group-condition').serialize());
		window.location.href= baseUrl + 'house/toexcel?zt='+zt+'&level='+level+"&"+ $('#search-form-group-condition').serialize();
		$.gritter.add({
			title : '提示',
			text : '导出成功',
			time : 1000,
			speed: 2000, 
		});
	});
});
