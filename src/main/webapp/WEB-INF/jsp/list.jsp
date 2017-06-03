<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>My JSP 'index.jsp' starting page</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
  </head>
  
  <body>
 		<h2>菜单管理</h2>
 		啦啦啦啦啦啦
 	 <table border="1">
 			<tr><td>ID</td><td>名称</td><td>地址</td><td>地址</td><td>地址</td><td>地址</td><td>地址</td><td>地址</td></tr>
 			<c:forEach items="${listmenu}" var="menu">
 					<tr><td>${menu.MENU_ID}</td>
 					<td>${menu.MENU_NAME}</td>
 					<td>${menu.MENU_URL}</td>	
 					<td>${menu.PARENT_ID}</td>	
 					<td>${menu.MENU_ICON}</td>	
 					<td>${menu.MENU_ORDER}</td>	
 					<td>${menu.MENU_STATE}</td>
 				    <td>${menu.MENU_TYPE}</td>	
 					</tr>
 			</c:forEach>
 		</table> 
  </body>
</html>
