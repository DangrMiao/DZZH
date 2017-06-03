<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html lang="en">
	<head>
		<base href="<%=basePath%>">
		<!-- jsp文件头和头部 -->
		<%@ include file="../../system/index/top.jsp"%>
		
	
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
					
					<form action="test/${msg}.do" name="Form" id="Form" method="post">
						<input type="hidden" name="MENU_ID" id="MENU_ID" value="${pd.MENU_ID}"/>
						<div id="zhongxin">
						<table id="table_report" class="table table-striped table-bordered table-hover" style="margin-top:15px;">
							
							<tr>
								<td style="width:70px;text-align: right;padding-top: 13px;">菜单名称:</td>
								<td><input type="text" name="MENU_NAME" id="MENU_NAME" value="${pd.MENU_NAME}" maxlength="50" placeholder="这里输入名称" title="名称" style="width:98%;"/></td>
							</tr>
							<tr>
								<td style="width:70px;text-align: right;padding-top: 13px;">请求地址:</td>
								<td><input type="text" name="MENU_URL" id="MENU_URL" value="${pd.MENU_URL}" maxlength="50" placeholder="请输入英文" title="地址" style="width:98%;"/></td>
							</tr>
							<tr>
								<td style="width:70px;text-align: right;padding-top: 13px;">请求ID:</td>
								<td><input type="text" name="PARENT_ID" id="PARENT_ID" value="${pd.PARENT_ID}" maxlength="32" placeholder="这里数字 (不重复, 禁止修改)" title="ID" style="width:76%;" onblur="hasBianma();" <c:if test="${null != pd.BIANMA}">readonly="readonly"</c:if>/></td>
							</tr>
							<tr>
								<td style="width:70px;text-align: right;padding-top: 13px;">点击属性:</td>
								<td><input type="text" name="MENU_ICON" id="MENU_ICON" value="${pd.MENU_ICON}" maxlength="32" placeholder="请输入英文" title="属性" style="width:66%;"/></td>
							</tr>
							<tr>
								<td style="width:70px;text-align: right;padding-top: 13px;">样式ID:</td>
								<td><input type="text" name="MENU_ORDER" id="MENU_ORDER" value="${pd.MENU_ORDER}" maxlength="32" placeholder="这里输入样式" title="样式" style="width:66%;"/></td>
							</tr>
							<tr>
								<td style="width:70px;text-align: right;padding-top: 13px;">状态ID:</td>
								<td><input type="text" name="MENU_STATE" id="MENU_STATE" value="${pd.MENU_STATE}" maxlength="32" placeholder="请输入ID" title="状态" style="width:98%;"/></td>
							</tr>
							<tr>
								<td style="width:70px;text-align: right;padding-top: 13px;">按钮样式ID:</td>
								<td><input type="text" name="MENU_TYPE" id="MENU_TYPE" value="${pd.MENU_TYPE}" maxlength="32" placeholder="这里输入按钮样式" title="按钮样式" style="width:98%;"/></td>
							</tr>
							<tr>
								<td class="center" colspan="10">
									<a class="btn btn-mini btn-primary" onclick="save();">保存</a>
									<a class="btn btn-mini btn-danger" onclick="top.Dialog.close();">取消</a>
								</td>
							</tr>
						</table>
						</div>
						
						<div id="zhongxin2" class="center" style="display:none"><br/><br/><br/><br/><br/><img src="static/images/jiazai.gif" /><br/><h4 class="lighter block green">提交中...</h4></div>
						
					</form>
	
					<div id="zhongxin2" class="center" style="display:none"><img src="static/images/jzx.gif" style="width: 50px;" /><br/><h4 class="lighter block green"></h4></div>
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
	<!--提示框-->
	<script type="text/javascript" src="static/js/jquery.tips.js"></script>
		<script type="text/javascript">
		$(top.hangge());
		//保存
		function save(){
			if($("#MENU_NAME").val()==""){
				$("#MENU_NAME").tips({
					side:3,
		            msg:'请输入名称',
		            bg:'#AE81FF',
		            time:2
		        });
				$("#MENU_NAME").focus();
			return false;
		}
			if($("#NAME_EN").val()==""){
				$("#NAME_EN").tips({
					side:3,
		            msg:'请输入英文',
		            bg:'#AE81FF',
		            time:2
		        });
				$("#NAME_EN").focus();
			return false;
		}
			if($("#BIANMA").val()==""){
				$("#BIANMA").tips({
					side:3,
		            msg:'请输入编码',
		            bg:'#AE81FF',
		            time:2
		        });
				$("#BIANMA").focus();
			return false;
		}
			$("#Form").submit();
			$("#zhongxin").hide();
			$("#zhongxin2").show();
			
		}
		
		//判断编码是否存在
		function hasBianma(){
			var BIANMA = $.trim($("#BIANMA").val());
			if("" == BIANMA)return;
			$.ajax({
				type: "POST",
				url: '<%=basePath%>department/hasBianma.do',
		    	data: {BIANMA:BIANMA,tm:new Date().getTime()},
				dataType:'json',
				cache: false,
				success: function(data){
					 if("success" == data.result){
					 }else{
						$("#BIANMA").tips({
							side:1,
				            msg:'编码'+BIANMA+'已存在,重新输入',
				            bg:'#AE81FF',
				            time:5
				        });
						$('#BIANMA').val('');
					 }
				}
			});
		}
		</script>
</body>
</html>