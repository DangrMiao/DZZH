
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">

<title>My JSP 'upload.jsp' starting page</title>

<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">
<!-- jsp文件头和头部 -->
	<%@ include file="../../system/index/top.jsp"%>
	<script type="text/javascript" src="static/ace/js/jquery.js"></script>
<link href="plugins/uploadify/uploadify.css" rel="stylesheet" type="text/css">
	<script type="text/javascript" src="plugins/uploadify/swfobject.js"></script>
	<script type="text/javascript" src="plugins/uploadify/jquery.uploadify.v2.1.4.min.js"></script>
	<script type="text/javascript" src="static/js/jquery-1.7.2.js"></script>




<script type="text/javascript">
$(top.hangge());//关闭加载状态
$(function(){
		$("#uploadify").uploadify({    
			'debug'     : false, //开启调试
	        'auto'           : false, //是否自动上传   
	        'swf'            : 'uploadify/uploadify.swf',  //引入uploadify.swf  
	        'uploader'       : '<%=basePath%>test/gofile.do',//请求路径  
	        'queueID'        : 'fileQueue',//队列id,用来展示上传进度的  
	        'width'     : '75',  //按钮宽度  
	        'height'    : '24',  //按钮高度
	        'queueSizeLimit' : 5,  //同时上传文件的个数  
	        'fileTypeDesc'   : '视频文件',    //可选择文件类型说明
	        'fileTypeExts'   :  '*.*;*.*;*.*', //控制可上传文件的扩展名  
	        'multi'          : true,  //允许多文件上传  
	        'buttonText'     : '请选择',//按钮上的文字  
	        'fileSizeLimit' : '100MB', //设置单个文件大小限制   
	        'fileObjName' : 'uploadify',  //<input type="file"/>的name   */
	        'method' : 'post',  
	        'removeCompleted' : true,//上传完成后自动删除队列  
	        'onFallback':function(){    
	            alert("您未安装FLASH控件，无法上传图片！请安装FLASH控件后再试。");    
	        }, 
	        'onUploadSuccess' : function(file, data, response){//单个文件上传成功触发  
	                               //data就是action中返回来的数据  
	        },'onQueueComplete' : function(){//所有文件上传完成  
	        	alert("文件上传成功!");
	       		}  
	        });
	});
	</script>
  </head>
  
 <body class="no-skin">
<!-- /section:basics/navbar.layout -->
<div class="main-container" id="main-container">
	<!-- /section:basics/sidebar -->
	<div class="main-content">
		<div class="main-content-inner">
			<div class="page-content">
				<div class="row">
					<div class="col-xs-12">
   <input type="file" id="uploadify" name="uploadify" >
   <div id="fileQueue"></div>  
   <a href="javascript:$('#uploadify').uploadify('upload','*')" ><input type='button' value='上传'></a>  
   <a href="javascript:$('#uploadify').uploadify('cancel','*')"><input type='button' value='取消'></a>  
   <a class="btn btn-mini btn-danger" onclick="top.Dialog.close();">取消</a>
   </div>
					<!-- /.col -->
				</div>
				<!-- /.row -->
			</div>
			<!-- /.page-content -->
		</div>
	</div>
	<!-- /.main-content -->
</div>
<!-- /.main-container -->


	<!-- 页面底部js¨ -->
	<%@ include file="../../system/index/foot.jsp"%>
	<!-- 下拉框 -->
	<script src="static/ace/js/chosen.jquery.js"></script>
	<!-- 日期框 -->
	<script src="static/ace/js/date-time/bootstrap-datepicker.js"></script>
	<!--提示框-->
  </body> 
</html>

