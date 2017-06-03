<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
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

							<!-- 检索  -->
							<form action="test/${msg}.do" method="post" name="Form" id="Form">
								<table id="simple-table"
									class="table table-striped table-bordered table-hover"
									style="margin-top: 5px;">


									<tr>
										<th width="129" class="center" style="width: 50px;">菜单ID</th>
										<th width="143" class="center">菜单名称</th>
										<th width="163" class="center">请求地址</th>
										<th width="120" class="center">请求ID</th>
										<th width="153" class="center">点击属性</th>
										<th width="120" class="center">样式ID</th>
										<th width="120" class="center">状态ID</th>
										<th width="120" class="center">按钮样式ID</th>
										<th width="163" class="center">操作</th>
									</tr>


									<tbody>
										<!-- 开始循环 -->

										<c:forEach items="${listmenu}" varStatus="vs" var="menu">

											<tr>

												<td class='center' style="width: 30px;">${menu.MENU_ID}</td>
												<td class='center'>&nbsp;${menu.MENU_NAME}</td>
												<td class='center'>${menu.MENU_URL}</td>
												<td class='center'>${menu.PARENT_ID}</td>
												<td class='center'>${menu.MENU_ICON}</td>
												<td class='center'>${menu.MENU_ORDER}</td>
												<td class='center'>${menu.MENU_STATE}</td>
												<td class='center'>${menu.MENU_TYPE}</td>
												<td class='center'><a style="cursor: pointer;"
													onclick="del('${menu.MENU_ID}');" class="tooltip-error"
													data-rel="tooltip" title="删除"> <span class="red">
															<i class="ace-icon fa fa-trash-o bigger-120"></i>
													</span>
												</a> <a style="cursor: pointer;"
													onclick="edit('${menu.MENU_ID}');" class="tooltip-success"
													data-rel="tooltip" title="修改"> <span class="green">
															<i class="ace-icon fa fa-pencil-square-o bigger-120"></i>
													</span>
												</a> <a class="btn btn-sm btn-success" style="cursor: pointer;"
													class="tooltip-success" data-rel="tooltip" onclick="add();">新增</a>

													<input type="button" value="上传文件" onclick="file()" /></td>
											</tr>

										</c:forEach>

										</td>
										</tr>
									</tbody>
								</table>
								<div class="pagination"
									style="float: right; padding-top: 0px; margin-top: 0px;">${page.pageStr}</div>
							</form>

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

	<!-- basic scripts -->
	<!-- 页面底部js¨ -->
	<%@ include file="../../system/index/foot.jsp"%>
	<!-- 删除时确认窗口 -->
	<script src="static/ace/js/bootbox.js"></script>
	<!-- ace scripts -->
	<script src="static/ace/js/ace/ace.js"></script>
	<!--提示框-->
	<script type="text/javascript" src="static/js/jquery.tips.js"></script>
	<script type="text/javascript">
		$(top.hangge());//关闭加载状态
		//检索
		function gsearch(){
			top.jzts();
			$("#Form").submit();
		}
		
		//去此ID下子级列表
		function goSondict(DEPARTMENT_ID){
			top.jzts();
			window.location.href="<%=basePath%>test/show_page.do?MENU_ID="+MENU_ID;
		};
		
		//新增
		function add(DEPARTMENT_ID){
			 top.jzts();
			 var diag = new top.Dialog();
			 diag.Drag=true;
			 diag.Title ="新增";
			 diag.URL = '<%=basePath%>test/goAdd.do';
			 diag.Width = 700;
			 diag.Height = 550;
			 diag.CancelEvent = function(){ //关闭事件
				 if('none' == diag.innerFrame.contentWindow.document.getElementById('zhongxin').style.display){
					 window.location.reload()
				}
				diag.close();
			 };
			 diag.show();
		}
		
		function file(){
			 top.jzts();
			 var diag = new top.Dialog();
			 diag.Drag=true;
			 diag.Title ="文件上传";
			 diag.URL = '<%=basePath%>test/gofile.do';
			 diag.Width = 480;
			 diag.Height = 300;
			 diag.Modal = true;				//有无遮罩窗口
			 diag. ShowMaxButton = true;	//最大化按钮
		     diag.ShowMinButton = true;		//最小化按钮
			 diag.CancelEvent = function(){ //关闭事件
				 if(diag.innerFrame.contentWindow.document.getElementById('zhongxin').style.display == 'none'){
					 if('${page.currentPage}' == '0'){
						 top.jzts();
						 setTimeout("self.location=self.location",100);
					 }else{nextPage(${page.currentPage});
					 }
				}
				diag.close();
			 };
			 diag.show();
		}
		
		//删除
		function del(Id){
			bootbox.confirm("确定要删除吗?", function(result) {
				if(result) {
					top.jzts();
					var url = '<%=basePath%>test/delete.do?MENU_ID='+Id;
					$.post(url,function(data){
						if("success" == data.result){
						 window.location.reload()
						}else if("false" == data.result){
							top.hangge();
							bootbox.dialog({
								message: "<span class='bigger-110'>删除失败！</span>",
								buttons: 			
								{
									"button" :
									{
										"label" : "确定",
										"className" : "btn-sm btn-success"
									}
								}
							});
						}
					});
				}
			});
		}
		
		//修改
		function edit(Id){
			 top.jzts();
			 var diag = new top.Dialog();
			 diag.Drag=true;
			 diag.Title ="编辑";
			 diag.URL = '<%=basePath%>test/goEdit.do?MENU_ID='+Id;
			 diag.Width = 700;
			 diag.Height = 550;
			 diag.CancelEvent = function(){ //关闭事件
				 if(diag.innerFrame.contentWindow.document.getElementById('zhongxin').style.display == 'none'){
				 //刷新当前网络
					 window.location.reload()
					 
				}
				diag.close();
			};
			diag.show();
		}
	</script>


</body>
</html>