var baseUrl = CommonUtils.getBasePath();

var fzxdEdit = function(value,row){
	var html = '<a href="#" class="fzxdEdit-edit" data-id="'+ row.id + '"  >修改</a>'
	+	'&nbsp;<a href="#" style="display:none;" class="oprate-cancel" data-id="'+ row.id + '"  >取消</a>';
	return html;
}

$(function(){	
	var Height=document.body.scrollHeight-70;
	$('#wfyj-fzxd-data').bootstrapTable({
	    url: baseUrl+'house_warn/threshold',         //请求后台的URL（*）
	   
	    editable:true,//开启编辑模式
	    clickToSelect: true,
	    method: 'get',                      //请求方式（*）
	    toolbar: '#wfyj-fzxd-data-toolbar',                //工具按钮用哪个容器
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
	    height: Height,
	    columns: [
	    	{checkbox: true},
//	    	{field: 'id',title: 'id'}, 
//	        {field: 'bh',title: '编号'},  
//	        {field: 'identity',title: '身份证号'}, 
//	        {field: 'phonenum',title: '联系电话'},
	    	{field: 'id',title: '编号'}, 
	        {field: 'type',title: '预警类型'}, 
	        {field: 'thresholdvalue',title: '预警阀值(毫米/月)',edit:{type:'number'}},
	        {field: 'cz',title: '操作', formatter:fzxdEdit},         
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
	
	//设置模态框的水平垂直方向的位置；
	function centerModals() {   
	　　$('#wfyj-fzxd-edit-dialog').each(function(i) {   
	　　　　var $clone = $(this).clone().css('display','block').appendTo('body');
	　　　　var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
	　　　　top = top > 0 ? top : 0;   
	　　　　$clone.remove();   
	　　　　$(this).find('.modal-content').css("margin-top", top);   
	　　});
	}; 
	$('#wfyj-fzxd-edit-dialog').on('show.bs.modal', centerModals);
	//页面大小变化是仍然保证模态框水平垂直居中
	$(window).on('resize', centerModals);
	
	//禁用空白处点击关闭
	$('#wfyj-fzxd-edit-dialog').modal({
        keyboard: true,
        backdrop: "static",
        show:false
    });
	
	//修改
    $("#wfyj-fzxd-data-div").on("click",".fzxdEdit-edit",function(){
    	var row = $('#wfyj-fzxd-data').bootstrapTable('getSelections');
    	$('#wfyj-fzxd-edit-dialog').modal('show');
    	FormUtils.loadForm("wfyj-fzxd-form",row[0]);
	});    
    
    //提交
    $("#wfyj-fzxd-edit-submit").on("click",function(){
    	var params = FormUtils.getData("wfyj-fzxd-form"); 
    	Ajax.postJson(baseUrl+'house_warn/save_threshold', params, function(data){
    		console.log(data);
    		if(data.code > 0){
//    			alert('保存成功');
                $.gritter.add({
	                title: '提示',
	                text: '保存成功',
	                time: 1000,	                
//	                class_name: 'gritter-success'
                });
//                $.bootstrapGrowl("保存"+ data.message, {
////                    type: 'success',
//                    align: 'center',
//                    delay: 1000,
//                });
            }else{                
//            	$.gritter.add({
//                    title: '提示',
//                    text: '保存失败:' + data.message,
//                    time: 1000,
////                    class_name: 'gritter-error'
//                });
            	$.bootstrapGrowl("保存"+ data.message, {
                    type: 'info',
                    align: 'center',
                    delay: 3000,
                    width: 'auto',
                });
            }
    	});
    	
    	$('#wfyj-fzxd-edit-dialog').modal('hide');
    	$('#wfyj-fzxd-data').bootstrapTable('refresh');    	
	});
    
});