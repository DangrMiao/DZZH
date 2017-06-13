var baseUrl = CommonUtils.getBasePath();
var systemEdit = function(value,row){
	var html = '<a href="#" class="systemEdit-edit" data-id="'+ row.id + '"  >修改</a>'
	+	'&nbsp;<a href="#" class="systemEdit-delete" data-id="'+ row.id + '"  >删除</a>';
	return html;
}

var systemManagerConfig = {
		system:{ 
			height:700,	
			toolbarAlign:'right',
//			data:[{"bh":20,"mc":"adgf","js":"0"}],
			columns: [
				{checkbox:true},
//				{field: 'bh',title: '编号'},
				{field: 'name',title: '用户名'},
				{field: 'qc',title: '全称'},
				{field: 'bm',title: '部门'},
				{field: 'js',title: '角色'},
				{field: 'PHONE',title: '联系方式'},
				{field: 'cz',title: '操作',formatter:systemEdit},
		    ],
		    url:baseUrl+'sys/listuser',
		},
		
}

$(document).ready(function() { 
	systemManagerConfig.system.height=$('#account-Manager-data-div').height()-95;
	console.log(systemManagerConfig.system.height);
	UI.loadBootstrapTable('#account-Manager-data', systemManagerConfig.system,'');
});

$(function() {
	
	//设置模态框的水平垂直方向的位置；
	function centerModals() {   
	　　$('#account-Manager-add-dialog').each(function(i) {   
	　　　　var $clone = $(this).clone().css('display','block').appendTo('body');
	　　　　var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
	　　　　top = top > 0 ? top : 0;   
	　　　　$clone.remove();   
	　　　　$(this).find('.modal-content').css("margin-top", top);   
	　　});
	   $('#account-Manager-delete-dialog').each(function(i) {   
	　　　　var $clone = $(this).clone().css('display','block').appendTo('body');
	　　　　var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
	　　　　top = top > 0 ? top : 0;   
	　　　　$clone.remove();   
	　　　　$(this).find('.modal-content').css("margin-top", top);   
	　　});
	}; 
	$('#account-Manager-add-dialog').on('show.bs.modal', centerModals);
	$('#account-Manager-delete-dialog').on('show.bs.modal', centerModals);
	//页面大小变化是仍然保证模态框水平垂直居中
	$(window).on('resize', centerModals);
	
	//禁用空白处点击关闭
	$('#account-Manager-add-dialog').modal({
        keyboard: true,
        backdrop: "static",
        show:false
    });

	//所属部门
    FormUtils.loadCombobox("account-Manager-select-department", baseUrl+'depart/listdpm', "DEPARTMENT_ID", "NAME",{fieldName: "所属部门", tbName: ""}); 
    //所属角色
    FormUtils.loadCombobox("account-Manager-select-role", baseUrl+'sys/listrole', "ROLE_ID", "ROLE_NAME",{fieldName: "所属角色", tbName: ""}); 

	//修改保存
	$('#account-Manager-add-dialog-save').on("click", function(){
		var params = FormUtils.getData("account-Manager-add-dialog-form");
		params.DEPARTMENT_ID=params.bm;
		params.ROLE_ID=params.js;
    	Ajax.postJson(baseUrl+'sys/upduser', params, function(data){
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
		$('#account-Manager-add-dialog').modal('hide');
    	$('#account-Manager-data').bootstrapTable('refresh'); 
	});
	
	//修改
    $("#account-Manager-data-div").on("click",".systemEdit-edit",function(){
    	var row = $('#account-Manager-data').bootstrapTable('getSelections');
    	row[0].bm=row[0].DEPARTMENT_ID;
    	row[0].js=row[0].ROLE_ID;
    	$('#account-Manager-add-dialog').modal('show');
    	FormUtils.loadForm("account-Manager-add-dialog-form",row[0]);
	});
    
    //删除确认
    $("#account-Manager-data-div").on("click",".systemEdit-delete",function(){
    	$('#account-Manager-delete-dialog').modal('show');
	});
    //删除
    $("#account-Manager-delete-dialog-comfirm").on("click",function(){
    	var row = $('#account-Manager-data').bootstrapTable('getSelections');
    	Ajax.postJson(baseUrl+'sys/deluser', {id:row[0].id}, function(data){
    		console.log(data);
    		if(data.code > 0){
                $.gritter.add({
	                title: '提示',
	                text: '成功',
	                time: 1000,	                
//	                class_name: 'gritter-success'
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
    	$('#account-Manager-data').bootstrapTable('refresh');
	});
	
});