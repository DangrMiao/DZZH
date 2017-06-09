Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
var parserDate = function (date) {  
    var t = Date.parse(date);  
    if (!isNaN(t)) {  
        return new Date(Date.parse(date.replace(/-/g, "/")));  
    } else {  
        return new Date();  
    }  
};

var monitorData = function(value,row){
	var date=parserDate(value);
	var time1 =date.Format("yyyy-MM-dd");
    return time1;
}

var monitorEdit = function(value,row){
	var html = '<a href="javascript:void(0)" class="monitorEdit-edit" data-id="'+ row.id + '"  >更新</a>';
	return html;
}

var monitorConfig = {
		monitor:{ 
			height:150,	
//			toolbarAlign:'right',
//			data:[{"bh":20,"mc":"adgf","js":"0"}],
			columns: [
				{checkbox:true},
				{field: 'houseId',title: '房屋ID'},
				{field: 'id',title: '观察点ID'},
				{field: 'name',title: '观察点名称'},
				{field: 'gxcs',title: '历史记录个数'},
				{field: 'cz',title: '操作',formatter:monitorEdit},
		    ],
		    url:'',
		},
		monitorPoint:{ 
			height:150,	
			toolbarAlign:'right',
//			data:[{"bh":20,"mc":"adgf","js":"0"}],
			columns: [
//				{checkbox:true},
				{field: 'pointId',title: '观察点ID'},
//				{field: 'gcdmc',title: '观察点名称'},
				{field: 'positionX',title: '观察点横坐标(米)'},
				{field: 'positionY',title: '观察点纵坐标(米)'},
				{field: 'elevation',title: '高程(米)'},
				{field: 'jlr',title: '记录人'},
				{field: 'recordTime',title: '观察日期',formatter:monitorData},
		    ],
		    url:'',
		},
}

