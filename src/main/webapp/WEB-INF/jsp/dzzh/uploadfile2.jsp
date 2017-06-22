<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<html>
<head>

	<link href="../static/lkk/bootstrap.min.css" rel="stylesheet">
	<link href="../static/lkk/fileinput.min.css" rel="stylesheet" />
	<script src="../static/lkk/jquery-2.1.1.min.js"></script>
	<script src="../static/lkk/fileinput.min.js"></script>
	<script src="../static/lkk/bootstrap.min.js"></script>
	<script src="../static/lkk/zh.js"></script>
	

</head>
<script> 
function goto_uploadfile_by_projectid(id,protype,stage,type){
	//console.log("fileupload_route");
	window.location.href="<%=basePath%>UpLoadFile/upfile?geotype="+protype+"&id="+id+"&stage="+stage+"&type="+type;
}

function changegoverstage(){
	var goverstage=$("#goverstage").val(); 
	if(goverstage==1){
	$('#prevent').hide();
	$('#progress').hide();
	$('#basic').show();
	$("#fileType").append("<option value='10'>基本情况</option>");
	$("#fileType option[value='11']").remove();
	$("#fileType option[value='12']").remove();
	$("#fileType option[value='13']").remove();
	$("#fileType option[value='14']").remove();
	$("#fileType option[value='15']").remove();
	$("#fileType option[value='16']").remove();
	$("#fileType option[value='17']").remove();
	}
	if(goverstage==2){
		$('#progress').hide();
		$('#basic').hide();
		$('#prevent').show();
		//$("#fileType").append("<option value='1'>文件A</option>");
		$("#fileType").append("<option value='11'>搬迁协议</option>");
		$("#fileType").append("<option value='12'>思想工作</option>");
		$("#fileType").append("<option value='13'>腾空</option>");
		$("#fileType").append("<option value='14'>拆迁</option>");
		$("#fileType option[value='10']").remove();
		$("#fileType option[value='15']").remove();
		$("#fileType option[value='16']").remove();
		$("#fileType option[value='17']").remove();
		}
	if(goverstage==3){
		$('#prevent').hide();
		$('#basic').hide();
		$('#progress').show();
 
		$("#fileType").append("<option value='15'>复垦</option>");
		$("#fileType").append("<option value='16'>安置地</option>");
		$("#fileType").append("<option value='17'>安置新房</option>");
		$("#fileType option[value='10']").remove();
		$("#fileType option[value='11']").remove();
		$("#fileType option[value='12']").remove();
		$("#fileType option[value='13']").remove();
		$("#fileType option[value='14']").remove();

 
		}

}
$(document).on('ready',function() { 
	var geotype=$("#geotype").val();
	var id=$("#id").val();
	var stage=$("#stage").val();
	var type=$("#type").val();
	var url=encodeURI("id="+id+"&geotype="+geotype+"&stage="+stage+"&type="+type);
	console.log(url);
		$("#uploadfilelist").fileinput({
			language : 'zh',  
			uploadUrl : '<%=basePath%>UpLoadFile/uploadfilelist?'+url,  
			showCaption : true,//是否显示标题  
			browseClass : "btn btn-primary", //按钮样式 
			maxFileCount : 3, //表示允许同时上传的最大文件个数  
			enctype : 'multipart/form-data',  
			previewFileIcon : "<i class='glyphicon glyphicon-king'></i>",  
			msgFilesTooMany : "选择上传的文件数量({n}) 超过允许的最大数值{m}！",  
			allowedFileExtensions : [ ]  
			}).on("fileuploaded", function(e, data) {
				 // alert("文件上传成功");
		});  
   }); 


</script> 
<body>
<input type="hidden" value="${id}" name="id" id="id" />
<input type="hidden" value="${geotype}" name="geotype" id="geotype" />
<input type="hidden" value="${stage}" name="stage" id="stage" />
<input type="hidden" value="${type}" name="type" id="type" />


<form class="form-horizontal" role="form" id ="form-test-result" style="width: 92%;margin-left:15px;height: 65%;">
	<div style="text-align: left;" class="form-group"  id="basic">
		<label class="col-sm-2">选择文件:</label>
		<input type="file" class="col-sm-10 file-loading" id="uploadfilelist"  name="uploadfilelist"  multiple>    
	</div>
</form>


</body>
<script type="text/javascript">

</script>
</html>