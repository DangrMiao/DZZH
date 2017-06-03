var baseUrl = CommonUtils.getBasePath();
var areaEdit = function(value,row){
	var html = '<a href="#" class="areaEdit-edit" data-id="'+ row.id + '"  >修改</a>';
	return html;
}

var stateFormatter = function(value,row){
	var Selection = $('#area-Manager-data').bootstrapTable('getSelections')[0];
	if(Selection.FUNCTIONS!=''){
		var array=Selection.FUNCTIONS.split('/');
		for (var i = 0; i < array.length; i++) {
			if (row.id==array[i]) {
				return {
		            checked : true//设置选中
		        };
			}
		}
	 }
}

var areaManagerConfig = {
		area:{ 
			height:400,	
			toolbarAlign:'right',
//			data:[{"id":10,"name":"高楼鉴定所"}],
			columns: [
				{checkbox:true},
				{field: 'id',title: 'ID'},
				{field: 'NAME',title: '名称'},
				{field: 'cz',title: '操作',formatter:areaEdit},
		    ],
		    url:baseUrl+"depart/listdepartment?Rows=5&PageNo=1",
		},
		areaEdit:{ 
			height:200,	
			toolbarAlign:'right',
			singleSelect: false,
//			data:[{"id":10,"name":"高楼鉴定所"}],
			columns: [
				{field : 'checked',checkbox : true,title: '操作',formatter : stateFormatter},
				{field: 'id',title: 'ID'},
				{field: 'name',title: '名称'},
		    ],
		    url:baseUrl+"street/list",
		},
}

$(document).ready(function() { 
	areaManagerConfig.area.height=$('#area-Manager-data-div').height()-100;
	UI.loadBootstrapTable('#area-Manager-data', areaManagerConfig.area,'');
});

$(function() {
	//设置模态框的水平垂直方向的位置；
	function centerModals() {   
	　　$('#area-Manager-dialog').each(function(i) {   
	　　　　var $clone = $(this).clone().css('display','block').appendTo('body');
	　　　　var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
	　　　　top = top > 0 ? top : 0;   
	　　　　$clone.remove();   
	　　　　$(this).find('.modal-content').css("margin-top", top);   
	　　});
	}; 
	$('#area-Manager-dialog').on('show.bs.modal', centerModals);
	//页面大小变化是仍然保证模态框水平垂直居中
	$(window).on('resize', centerModals);
	
	//禁用空白处点击关闭
	$('#area-Manager-dialog').modal({
        keyboard: true,
        backdrop: "static",
        show:false
    });
	

	Ajax.getJson(baseUrl+"depart/listdepartment?Rows=5&PageNo=1", {} , function(data){
    	console.log(data);
    });
	
	//修改
    $("#area-Manager-data-div").on("click",".areaEdit-edit",function(){
    	$('#area-Manager-dialog').modal('show');
    	UI.loadBootstrapTable('#area-Manager-dialog-data', areaManagerConfig.areaEdit,'');
//    	Ajax.getJson(baseUrl+"street/list", {} , function(data){
//    		console.log(data);
//    		$('#area-Manager-dialog-data').bootstrapTable('removeAll');
//        	$('#area-Manager-dialog-data').bootstrapTable('append', data.rows);
//    	});   	
	});
    
    //确认
    $("#area-Manager-add-dialog-save").on("click",function(){
    	var row = $('#area-Manager-data').bootstrapTable('getSelections')[0];
    	var Selections = $('#area-Manager-dialog-data').bootstrapTable('getSelections');
    	console.log(Selections);
    	for (var i = 0; i < Selections.length; i++) {
    		var value = Selections[i].id;
			if(value != null ){
				row.FUNCTIONS+="/" + value;
			}
		}
    	console.log(row);
    	Ajax.postJson(baseUrl+'depart/upddepartment', row, function(data){
    		console.log(data);
    		if(data.code > 0){
                $.gritter.add({
	                title: '提示',
	                text: '保存成功',
	                time: 1000,	                
//	                class_name: 'gritter-success'
                });
            }else{                
            	$.bootstrapGrowl("保存"+ data.message, {
                    type: 'info',
                    align: 'center',
                    delay: 3000,
                    width: 'auto',
                });
            }
    	});
	});
});