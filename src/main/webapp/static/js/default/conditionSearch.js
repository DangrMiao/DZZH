//初始化路径
var baseUrl = CommonUtils.getBasePath();

var label;
//绘制多个marker。
var marker;
var iconMarkers=[];

/*var Xxxg = function(value,row){
 	var html1 = '<a href="javascript:void(0)" class="Xxxg-edit" data-id="'+ row.id + '"  >信息更新</a>';
 	return html1;
 }*/

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
    	{field: 'id',title: '编号'}, 
        {field: 'name',title: '名称'}, 
        {field: 'location',title: '地址'}, 
        {field: 'governancetype',title: '治理类型'},
        {field: 'govertype',title: '灾害类型'}, 
        {field: 'scale',title: '规模'}, 
        {field: 'scalegrad',title: '规模等级'}, 
        {field: 'thisstage',title: '稳定性'}, 
        {field: 'strplancompletiontime',title: '计划时间'},
        /*{field: 'xxxg',title: '操作', formatter:Xxxg}, */
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


//$(function(){   	
//	startLoad();
	//搜索
	$('#search-form-group-search-btn').on("click", function(){
	    var params = FormUtils.getData("search-form-group-condition");
   	    map.clearOverLays();

	     $.ajax({
	         type: "POST",
	         url: "map/list_map",
	         data:params,
	         dataType: "json",
	         success: function(data){	 
	        	    drawTMakers(data.rows);
	        	    //console.log(iconMarkers)
	        	    addTEvent(iconMarkers,data.rows);  		            
	           }
	      });
	     
    	 areas();

	    $('#map-search-data-div').css('display','block');
	    $('#map-search-data').bootstrapTable('refresh');       
	  });
//	});

//坐标点定位（注意：必须是先筛选，再定位，逻辑不能错）
	//单击定位
var Mmarker;
var selections;
$("#map-search-data").on("click",function(){
	selections = $('#map-search-data').bootstrapTable('getSelections');
	
	if (Mmarker) {
		map.removeOverLay(Mmarker);
	}
	map.centerAndZoom(new TLngLat(selections[0].xcoordinate, selections[0].ycoordinate), 12);
	var icon1 = new TIcon(  
        "static/images/location.gif", 
         new TSize(40, 42), 
         {anchor: new TPixel(20, 30)} 
    ); 
    //向地图上添加自定义标注 
	Mmarker = new TMarker(new TLngLat(selections[0].xcoordinate, selections[0].ycoordinate), {icon: icon1}); 
    map.addOverLay(Mmarker);  
  });


