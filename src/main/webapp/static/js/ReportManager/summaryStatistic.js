var baseUrl = CommonUtils.getBasePath();
var sumType = function(value,row){
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

var DataType = function(value,row){
	if (!value || value=="") {
		return "";
	}else {
		var date=parserDate(value);	
		var time1 =date.Format("yyyy-MM-dd");			
	    return time1;
	}	
}

$(document).ready(function() {
    $('#summary-Statistic-multiple-xz-select').multiselect();
    $('#summary-Statistic-multiple-gz-select').multiselect();    
    var tjTop = $("#summary-Statistic-tj-btn").offset().top;
    $("#summary-Statistic-tb-div").css('top', tjTop+50);
});

var sumShowDetails = function(value,row){
	var html = '<a href="#" class="sum-show-Details" data-id="'+ row.id + '"  >显示详情</a>';
	return html;
}
var summaryStatisticConfig = {
		xztj:{ 
//			data:[{"sl":3}],
			height:300,
			columns: [
				{checkbox: true},
				{field: 'xzjd',title: '乡镇街道',align:'center',visible:false}, 
		        {field: 'ssc',title: '所属村',align:'center',visible:false},
//		        {field: 'mph',title: '门牌号'}, 
		        {field: 'jznd',title: '建造年代',align:'center',visible:false}, 
		        {field: 'zflb',title: '住房类别',align:'center',visible:false}, 
		        {field: 'cs',title: '层数',align:'center',visible:false}, 
		        {field: 'jzmj',title: '建筑面积',align:'center',visible:false},
		        {field: 'js',title: '间数',align:'center',visible:false}, 
		        {field: 'zdmj',title: '占地面积',align:'center',visible:false}, 
		        {field: 'zfsyqk',title: '房屋使用情况',align:'center',visible:false}, 
		        {field: 'jglx',title: '结构类型',align:'center',visible:false},
		        {field: 'dangerLevel',title: '危险性等级',align:'center',visible:false}, 
//		        {field: 'tdxz',title: '土地性质'}, 
		        {field: 'fcz',title: '房产证',align:'center',visible:false},	
		        {field: 'day',title: '日期',align:'center',visible:false},
		        {field: 'month',title: '日期',align:'center',visible:false},
		        {field: 'year',title: '日期',align:'center',visible:false},
		        {field: 'counts',title: '数量',align:'center'},
		        {field: 'cz',title: '操作',align:'center',align:'center',formatter:sumShowDetails},
		    ],
		},
		gztj:{ 
//			data:[{"sl":3}],
			height:300,
			columns: [
				{checkbox: true},
				{field: 'xzjd',title: '乡镇街道',align:'center'}, 
		        {field: 'ssc',title: '所属村',align:'center'},
		        {field: 'zflb',title: '住房类别',align:'center'}, 
		        {field: 'cs',title: '层数',align:'center'}, 
		        {field: 'jzmj',title: '建筑面积',align:'center'},
		        {field: 'js',title: '间数',align:'center'}, 
		        {field: 'zdmj',title: '占地面积',align:'center'}, 
		        {field: 'zfsyqk',title: '房屋使用情况',align:'center'}, 
//		        {field: 'jglx',title: '结构类型'},
		        {field: 'dangerLevel',title: '危险性等级',align:'center'}, 
		        {field: 'fcz',title: '房产证',align:'center'}, 
		        {field: 'day',title: '鉴定时间',align:'center'},
		        {field: 'month',title: '鉴定时间',align:'center'},
		        {field: 'year',title: '鉴定时间',align:'center'},
		        
		        {field: 'dismantle_timeday',title: '拆除时间',align:'center'},
		        {field: 'dismantle_timemonth',title: '拆除时间',align:'center'},
		        {field: 'dismantle_timeyear',title: '拆除时间',align:'center'},
		        
		        {field: 'reform_timeday',title: '改造时间',align:'center'},
		        {field: 'reform_timemonth',title: '改造时间',align:'center'},
		        {field: 'reform_timeyear',title: '改造时间',align:'center'},
		        
		        {field: 'complete_timeday',title: '验收时间',align:'center'},
		        {field: 'complete_timemonth',title: '验收时间',align:'center'},
		        {field: 'complete_timeyear',title: '验收时间',align:'center'},
		        
		        {field: 'reform_type',title: '改造类型',align:'center',formatter:sumType},
		        {field: 'counts',title: '数量',align:'center'},
		        {field: 'cz',title: '操作',align:'center',formatter:sumShowDetails},
			],
		},
		xzDetail:{ 
			height:280,
			columns: [
				{checkbox: true},
		    	{field: 'id',title: 'id',align:'center'}, 
		        {field: 'bh',title: '编号',align:'center'}, 
		        {field: 'xzjd',title: '乡镇街道',align:'center'}, 
		        {field: 'ssc',title: '所属村',align:'center'},
		        {field: 'mph',title: '门牌号',align:'center'}, 
		        {field: 'jznd',title: '建造年代',align:'center'}, 
		        {field: 'zflb',title: '住房类别',align:'center'}, 
		        {field: 'cs',title: '层数',align:'center'}, 
		        {field: 'jzmj',title: '建筑面积',align:'center'},
		        {field: 'js',title: '间数',align:'center'}, 
		        {field: 'zdmj',title: '占地面积',align:'center'}, 
		        {field: 'zfsyqk',title: '房屋使用情况',align:'center'}, 
		        {field: 'jglx',title: '结构类型',align:'center'},
		        {field: 'level',title: '危险性等级',align:'center'}, 
		        {field: 'tdxz',title: '土地性质',align:'center'}, 
		        {field: 'fcz',title: '房产证',align:'center'}, 
		        {field: 'date',title: '日期',align:'center',formatter:DataType},
			],
		},
		gzDetail:{ 
			height:280,
			columns: [
				{checkbox: true},
		    	{field: 'id',title: 'id',align:'center'}, 
		        {field: 'bh',title: '编号',align:'center'}, 
		        {field: 'xzjd',title: '乡镇街道',align:'center'}, 
		        {field: 'ssc',title: '所属村',align:'center'},
		        {field: 'mph',title: '门牌号',align:'center'}, 
//		        {field: 'jznd',title: '建造年代'}, 
		        {field: 'zflb',title: '住房类别',align:'center'}, 
		        {field: 'cs',title: '层数',align:'center'}, 
		        {field: 'jzmj',title: '建筑面积',align:'center'},
		        {field: 'js',title: '间数',align:'center'}, 
		        {field: 'zdmj',title: '占地面积',align:'center'}, 
		        {field: 'zfsyqk',title: '房屋使用情况',align:'center'}, 
//		        {field: 'jglx',title: '结构类型'},
		        {field: 'dangerLevel',title: '危险性等级',align:'center'}, 
//		        {field: 'tdxz',title: '土地性质'}, 
		        {field: 'fcz',title: '房产证',align:'center'}, 
		        {field: 'date',title: '鉴定时间',align:'center',formatter:DataType},
		        {field: 'dismantle_time',title: '拆除时间',align:'center',formatter:DataType},
		        {field: 'reform_time',title: '改造时间',align:'center',formatter:DataType},
		        {field: 'complete_time',title: '验收时间',align:'center',formatter:DataType},
		        {field: 'reform_type',title: '改造类型',align:'center',formatter:sumType},
			],
		},
}

$(function() {
	$('.date-picker').datepicker({
		autoclose: true,
		todayHighlight: true
	})

	window.onresize = function(){
		var tjTop = $("#summary-Statistic-tj-btn").offset().top;
		$("#summary-Statistic-tb-div").css('top', tjTop+60);
    }
	
//	统计类型可否操作
	$("input[name=xztj-gztj-radio]").click(function(){
		if ($('#summary-Statistic-xz-radio').is(":checked")==true) { 
   		 	$('#summary-Statistic-multiple-xz-select').attr('disabled', false); 
   		 	$('#summary-Statistic-multiple-gz-select').attr('disabled', true);
		}else if ($('#summary-Statistic-gz-radio').is(":checked")==true) {
			$('#summary-Statistic-multiple-xz-select').attr("disabled",true);
   		 	$('#summary-Statistic-multiple-gz-select').attr("disabled",false);   		 
		}
//		先使用destroy破坏multiselect之后再重新构建
		$("#summary-Statistic-multiple-xz-select").multiselect("destroy").multiselect({  
  		}); 
		$("#summary-Statistic-multiple-xz-select").val("");
  		$("#summary-Statistic-multiple-gz-select").multiselect("destroy").multiselect({  
        });
  		$("#summary-Statistic-multiple-gz-select").val("");
	 });
	
	//起止时间可否操作
	$("#summary-Statistic-qzsj").click(function(){
		if ($('#summary-Statistic-qzsj').is(":checked")==true) { 
			$('#summary-Statistic-kssj').attr("disabled",false);
			$('#summary-Statistic-jssj').attr("disabled",false);
		}else{
			$('#summary-Statistic-kssj').attr("disabled",true);
			$('#summary-Statistic-jssj').attr("disabled",true);
		}
	 });
	
	$("input[name=ybnb]").click(function(){		
		if ($('#day').is(":checked")==true) {
			$('#xz-rq').attr('value','day');
			$('#gz-rq').attr('value','day');
			$('#gz-dismantle_time').attr('value','dismantle_timeday');
			$('#gz-reform_time').attr('value','reform_timeday');
			$('#gz-complete_timeday').attr('value','complete_timeday');
		}else if ($('#month').is(":checked")==true) {
//			$("#summary-Statistic-multiple-xz-select").append("<option value='month'>日期</option>");
			$('#xz-rq').attr('value','month');
			$('#gz-rq').attr('value','month');
			$('#gz-dismantle_time').attr('value','dismantle_timemonth');
			$('#gz-reform_time').attr('value','reform_timemonth');
			$('#gz-complete_timeday').attr('value','complete_timemonth');
		}else {
			$('#xz-rq').attr('value','year');
			$('#gz-rq').attr('value','year');
			$('#gz-dismantle_time').attr('value','dismantle_timeyear');
			$('#gz-reform_time').attr('value','reform_timeyear');
			$('#gz-complete_timeday').attr('value','complete_timeyear');
		}	
		$("#summary-Statistic-multiple-xz-select").multiselect("destroy").multiselect({  
  		});
		$("#summary-Statistic-multiple-gz-select").multiselect("destroy").multiselect({  
  		});
	});
//	//过滤条件可否操作
//	$("#summary-Statistic-gltj").click(function(){
//		if ($('#summary-Statistic-gltj').is(":checked")==true) { 
//			$('#summary-Statistic-gltjLx').attr("disabled",false);
//			$('#summary-Statistic-gltjText').attr("disabled",false);
//		}else{
//			$('#summary-Statistic-gltjLx').attr("disabled",true);
//			$('#summary-Statistic-gltjText').attr("disabled",true);			
//		}
//	 });
	
	var xzData={},gzData={};
	$("#summary-Statistic-tj-btn").click(function(){
		var params = FormUtils.getData("summary-Statistic-form");    	
    	if (params.Startime=="" || params.Endtime=="") {
			alert("请输入起止时间");
			return;
		}
		var xztj=$("#summary-Statistic-multiple-xz-select").val();
		var gztj=$("#summary-Statistic-multiple-gz-select").val();
		$('.summary-Statistic-tj-And-chart').css('display','none');		
    	/*显示新增表 */   	
    	if ($('#summary-Statistic-xz-radio').is(":checked")==true) {
    		$('#summary-Statistic-xztj-detail-div').css('display','none');   		
    		if (xztj==null) {
    			alert("至少选择一项新增统计字段");
    			return;
    		}
    		$('#summary-Statistic-xztj-div').css('display','block');
    		var params = FormUtils.getData("summary-Statistic-form");
        	params.zt=1;
        	xzData.xtype=[];
        	xzData.data=[];
        	if (typeof params.xz == "string") {
        		xzData.xtype.push(params.xz);
        		params[params.xz]=1;
			}else {
				xzData.xtype=params.xz;
				for (var i = 0; i < params.xz.length; i++) {
					params[params.xz[i]]=1;
				}
			}
        	console.log(params);
        	Ajax.postJson(baseUrl+'house/integrative', params, function(data){
        		xzData.data=data.rows;
        		$('#summary-Statistic-xztj').bootstrapTable('load', data);
//            	$('#summary-Statistic-xztj').bootstrapTable('append', data.rows);
        	});
    		UI.loadBootstrapTable('#summary-Statistic-xztj', summaryStatisticConfig.xztj,'#summary-Statistic-xztj-toorbar');
//    		$('#summary-Statistic-xztj-toorbar').css('display','block');
    		var showXzColumns=$('#summary-Statistic-xztj').bootstrapTable('getVisibleColumns');
    		for (var i = 1; i < showXzColumns.length-2; i++) {
    			$('#summary-Statistic-xztj').bootstrapTable('hideColumn', showXzColumns[i].field);
    		}			
    		for (var i = 0; i < xztj.length; i++) {
    			$('#summary-Statistic-xztj').bootstrapTable('showColumn', xztj[i]);
    		}
    	}else if ($('#summary-Statistic-gz-radio').is(":checked")==true) {     /*显示改造表 */
    		$('#summary-Statistic-gztj-detail-div').css('display','none');   		
    		if (gztj==null) {
    			alert("至少选择一项改造统计字段");
    			return;
    		}
    		$('#summary-Statistic-gztj-div').css('display','block');
    		var params = FormUtils.getData("summary-Statistic-form");
        	params.zt=2;
        	gzData.xtype=[];
        	gzData.data=[];
        	if (typeof params.gz == "string") {
        		gzData.xtype.push(params.gz);
        		params[params.gz]=1;
			}else {
				gzData.xtype=params.gz;
				for (var i = 0; i < params.gz.length; i++) {
					params[params.gz[i]]=1;
				}
			}
        	console.log(params);
        	Ajax.postJson(baseUrl+'house/integrative', params, function(data){
        		gzData.data=data.rows;
        		$('#summary-Statistic-gztj').bootstrapTable('load', data);
//            	$('#summary-Statistic-gztj').bootstrapTable('append', data.rows);
        	});
    		UI.loadBootstrapTable('#summary-Statistic-gztj', summaryStatisticConfig.gztj,'#summary-Statistic-gztj-toorbar');
    		var showGzColumns=$('#summary-Statistic-gztj').bootstrapTable('getVisibleColumns');
    		for (var i = 1; i < showGzColumns.length-2; i++) {
    			$('#summary-Statistic-gztj').bootstrapTable('hideColumn', showGzColumns[i].field);
    		}			
    		for (var i = 0; i < gztj.length; i++) {
    			$('#summary-Statistic-gztj').bootstrapTable('showColumn', gztj[i]);
    		}
		}								
	});
	
	//新增统计详情表
	$("#summary-Statistic-xztj-div").on("click",".sum-show-Details",function(){
		$('#summary-Statistic-xztj-detail-div').css('display','block');
		UI.loadBootstrapTable('#summary-Statistic-xztj-detail', summaryStatisticConfig.xzDetail,'#summary-Statistic-xztj-detail-toorbar');
		$('#summary-Statistic-xztj-detail-toorbar').css('display','block');
		var row = $('#summary-Statistic-xztj').bootstrapTable('getSelections')[0];			
		var params = FormUtils.getData("summary-Statistic-form");
		params.zt=1;
		
		if (typeof params.xz == "string") {
			
			params[params.xz]=row[params.xz];
		}else {
			for (var i = 0; i < params.xz.length; i++) {
				var type= params.xz[i];
				params[type]=row[type];
			}
		}
		params.level=params.dangerLevel;			
		Ajax.getJson(baseUrl+"house/page",params, function(data){
	    	$('#summary-Statistic-xztj-detail').bootstrapTable('load', data);
//        	$('#summary-Statistic-xztj-detail').bootstrapTable('append', data.rows);
	    });
	});	
	//新增统计详情表导出
	$('#summary-Statistic-xztj-detail-excel').on("click", function(){
		var row = $('#summary-Statistic-xztj').bootstrapTable('getSelections')[0];			
		var params = FormUtils.getData("summary-Statistic-form");
		var data="";
		if (typeof params.xz == "string") {
			data+="&"+params.xz+"="+row[params.xz];
		}else {
			for (var i = 0; i < params.xz.length; i++) {
				var type= params.xz[i];			
				data+="&"+type+"="+row[type];				
			}
		}		
		if (params.dangerLevel!=undefined) {
			data+="$level="+params.dangerLevel;
		}	
		if (params.Startime) {
			window.location.href= baseUrl + 'house/toexcel?zt='+1+data+"&Startime="+params.Startime+"&Endtime="+params.Endtime+"&tdxz="+params.tdxz;
		}else {
			window.location.href= baseUrl + 'house/toexcel?zt='+1+data+"&tdxz="+params.tdxz;
		}
	});

	//改造统计详情表
	$("#summary-Statistic-gztj-div").on("click",".sum-show-Details",function(){
		$('#summary-Statistic-gztj-detail-div').css('display','block');
		UI.loadBootstrapTable('#summary-Statistic-gztj-detail', summaryStatisticConfig.gzDetail,'#summary-Statistic-gztj-detail-toorbar');
		$('#summary-Statistic-gztj-detail-toorbar').css('display','block');
		var row = $('#summary-Statistic-gztj').bootstrapTable('getSelections')[0];			
		var params = FormUtils.getData("summary-Statistic-form");
		params.zt=2;
		if (typeof params.gz == "string") {
			params[params.gz]=row[params.gz];
		}else {
			for (var i = 0; i < params.gz.length; i++) {
				var type= params.gz[i];
				params[type]=row[type];
			}
		}	
		params.level=params.dangerLevel;			
		Ajax.getJson(baseUrl+"house/history_search",params, function(data){		    	
	    	$('#summary-Statistic-gztj-detail').bootstrapTable('load', data);
//        	$('#summary-Statistic-gztj-detail').bootstrapTable('append', data.rows);
	    });
	});	
	//改造统计详情表导出
	$('#summary-Statistic-gztj-detail-excel').on("click", function(){
		var row = $('#summary-Statistic-gztj').bootstrapTable('getSelections')[0];			
		var params = FormUtils.getData("summary-Statistic-form");
		var data="";
		if (typeof params.gz == "string") {
			data+="&"+params.gz+"="+row[params.gz];
		}else {
			for (var i = 0; i < params.gz.length; i++) {
				var type= params.gz[i];			
				data+="&"+type+"="+row[type];				
			}
		}		
		if (params.dangerLevel!=undefined) {
			data+="$level="+params.dangerLevel;
		}
		if (params.Startime) {
			window.location.href= baseUrl + 'history/excel?zt='+2+data+"&Startime="+params.Startime+"&Endtime="+params.Endtime+"&tdxz="+params.tdxz;
		}else {
			window.location.href= baseUrl + 'history/excel?zt='+2+data+"&tdxz="+params.tdxz;
		}

	});
	
	
	//新增-查看图表
	$("#summary-Statistic-xztj-toorbar-tb").click(function(){
		if (xzData.data.length>25) {
			alert("数据量过多，请减少统计字段");
			return;
		}
		$('.summary-Statistic-tj-And-chart').css('display','none');
		$('#summary-Statistic-MyChart').css('display','block');
		$('#summary-Statistic-MyChart-btns').css('display','block');
		$('#summary-Statistic-MyChart-bar').attr('value','新增')
		$('#summary-Statistic-MyChart-pie').attr('value','新增')
	});
	
	//改造-查看图表
	$("#summary-Statistic-gztj-toorbar-tb").click(function(){
		if (gzData.data.length>25) {
			alert("数据量过多，请减少统计字段");
			return;
		}
		$('.summary-Statistic-tj-And-chart').css('display','none');
		$('#summary-Statistic-MyChart').css('display','block');
		$('#summary-Statistic-MyChart-btns').css('display','block');
		$('#summary-Statistic-MyChart-bar').attr('value','改造')
		$('#summary-Statistic-MyChart-pie').attr('value','改造')
	});
	
	//柱状图
	$('#summary-Statistic-MyChart-bar').on("click", function(){
		if ($('#summary-Statistic-MyChart-bar').val()=='新增') {
			drawChartBar(xzData);
		}else if ($('#summary-Statistic-MyChart-bar').val()=='改造') {
			drawChartBar(gzData);
		}		
	});
	
	//饼图
	$('#summary-Statistic-MyChart-pie').on("click", function(){
		if ($('#summary-Statistic-MyChart-pie').val()=='新增') {
			drawChartPie(xzData);
		}else if ($('#summary-Statistic-MyChart-pie').val()=='改造') {
			drawChartPie(gzData);
		}
	});
	
	//画柱状图
	function drawChartBar(data) {		
		console.log(data);
		var params = {};
		params.title = $('#summary-Statistic-MyChart-bar').val()+"统计柱状图";
		params.legend = "数量";
		params.xAxis = [];
		params.data = [{
			name: "数量",
			data: []
		}];
		for(var i = 0; i < data.data.length; i++){
			var xAxis="";
			console.log(data.xtype.length);
			for (var j = 0; j < data.xtype.length; j++) {
				var Type=data.xtype[j];								
				if (j==data.xtype.length-1) {
					xAxis+=data.data[i][Type];
				}else {
					xAxis+=data.data[i][Type]+",";
				}				
			}						
			params.xAxis.push(xAxis);				
			params.data[0].data.push(data.data[i].counts);
		}
		EChartsHelper.renderBarCharts('summary-Statistic-MyChart', params);
	}
	
	//画饼图
	function drawChartPie(data) {
		var params = {};
		params.title = $('#summary-Statistic-MyChart-pie').val()+"统计饼图";
		params.legend = []
//		params.xAxis = [];
		params.data = [{
			name: "数量",
			data: []
		}];
		for(var i = 0; i < data.data.length; i++){
			var xAxis="";
			for (var j = 0; j < data.xtype.length; j++) {
				var Type=data.xtype[j];
				if (j==data.xtype.length-1) {
					xAxis+=data.data[i][Type];
				}else {
					xAxis+=data.data[i][Type]+",";
				}				
			}						
			params.legend.push(xAxis);
			var val = {};
			val.name = xAxis;
			val.value = data.data[i].counts;
			params.data[0].data.push(val);
		}
		EChartsHelper.renderPieCharts('summary-Statistic-MyChart', params);
	}
	
});