$(function(){
    //点击地基监测按钮
    $('#map-search-data-toorbar-djjc').on('click', function(){
    	var selections = $('#map-search-data').bootstrapTable('getSelections');
        if(!selections || selections.length < 1){
            return;
        }
        var houseId=selections[0].id;
        //show 监测地基的dialog
        $('#settlement-monitor-dialog').modal('show');
        $('#settlement-monitor-table').css('display','');
    	$('#settlement-monitor-chart').css('display','none');
    	$('#settlement-monitor-data-detail-div').css('display','none');
        UI.loadBootstrapTable('#settlement-monitor-data', monitorConfig.monitor,'#settlement-monitor-data-toorbar');
        Ajax.postJson("settlementMonitor/points/list",{houseId:houseId}, function(data){
            if(data.code > 0){
            	$('#settlement-monitor-data').bootstrapTable('load', data); 
            }else{                
            	$.bootstrapGrowl(data.message, {
                    type: 'info',
                    align: 'center',
                    delay: 3000,
                    width: 'auto',
                });
            }
        });
    });

    $('#settlement-monitor-dialog').modal({
        keyboard: true,
        backdrop: "static",
        show:false
    });

    //观察点详细
    $("#settlement-monitor-data").on("click",function(){    	
    	var row = $('#settlement-monitor-data').bootstrapTable('getSelections');
    	console.log(row[0]);
    	if (row[0]=="" || !row[0]) {
			return;
		}
    	$('#settlement-monitor-data-detail').bootstrapTable('removeAll');
    	$('#settlement-monitor-data-detail-div').css('display','block');
    	UI.loadBootstrapTable('#settlement-monitor-data-detail', monitorConfig.monitorPoint,'');
    	var pointId=row[0].id;
    	Ajax.postJson("settlementMonitor/history/list",{pointId:pointId}, function(data){            
            if(data.code > 0){
            	$('#settlement-monitor-data-detail').bootstrapTable('load', data);
//            	$('#settlement-monitor-data-detail').bootstrapTable('removeAll');
//            	$('#settlement-monitor-data-detail').bootstrapTable('append', data.rows);
//            	$('#settlement-monitor-data-detail').bootstrapTable('refresh'); 
            }else{                
            	$.bootstrapGrowl(data.message, {
                    type: 'info',
                    align: 'center',
                    delay: 3000,
                    width: 'auto',
                });
            }
        });
	});
    
    $('#settlement-monitor-gcdgx-dialog').modal({
        keyboard: true,
        backdrop: "static",
        show:false
    });
    
    //观察点添加
    $("#settlement-monitor-toorbar-add").on("click",function(){
    	var row = $('#map-search-data').bootstrapTable('getSelections');   	
    	$('#settlement-monitor-gcdgx-dialog').modal('show');
    	FormUtils.clearForm("add-settlement-form");
    	$('#add-settlement-form-houseId').val(row[0].id);     	
	});

    //观察点-更新
    $("#settlement-monitor-data-div").on("click",".monitorEdit-edit",function(){
    	var row = $('#settlement-monitor-data').bootstrapTable('getSelections');
    	$('#settlement-monitor-gcdgx-dialog').modal('show');
    	FormUtils.clearForm("add-settlement-form");
    	FormUtils.loadForm("add-settlement-form",row[0]);
	});
      
    //保存
    $("#settlement-add-points-btn").on("click",function(){
    	var params = FormUtils.getData("add-settlement-form");
    	params.houseId=$('#add-settlement-form-houseId').val();
    	params.pointId=params.id;
//    	$('#add-settlement-form').validate({   
//            rules : {  
//                name : {  
//                    required : true  
//                },   
//            },  
//            messages : {  
//                name : {  
//                    required : "Username is required."  
//                },   
//            },   
//        });  
    	$('#add-settlement-form').validate({ 
    		showErrors: function(errorMap,errorList){
    			if(errorList && errorList.length && errorList.length > 0){
                    var error = errorList[0];
                    //$('#house-info-panel .validate-tips-label').text(error.message);
                }
            },             
           
    	});
    	if (params.pointId!="") {    //观察点更新
    		Ajax.postJson('settlementMonitor/history/save', params, function(data){
    			if(data.code > 0){
	                $.gritter.add({
		                title: '提示',
		                text: '保存成功',
		                time: 1000,	                
//		                class_name: 'gritter-success'
	                });
	                $('#settlement-monitor-data').bootstrapTable('refresh');
	                $('#settlement-monitor-data-detail').bootstrapTable('refresh');
	                $('#settlement-monitor-gcdgx-dialog').modal('hide');
	            }else{                
	            	$.bootstrapGrowl(data.message, {
	                    type: 'info',
	                    align: 'center',
	                    delay: 3000,
	                    width: 'auto',
	                });
	            }
	    	});
		}else {             //观察点添加
			console.log("添加");
			Ajax.postJson('settlementMonitor/point/save', params, function(data){
	    		if(data.code > 0){
	                $.gritter.add({
		                title: '提示',
		                text: '保存成功',
		                time: 1000,	                
//		                class_name: 'gritter-success'
	                });
	                $('#settlement-monitor-data').bootstrapTable('refresh');
	                $('#settlement-monitor-data-detail').bootstrapTable('refresh');
	                $('#settlement-monitor-gcdgx-dialog').modal('hide');
	            }else{                
	            	$.bootstrapGrowl(data.message, {
	                    type: 'info',
	                    align: 'center',
	                    delay: 3000,
	                    width: 'auto',
	                });
	            }
	    	});
		}	
	});
    
    //图表
    var chartData,Tname;
    $("#settlement-monitor-toorbar-chart").on("click",function(){
    	var row = $('#settlement-monitor-data').bootstrapTable('getSelections');    	
    	if(!row || row.length < 1){
    		$.bootstrapGrowl("请选择一条数据", {
                type: 'info',
                align: 'center',
                delay: 1000,
                width: 'auto',
            });
    		return;
        }
    	Tname=row[0].name;
    	$('#settlement-monitor-table').css('display','none');
    	$('#settlement-monitor-chart').css('display','block');
    	var pointId=row[0].id;
    	Ajax.postJson("settlementMonitor/history/list",{pointId:pointId}, function(data){
    		chartData=data.rows;
    	});
	});
    
    //侧向位移
    $("#settlement-monitor-chart-wy").on("click",function(){
    	if (chartData.length<2) {
    		$.bootstrapGrowl("数据不足！", {
                type: 'info',
                align: 'center',
                delay: 1000,
                width: 'auto',
            });
		}else {
			var btnText=$("#settlement-monitor-chart-wy")[0].innerHTML;
	    	var params = {};
	    	params.title =Tname+"观察点"+btnText+"折线图";
	    	params.legend = [];
	    	params.legend.push(btnText+"坐标(x,y)(米)");
	    	var xy = [];
			params.data = [{
				name: btnText+"坐标(x,y)(米)",
				time:[],
				data: []
			}];
	    	for(var i = 0; i < chartData.length; i++){
	    		var date=parserDate(chartData[i].recordTime);
	    		var time1 =date.Format("yyyy-MM-dd");
	    		xy=[];
	    		params.data[0].time.push(time1);
	    		xy.push(chartData[i].positionX);
	    		xy.push(chartData[i].positionY);
				params.data[0].data.push(xy);
			}
	    	EChartsHelper.renderLineCharts2('chart-div', params);
		}   	
	});
    //沉降趋势
    $("#settlement-monitor-chart-cj").on("click",function(){
    	if (chartData.length<2) {
    		$.bootstrapGrowl("数据不足！", {
                type: 'info',
                align: 'center',
                delay: 1000,
                width: 'auto',
            });
		}else {
			var btnText=$("#settlement-monitor-chart-cj")[0].innerHTML;
			var params = {};
	    	params.title =Tname+"观察点"+btnText+"折线图";
//	    	btnText=btnText+"()";
	    	params.legend = btnText+"(米)";
	    	params.xAxis = [];
			params.data = [{
				name: btnText+"(米)",
				data: []
			}];
	    	for(var i = 0; i < chartData.length; i++){
	    		var date=parserDate(chartData[i].recordTime);
	    		var time1 =date.Format("yyyy-MM-dd");
	    		params.xAxis.push(time1);
				params.data[0].data.push(chartData[i].elevation);
			}
	    	EChartsHelper.renderLineCharts('chart-div', params);
		}    	
	});
    //月侧向位移速率
    $("#settlement-monitor-chart-ywy").on("click",function(){
    	if (chartData.length<3) {
    		$.bootstrapGrowl("数据不足！", {
                type: 'info',
                align: 'center',
                delay: 1000,
                width: 'auto',
            });
		}else {
			var btnText=$("#settlement-monitor-chart-ywy")[0].innerHTML;
	    	var params = {};
	    	params.title =Tname+"观察点"+btnText+"折线图";
	    	params.legend = btnText+"(米/月)";
	    	params.xAxis = [];
			params.data = [{
				name: btnText+"(米/月)",
				data: []
			}];
	    	for(var i = 0; i < chartData.length-1; i++){
	    		var date1 = new Date(chartData[i].recordTime)
	    		var date2 = new Date(chartData[i+1].recordTime)
	    		var t1 = date1.getTime();
	    		var t2 = date2.getTime();    		     		 
	    		var days = parseInt((t2 - t1)/(24*60*60*1000))+1;//计算整数天数
	    		var x=(chartData[i+1].positionX-chartData[i].positionX);
	    		var y=(chartData[i+1].positionY-chartData[i].positionY);
	    		var dis=(Math.pow((x *x + y * y), 0.5)*30).toFixed(2);
	    		
	    		var date=parserDate(chartData[i+1].recordTime);
	    		var time1 =date.Format("yyyy-MM-dd");
	    		params.xAxis.push(time1);
				params.data[0].data.push(dis);
			}
	    	console.log(params);
	    	EChartsHelper.renderLineCharts('chart-div', params);
		}
	});
    //日侧向位移速率
    $("#settlement-monitor-chart-rwy").on("click",function(){
    	if (chartData.length<3) {
    		$.bootstrapGrowl("数据不足！", {
                type: 'info',
                align: 'center',
                delay: 1000,
                width: 'auto',
            });
		}else {
			var btnText=$("#settlement-monitor-chart-rwy")[0].innerHTML;
	    	var params = {};
	    	params.title =Tname+"观察点"+btnText+"折线图";
	    	params.legend = btnText+"(米/日)";
	    	params.xAxis = [];
			params.data = [{
				name: btnText+"(米/日)",
				data: []
			}];
	    	for(var i = 0; i < chartData.length-1; i++){
	    		var date1 = new Date(chartData[i].recordTime)
	    		var date2 = new Date(chartData[i+1].recordTime)
	    		var t1 = date1.getTime();
	    		var t2 = date2.getTime();    		     		 
	    		var days = parseInt((t2 - t1)/(24*60*60*1000))+1;//计算整数天数
	    		var x=(chartData[i+1].positionX-chartData[i].positionX);
	    		var y=(chartData[i+1].positionY-chartData[i].positionY);
	    		var dis=(Math.pow((x *x + y * y), 0.5)).toFixed(2);
	    		
	    		var date=parserDate(chartData[i+1].recordTime);
	    		var time1 =date.Format("yyyy-MM-dd");
	    		params.xAxis.push(time1);
				params.data[0].data.push(dis);
			}
	    	console.log(params);
	    	EChartsHelper.renderLineCharts('chart-div', params);
		}
	});
    //月沉降速率
    $("#settlement-monitor-chart-ycj").on("click",function(){
    	if (chartData.length<3) {
    		$.bootstrapGrowl("数据不足！", {
                type: 'info',
                align: 'center',
                delay: 1000,
                width: 'auto',
            });
		}else {
			var btnText=$("#settlement-monitor-chart-ycj")[0].innerHTML;
	    	var params = {};
	    	params.title =Tname+"观察点"+btnText+"折线图";
	    	params.legend = btnText+"(米/月)";
	    	params.xAxis = [];
			params.data = [{
				name: btnText+"(米/月)",
				data: []
			}];
	    	for(var i = 0; i < chartData.length-1; i++){
	    		var date1 = new Date(chartData[i].recordTime)
	    		var date2 = new Date(chartData[i+1].recordTime)
	    		var t1 = date1.getTime();
	    		var t2 = date2.getTime();    		     		 
	    		var days = parseInt((t2 - t1)/(24*60*60*1000))+1;//计算整数天数
	    		var ele=Math.abs(chartData[i+1].elevation-chartData[i].elevation);
	    		var eleRate=(ele*30/days).toFixed(2);
	    		
	    		var date=parserDate(chartData[i+1].recordTime);
	    		var time1 =date.Format("yyyy-MM-dd");
	    		params.xAxis.push(time1);
				params.data[0].data.push(eleRate);
			}
	    	EChartsHelper.renderLineCharts('chart-div', params);
		}    	
	});
    //日沉降速率
    $("#settlement-monitor-chart-rcj").on("click",function(){
    	if (chartData.length<3) {
    		$.bootstrapGrowl("数据不足！", {
                type: 'info',
                align: 'center',
                delay: 1000,
                width: 'auto',
            });
		}else {
			var btnText=$("#settlement-monitor-chart-rcj")[0].innerHTML;
	    	var params = {};
	    	params.title =Tname+"观察点"+btnText+"折线图";
	    	params.legend = btnText+"(米/日)";
	    	params.xAxis = [];
			params.data = [{
				name: btnText+"(米/日)",
				data: []
			}];
	    	for(var i = 0; i < chartData.length-1; i++){
	    		var date1 = new Date(chartData[i].recordTime)
	    		var date2 = new Date(chartData[i+1].recordTime)
	    		var t1 = date1.getTime();
	    		var t2 = date2.getTime();    		     		 
	    		var days = parseInt((t2 - t1)/(24*60*60*1000))+1;//计算整数天数
	    		var ele=Math.abs(chartData[i+1].elevation-chartData[i].elevation);
	    		var eleRate=(ele/days).toFixed(2);
	    		
	    		var date=parserDate(chartData[i+1].recordTime);
	    		var time1 =date.Format("yyyy-MM-dd");
	    		params.xAxis.push(time1);
				params.data[0].data.push(eleRate);
			}
	    	console.log(params);
	    	EChartsHelper.renderLineCharts('chart-div', params);
		}    	
	});

    //返回表格
    $("#back").on("click",function(){
    	$('#settlement-monitor-table').css('display','block');
    	$('#settlement-monitor-chart').css('display','none');
	});
    
    
//    var sampleData = initTree();    
//    $('#settlement-monitor-tree').ace_tree({
//		dataSource: sampleData['dataSource'],		
//		cacheItems: true,
//		'open-icon' : 'ace-icon tree-minus',
//		'close-icon' : 'ace-icon tree-plus',
//		'selectable' : false,
//		loadingHTML : '<div class="tree-loading"><i class="ace-icon fa fa-refresh fa-spin blue"></i></div>'
//	});    
//    function initTree() {
//    	var tree_data = {
//    	    	'fw' : {text: '房屋点', type: 'folder', 'icon-class':'red'}	,
//    		}
//    	    tree_data['fw']['additionalParameters'] = {
//    			'children' : {
//    				'gcd' : {text: '观察点', type: 'folder'},
//
//    			}
//    		}
//    	    tree_data['fw']['additionalParameters']['children']['gcd']['additionalParameters'] = {
//    			'children' : {
//    				'gcd' : {text: '观察点', type: 'item'},
//    			}
//    		}
//    	    var dataSource = function(options, callback){
//    			var $data = null
//    			if(!("text" in options) && !("type" in options)){
//    				$data = tree_data;//the root tree
//    				callback({ data: $data });
//    				return;
//    			}
//    			else if("type" in options && options.type == "folder") {
//    				if("additionalParameters" in options && "children" in options.additionalParameters)
//    					$data = options.additionalParameters.children || {};
//    				else $data = {}//no data
//    			}
//    			
//    			if($data != null)
//    				setTimeout(function(){callback({ data: $data });} , parseInt(Math.random() * 500) + 200);
//    		}  
//    	
//    	return {'dataSource': dataSource}
//	}
    
    //初始化沉降监测的tab
    var settTable = new CloseableTable("settlement-monitor-tab");
    settTable.add('新建观察点', "static/html/monitor/settlement/addPoints.html", "addPoints");
    // settTable.add('垃圾观察点', "static/html/monitor/settlement/addPoints.html", "addPoints233");
});