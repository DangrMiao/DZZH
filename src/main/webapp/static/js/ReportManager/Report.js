var baseUrl = CommonUtils.getBasePath();
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

var reportData = function(value,row){
	if (!value || value=="") {
		return "";
	}else {
		var date=parserDate(value);
		var time1 =date.Format("yyyy-MM-dd");	
	    return time1;
	}	
}

var repType = function(value,row){
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

var showDetails = function(value,row){
	var html = '<a href="#" class="show-Details" data-id="'+ row.id + '"  >显示详情</a>';
	return html;
}
var ReportConfig = {
		tj:{ 
//			data:[{"yf":4,"sl":3}],
			url:'',
			columns: [
		    	{checkbox: true},		    	 
		        {field: 'xzjd',title: '乡镇',align:'center'}, 
		        {field: 'dangerLevel',title: '等级',align:'center'},
		        {field: 'year',title: '年份',align:'center'}, 
		        {field: 'month',title: '月份',align:'center'},
		        {field: 'dismantle_timeyear',align:'center',title: '年份'}, 
		        {field: 'dismantle_timemonth',align:'center',title: '月份'},
		        {field: 'counts',title: '数量',align:'center'},
		        {field: 'cz',title: '操作',align:'center',formatter:showDetails},
		    ],
		},
		xzDetail:{ 
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
		        {field: 'date',title: '日期',align:'center',formatter:reportData},
			],
		},
		gzDetail:{ 
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
		        {field: 'level',title: '危险性等级',align:'center'}, 
//		        {field: 'tdxz',title: '土地性质'}, 
		        {field: 'fcz',title: '房产证',align:'center'}, 
		        {field: 'date',title: '鉴定时间',formatter:reportData},
		        {field: 'dismantle_time',title: '拆除时间',align:'center',formatter:reportData},
		        {field: 'reform_time',title: '改造时间',align:'center',formatter:reportData},
		        {field: 'complete_time',title: '验收时间',align:'center',formatter:reportData},
		        {field: 'reform_type',title: '改造类型',align:'center',formatter:repType},
			],
		},
}
$(function() {
	$('.date-picker').datepicker({
		autoclose: true,
		todayHighlight: true
	})
//	.next().on(ace.click_event, function(){
//		$(this).prev().focus();
//	});
	
	window.onresize = function(){
		var ctTop = $("#Report-gztj-btn").offset().top;
		$("#Report-tb-div").css('top', ctTop+50);
    }
	
	var xzData;
	//新增统计
	$('#Report-xztj-btn').on("click", function(){
		var params = FormUtils.getData("report-form");
    	if (params.Startime=="" || params.Endtime=="") {
			alert("请输入起止时间");
			return;
		}
    	params.zt=1;
		$('.tj-And-chart').css('display','none');
    	$('#Report-xztj-detail-div').css('display','none');
    	$('#Report-xztj-div').css('display','block');
    	ReportConfig.tj.url=baseUrl+'house/statis';
    	UI.loadBootstrapTable('#Report-xztj', ReportConfig.tj,'#Report-xztj-toorbar'); 
    	$('#Report-xztj').bootstrapTable('hideColumn', 'dismantle_timemonth');
    	$('#Report-xztj').bootstrapTable('hideColumn', 'dismantle_timeyear');
    	Ajax.getJson(baseUrl+'house/statis', params, function(data){
    		xzData=data.rows;
    		$('#Report-xztj').bootstrapTable('load', data);
//    		$('#Report-xztj').bootstrapTable('removeAll');
//        	$('#Report-xztj').bootstrapTable('append', data.rows);
    	});
    	if ($('#Report-radio-yb').is(":checked")==true) { 
   		 	$('#Report-xztj').bootstrapTable('showColumn', 'month'); 
   		 	$('#Report-xztj').bootstrapTable('hideColumn', 'year');
		}
		else if ($('#Report-radio-nb').is(":checked")==true){ 
			$('#Report-xztj').bootstrapTable('hideColumn', 'month');
			$('#Report-xztj').bootstrapTable('showColumn', 'year');
		}     	
    	if ($('#Report-checkbox-xz').is(":checked")) {
    		$('#Report-xztj').bootstrapTable('showColumn', 'xzjd'); 
		}else {
			$('#Report-xztj').bootstrapTable('hideColumn', 'xzjd');
		}
    	if ($('#Report-checkbox-dj').is(":checked")) {
    		$('#Report-xztj').bootstrapTable('showColumn', 'dangerLevel'); 
		}else {
			$('#Report-xztj').bootstrapTable('hideColumn', 'dangerLevel');
		}    	
    });
	//新增统计详情表
	$("#Report-xztj-div").on("click",".show-Details",function(){
		var row = $('#Report-xztj').bootstrapTable('getSelections')[0];
		if (row=="") {
			return;
		}
		$('#Report-xztj-detail-div').css('display','block');
		UI.loadBootstrapTable('#Report-xztj-detail', ReportConfig.xzDetail,'#Report-xztj-detail-toorbar');
		$('#Report-xztj-detail-toorbar').css('display','block');		
		var params = FormUtils.getData("report-form");
		params.zt=1;
		if (row.month !="") {
			params.month=row.month;
		}else{
			params.year=row.year;
		}						
		if (params.dangerLevel=="等级") {
			params.level=row.dangerLevel;
		}
		if (params.xzjd=="乡镇") {
			params.xzjd=row.xzjd;
		}
		Ajax.getJson(baseUrl+"house/page",params, function(data){
			console.log(data);
			$('#Report-xztj-detail').bootstrapTable('load', data);
//	    	$('#Report-xztj-detail').bootstrapTable('removeAll');
//        	$('#Report-xztj-detail').bootstrapTable('append', data.rows);
	    });
	});
	//新增统计详情表导出
	$('#Report-xztj-detail-excel').on("click", function(){
		var row = $('#Report-xztj').bootstrapTable('getSelections')[0];
		if (row=="") {
			return;
		}
		var params = FormUtils.getData("report-form");
		params.zt=1;
		if (row.month !="") {
			params.month=row.month;
		}else{
			params.year=row.year;
		}						
		if (params.dangerLevel=="等级") {
			params.level=row.dangerLevel;
		}
		if (params.xzjd=="乡镇") {
			params.xzjd=row.xzjd;
		}
		if (params.month) {
			window.location.href= baseUrl + 'house/toexcel?zt='+1+"&month="+params.month+"&"+ $('#report-form').serialize();
		}else {
			window.location.href= baseUrl + 'house/toexcel?zt='+1+"&year="+params.year+"&"+ $('#report-form').serialize();
		}
//		window.location.href= baseUrl + 'house/toexcel?zt='+1+"&month="+params.month+"&year="+params.year+"&"+ $('#report-form').serialize();
		$.gritter.add({
			title : '提示',
			text : '导出成功',
			time : 1000,
			speed: 2000, 
		});
	});
	
	var gzData;
	//改造统计
	$('#Report-gztj-btn').on("click", function(){
		var params = FormUtils.getData("report-form");
    	if (params.Startime=="" || params.Endtime=="") {
			alert("请输入起止时间");
			return;
		}
    	params.zt=2;
		$('.tj-And-chart').css('display','none');
		$('#Report-gztj-detail-div').css('display','none');
    	$('#Report-gztj-div').css('display','block');
    	Ajax.getJson(baseUrl+'house/statis', params, function(data){
    		gzData=data.rows;
    		$('#Report-gztj').bootstrapTable('load', data);
//    		$('#Report-gztj').bootstrapTable('removeAll');
//        	$('#Report-gztj').bootstrapTable('append', data.rows);
    	});
    	UI.loadBootstrapTable('#Report-gztj', ReportConfig.tj, '#Report-gztj-toorbar');
    	$('#Report-gztj').bootstrapTable('hideColumn', 'month');
    	$('#Report-gztj').bootstrapTable('hideColumn', 'year');
    	if ($('#Report-radio-yb').is(":checked")==true) { 
   		 	$('#Report-gztj').bootstrapTable('showColumn', 'dismantle_timemonth'); 
   		 	$('#Report-gztj').bootstrapTable('hideColumn', 'dismantle_timeyear');
		}
		else if ($('#Report-radio-nb').is(":checked")==true){ 
			$('#Report-gztj').bootstrapTable('hideColumn', 'dismantle_timemonth');
			$('#Report-gztj').bootstrapTable('showColumn', 'dismantle_timeyear');
		}     	
    	if ($('#Report-checkbox-xz').is(":checked")) {
    		$('#Report-gztj').bootstrapTable('showColumn', 'xzjd'); 
		}else {
			$('#Report-gztj').bootstrapTable('hideColumn', 'xzjd');
		}
    	if ($('#Report-checkbox-dj').is(":checked")) {
    		$('#Report-gztj').bootstrapTable('showColumn', 'dangerLevel'); 
		}else {
			$('#Report-gztj').bootstrapTable('hideColumn', 'dangerLevel');
		}
    });
	//改造统计详情表
	$("#Report-gztj-div").on("click",".show-Details",function(){
		var row = $('#Report-gztj').bootstrapTable('getSelections')[0];
		if (row=="") {
			return;
		}			
		$('#Report-gztj-detail-div').css('display','block');
		UI.loadBootstrapTable('#Report-gztj-detail', ReportConfig.gzDetail,'#Report-gztj-detail-toorbar');
		$('#Report-gztj-detail-toorbar').css('display','block');			
		var params = FormUtils.getData("report-form");
		params.zt=2;
		if (row.dismantle_timemonth !="") {
			params.dismantle_timemonth=row.dismantle_timemonth;
		}else{
			params.dismantle_timeyear=row.dismantle_timeyear;
		}						
		if (params.dangerLevel=="等级") {
			params.level=row.dangerLevel;
		}
		if (params.xzjd=="乡镇") {
			params.xzjd=row.xzjd;
		}
		Ajax.getJson(baseUrl+"house/history_search",params, function(data){
			$('#Report-gztj-detail').bootstrapTable('load', data);
//	    	$('#Report-gztj-detail').bootstrapTable('removeAll');
//        	$('#Report-gztj-detail').bootstrapTable('append', data.rows);
	    });
	});	
	//改造统计详情表导出
	$('#Report-gztj-detail-excel').on("click", function(){
		var row = $('#Report-gztj').bootstrapTable('getSelections')[0];
		if (row=="") {
			return;
		}
		var params = FormUtils.getData("report-form");
		params.zt=2;
		if (row.dismantle_timemonth !="") {
			params.dismantle_timemonth=row.dismantle_timemonth;
		}else{
			params.dismantle_timeyear=row.dismantle_timeyear;
		}						
		if (params.dangerLevel=="等级") {
			params.level=row.dangerLevel;
		}
		if (params.xzjd=="乡镇") {
			params.xzjd=row.xzjd;
		}
		if (params.dismantle_timemonth) {
			window.location.href= baseUrl + 'history/excel?zt='+2+"&dismantle_timemonth="+params.dismantle_timemonth+"&"+ $('#report-form').serialize();
		}else {
			window.location.href= baseUrl + 'history/excel?zt='+2+"&dismantle_timeyear="+params.dismantle_timeyear+"&"+ $('#report-form').serialize();
		}
//		window.location.href= baseUrl + 'house/toexcel?zt='+2+"&month="+params.month+"&year="+params.year+"&"+ $('#report-form').serialize();
		$.gritter.add({
			title : '提示',
			text : '导出成功',
			time : 1000,
			speed: 2000, 
		});
	});
	
	//新增-查看专题图
	$('#Report-xztj-toorbar-tb').on("click", function(){
		$('.tj-And-chart').css('display','none');
		$('#Report-MyChart').css('display','block');
		$('#Report-MyChart-btns').css('display','block');
		$('#Report-MyChart-bar').attr('value','新增')
		$('#Report-MyChart-pie').attr('value','新增')
	});
	
	//改造-查看专题图
	$('#Report-gztj-toorbar-tb').on("click", function(){
		$('.tj-And-chart').css('display','none');
		$('#Report-MyChart').css('display','block');
		$('#Report-MyChart-btns').css('display','block');
		$('#Report-MyChart-bar').attr('value','改造')
		$('#Report-MyChart-pie').attr('value','改造')
	});

	//柱状图
	$('#Report-MyChart-bar').on("click", function(){
		if ($('#Report-MyChart-bar').val()=='新增') {
			drawChartBar(xzData);
		}else if ($('#Report-MyChart-pie').val()=='改造') {
			drawChartBar(gzData);
		}		
	});
	
	//饼图
	$('#Report-MyChart-pie').on("click", function(){
		if ($('#Report-MyChart-bar').val()=='新增') {
			drawChartPie(xzData);
		}else if ($('#Report-MyChart-pie').val()=='改造') {
			drawChartPie(gzData);
		}
	});
	
	//返回
	$('#Report-MyChart-back').on("click", function(){
//		$('.tj-And-chart').css('display','none');
//		$('.Report-tj-div').css('display','block');
	});
	
	//画柱状图
	function drawChartBar(data) {		
		console.log(data);
		var params = {};
		params.title = $('#Report-MyChart-bar').val()+"统计柱状图";
		params.legend = "数量";
		params.xAxis = [];
		params.data = [{
			name: "数量",
			data: []
		}];
		for(var i = 0; i < data.length; i++){
			var xAxis="";
			if (data[i].year==0) {
				if ($('#Report-checkbox-xz').is(":checked")==true) {
					xAxis+=data[i].xzjd+"/";
				}
				if ($('#Report-checkbox-dj').is(":checked")==true) {
					xAxis+=data[i].dangerLevel+"/";
				}
				xAxis+=data[i].month+"月";
				params.xAxis.push(xAxis);
			}else {
				if ($('#Report-checkbox-xz').is(":checked")==true) {
					xAxis+=data[i].xzjd;
				}
				if ($('#Report-checkbox-dj').is(":checked")==true) {
					xAxis+=data[i].dangerLevel;
				}
				xAxis+=data[i].year;
				params.xAxis.push(xAxis);
			}	
			params.data[0].data.push(data[i].counts);
		}
		EChartsHelper.renderBarCharts('Report-MyChart', params);
	}
	
	//画饼图
	function drawChartPie(data) {
		var params = {};
		params.title = $('#Report-MyChart-pie').val()+"统计饼图";
		params.legend = []
//		params.xAxis = [];
		params.data = [{
			name: "数量",
			data: []
		}];
		for(var i = 0; i < data.length; i++){
			var xAxis="";
			if (data[i].year==0) {
				if ($('#Report-checkbox-xz').is(":checked")==true) {
					xAxis+=data[i].xzjd+"/";
				}
				if ($('#Report-checkbox-dj').is(":checked")==true) {
					xAxis+=data[i].dangerLevel+"/";
				}
				xAxis+=data[i].month+"月";
				params.legend.push(xAxis);
			}else {
				if ($('#Report-checkbox-xz').is(":checked")==true) {
					xAxis+=data[i].xzjd;
				}
				if ($('#Report-checkbox-dj').is(":checked")==true) {
					xAxis+=data[i].dangerLevel;
				}
				xAxis+=data[i].year;
				params.legend.push(xAxis);
			}	
			var val = {};
			val.name = xAxis;
			val.value = data[i].counts;
			params.data[0].data.push(val);
		}
		console.log(params);
		EChartsHelper.renderPieCharts('Report-MyChart', params);
	}
	
	
});