//双击展示模态框
$("#map-search-data").on("dbl-click-row.bs.table",function(row, $element,field){
	console.log(row, $element,field);
	var i;
	var allTableData = $("#map-search-data").bootstrapTable('getData');
	for(i=0;i<allTableData.length;i++){
		if(allTableData[i].id==$element.id){
			break;
		}
	}
	$('#map-search-data').bootstrapTable("uncheckAll");
	$('#map-search-data').bootstrapTable("check",i);
	
	selections = $('#map-search-data').bootstrapTable('getSelections');
	
    if (selections[0].governancetypeid ==0){   	
    	$('#account-Manager-add-dialog-start-sxgx').modal('show');
		FormUtils.loadForm('form-start-sxgx',selections[0]);
		//$('#map-search-data-div').css('display','none');
		//$('#search-form-group').css('display','none');
		$("#start-sxgx-close").on("click",function(){
    		$('#search-form-group').css('display','block');	
    		$('#map-search-data-div').css('display','block');
    	})
	}
    else if(selections[0].governancetypeid ==1){  
    	var params={};
		params.hiddendanger_id=selections[0].id;
		console.log(params)
		Ajax.getJson("relocation/search_relocation",params, function(data){
			data.rows[0].Handle = selections[0].Handle;
			//console.log(data)
		$('#account-Manager-add-dialog-bqbr-second').modal('show');
		treeConframe.window.goto_treenode_by_projectid(data.rows[0].id,1);
		FormUtils.loadForm('form-second-bqbr',data.rows[0]);
		//$('#map-search-data-div').css('display','none');
		//$('#search-form-group').css('display','none');
		$("#bqbr-second-close").on("click",function(){
    		$('#search-form-group').css('display','block');	
    		$('#map-search-data-div').css('display','block');
    		
    	  });
	   })
    }
    else if(selections[0].governancetypeid ==2){
    	var params={};
		params.hiddendanger_id=selections[0].id;
		Ajax.getJson("engineer/search_engineer",params, function(data){
			data.rows[0].Handle = selections[0].Handle;
			console.log(data)
		$('#account-Manager-add-dialog-gczl-sxgx-second').modal('show');
		treeConframe1.window.goto_treenode_by_projectid(data.rows[0].id,2);
		FormUtils.loadForm('form-second-gczl',data.rows[0]);
		//$('#map-search-data-div').css('display','none');
		//$('#search-form-group').css('display','none');
		$("#gczl-sxgx-second-close").on("click",function(){
    		$('#search-form-group').css('display','block');	 
    		$('#map-search-data-div').css('display','block');
    	  });
	   }) 
     } 
	});


    //table关闭
    $('#map-search-data-toorbar-close').on("click", function(){
    	$('#map-search-data-div').css('display','none');
    });

  //最初的操作中的更新
    $("#map-search-data").on("click",".Xxxg-edit",function(){
    	selections = $('#map-search-data').bootstrapTable('getSelections');
    	console.log(selections[0])
    	if (selections[0].governancetypeid ==0){ 
    		$('#account-Manager-add-dialog-start-sxgx').modal('show');
			FormUtils.loadForm('form-start-sxgx',selections[0]);
			//$('#map-search-data-div').css('display','none');
			//$('#search-form-group').css('display','none');
			$("#start-sxgx-close").on("click",function(){
        		$('#search-form-group').css('display','block');	
        		$('#map-search-data-div').css('display','block');
        	})
		}
    	else if(selections[0].governancetypeid ==1){
    		var params={};
    		params.id=selections[0].id;
    		Ajax.getJson("relocation/search_relocation",params, function(data){
    		$('#account-Manager-add-dialog-bqbr-second').modal('show');
    		treeConframe.window.goto_treenode_by_projectid(data.rows[0].id,1);
			FormUtils.loadForm('form-second-bqbr',data.rows[0]);
			//$('#map-search-data-div').css('display','none');
			//$('#search-form-group').css('display','none');
			$("#bqbr-second-close").on("click",function(){
        		$('#search-form-group').css('display','block');	
        		$('#map-search-data-div').css('display','block');
        		
        	  });
    	   })
    	}
    	else if(selections[0].governancetypeid ==2){
    		var params={};
    		params.id=selections[0].id;
    		Ajax.getJson("engineer/search_engineer",params, function(data){
    			console.log(data)
    		$('#account-Manager-add-dialog-gczl-sxgx-second').modal('show');
    		treeConframe1.window.goto_treenode_by_projectid(data.rows[0].id,2);
			FormUtils.loadForm('form-second-gczl',data.rows[0]);
			//$('#map-search-data-div').css('display','none');
			//$('#search-form-group').css('display','none');
			$("#gczl-sxgx-second-close").on("click",function(){
        		$('#search-form-group').css('display','block');	 
        		$('#map-search-data-div').css('display','block');
        	  });
    	   })
    	} 
}); 
    
    
	$('#account-Manager-add-dialog').modal({
        keyboard: true,
        backdrop: "static",
        show:false
    });
    //“暂定”的概况信息
    $("#map-search-data-toorbar-xxgk").on("click",function(){
    	selections = $('#map-search-data').bootstrapTable('getSelections');
    	//$('#form-test').form('load',selections[0]); 
    	$('#account-Manager-add-dialog-sxgx').modal('show');
    	FormUtils.loadForm('form-sxgx', selections[0]);
    	$("#sxgx-close").on("click",function(){
    		$('#search-form-group').css('display','block');	
    		$('#map-search-data-div').css('display','block');
    	})
    });
    
    //“搬迁避让”的概况信息1111
    $("#map-search-data-toorbar-bqbr-xxgk").on("click",function(){
    	selections = $('#map-search-data').bootstrapTable('getSelections');
    	//$('#form-test').form('load',selections[0]); 
	   	var BqbrXxgk={};
	   	BqbrXxgk.id = selections[0].id;
	    Ajax.getJson("relocation/search_relocation",BqbrXxgk, function(data){	 
    	$('#account-Manager-add-dialog-bqbr-second').modal('show');
    	console.log(data)
    	treeConframe.window.goto_treenode_by_projectid(data.rows[0].id,1);
    	FormUtils.loadForm('form-second-bqbr',data.rows[0]);
    	$("#bqbr-second-close").on("click",function(){
    		$('#search-form-group').css('display','block');	
    		$('#map-search-data-div').css('display','block');
    	});
	  })
    });
    
    //“工程治理”的概况信息1212121
    $("#map-search-data-toorbar-gczl-xxgk").on("click",function(){
    	selections = $('#map-search-data').bootstrapTable('getSelections');
    	//$('#form-test').form('load',selections[0]); 
	   	var GczlXxgk={};
	   	GczlXxgk.id = selections[0].id;
	  Ajax.getJson("engineer/search_engineer",GczlXxgk, function(data){	 
    	$('#account-Manager-add-dialog-gczl-sxgx-second').modal('show');
    	//console.log(data.rows[0].id);
    	treeConframe1.window.goto_treenode_by_projectid(data.rows[0].id,2);
    	FormUtils.loadForm('form-second-gczl',data.rows[0]);
    	$("#gczl-sxgx-second-close").on("click",function(){
    		$('#search-form-group').css('display','block');	
    		$('#map-search-data-div').css('display','block');
    	});
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
    	//$('#map-search-data-div').css('display','none');
        	$("#start-sxgx-close").on("click",function(){
        		$('#map-search-data-div').css('display','block');
        	})   	
    });
    
    
    //“暂定”的属性更新提交
    $("#start-save-submit").on("click",function(){
    	selections = $('#map-search-data').bootstrapTable('getSelections');
     	
       	$('#form-start-sxgx').validate({ 
    		showErrors: function(errorMap,errorList){
                if(errorList && errorList.length && errorList.length > 0){
                    var error = errorList[0];
                    //$('#house-info-panel .validate-tips-label').text(error.message);
                }
            },             
            //验证成功后提交
            submitHandler: function(form){
            	var params = FormUtils.getData("form-start-sxgx");
	           	 Ajax.postJson(baseUrl+'map/update_map', params, function(data){
	          		if(data.code > 0){ 
	                      $.gritter.add({
	      	                title: '提示',
	      	                text: '保存成功',
	      	                time: 1000,	                
	
	                      }); 
	                    	//刷新
	                    	$('#map-search-data').bootstrapTable('refresh');
	                    	$('#account-Manager-add-dialog-start-sxgx').modal('hide');
	                    	$('#search-form-group').css('display','block');	
	                    	$('#map-search-data-div').css('display','block'); 
	                    	
	                       	var monitors = {};
	                       	monitors.hiddendanger_id = params.id;
	                       	monitors.name = params.name;
	                       	monitors.create_time = params.strplancompletiontime;
	                        if(params.governancetypeid=="1"){
	                    	    		Ajax.postJson(baseUrl+'relocation/add_RP', monitors, function(data){
	                    	    			if(data.code > 0){ 
	                        	                console.log("成功")
	                        	            }else{                
	                        	                 console.log("失败")
	                        	             }
	                    	    	});
	                       	}
	                    	else if(params.governancetypeid=="2"){
	                    	    	Ajax.postJson(baseUrl+'engineer/add_EP', monitors, function(data){
	                    	    		if(data.code > 0){ 
	                    	                console.log("成功")
	                    	            }else{                
	                    	                 console.log("失败")
	                    	             }
	                    	    	});
	                    	}
	                  }else{                
	                      	$.gritter.add({
	                              title: '提示',
	                              text: '保存失败:' + data.message,
	                              time: 1000,
	                      });
	                   }
	          	}); 
	           	 
            },        
        });

 	});
 
    //添加治理方案
   $("#map-search-data-toorbar-tjzlfa").on("click",function(){
    	//$('#form-test').form('load',selections[0]); 
	   selections = $('#map-search-data').bootstrapTable('getSelections');
    	$('#account-Manager-add-dialog-result').modal('show');
    	//FormUtils.loadForm('form-test-result', selections[0].name);
    	//$('#map-search-data-div').css('display','none');
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
   /*$("#map-search-data-toorbar-bqbr-sxgx").on("click",function(){
   	selections = $('#map-search-data').bootstrapTable('getSelections');
   	var BqbrSxgxs={};
   	BqbrSxgxs.id = selections[0].id;
	    Ajax.getJson("relocation/search_relocation",BqbrSxgxs, function(data){
			console.log(data)
	 	$('#account-Manager-add-dialog-bqbr').modal('show');
		FormUtils.loadForm('form-bqbr',data.rows[0]);
		//$('#map-search-data-div').css('display','none');
		//$('#search-form-group').css('display','none');
		$("#bqbr-close").on("click",function(){
			$('#search-form-group').css('display','block');	
			$('#map-search-data-div').css('display','block');
		  });
	   })
   });*/
   
   //“搬迁避让”属性更新提交
   $("#bqbr-save-submit").on("click",function(){
    	//selections = $('#map-search-data').bootstrapTable('getSelections');
   	    var params = FormUtils.getData("form-second-bqbr");
   	   // params.hiddendanger_id = $('#bqbr_id').val();
   	    console.log(params)
    	Ajax.postJson(baseUrl+'relocation/update_relocationProject', params, function(data){
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
    	$('#account-Manager-add-dialog-bqbr-second').modal('hide');
    	$('#search-form-group').css('display','block');	
    	$('#map-search-data-div').css('display','block');	 
	});

   
   var bg = function(value,row){
  	 switch (value)
  	 {
  	 case 0:
  	 	return "未搬迁";
  	 case 1:
  		return "已搬迁";
  	 }
  }
var Edit = function(value,row){
 	var html = '<a href="javascript:void(0)" class="Edit-edit" data-id="'+ row.id + '"  >修改</a>'
 	+	'&nbsp;<a href="javascript:void(0)"  class="delete" data-id="'+ row.id + '"  >删除</a>' ;
 	return html;
 }
	//搬迁人员
	$("#bqbr-bqry-submit").on("click",function() {
	   	selections = $('#map-search-data').bootstrapTable('getSelections');
	   	var BqbrBqry={};
	   	BqbrBqry.hiddendanger_id = selections[0].id;
	   	console.log(BqbrBqry)
	    Ajax.getJson("relocation/search_relocation",BqbrBqry, function(data){
		//console.log(data)
		
		$('#House-Manager-bqry-dialog').modal('show');
		 Ajax.postJson("person/list_person",{project_id:data.rows[0].id}, function(data){
	            if(data.code > 0){
	            	$('#House-bqry-data').bootstrapTable('load', data);
	            	  
	            }else{                
	            	$.bootstrapGrowl(data.message, {
	                    type: 'info',
	                    align: 'center',
	                    delay: 3000,
	                    width: 'auto',
	                });
	            }
	        });	 
         })
	});
	
	$('#House-bqry-data').bootstrapTable({
	url : 'person/list_person', // 请求后台的URL（*）
	method : 'get', // 请求方式（*）
	striped : true, // 是否显示行间隔色
	cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
	pagination : false, // 是否显示分页（*）
	sortable : false, // 是否启用排序
	sortOrder : "asc", // 排序方式
	sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
	pageNumber : 1, // 初始化加载第一页，默认第一页
	pageSize : 8, // 每页的记录行数（*）
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
		{checkbox : true},
		{field : 'id',title : '序号',align:"center"}, 
		{field : 'name',title : '姓名',align:"center"}, 
		{field : 'family',title : '人口',align:"center"}, 
		{field : 'relocate_flag',title : '是否搬迁',align:"center",formatter:bg}, 
		{field : 'relocate_time',title : '搬迁时间',align:"center"},
		{field: 'cz',title: '操作',align:"center", formatter:Edit},   
  ],
	dataType : 'json',
	queryParams : function(params) {
		if (params) {
			params.start = params.offset;
			params.rows = params.limit;				
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
//搬迁人员修改
$("#House-bqry-data-div").on("click",".Edit-edit",function(){
	row = $('#House-bqry-data').bootstrapTable('getSelections');
	$('#settlement-monitor-bq-dialog').modal('show');
	FormUtils.clearForm("add-settlement-form");
	FormUtils.loadForm("add-settlement-form",row[0]);
}); 
//保存
$("#settlement-add-dq-btn").on("click",function(){
	var params = FormUtils.getData("add-settlement-form");
	params.id = row[0].id;
	Ajax.postJson(baseUrl+'person/update_person', params, function(data){
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
		
       $('#settlement-monitor-bq-dialog').modal('hide');
       $('#House-Manager-bqry-dialog').modal('hide');
       //$('#House-bqry-data').bootstrapTable('refresh'); 
	});
	 
});

//添加搬迁人员
$("#settlement-monitor-toorbar-add").on("click",function(){
	$('#settlement-monitor-bq-add-dialog').modal('show');
	 
}); 
//添加搬迁人员保存
$("#settlement-add-dq-btn-add").on("click",function(){
	selections = $('#map-search-data').bootstrapTable('getSelections');
   	var BqbrBqrybc={};
   	BqbrBqrybc.hiddendanger_id= selections[0].id;
    Ajax.getJson("relocation/search_relocation",BqbrBqrybc, function(data){
	var params = FormUtils.getData("add-bq-settlement-form");
	params.id = data.rows[0].id;
	console.log(params)
	Ajax.postJson(baseUrl+'person/add_person', params, function(data){
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
		
       $('#settlement-monitor-bq-add-dialog').modal('hide');
       $('#House-Manager-bqry-dialog').modal('hide');
       $('#House-bqry-data').bootstrapTable('refresh'); 
	 });
    });
	 
});
	
//搬迁人员删除
$("#House-bqry-data-div").on("click",".delete",function(){
	$('#account-Manager-delete-dialog').modal('show');
});
//删除
$("#account-Manager-delete-dialog-comfirm").on("click",function(){
   	var del = $('#House-bqry-data').bootstrapTable('getSelections');
	Ajax.postJson(baseUrl+'person/deluser', {id:del[0].id}, function(data){
		if(data.code > 0){
          $.gritter.add({
              title: '提示',
              text: '成功',
              time: 1000,	                
          });
      }else{                
      	$.bootstrapGrowl(""+ data.message, {
              type: 'info',
              align: 'center',
              delay: 3000,
              width: 'auto',
          });
      }
	});
 
	$('#account-Manager-delete-dialog').modal('hide');
	$('#House-Manager-bqry-dialog').modal('hide');
	$('#House-bqry-data').bootstrapTable('refresh'); 
});
   //资料上传(搬迁避让)
   $("#map-search-data-toorbar-bqbr-zlsc").on("click",function(){
	selections = $('#map-search-data').bootstrapTable('getSelections');
   	var BqbrZlsc={};
   	BqbrZlsc.id = selections[0].id;
	    Ajax.getJson("relocation/search_relocation",BqbrZlsc, function(data){
			//console.log(data.rows[0].id)
	    fileConframe.window.goto_uploadfile_by_projectid(data.rows[0].id,1);
   	   $('#account-Manager-add-dialog-bqbr-zlsc').modal('show');

   	   //FormUtils.loadForm('form-test-qlr', selections[0]);
   	   $('#map-search-data-div').css('display','none');
		$("#bqbr-zlsc-close").on("click",function(){
			$('#search-form-group').css('display','block');	
			$('#map-search-data-div').css('display','block');
		  });
	   })    	
   });
 //资料下载(搬迁避让)
  $("#map-search-data-toorbar-bqbr-zlxz").on("click",function(){       	
    	selections = $('#map-search-data').bootstrapTable('getSelections');
       	var BqbrZlxz={};
       	BqbrZlxz.id = selections[0].id;
    	 Ajax.getJson("relocation/search_relocation",BqbrZlxz, function(data){
    	    treeConframe.window.goto_treenode_by_projectid(data.rows[0].id,1);
       	   $('#account-Manager-add-dialog-bqbr-zlxz').modal('show');

       	   //FormUtils.loadForm('form-test-qlr', selections[0]);
       	   $('#map-search-data-div').css('display','none');
    		$("#bqbr-zlxz-close").on("click",function(){
    			$('#search-form-group').css('display','block');	
    			$('#map-search-data-div').css('display','block');
    		  });
    	   })  
   });
//“工程治理”属性更新
  $("#map-search-data-toorbar-gczl-sxgx").on("click",function(){
	  selections = $('#map-search-data').bootstrapTable('getSelections');
	   	var GczlSxgxs={};
	   	GczlSxgxs.id = selections[0].id;
	  Ajax.getJson("engineer/search_engineer",GczlSxgxs, function(data){
	  $('#account-Manager-add-dialog-gczl-sxgx').modal('show');
	  FormUtils.loadForm('form-gczl',data.rows[0]);
	  //$('#map-search-data-div').css('display','none');
	  //$('#search-form-group').css('display','none');
	  $("#gczl-sxgx-close").on("click",function(){
		 $('#search-form-group').css('display','block');	 
		 $('#map-search-data-div').css('display','block');
	     });
	  })	   
   });
  
  
  //“工程治理”属性更新提交
  $("#gczl-save-submit").on("click",function(){
	 //selections = $('#map-search-data').bootstrapTable('getSelections');
   	var params = FormUtils.getData("form-second-gczl");
   	//params.hiddendanger_id = selections[0].id;
   	console.log(params)
    Ajax.postJson(baseUrl+'engineer/update_engineerproject', params, function(data){
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
   	//刷新
   	$('#map-search-data').bootstrapTable('refresh');
   	$('#account-Manager-add-dialog-gczl-sxgx-second').modal('hide');
   	$('#search-form-group').css('display','block');	
   	$('#map-search-data-div').css('display','block');	 
  }); 
 
  //资料上传(工程治理)
  $("#map-search-data-toorbar-gczl-zlsc").on("click",function(){
	selections = $('#map-search-data').bootstrapTable('getSelections');
  	var GczlZlsc={};
  	GczlZlsc.id = selections[0].id;
	    Ajax.getJson("engineer/search_engineer",GczlZlsc, function(data){
			//console.log(data.rows[0].id)
	    fileConframe1.window.goto_uploadfile_by_projectid(data.rows[0].id,2);
  	   $('#account-Manager-add-dialog-gczl-zlsc').modal('show');
  	   //FormUtils.loadForm('form-test-qlr', selections[0]);
  	   $('#map-search-data-div').css('display','none');
		$("#gczl-zlsc-close").on("click",function(){
			$('#search-form-group').css('display','block');	
			$('#map-search-data-div').css('display','block');
		  });
	   })    	
  });
//资料下载(工程治理)
 $("#map-search-data-toorbar-gczl-zlxz").on("click",function(){       	
   	selections = $('#map-search-data').bootstrapTable('getSelections');
      	var GczlZlxz={};
      	GczlZlxz.id = selections[0].id;
   	 Ajax.getJson("engineer/search_engineer",GczlZlxz, function(data){
   	    treeConframe1.window.goto_treenode_by_projectid(data.rows[0].id,2);
      	   $('#account-Manager-add-dialog-gczl-zlxz').modal('show');
      	   //FormUtils.loadForm('form-test-qlr', selections[0]);
      	   $('#map-search-data-div').css('display','none');
   		$("#gczl-zlxz-close").on("click",function(){
   			$('#search-form-group').css('display','block');	
   			$('#map-search-data-div').css('display','block');
   		  });
   	   })  
  });
 
 $('#account-Manager-add-dialog-bqbr-zlsc').modal({
	    keyboard: true,
	    backdrop: "static",
	    show:false
	});
 $('#account-Manager-add-dialog-bqbr').modal({
	    keyboard: true,
	    backdrop: "static",
	    show:false
	});

 $('#account-Manager-add-dialog-bqbr-zlxz').modal({
	    keyboard: true,
	    backdrop: "static",
	    show:false
	});

$('#account-Manager-add-dialog-gczl-zlsc').modal({
    keyboard: true,
    backdrop: "static",
    show:false
});

$('#account-Manager-add-dialog-start-sxgx').modal({
    keyboard: true,
    backdrop: "static",
    show:false
}); 
$('#account-Manager-add-dialog-gczl-sxgx').modal({
    keyboard: true,
    backdrop: "static",
    show:false
}); 
$('#account-Manager-add-dialog-bqbr').modal({
    keyboard: true,
    backdrop: "static",
    show:false
}); 

$('#account-Manager-add-dialog-result').modal({
    keyboard: true,
    backdrop: "static",
    show:false
});
//禁用空白处点击关闭
$('#account-Manager-add-dialog-gczl-zlxz').modal({
    keyboard: true,
    backdrop: "static",
    show:false
});
$('#House-Manager-bqry-dialog').modal({
    keyboard: true,
    backdrop: "static",
    show:false
});

