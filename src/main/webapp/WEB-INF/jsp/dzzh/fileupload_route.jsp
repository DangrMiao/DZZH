<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
</head>
<script type="text/javascript">
//window.parent.get_uploadfile_projectid();
function goto_uploadfile_by_projectid(id,protype,stage,type){
	//console.log("fileupload_route");
	window.location.href="<%=basePath%>UpLoadFile/upfile?geotype="+protype+"&id="+id+"&stage="+stage+"&type="+type;
}
</script>
<script type="text/javascript">
<%-- window.location.href="<%=basePath%>UpLoadFile/upfile?geotype="+1+"?id="+1; --%>
</script>
<body>
页面加载中.....
</body>
</html>