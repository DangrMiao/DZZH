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

var time = function(value,row){
	if (!value || value=="") {
		return "";
	}else {
//		var time1 = DateTime.value.ToShortDateString().ToString();
//		return time1;
		var date=parserDate(value);
		var time1 =date.Format("yyyy-MM-dd");	
	    return time1;
	}	
}

var ms = function(value,row){
	var ms="";
	if (row.slipspeed>row.slipValue) {
		ms+="滑移速率超过预警阀值"+row.slipValue+"."
	}
	if (row.sedimentationspeed>row.settlementValue) {
		ms+="沉降速率超过预警阀值"+row.settlementValue
	}
    return ms;
}

$(function() {
	var wfyjMap = new T.Map("wfyj-mapDiv");
	wfyjMap.centerAndZoom(new T.LngLat(120.149920, 30.274190), 15);
	
	$('#wfyj-data').bootstrapTable({
	    url: baseUrl+'house_warn/warn_house',         //请求后台的URL（*）
//	    data:[{bh:1,yjlx:'lzx',yjfz:1}],
	    editable:true,//开启编辑模式
	    clickToSelect: true,
	    method: 'get',                      //请求方式（*）
//	    toolbar: '#wfyj-fzxd-data-toolbar',                //工具按钮用哪个容器
	    toolbarAlign:'center',
	    striped: true,                      //是否显示行间隔色
	    cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
	    pagination: true,                   //是否显示分页（*）
	    sortable: false,                     //是否启用排序
	    sortOrder: "asc",                   //排序方式
	    sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
	    pageNumber: 1,                       //初始化加载第一页，默认第一页
	    pageSize: 10,                       //每页的记录行数（*）
	    paginationHAlign: 'left',
	    paginationDetailHAlign: "right",
	    //pageList: [10, 20, 50],        //可供选择的每页的行数（*）
	    //showPaginationSwitch: true,
	    singleSelect: true,
	    minimumCountColumns: 2,             //最少允许的列数
	    clickToSelect: true,                //是否启用点击选中行
	    cardView: false,                    //是否显示详细视图
	    detailView: false,                   //是否显示父子表
//	    height: 140,
	    columns: [
	    	{checkbox: true},
//	    	{field: 'id',title: 'id'}, 
	    	{field: 'bh',title: '房屋编号'}, 
	        {field: 'slipspeed',title: '滑移速率(毫米/月)'},
	        {field: 'sedimentationspeed',title: '沉降速率(毫米/月)'},
	        {field: 'ms',title: '描述',formatter:ms},
	        {field: 'record_time',title: '记录时间',formatter:time},
	    ],
	    dataType: 'json',
	    queryParams: function(params){
	        if(params){
	            params.start = params.offset;
	            params.rows = params.limit;
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
	
	Ajax.postJson(baseUrl+'house_warn/warn_house', {}, function(data){
		console.log(data);
		var Icon = new T.Icon({ 
            iconUrl: "../../images/location.gif", 
            iconSize: new T.Point(40, 40), 
            iconAnchor: new T.Point(20, 32) 
        }); 
		wfyjMap.centerAndZoom(new T.LngLat(data.rows[0].x, data.rows[0].y), 15);
        //向地图上添加自定义标注 
		for (var i = 0; i < data.rows.length; i++) {
			var Mmarker = new T.Marker(new T.LngLat(data.rows[i].x, data.rows[i].y), {icon: Icon}); 
			wfyjMap.addOverLay(Mmarker);
		}
    	
	});
});