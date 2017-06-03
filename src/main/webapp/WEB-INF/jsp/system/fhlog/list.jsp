<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html lang="en">
  <head>
  <base href="<%=basePath%>">
<!-- 下拉框 -->
<link rel="stylesheet" href="static/ace/css/chosen.css" />
<!-- jsp文件头和头部 -->

<!-- 日期框 -->
<link rel="stylesheet" href="static/ace/css/datepicker.css" />
</head>
<body class="no-skin">
<link rel="stylesheet" href="static/ace/css/chosen.css" />
<!-- jsp文件头和头部 -->
<%@ include file="../../system/index/top.jsp"%>
<!-- 日期框 -->
<link rel="stylesheet" href="static/ace/css/datepicker.css" />
	
  
    
	<!-- 删除时确认窗口 -->
	<script src="static/ace/js/bootbox.js"></script>
	<!-- ace scripts -->
	<script src="static/ace/js/ace/ace.js"></script>
	<!-- 下拉框 -->
	<script src="static/ace/js/chosen.jquery.js"></script>
	<script type="text/javascript" src="static/js/jquery-1.7.2.js"></script>
	<!-- 日期框 -->
	<script src="static/ace/js/date-time/bootstrap-datepicker.js"></script>
	<!--提示框-->
	<script type="text/javascript" src="static/js/jquery.tips.js"></script>
  
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<script type="text/javascript">
	$(top.hangge());//关闭加载状态
	</script>
  </head>
  <div class="main-container" id="main-container">
		<!-- /section:basics/sidebar -->
		<div class="main-content">
			<div class="main-content-inner">
				<div class="page-content">
					<div class="row">
						<div class="col-xs-12">
  <body>
 		<h2>&nbsp;</h2>
 		
	<table id="simple-table" class="table table-striped table-bordered table-hover" style="margin-top:5px;">	
 			<tr><td width="100" height="100" align="center" valign="middle" bgcolor="#66FFFF">ID</td><td width="100" height="100" align="center" valign="middle" bgcolor="#66FFFF">名称</td><td width="100" height="100" align="center" valign="middle" bgcolor="#66FFFF">地址</td><td width="100" height="100" align="center" valign="middle" bgcolor="#66FFFF">地址</td><td width="100" height="100" align="center" valign="middle" bgcolor="#66FFFF">地址</td><td width="100" height="100" align="center" valign="middle" bgcolor="#66FFFF">地址</td><td width="100" height="100" align="center" valign="middle" bgcolor="#66FFFF">地址</td><td width="100" height="100" align="center" valign="middle" bgcolor="#66FFFF">地址</td></tr>
 			<c:forEach items="${listmenu}" var="menu">
 					<tr><td width="100" height="100" align="center" valign="middle" bgcolor="#66FFFF">${menu.MENU_ID}</td>
 					<td width="100" height="100" align="center" valign="middle" bgcolor="#66FFFF">${menu.MENU_NAME}</td>
 					<td width="100" height="100" align="center" valign="middle" bgcolor="#66FFFF">${menu.MENU_URL}</td>	
 					<td width="100" height="100" align="center" valign="middle" bgcolor="#66FFFF">${menu.PARENT_ID}</td>	
 					<td width="100" height="100" align="center" valign="middle" bgcolor="#66FFFF">${menu.MENU_ICON}</td>	
 					<td width="100" height="100" align="center" valign="middle" bgcolor="#66FFFF">${menu.MENU_ORDER}</td>	
 					<td width="100" height="100" align="center" valign="middle" bgcolor="#66FFFF">${menu.MENU_STATE}</td>
 				    <td width="100" height="100" align="center" valign="middle" bgcolor="#66FFFF">${menu.MENU_TYPE}</td>	
 				    <div class="pagination" style="float: right;padding-top: 0px;margin-top: 0px;">${page.pageStr}</div>
 					</tr>
 			</c:forEach>
 		</table> 
  </body>
</html>
