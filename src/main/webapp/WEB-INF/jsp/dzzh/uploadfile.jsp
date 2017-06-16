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
function goto_uploadfile_by_projectid(id,projecttype){
	//console.log("uploadfile");
	//console.log("----------------------------------------");
	//console.log(projecttype);
	//console.log("----------------------------------------");
	//console.log(id);
	//console.log("----------------------------------------");
	window.location.href="<%=basePath%>UpLoadFile/upfile?geotype="+2+"&id="+id;
}
function changegoverstage(){
/* 	var geotype=$("#geotype").val();
	var id=$("#id").val();
	//console.log(geotype);
	//console.log(id);
	//console.log("---------------------------------------");
	*/
	var goverstage=$("#goverstage").val(); 
	if(goverstage==1){
	$('#prevent').hide();
	$('#progress').hide();
	$('#basic').show();
	}
	if(goverstage==2){
		$('#progress').hide();
		$('#basic').hide();
		$('#prevent').show();
		}
	if(goverstage==3){
		$('#prevent').hide();
		$('#basic').hide();
		$('#progress').show();
		}
	////console.log(goverstage);

}
$(document).on('ready',function() { 
	var geotype=$("#geotype").val();
	var id=$("#id").val();
	var url=encodeURI("id="+id+"&geotype="+geotype);
	////console.log( 'UpLoadFile/upload'+goverstage+'?'+url+"&goverstage="+goverstage);
		$("#basicSituation").fileinput({
			language : 'zh',  
			uploadUrl : '<%=basePath%>UpLoadFile/upload1?'+url+"&goverstage="+1,  
			showCaption : true,//是否显示标题  
			browseClass : "btn btn-primary", //按钮样式 
			maxFileCount : 3, //表示允许同时上传的最大文件个数  
			enctype : 'multipart/form-data',  
			previewFileIcon : "<i class='glyphicon glyphicon-king'></i>",  
			msgFilesTooMany : "选择上传的文件数量({n}) 超过允许的最大数值{m}！",  
			allowedFileExtensions : [ ]  
			}).on("fileuploaded", function(e, data) {
				  alert("文件上传成功");
					var geotype=$("#geotype").val();
					var id=$("#id").val();
					//console.log(geotype);
					//console.log(id);
					
				  /* //console.log("empty");
				  $("#basicSituation").empty(); */
		       
		});  

   }); 
$(document).on('ready',function() { 
	var geotype=$("#geotype").val();
	var id=$("#id").val();
	var url=encodeURI("id="+id+"&geotype="+geotype);
	////console.log( 'UpLoadFile/upload'+goverstage+'?'+url+"&goverstage="+goverstage);
		$("#preventSituation").fileinput({
			language : 'zh',  
			uploadUrl : '<%=basePath%>UpLoadFile/upload2?'+url+"&goverstage="+2,  
			showCaption : true,//是否显示标题  
			browseClass : "btn btn-primary", //按钮样式 
			maxFileCount : 3, //表示允许同时上传的最大文件个数  
			enctype : 'multipart/form-data',  
			previewFileIcon : "<i class='glyphicon glyphicon-king'></i>",  
			msgFilesTooMany : "选择上传的文件数量({n}) 超过允许的最大数值{m}！",  
			allowedFileExtensions : [ ]  
			}).on("fileuploaded", function(e, data) {
		       alert("文件上传成功");
		       var geotype=$("#geotype").val();
				var id=$("#id").val();
				//console.log(geotype);
				//console.log(id);
				
		       
		});  

   }); 
$(document).on('ready',function() { 
	var geotype=$("#geotype").val();
	var id=$("#id").val();
	var url=encodeURI("id="+id+"&geotype="+geotype);
	////console.log( 'UpLoadFile/upload'+goverstage+'?'+url+"&goverstage="+goverstage);
		$("#progressSituation").fileinput({
			language : 'zh',  
			uploadUrl : '<%=basePath%>UpLoadFile/upload3?'+url+"&goverstage="+3,  
			showCaption : true,//是否显示标题  
			browseClass : "btn btn-primary", //按钮样式 
			maxFileCount : 3, //表示允许同时上传的最大文件个数  
			enctype : 'multipart/form-data',  
			previewFileIcon : "<i class='glyphicon glyphicon-king'></i>",  
			msgFilesTooMany : "选择上传的文件数量({n}) 超过允许的最大数值{m}！",  
			allowedFileExtensions : [ ]  
			}).on("fileuploaded", function(e, data) {
				  alert("文件上传成功");
				  var geotype=$("#geotype").val();
					var id=$("#id").val();
					//console.log(geotype);
					//console.log(id);
		});  

   });
</script> 
<body>
<input type="hidden" value="${id}" name="id" id="id" />
<input type="hidden" value="${geotype}" name="geotype" id="geotype" />


<form class="form-horizontal" role="form" id ="form-test-result" style="width: 92%;margin-left:15px;height: 65%;">
	<div style="text-align: left;" class="form-group">
		<label class="col-sm-2">编号:</label>
		<select class="col-sm-10 form-control"  onchange="changegoverstage()"id="goverstage">
	    	<option  value="1">治理前</option> 
			<option  value="2">治理中</option> 
			<option  value="3">治理后</option> 					
		</select>
	</div>
	<div style="text-align: left;" class="form-group"  id="basic">
		<label class="col-sm-2">治理前文件:</label>
		<input type="file" class="col-sm-10 file-loading" id="basicSituation"  name="basicSituation"  multiple>    
	</div>
	<div style="text-align: left;" class="form-group" id="prevent">
		<label class="col-sm-2">治理中文件:</label>
		<input type="file" class="col-sm-10 file-loading" id="preventSituation"  name="preventSituation"  multiple>    
	</div>
	<div style="text-align: left;" class="form-group" id="progress">
		<label class="col-sm-2">治理后文件:</label>
		<input type="file" class="col-sm-10 file-loading" id="progressSituation"  name="progressSituation"  multiple>    
	</div>
</form>










<!-- <div>
	<form class='form-horizontal' id="filefrom" role='form' style="width: 97%;height: 60%;">
	<div class='form-group' style="height: 10%;">
	<label class='col-sm-2 control-label'  for='inputSuccess'  style="margin-top: 5px;">阶段:</label> 
	<div class='col-sm-10'>
    <select class="form-control"  onchange="changegoverstage()"id="goverstage">
    <option  value="1">基本情况</option> 
	<option  value="2">防止情况</option> 
	<option  value="3">进展情况</option> 					
	</select>
	</div>
	</div>
	<div class='form-group' id="basic">
	<label class='col-sm-2 control-label'  for='inputSuccess'  style="margin-top: 150px;">基本文件:</label>
	<div class='col-sm-10'>
	<input type="file" class="file-loading" id="basicSituation"  name="basicSituation"  multiple>    
	</div>
	</div>
	<div class='form-group' id="prevent">
	<label class='col-sm-2 control-label'  for='inputSuccess'  style="margin-top: 150px;">防治文件:</label>
	<div class='col-sm-10'>
	<input type="file" class="file-loading" id="preventSituation"  name="preventSituation" multiple>    
	</div>
	</div>
	<div class='form-group' id="progress">
	<label class='col-sm-2 control-label'  for='inputSuccess' style="margin-top: 150px;" >进展文件:</label>
	<div class='col-sm-10'>
	<input type="file" class="file-loading" id="progressSituation"  name="progressSituation" multiple>    
	</div>
	</div> 
	</form>
</div> -->
</body>
<script type="text/javascript">
$('#prevent').hide();
$('#progress').hide();
</script>
</html>