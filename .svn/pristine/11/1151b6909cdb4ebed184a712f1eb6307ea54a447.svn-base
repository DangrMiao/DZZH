<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html>
<html lang="en">
<head>
	<base href="<%=basePath%>">
	<!-- 下拉框 -->
	<link rel="stylesheet" href="static/ace/css/chosen.css" />
	<!-- jsp文件头和头部 -->
	<%@ include file="../index/top.jsp"%>
	<!-- 日期框 -->
	<link rel="stylesheet" href="static/ace/css/datepicker.css" />
	<link rel="stylesheet" href="static/html_UI/assets/css/jquery.gritter.css" />
	<link rel="stylesheet" href="static/ace/css/bootstrap-table.min.css">

	<%--表单--%>
	<link rel="stylesheet" href="static/css/form.css">
	<style>
    .input-group{
	    width:270px;
	 }
    .number{
	    width:70px;
	 }
    .search-label{
    	width:90px;
    	text-align: right;
	 }
	 .search-content{
	 	width: 149px;
	 }
	 #house-info-panel .input-group{
	 	width: 330px;
	 	padding-top: 5px;
	 }
</style>
</head>
<body class="no-skin" style="overflow: hidden;">
	
	<!-- /section:basics/navbar.layout -->
	<div class="main-container" id="main-container" style="position:absolute;width:100%; height:100%">
		<!-- /section:basics/sidebar -->
		<div id="mapDiv" style="position:absolute;z-index:0;width:100%; height:100%">
		</div>
		<!-- /.main-content -->	
		
		<div class="heading" id="map-search-data-toorbar">
			<button id="map-search-data-toorbar-djjc" type="button" class="btn btn-sm map-search-data-type">地基监测</button>  
	        <button id="map-search-data-toorbar-wfjd" type="button" class="btn btn-sm map-search-data-type">危房鉴定</button>
	        <button id="map-search-data-toorbar-fwcz" type="button" class="btn btn-sm map-search-data-type">房屋处置</button>

	        <button id="map-search-data-toorbar-fwgk" type="button" class="btn btn-sm">房屋概况</button>  
	        <button id="map-search-data-toorbar-sxgx" type="button" class="btn btn-sm">属性更新</button>  
	        <button id="map-search-data-toorbar-qlr" type="button" class="btn btn-sm">权利人</button>
	        <button id="map-search-data-toorbar-ckjdjg" type="button" class="btn btn-sm">查看鉴定结果</button>
	        <button id="map-search-data-toorbar-dcbg" type="button"  class="btn btn-sm">导出表格</button>	        
	        <button id="map-search-data-toorbar-close" type="button" class="btn btn-sm">关闭</button>   
        </div>  
		<div id="map-search-data-div" class="" style="z-index:999;position: absolute;bottom: 0px;left: 0px;right: 0px;display: none;">										
			<table id="map-search-data" style="background-color: rgba(242, 242, 242, 0.9);" class="table table-striped table-bordered table-hover no-border-top scrolltable">
			</table>		
		</div>
		<div id="map-search-ckfj-div" class="" style="z-index:999;position: absolute;bottom: 0px;left: 0px;right: 0px;display: none;">	
				<table id="map-search-ckfj" style="background-color: rgba(242, 242, 242, 0.9);" class="table table-striped table-bordered table-hover no-border-top scrolltable">
			</table>		
		</div>
		<!-- <div class="heading" id="householder-map-search-data-toorbar">  
	        <button id="" type="button" class="btn btn-sm">更新户</button>  
	        <button id="" type="button" class="btn btn-sm">删除户</button>   
	        <button id="" type="button" class="btn btn-sm">导出表格</button>  
	        <button id="householder-map-search-data-toorbar-close" type="button" class="btn btn-sm">关闭</button>   
        </div> 
		<div id="householder-map-search-data-div" class="" style="z-index:999;position: absolute;bottom: 0px;left: 0px;right: 0px;display: none;">					
			<table id="householder-map-search-data" style="opacity: 0.8;filter:alpha(opacity=70);" class="table table-striped table-bordered table-hover no-border-top">						  
			</table>					
		</div>	 -->
	</div>

	<!-- 主菜单工具栏 -->
	<div class="toolBar" id="toolBar" style="position:absolute;width:430px; height:70px;z-index:999; left:0px;top:0px">
		
		<div id="" class="sidebar h-sidebar" style="margin-top:0px;">
			<ul class="nav nav-list">
				<%--添加房屋--%>
				<li class="hover">
					<a href="javascript:void(0)" id="add-house-btn">
						<i class="menu-icon fa fa-tachometer"></i>
						<span class="menu-text">添加房屋</span>
					</a>
					<b class="arrow"></b>
				</li>

				<%--监测房屋--%>
				<li class="hover">
					<a href="#" class="dropdown-toggle">
						<i class="menu-icon fa fa-list-alt"></i>
						<span class="menu-text">监测房屋</span>
						<b class="arrow fa fa-angle-down"></b>
					</a>

					<b class="arrow"></b>
					<ul class="submenu">
						<li class="hover">
							<a href="javascript:void(0)" id="djjc-search-btn">
								<i class="menu-icon fa fa-caret-right"></i>
								地基监测
							</a>

							<b class="arrow"></b>
						</li>
						<!-- <li class="hover">
							<a href="javascript:void(0)" id="gjjc-search-btn">
								<i class="menu-icon fa fa-caret-right"></i>
								构件监测
							</a>

							<b class="arrow"></b>
						</li> -->
						<!-- <li class="hover">
							<a href="#">
								<i class="menu-icon fa fa-caret-right"></i>
								缝隙监测
							</a>

							<b class="arrow"></b>
						</li>
						<li class="hover">
							<a href="#">
								<i class="menu-icon fa fa-caret-right"></i>
								倾斜监测
							</a>

							<b class="arrow"></b>
						</li> -->
					</ul>
				</li>

				<li class="hover">
					<a href="#" class="dropdown-toggle">
						<i class="menu-icon fa fa-calendar"></i>
						<span class="menu-text">
							房屋鉴定
						</span>
						<b class="arrow fa fa-angle-down"></b>
					</a>

					<b class="arrow"></b>
						<ul class="submenu">
							<li class="hover">
								<a href="javascript:void(0)" id="fwjd-search-btn">
									<i class="menu-icon fa fa-caret-right"></i>
									查询定位
								</a>
							<b class="arrow"></b>
						</li>
						<!-- <li class="hover">
							<a href="#">
								<i class="menu-icon fa fa-caret-right"></i>
								地图定位
							</a>

							<b class="arrow"></b>
						</li> -->
					</ul>
				</li>

				<%--数据更新--%>
				 

				<li class="hover">
					<a class="dropdown-toggle" href="#">
						<i class="menu-icon fa fa-tag"></i>
						<span class="menu-text"> 危房处置 </span>
						<b class="arrow fa fa-angle-down"></b>
					</a>

					<b class="arrow"></b>
						<ul class="submenu">
							<li class="hover">
								<a href="javascript:void(0)" id="wfcz-search-btn">
									<i class="menu-icon fa fa-caret-right"></i>
									查询定位
								</a>

							<b class="arrow"></b>
						</li>
					<!-- 	<li class="hover">
							<a href="#">
								<i class="menu-icon fa fa-caret-right"></i>
								地图定位
							</a>

							<b class="arrow"></b>
						</li> -->
					</ul>
				</li>
				<li class="hover">
					<a class="dropdown-toggle" href="#">
						<i class="menu-icon fa fa-tag"></i>
						<span class="menu-text">危房查询</span>

						<b class="arrow fa fa-angle-down"></b>
					</a>

					<b class="arrow"></b>

						<ul class="submenu">
							<li class="hover">
								<a href="javascript:void(0)" class="condition-search-btn-class" id="condition-search-btn">
									<i class="menu-icon fa fa-caret-right"></i>
									条件查询
								</a>
							<b class="arrow"></b>
						</li>
						<!-- <li class="hover">
							<a href="javascript:void(0)" id="space-search-btn">
								<i class="menu-icon fa fa-caret-right"></i>
								空间查询
							</a>

							<b class="arrow"></b>
						</li> -->
				
					</ul>
				</li>
			</ul><!-- /.nav-list -->
		</div><!-- .sidebar -->

		<%--隐藏和show的按钮--%>
		<div style="position:absolute;right:0;top:0;width:30px; height:71px; opacity: 1;background-color: #FFFFFF;">
			<a href="javascript:void(0)" style="width:30px;height:71px;display:block;" id="show-or-hide-toolbar-btn">
				<img id="toolbar-hide-btn-img" src="static/images/map/hide.png"></img>
			</a>
		</div>
	</div>

	<!-- 图例 -->	
	<div class="" id="map-legend" style="opacity: 0.9;filter:alpha(opacity=90);;position:absolute;width:140px; height:200px;z-index:900; right:0px;bottom:0px">
		<button id="map-legend-btn" type="button" style="height: 35px;width: 140px;text-align: center;" class="btn">图例</button>						
		<div id="" class="sidebar">				
		   <%--待定--%>								
		   <div class="row" style="height: 20px;width: 180px;margin-top: 10px;">
			   <!-- <input class="col-xs-6 col-sm-2" checked="checked" type="checkbox" style="margin-left: 15px;height: 16px;"> -->
			   <span class="col-xs-6 col-sm-2"></span>
			   <img class="col-xs-6 col-sm-3" src="static/images/undetermined.png"></img>
			   <label class="col-xs-6 col-sm-4">待定</label>
		   </div>			 				

		   <%--A级--%>
		   <div class="row" style="height: 20px;width: 180px;margin-top: 10px;">
			   <span class="col-xs-6 col-sm-2"></span>
			   <img class="col-xs-6 col-sm-3" src="static/images/levelA.png"></img>
			   <label class="col-xs-6 col-sm-4">A级</label>
		   </div>
		   
		   <%--B级--%>
		   <div class="row" style="height: 20px;width: 180px;margin-top: 10px;">
			   <span class="col-xs-6 col-sm-2"></span>
			   <img class="col-xs-6 col-sm-3" src="static/images/levelB.png"></img>
			   <label class="col-xs-6 col-sm-4">B级</label>
		   </div>

		   <%--C级--%>
		   <div class="row" style="height: 20px;width: 180px;margin-top: 10px;">
			   <span class="col-xs-6 col-sm-2"></span>
			   <img class="col-xs-6 col-sm-3" src="static/images/levelC.png"></img>
			   <label class="col-xs-6 col-sm-4">C级</label>
		   </div>

		   <%--D级--%>
		   <div class="row" style="height: 20px;width: 180px;margin-top: 10px;">
			   <span class="col-xs-6 col-sm-2"></span>
			   <img class="col-xs-6 col-sm-3" src="static/images/levelD.png"></img>
			   <label class="col-xs-6 col-sm-4">D级</label>
		   </div>
		</div><!-- .sidebar -->
	</div>
	
	<!-- 查询工具栏 -->
	<div id="search-form-group" class="row" style="position:absolute;height:70px;z-index:999;left:40px;right:0px;top:0px;display: none;">					
		<form id="search-form-group-condition" class="form-inline search-form" role="form">
			<div class="well" style="margin-top: -10px;">
			   <div style="padding-right: 20px;" class="input-group">
					<label class="search-label">建造年代:</label>
					<select name="jznd" style="height: 25px;" class="selectpicker show-tick search-content">
					    <option></option>
					    <option>40年代及之前</option>
					    <option>50年代</option>
					    <option>60年代</option>
					    <option>70年代</option>
					    <option>80年代</option>
					    <option>90年代</option>
				    </select>
		 	   </div>
		 	   <div style="padding-right: 20px;" class="input-group">
		 	    	<label class="search-label">住房类别:</label>
					<select name="zflb" style="height: 25px;" class="selectpicker show-tick search-content">
					    <option></option>
					    <option>独门独院式</option>
					    <option>其他</option>
					    <option>联排式</option>
					    <option>公寓式</option>
				    </select>
		 	   </div>
		 	  <div style="padding-right: 20px;" class="input-group">
		 	  	   <label class="search-label">层数:</label>
		 	  	   <select name="cs" style="height: 25px;" class="selectpicker show-tick search-content">
					    <option></option>
					    <option>一层</option>
					    <option>两层</option>
					    <option>三层及以上</option>
				    </select>
		 	   </div>
		 	   <div style="padding-right: 20px;" class="input-group number-group">
		 	   	   <label class="search-label">间数:</label>
		 	  	   <input type="number" style="height: 25px;" class="number" name="js1">
		 	  	   <span>--</span>
		 	  	   <input type="number" style="height: 25px;" class="number" name="js2">
		 	   </div>
		 	   <div style="padding-right: 20px;" class="input-group number-group">
		 	   	   <label class="search-label">占地面积(㎡):</label>
		 	  	   <input type="number" style="height: 25px;" class="number" name="zdmj1">
		 	  	   <span>--</span>
		 	  	   <input type="number" style="height: 25px;" class="number" name="zdmj2">
		 	   </div>
<!-- 		 	   <div style="padding-right: 20px;" class="input-group number-group">
		 	       <label class="search-label">建筑面积(㎡):</label>
		 	  	   <input type="number" style="height: 25px;" class="number" name="jzmj1">
		 	  	   <span>--</span>
		 	  	   <input type="number" style="height: 25px;" class="number" name="jzmj2">
		 	   </div> -->
		 	   <div style="padding-right: 20px;" class="input-group">
		 	        <label class="search-label">住房使用情况:</label>
					<select name="zfsyqk" style="height: 25px;" class="selectpicker show-tick search-content">
					    <option></option>
					    <option>自用</option>
					    <option>空置</option>
					    <option>出租</option>
					    <option>被征用</option>
					    <option>其他</option>
				    </select>
		 	   </div>
		 	   <div style="padding-right: 20px;" class="input-group">
		 	   	   <label class="search-label">土地性质:</label>
					<select name="tdxz" style="height: 25px;" class="selectpicker show-tick search-content">
					    <option></option>
					    <option>国有</option>
					    <option>集体</option>
				    </select>
		 	   </div>
		 	   <div style="padding-right: 20px;" class="input-group">
		 	   	   <label class="search-label">乡镇街道:</label>
		 	  	   <input type="text" style="height: 25px;" class="search-content" name="xzjd">
		 	   </div>
		 	   <div style="padding-right: 20px;" class="input-group">
		 	   	   <label class="search-label">所属村:</label>
		 	  	   <input type="text" style="height: 25px;" class="search-content" name="ssc">
		 	   </div>		 	   		 	   
		 	   <div style="padding-right: 20px;" class="input-group">
		 	   		<label class="search-label">危险性等级:</label>
					<select name="wxxdj" style="height: 25px;" class="selectpicker show-tick search-content">
					    <option></option>
					    <option>待定</option>
					    <option>A</option>
					    <option>B</option>
					    <option>C</option>
					    <option>D</option>
				    </select>
		 	   </div>
		 	   <div style="padding-right: 20px;" class="input-group">
		 	   		<label class="search-label">门牌号:</label>
		 	  	   <input type="text" style="height: 25px;" class="search-content" name="mph">
		 	   </div>
<!-- 		 	   <div style="padding-right: 20px;width: 425px;" class="input-group">
		 	   		<label class="search-label">结构类型:</label>
		 	   		<select class="search-content" style="height: 25px;" id="" name="jglx" aria-invalid="false">
			 	   		<option value=""></option>
			 	   		<option value="茅草房">茅草房</option>
			 	   		<option value="泥草房">泥草房</option>
			 	   		<option value="土窑">土窑</option>
			 	   		<option value="土坯、夯土房（无立柱）">土坯、夯土房（无立柱）</option>
			 	   		<option value="砖、石等简易砌体结构（无砖柱、构造柱，无圈梁等）">砖、石等简易砌体结构（无砖柱、构造柱，无圈梁等）</option>
			 	   		<option value="竹木、木结构">竹木、木结构</option>
			 	   		<option value="砖木、石木、土木结构（木框架）">砖木、石木、土木结构（木框架）</option>
			 	   		<option value="砖混结构（有砖柱或构造柱，有圈梁等）">砖混结构（有砖柱或构造柱，有圈梁等）</option>
			 	   		<option value="钢筋混凝土结构">钢筋混凝土结构</option>
			 	   		<option value="轻钢结构">轻钢结构</option>
			 	   		<option value="其它结构">其它结构</option>
			 	   		<option value="砌体结构">砌体结构</option>
			 	   		<option value="混泥土结构">混泥土结构</option>
			 	   		<option value="木结构">木结构</option>
			 	   		<option value="钢结构">钢结构</option>
			 	   		<option value="围护结构">围护结构</option>
		 	   		</select>
		 	   </div> -->
		 	   <div style="padding-left:20px;margin-top: 5px;" class="input-group">
			 	   <button id="search-form-group-search-btn" name="btn" type="button" class="btn btn-sm btn-success form-group" value="">
						<span class="ace-icon fa fa-search icon-on-right bigger-100"></span>
						搜索
				   </button>
			   </div>
	 	  </div> 						
													
		</form>
		<div id="search-form-group-space" align="center" class="well search-form" style="height: 70px;">
			<div style="width: 50%;height: 70px;">
				<label class="col-sm-2">绘制方式：</label>
	            <ul class="nav col-sm-4" style="margin-left: -20px;">					    
				    <li title="点选" class="col-sm-2">											            
			            <img id="pointChoose" src="static/images/map/point.png">				            							
					</li>
					<li title="线选" class="col-sm-2">			    					    					        
			            <img id="lineChoose" src="static/images/map/line.png">				       
			        </li>
					<li title="多边形选" class="col-sm-2">					    					    
				        <img id="polygonChoose" src="static/images/map/polygon.png">				            
			        </li>
					<li title="矩形选" class="col-sm-2">					    					    
				        <img id="rectangleChoose" src="static/images/map/rectangle.png">				            	
			        </li>
					<li title="曲线选" class="col-sm-2">				   
				        <img id="curveChoose" src="static/images/map/curve.png">				            
			        </li>
					<li title="清除选择" class="col-sm-2">					    
				        <img id="cancel" src="static/images/map/cancel.png">				            
			        </li>					  
				</ul>
				<label style="text-align: right;margin-left: -15px;" class="col-sm-3">缓冲半径：</label>
                <input id="space-search-hcbj" name="hcbj" type="text" class="col-sm-1" value="1"/>
				<label style="text-align: left;" class="col-sm-1">米</label>
				<button id="search-form-group-space-search-btn" type="button" class="btn btn-sm">
					<span class="ace-icon fa fa-search icon-on-right bigger-110"></span>
					搜索
				</button>
			</div>
		</div>
		<div class="" style="position: absolute;right: 30px;top: 5px;">
			<button id="search-form-group-close" type="button" class="close" >
				&times;
			</button>
		</div>
	</div>
	
	<%--添加房屋的面板--%>
	<div class="widget-box widget-color-pink" id="house-info-panel" style="position:absolute;width:400px; height:90%;z-index:999; right:-400px;top:0px;">
		<div class="widget-header widget-header-small">
			<h6 class="widget-title">
				房屋信息
			</h6>
			<div class="widget-toolbar">
				<a href="javascript:void(0)" class="panel-close-icon">
					<i class="ace-icon fa fa-times"></i>
				</a>
			</div>
		</div>

		<div class="widget-body" style="">
			<div class="widget-main container" style="width:400px;overflow-y:scroll;">
				<div class="row">
					<div class="col-xs-12">
						<!-- PAGE CONTENT BEGINS -->
						<!-- 房屋基本信息表单 -->
						<form class="form-horizontal house-info-panel-form" style="max-height: 700px;overflow-y: scroll;" role="form" id="house-info-form">
							<!-- #section:elements.form -->
							<div class="input-group">
								<label class="col-xs-4 control-label no-padding-right" for="form-field-1">房屋编号</label>

								<div class="col-xs-8">
									<label class="form-control-static" id="house-info-no">0</label>
								</div>
							</div>

							<div class="input-group">
								<label class="col-xs-4 control-label no-padding-right">经纬度</label>

								<div class="col-xs-8">
									<label class="form-control-static" id="house-info-lat-lon"></label>
									<input type="hidden" name="x" id="house-info-lon"/>
									<input type="hidden" name="y" id="house-info-lat"/>
								</div>
							</div>

							<div class="input-group">
								<label class="col-xs-4 control-label no-padding-right field-required" for="house-info-build-year">建筑年代</label>
								<div class="col-xs-8">
									<select class="form-control" id="house-info-build-year" name="jznd">
										
									</select>
								</div>
							</div>

							<div class="input-group">
								<label class="col-xs-4 control-label no-padding-right" for="house-info-type">住房类别</label>

								<div class="col-xs-8">
									<select class="form-control" id="house-info-type" name="zflb">
										
									</select>
								</div>
							</div>

							<div class="input-group">
								<label class="col-xs-4 control-label no-padding-right field-required" for="house-info-floor-num">层数</label>
								<div class="col-xs-8">
									<select class="form-control" id="house-info-cs" name="cs">
										
									</select>								
								</div>
							</div>

							<div class="input-group">
								<label class="col-xs-4 control-label no-padding-right field-required" for="form-field-1-1">间数</label>
								<div class="col-xs-8">
									<input type="number" id="house-info-rooms-num" placeholder="请输入间数" class="col-xs-10 form-control" name="js"/>
								</div>
							</div>

							<div class="input-group">
								<label class="col-xs-4 control-label no-padding-right field-required" for="house-info-and-area">占地面积(㎡)</label>
								<div class="col-xs-8">
									<input type="number" id="house-info-land-area" placeholder="请输入占地面积" class="col-xs-10 form-control" name="zdmj"/>
								</div>
							</div>

							<div class="input-group">
								<label class="col-xs-4 control-label no-padding-right field-required" for="house-info-build-area">建筑面积(㎡)</label>
								<div class="col-xs-8">
									<input type="number" id="house-info-build-area" placeholder="请输入建筑面积" class="col-xs-10 form-control" name="jzmj"/>
								</div>
							</div>
							<div class="input-group">
								<label class="col-xs-4 control-label no-padding-right" for="house-info-use-situation">住房使用情况</label>

								<div class="col-xs-8">
									<select class="form-control" id="house-info-use-situation" name="zfsyqk">
										<option value=""></option>
										
									</select>
								</div>
							</div>

							<div class="input-group">
								<label class="col-xs-4 control-label no-padding-right" for="house-info-land-nature">土地性质</label>
								<div class="col-xs-8">
									<select class="form-control" id="house-info-land-nature" name="tdxz">
										<option value=""></option>
										
									</select>
								</div>
							</div>

							<div class="input-group">
								<label class="col-xs-4 control-label no-padding-right">乡镇街道</label>
								<div class="col-xs-8">
									<label class="form-control-static" id="house-info-street"></label>
									<input type="hidden" id="house-info-street-name" name="xzjd"/>
								</div>
							</div>

							<div class="input-group">
								<label class="col-xs-4 control-label no-padding-right" for="house-info-village">所属村</label>
								<div class="col-xs-8">
									<label class="form-control-static" id="house-info-village"></label>
									<input type="hidden" id="house-info-village-name" name="ssc"/>
									<input type="hidden" id="house-info-village-id" name="villageId"/>
								</div>
							</div>

							<div class="input-group">
								<label class="col-xs-4 control-label no-padding-right" for="house-info-houseNo">门牌号</label>

								<div class="col-xs-8">
									<input type="number" id="house-info-houseNo" placeholder="" class="col-xs-10 form-control" name="mph" />
								</div>
							</div>

							<div class="input-group">
								<label class="col-xs-4 control-label no-padding-right" for="house-info-structure-type">结构类型</label>

								<div class="col-xs-8">
									<select class="form-control" id="house-info-structure-type" name="jglx">
										<option value=""></option>
									</select>
								</div>
							</div>

							<div class="input-group">
								<label class="col-xs-4 control-label no-padding-right" for="house-info-danger-level">危险性等级</label>

								<div class="col-xs-8">
									<label class="form-control-static" id="house-info-village">待定</label>
								</div>
							</div>

							<div class="input-group">
								<label class="col-xs-4 control-label no-padding-right" for="form-field-1-1">房产证</label>

								<div class="col-xs-8">
									<input type="text" id="house-info-certificates-no" placeholder="请输入房产证号" class="form-control col-xs-10" name="fcz"/>
									
								</div>
							</div>
							<div class="input-group">
								<label class="col-xs-4 control-label no-padding-right" for="form-field-1-1">用地手续</label>
								<div class="col-xs-8">
									<select class="form-control" id="" name="ydsx">
										<option>有</option>
										<option>无</option>
									</select>								
								</div>
							</div>
							<div class="input-group">
								<label class="col-xs-4 control-label no-padding-right" for="form-field-1-1">规划建设手续</label>
								<div class="col-xs-8">
									<select class="form-control" id="" name="ghjssx">
										<option>有</option>
										<option>无</option>
									</select>								
								</div>
							</div>
							<div class="validate-tips">
								<label class="validate-tips-label"></lebel>
							</div>
							<div class="clearfix">
								<div class="col-md-12" style="display: flex;justify-content: space-around;">
									<button class="btn btn-sm btn-info save-house-btn" type="submit" style="padding-right: 4px;">
										<i class="ace-icon fa fa-check bigger-110"></i>确定</button>									
									<button class="btn btn-sm" type="reset">
										<i class="ace-icon fa fa-undo bigger-110"></i>重置</button>
								</div>
							</div>								
						</form>
						<!-- 地址信息表单 -->
						<form class="form-horizontal house-info-panel-form" role="form" id ="house-info-panel-form-address" style="display: none;">
							<div style="text-align: center;" class="input-group">
								<label class="col-sm-4 control-label no-padding-right">房屋编号:</label>
								<input class="col-sm-8" style="height:26px" type="text" name = "bh" class="form-control" readonly="readonly"> 
							</div>
							<div style="" class="input-group">
								<label class="col-sm-4 control-label no-padding-right">省（自治区、直辖市）:</label>
								<select class="col-sm-7 form-control" style="width: 220px;" id="" name="province">
								</select>
							</div>
							<div style="" class="input-group">
								<label class="col-sm-4 control-label no-padding-right">地区（市、州、盟）:</label>
								<select class="col-sm-7 form-control" style="width: 220px;" id="" name="shi">
								</select>
							</div>
							<div style="" class="input-group">
								<label class="col-sm-4 control-label no-padding-right">县（市、区、旗）:</label>
								<select class="col-sm-7 form-control" style="width: 220px;" id="" name="xian">
								</select>
							</div>
							<div style="" class="input-group">
								<label class="col-sm-4 control-label no-padding-right">乡镇街道:</label>
								<input class="col-sm-8" style="height:26px" name = "xzjd" type="text" class="form-control" >
							</div>
							<div style="" class="input-group">
								<label class="col-sm-4 control-label no-padding-right">所属村:</label>
								<input class="col-sm-8" style="height:26px" name = "ssc" type="text" class="form-control" >
							</div>
							<div class="clearfix" style="margin-top: 5px;">
								<div class="col-md-12" style="display: flex;justify-content: space-around;">
									<button class="btn btn-sm btn-info" type="submit" style="padding-right: 4px;">确定</button>									
								</div>
							</div>
						</form>
						<!-- 权利人表单 -->
						<form class="form-horizontal house-info-panel-form" role="form" id ="house-info-panel-form-qlr" style="display: none;">
							<div style="text-align: center;" class="input-group">
								<label class="col-sm-4 control-label no-padding-right">房屋编号:</label>
								<input class="col-sm-8" style="height:26px" type="text" name = "bh" class="form-control" readonly="readonly"> 
							</div>
							<div style="text-align: center;" class="input-group">
								<label class="col-sm-4 control-label no-padding-right">户主:</label>
								<input class="col-sm-8" style="height:26px" name = "name" type="text" class="form-control">
							</div>
							<div style="text-align: center;" class="input-group">
								<label class="col-sm-4 control-label no-padding-right">身份证号:</label>
								<input class="col-sm-8" style="height:26px" name = "identity" type="text" class="form-control" >
							</div>
							<div style="text-align: center;" class="input-group">
								<label class="col-sm-4 control-label no-padding-right">联系电话:</label>
								<input class="col-sm-8" style="height:26px" name = "phonenum" type="number" class="form-control" >
							</div>
						 	<div style="" class="input-group">
								<label class="col-sm-4 control-label no-padding-right">家庭人数:</label>
								<input class="col-sm-8" style="height:26px" name = "familynum" type="number" class="form-control" >
							</div>
							<div style="" class="input-group">
								<label class="col-sm-4 control-label no-padding-right">民族:</label>
								<select class="col-sm-7 form-control" style="width: 220px;" id="" name="mz">
								</select>
							</div>
							<div style="" class="input-group">
								<label class="col-sm-4 control-label no-padding-right">经济条件类型:</label>
								<select class="col-sm-8 form-control" style="width: 220px;" id="" name="jjtjlx">
								</select>
							</div>
							<div style="" class="input-group">
								<label class="col-sm-4 control-label no-padding-right">年人均纯收入:</label>
								<input class="col-sm-8" style="height:26px" name = "nrjcsr" type="number" class="form-control" >
							</div>
							<div style="" class="input-group">
								<label class="col-sm-4 control-label no-padding-right">拥有住房套数:</label>
								<input class="col-sm-8" style="height:26px" name = "yyzfts" type="number" class="form-control" >
							</div>
							<div class="clearfix" style="margin-top: 5px;">
								<div class="col-md-12" style="display: flex;justify-content: space-around;">
									<button class="btn btn-sm btn-info" type="submit" style="padding-right: 4px;">确定</button>									
								</div>
							</div>
						</form>
						<!-- 房屋设施表单 -->
						<form class="form-horizontal house-info-panel-form" role="form" id ="house-info-panel-form-fwss" style="display: none;">
							<div style="text-align: center;" class="input-group">
								<label class="col-sm-5 control-label no-padding-right">房屋编号:</label>
								<input class="col-sm-7" style="height:26px" type="text" name = "bh" class="form-control" readonly="readonly"> 
							</div>
							<div style="" class="input-group">
								<label class="col-sm-5 control-label no-padding-right">自来水是否入户:</label>
								<select class="col-sm-7 form-control" style="width: 192px;" id="" name="zlsrh">
								</select>
							</div>
							<div style="" class="input-group">
								<label class="col-sm-5 control-label no-padding-right">生活污水排放方式:</label>
								<select class="col-sm-7 form-control" style="width: 192px;" id="" name="wspf">
								</select>
							</div>
							<div style="" class="input-group">
								<label class="col-sm-5 control-label no-padding-right">有无独立厢房:</label>
								<select class="col-sm-7 form-control" style="width: 192px;" id="" name="ywdlxf">
								</select>
							</div>
							<div style="" class="input-group">
								<label class="col-sm-5 control-label no-padding-right">有无卫生厕所:</label>
								<select class="col-sm-7 form-control" style="width: 192px;" id="" name="ywwscs">
								</select>
							</div>
							<div class="clearfix" style="margin-top: 5px;">
								<div class="col-md-12" style="display: flex;justify-content: space-around;">
									<button class="btn btn-sm btn-info" type="submit" style="padding-right: 4px;">确定</button>									
								</div>
							</div>
						</form>
						<!-- 鉴定表单 -->
 						<form class="form-horizontal house-info-panel-form" role="form" id ="house-info-panel-form-jdbd" style="display: none;">
							<div style="text-align: center;" class="input-group">
								<label class="col-sm-4 control-label no-padding-right">房屋编号:</label>
								<input class="col-sm-8" style="height:26px" type="text" name = "bh" class="form-control" readonly="readonly"> 
							</div>
							<div style="" class="input-group">
								<label class="col-sm-4 control-label no-padding-right">鉴定日期:</label>
								<input class="col-sm-8 date-picker" name="date" id="" type="text" data-date-format="yyyy-mm-dd" style="height:26px;" placeholder="请输入鉴定时间" />
							</div>
							<div style="" class="input-group">
								<label class="col-sm-4 control-label no-padding-right">鉴定机构:</label>
								<input class="col-sm-8" style="height:26px" id="" name = "company" type="text" class="form-control" >
							</div>
							<div style="" class="input-group">
								<label class="col-sm-4 control-label no-padding-right">鉴定人:</label>
								<input class="col-sm-8" style="height:26px" id="" name = "identifier" type="text" class="form-control" >
							</div>
							<div style="" class="input-group">
								<label class="col-sm-4 control-label no-padding-right">鉴定等级:</label>
								<select name="level" id="" style="height: 25px;width:220px" class="col-sm-8 form-control selectpicker show-tick search-content">
								    <option>A</option>
								    <option>B</option>
								    <option>C</option>
								    <option>D</option>
						   		</select>
							</div>
							<div style="" class="input-group">
								<label class="col-sm-4 control-label no-padding-right">上传照片:</label>
								<input class="col-sm-8" style="height:26px" id="" name="fileupload" size="30"  multiple="multiple" type="file" class="form-control">
							</div>
							<div class="clearfix" style="margin-top: 5px;">
								<div class="col-md-12" style="display: flex;justify-content: space-around;">
									<button class="btn btn-sm btn-info" type="submit" style="padding-right: 4px;">确定</button>									
								</div>
							</div>					
						</form>
						<!-- 资金情况 -->
						<form class="form-horizontal house-info-panel-form" role="form" id ="house-info-panel-form-fund" style="display: none;">
							<div style="text-align: center;" class="input-group">
								<label class="col-sm-5 control-label no-padding-right">房屋编号:</label>
								<input class="col-sm-7" style="height:26px" type="text" name = "bh" class="form-control" readonly="readonly"> 
							</div>
							<div style="" class="input-group">
								<label class="col-sm-5 control-label no-padding-right">享受补助资金类型:</label>
								<select class="col-sm-7 form-control" style="width: 192px;" id="" name="bzzjlx">
								</select>
							</div>
							<div style="text-align: center;" class="input-group">
								<label class="col-sm-5 control-label no-padding-right">总投资:</label>
								<input class="col-sm-7" style="height:26px" type="text" name = "ztz" class="form-control" > 
							</div>
							<div style="text-align: center;" class="input-group">
								<label class="col-sm-5 control-label no-padding-right">各级政府补助资金:</label>
								<input class="col-sm-7" style="height:26px" type="text" name = "zfbzzj" class="form-control" > 
							</div>
							<div style="text-align: center;" class="input-group">
								<label class="col-sm-5 control-label no-padding-right">对口援疆补助资金:</label>
								<input class="col-sm-7" style="height:26px" type="text" name = "yjbzzj" class="form-control" > 
							</div>
							<div style="text-align: center;" class="input-group">
								<label class="col-sm-5 control-label no-padding-right">危房改造贷款:</label>
								<input class="col-sm-7" style="height:26px" type="text" name = "wfgzdk" class="form-control" > 
							</div>
							<div style="text-align: center;" class="input-group">
								<label class="col-sm-5 control-label no-padding-right">其他自筹资金:</label>
								<input class="col-sm-7" style="height:26px" type="text" name = "zczj" class="form-control" > 
							</div>
						</form>
						<!-- 其他表单 -->
						<form class="form-horizontal house-info-panel-form" role="form" id ="house-info-panel-form-qt" style="display: none;">
							<div style="text-align: center;" class="input-group">
								<label class="col-sm-5 control-label no-padding-right">房屋编号:</label>
								<input class="col-sm-7" style="height:26px" type="text" name = "bh" class="form-control" readonly="readonly"> 
							</div>
							<div style="text-align: center;" class="input-group">
								<label class="col-sm-5 control-label no-padding-right">档案系统编号:</label>
								<input class="col-sm-7" style="height:26px" type="text" name = "daxtbh" class="form-control" > 
							</div>
							<div style="" class="input-group">
								<label class="col-sm-5 control-label no-padding-right">档案锁定状态:</label>
								<select class="col-sm-7 form-control" style="width: 190px;" id="" name="dasdzt">
								</select>
							</div>
							<div style="text-align: center;" class="input-group">
								<label class="col-sm-5 control-label no-padding-right">人均主房建筑面积（除以家庭人数）:</label>
								<input class="col-sm-7" style="height:26px;width: 190px;margin-top: 15px;margin-left: 2px;" type="text" name = "rjmj" class="form-control" > 
							</div>
							<div style="" class="input-group">
								<label class="col-sm-5 control-label no-padding-right">是否标记“十三五”任务:</label>
								<select class="col-sm-7 form-control" style="width: 190px;margin-top: 15px;margin-left: 2px;" id="" name="sfsswrw">
								</select>
							</div>
							<div style="" class="input-group">
								<label class="col-sm-5 control-label no-padding-right">是否标记建档立卡贫困户危改任务:</label>
								<select class="col-sm-7 form-control" style="width: 190px;margin-top: 15px;margin-left: 2px;" id="" name="sfwgrw">
								</select>
							</div>
							<div class="clearfix" style="margin-top: 5px;">
								<div class="col-md-12" style="display: flex;justify-content: space-around;">
									<button class="btn btn-sm btn-info" type="submit" style="padding-right: 4px;">确定</button>									
								</div>
							</div>
						</form>
						
					</div>
				</div>
			</div>
			<!-- 遮罩 -->
			<div class="house-panel-overlay" style="position:absolute;top:32px;display:none; justify-content:center; align-items:center; opacity:0.8; width:100%; height:100%; background-color:#FFFFFF">
				<div>
					<p>正在处理中...</P>
				</div>
			</div>
		</div>
	    <div class="btn-group" style="width:400px;background-color:#FFF">
	    	<div class="" align="center">
			 	<button id="house-info-panel-base" type="button" class="btn btn-sm btn-success">基本信息</button> 
			 	<button id="house-info-panel-address" type="button" class="btn btn-sm btn-success">地址信息</button> 
		        <button id="house-info-panel-qlr" type="button" class="btn btn-sm btn-success">权利人</button>
		        <button id="house-info-panel-fwss" type="button" class="btn btn-sm btn-success">房屋设施</button> 				
				 
	        </div>
	        <div class="" style="padding-top: 10px;" align="center">
	       	    <button id="house-info-panel-jdb" type="button" class="btn btn-sm btn-success">鉴定表</button>
	       	    <button id="house-info-panel-fund" type="button" class="btn btn-sm btn-success">资金情况</button>
		        <button id="house-info-panel-qt" type="button" class="btn btn-sm btn-success">其他</button>      	       	    
		        
	        </div>
		</div>
	</div>


	<!-- 地基监测的模态框 -->
	<div class="modal fade" id="settlement-monitor-dialog" style="height: 800px;" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content" style="width: 670px;">
				<div class="modal-header" style="padding: 10px;">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h5 class="modal-title" id="myModalLabel">地基监测</h5>
				</div>
				<div class="modal-body" style="hieght:800px;">
					<!-- <div class="widget-body" style="width:160px;">
						<div class="widget-main padding-8">
							<ul id="settlement-monitor-tree"></ul>
						</div>
					</div> -->
					<div id="settlement-monitor-table" style="margin-top: -20px;">
						<div class="heading btn-group" id="settlement-monitor-data-toorbar">				         
					        <button id="settlement-monitor-toorbar-add" type="button" class="btn btn-sm">添加观察点</button>
					        <button id="settlement-monitor-toorbar-chart" type="button" class="btn btn-sm">图表</button>  							    
				        </div>
						<div id="settlement-monitor-data-div" class="settlemrnt-ob-data">
							<table id="settlement-monitor-data" style="background-color: rgba(242, 242, 242, 0.9);" class="table table-striped table-bordered table-hover no-border-top">						
							</table>
						</div>						
						<div id="settlement-monitor-data-detail-div" class="settlemrnt-ob-data">
							<table id="settlement-monitor-data-detail" style="background-color: rgba(242, 242, 242, 0.9);" class="table table-striped table-bordered table-hover no-border-top">						
							</table>
						</div>
					</div>
					<div id="settlement-monitor-chart" style="display: none;">
						<div class="btn-group">
							<button id="settlement-monitor-chart-wy" type="button" class="btn btn-sm">侧向位移</button>  
					        <button id="settlement-monitor-chart-cj" type="button" class="btn btn-sm">沉降趋势</button>  
					        <button id="settlement-monitor-chart-ywy" type="button" class="btn btn-sm">月侧向位移速率</button> 
					        <button id="settlement-monitor-chart-rwy" type="button" class="btn btn-sm">日侧向位移速率</button> 
					        <button id="settlement-monitor-chart-ycj" type="button" class="btn btn-sm">月沉降速率</button> 
					        <button id="settlement-monitor-chart-rcj" type="button" class="btn btn-sm">日沉降速率</button> 
					        <button id="back" type="button" class="btn btn-sm">返回表格</button>
						</div>
						<div id="chart-div" style="height: 300px;margin-top: 15px;"></div>
					</div>					
				</div>
				<div class="modal-footer">
					<!-- <button type="button" class="btn btn-default btn-xs" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary btn-xs">提交更改</button> -->
				</div>
			</div><!-- /.modal-content -->
		</div><!-- /.modal -->
	</div>
	<!-- 添加观察点 -->
	<div class="modal fade" id="settlement-monitor-gcdgx-dialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header" style="padding: 10px;">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					<h5 class="modal-title" id="myModalLabel">观察点</h5>
				</div>
				<div class="modal-body" style="hieght:800px;">
					<form role="form" id="add-settlement-form" class="form-horizontal">
				        <!-- #section:elements.form -->
				        <input type="hidden" name="id" class="form-control" id=""/>				        
				        <div class="form-group">
				            <label class="col-xs-4 control-label no-padding-right" for="form-field-1">房屋ID</label>
				            <div class="col-xs-8">
				                <input type="text" name="houseId" disabled="disabled" class="col-xs-8 form-control" id="add-settlement-form-houseId"/>
				            </div>
				        </div>
				
				        <div class="form-group">
				            <label class="col-xs-4 control-label no-padding-right field-required" for="form-field-1">名称</label>
				            <div class="col-xs-8">
				                <input type="text" required aria-invalid="true" placeholder="请输入观察点名称" class="col-xs-8 form-control" name="name" />
				            </div>
				        </div>
				
				        <div class="form-group">
				            <label class="col-xs-4 control-label no-padding-right field-required" for="form-field-1">观测点横坐标(米)</label>
				            <div class="col-xs-8">
				                <input type="number" required placeholder="请输入横坐标" class="col-xs-8 form-control" name="positionX" />
				            </div>
				        </div>
				
				        <div class="form-group">
				            <label class="col-xs-4 control-label no-padding-right field-required" for="form-field-1">观测点纵坐标(米)</label>
				            <div class="col-xs-8">
				                <input type="number" required placeholder="请输入纵坐标" class="col-xs-8 form-control" name="positionY" />
				            </div>
				        </div>
				
				        <div class="form-group">
				            <label class="col-xs-4 control-label no-padding-right field-required" for="form-field-1">高程(米)</label>
				            <div class="col-xs-8">
				                <input type="number" required placeholder="请输入高程" class="col-xs-8 form-control" name="elevation" />
				            </div>
				        </div>
				        <div class="form-group">
				            <label class="col-xs-4 control-label no-padding-right" for="form-field-1">记录人</label>
				            <div class="col-xs-8">
				                <input type="text" placeholder="请输入记录人" class="col-xs-8 form-control" name="jlr" />
				            </div>
				        </div>	
				    </form>
				</div>
				<div class="modal-footer" style="text-align: center;">
					<button class="btn btn-info btn-sm" type="submit" id="settlement-add-points-btn">
	                    <i class="ace-icon fa fa-check bigger-110"></i> 确定
	                </button>
	                <button type="button" class="btn btn-info btn-sm" data-dismiss="modal">
	                	<i class="ace-icon fa fa-times bigger-110"></i> 关闭
	                </button>
				</div>
			</div><!-- /.modal-content -->
		</div><!-- /.modal -->
	</div>

<!-- 房屋鉴定~危房鉴定-->

<div class="modal fade" id="account-Manager-add-dialog-wfjd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog" style="width:360px;margin-top:68px;margin-left:0px">
		<div class="modal-content">
			<div class="modal-header" style="text-align:center;font-size:12px">
				<button type="button" class="close" data-dismiss="modal" id="wfjd-close" aria-hidden="true">&times;</button> 
				<h5 class="modal-title" id="">危房鉴定</h5>
			</div>
			<div class="modal-body" style="height: 80%;margin-right:10px">
				<form class="form-horizontal" role="form" id ="form-wfjd" enctype="multipart/form-data">
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">编号:</label>
						<input class="col-sm-6" style="height:26px" type="text" name = "bh" id="bh" class="form-control" readonly="readonly"> 
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5 field-required">鉴定日期:</label>
						<input class="col-sm-6 date-picker" name="date" id="date" type="text" data-date-format="yyyy-mm-dd" style="height:26px;" placeholder="请输入鉴定时间" required/>              
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5 field-required">鉴定机构:</label>
						<input class="col-sm-6" required style="height:26px" id="company" name = "company" type="text" class="form-control" required>
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5 field-required">鉴定人:</label>
						<input class="col-sm-6" style="height:26px" id="identifier" name = "identifier" type="text" class="form-control" required>
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5 field-required">鉴定等级:</label>
						<select name="level" id="level" style="height: 26px;width:171px;" class="form-control" required>
						    <option value="">==请选择==</option>
						    <option>A</option>
						    <option>B</option>
						    <option>C</option>
						    <option>D</option>
				   		</select>
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">上传照片:</label>
						<input class="col-sm-6" style="height:26px" id="fileupload" name="fileupload" size="30"  multiple="multiple" type="file" class="form-control">
					</div>	
					<!-- <div style="text-align: center;display:none" class="form-group">
						<label class="col-sm-6">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态:</label>
						<input class="col-sm-6" style="height:26px" id="zt" name="zt" size="30"  multiple="multiple" type="txt" class="form-control" val="1">
					</div> -->
					
					<div class="modal-footer" style="text-align:center;background:white;">
 						<button type="submit" class="btn btn-sm btn-info" id="wfjd-save-submit">保存</button>	
			        </div>
				</form>
			</div>	
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

	
<!-- 房屋鉴定~房屋概况 -->
  <div class="modal fade" id="account-Manager-add-dialog-wffwgk" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog" style="width:360px;margin-top:68px;margin-left:0px">
		<div class="modal-content">
			<div class="modal-header" style="text-align:center;font-size:12px">
				<button type="button" class="close" data-dismiss="modal" id="wffwgk-close" aria-hidden="true">&times;</button> 
				<h5 class="modal-title" id="">房屋概况</h5>
			</div>
			<div class="modal-body" style="height: 100%;margin-right:10px">
				<form class="form-horizontal" role="form" id ="form-wffwgk">
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">编号:</label>
						<input class="col-sm-6" style="height:26px" type="text" id="bh" name ="bh" class="form-control" readonly="readonly"> 
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">住房类型:</label>
						<input class="col-sm-6" style="height:26px" name = "zflb" type="text" class="form-control" readonly="readonly">
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">层数:</label>
						<input class="col-sm-6" style="height:26px" type="text" name = "cs" class="form-control" readonly="readonly">
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">建筑面积（㎡）:</label>
						<input class="col-sm-6" style="height:26px" type="text" name = "jzmj" class="form-control" readonly="readonly">
					</div>
				  
				    <div style="text-align: right;" class="form-group">
						<label class="col-sm-5">间数:</label>
						<input class="col-sm-6" style="height:26px" type="text" name = "js" class="form-control" readonly="readonly">
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">占地面积（㎡）:</label>
						<input class="col-sm-6" style="height:26px" type="text" name = "zdmj" class="form-control" readonly="readonly">
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">住房使用情况:</label>
						<input class="col-sm-6" style="height:26px" type="text" name = "zfsyqk" class="form-control" readonly="readonly"> 
					</div>
					
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">乡镇街道:</label>
						<input class="col-sm-6" style="height:26px" name = "xzjd" type="text" class="form-control" readonly="readonly">
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">所属村:</label>
						<input class="col-sm-6" style="height:26px" name = "ssc" type="text" class="form-control" readonly="readonly">
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">门牌号:</label>
						<input class="col-sm-6" style="height:26px" name = "mph" type="text" class="form-control" readonly="readonly">
					</div>
					
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">房证:</label>
						<input class="col-sm-6" style="height:26px" name = "fcz" type="text" class="form-control" readonly="readonly">
					</div>
	 
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" id="history-photos-display">房屋照片</button>	
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
<!-- 房屋鉴定~属性更新-->
  <div class="modal fade" id="account-Manager-add-dialog-sxgx" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog" style="width:360px;margin-top:68px;margin-left:0px">
		<div class="modal-content">
			<div class="modal-header" style="text-align:center;font-size:12px">
				<button type="button" class="close" data-dismiss="modal" id="sxgx-close" aria-hidden="true">&times;</button> 
				<h5 class="modal-title" id="">属性更新</h5>
			</div>
			<div class="modal-body" style="height: 100%;margin-right:10px">
				<form class="form-horizontal" role="form" id ="form-sxgx">
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">编号:</label>
						<input class="col-sm-6" style="height:26px" type="text" name = "bh" class="form-control" readonly="readonly"> 
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">住房类型:</label>
						<input class="col-sm-6" style="height:26px" name = "zflb" type="text" class="form-control" >
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">层数:</label>
						<input class="col-sm-6" style="height:26px" type="text" name = "cs" class="form-control" >
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">建筑面积（㎡）:</label>
						<input class="col-sm-6" style="height:26px" type="text" name = "jzmj" class="form-control">
					</div>
				  
				    <div style="text-align: right;" class="form-group">
						<label class="col-sm-5">间数:</label>
						<input class="col-sm-6" style="height:26px" type="text" name = "js" class="form-control" >
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">占地面积（㎡）:</label>
						<input class="col-sm-6" style="height:26px" type="text" name = "zdmj" class="form-control" >
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">住房使用情况:</label>
						<input class="col-sm-6" style="height:26px" type="text" name = "zfsyqk" class="form-control"> 
					</div>
					
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">乡镇街道:</label>
						<input class="col-sm-6" style="height:26px" name = "xzjd" type="text" class="form-control" >
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">所属村:</label>
						<input class="col-sm-6" style="height:26px" name = "ssc" type="text" class="form-control" >
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">门牌号:</label>
						<input class="col-sm-6" style="height:26px" name = "mph" type="text" class="form-control" >
					</div>
					
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">房产证:</label>
						<input class="col-sm-6" style="height:27px" name = "fcz" type="text" class="form-control">
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">结构类型:</label>
						<!-- <input class="col-sm-6" style="height:26px" name = "jglx" type="text" class="form-control" > -->
						<select style="height: 26px;width:171px" id="" name="jglx" class="form-control" >
				 	   		<option value=""></option>
				 	   		<option value="茅草房">茅草房</option>
				 	   		<option value="泥草房">泥草房</option>
				 	   		<option value="土窑">土窑</option>
				 	   		<option value="土坯、夯土房（无立柱）">土坯、夯土房（无立柱）</option>
				 	   		<option value="砖、石等简易砌体结构（无砖柱、构造柱，无圈梁等）">砖、石等简易砌体结构（无砖柱、构造柱，无圈梁等）</option>
				 	   		<option value="竹木、木结构">竹木、木结构</option>
				 	   		<option value="砖木、石木、土木结构（木框架）">砖木、石木、土木结构（木框架）</option>
				 	   		<option value="砖混结构（有砖柱或构造柱，有圈梁等）">砖混结构（有砖柱或构造柱，有圈梁等）</option>
				 	   		<option value="钢筋混凝土结构">钢筋混凝土结构</option>
				 	   		<option value="轻钢结构">轻钢结构</option>
				 	   		<option value="其它结构">其它结构</option>
				 	   		<option value="砌体结构">砌体结构</option>
				 	   		<option value="混泥土结构">混泥土结构</option>
				 	   		<option value="木结构">木结构</option>
				 	   		<option value="钢结构">钢结构</option>
				 	   		<option value="围护结构">围护结构</option>
		 	   		    </select>
					</div>
		 			<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">权利人:</label>
						<input class="col-sm-6" style="height:26px" name = "name" type="text" class="form-control">
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">身份证号:</label>
						<input class="col-sm-6" style="height:26px" name = "identity" type="text" class="form-control" >
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">电话号码:</label>
						<input class="col-sm-6" style="height:26px" name = "phonenum" type="text" class="form-control" >
					</div>
					
					<div class="modal-footer" style="text-align: center;margin-left:30px;background:white;">
						<button type="button" id="submit-sxgx-save" class="btn btn-primary ">保存</button>				
					</div>
				</form>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

<!-- 房屋鉴定~权利人 -->
  <div class="modal fade" id="account-Manager-add-dialog-qlr" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog" style="width:360px;margin-top:68px;margin-left:0px">
		<div class="modal-content">
			<div class="modal-header" style="text-align:center;font-size:12px">
				<button type="button" class="close" data-dismiss="modal" id="qlr-close" aria-hidden="true">&times;</button> 
				<h5 class="modal-title" id="">权利人</h5>
			</div>
			<div class="modal-body" style="height: 100%;margin-right:10px">
				<form class="form-horizontal" role="form" id ="form-qlr">
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">编号:</label>
						<input class="col-sm-6" style="height:26px" type="text" name = "bh" class="form-control" readonly="readonly"> 
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">户主:</label>
						<input class="col-sm-6" style="height:26px" name = "name" type="text" class="form-control" readonly="readonly">
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">身份证号:</label>
						<input class="col-sm-6" style="height:26px" name = "identity" type="text" class="form-control" readonly="readonly">
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">联系电话:</label>
						<input class="col-sm-6" style="height:26px" name = "phonenum" type="text" class="form-control" readonly="readonly">
					</div>
				 
				</form>
			</div>

		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
 
 <!-- 房屋鉴定~鉴定结果 -->
  <div class="modal fade" id="account-Manager-add-dialog-ckjdjg" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog" style="width:360px;margin-top:68px;margin-left:0px">
		<div class="modal-content">
			<div class="modal-header" style="text-align:center;font-size:12px">
				<button type="button" class="close" data-dismiss="modal" id="ckjdjg-close" aria-hidden="true">&times;</button> 
				<h5 class="modal-title" id="">房屋鉴定结果</h5>
			</div>
			<div class="modal-body" style="height: 100%;margin-right:10px">
				<form class="form-horizontal" role="form" id ="form-ckjdjg">
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">编号:</label>
						<input class="col-sm-6" style="height:26px" type="text" name = "bh" id="house_code" class="form-control" readonly="readonly"> 
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">鉴定日期:</label>
						 <input class="col-sm-6" style="height:26px" name = "date" type="text" class="form-control" readonly="readonly">
				</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">鉴定机构:</label>
						<input class="col-sm-6" style="height:26px" name = "company" type="text" class="form-control" readonly="readonly">
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">鉴定人:</label>
						<input class="col-sm-6" style="height:26px" name = "identifier" type="text" class="form-control" readonly="readonly">
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">鉴定等级:</label>
						<input class="col-sm-6" style="height:26px" name = "level" type="text" class="form-control" readonly="readonly">
					</div>
					<div class="modal-footer" style="text-align: center;margin-left:30px;background:white;">
						<button type="button" id="form-horizontal-ckfj" class="btn btn-sm">查看附件</button>	
					</div>
				</form>
			</div>

		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
 <!-- 查看附件的模态框 -->
<div class="modal fade" id="House-Manager-ckfj-dialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
		<div class="modal-dialog" style="width: 450px;margin-top:68px;margin-left:0px; ">
				<div class="modal-content" id="House--ckfj-data-div">
				<div class="modal-header" style="text-align:center;font-size:12px">
				<button type="button" class="close" data-dismiss="modal" id="ckjdjg-close" aria-hidden="true">&times;</button> 
				<h5 class="modal-title" id="">附件管理</h5>
			</div>
			<table id="House--ckfj-data"  style="background-color: rgba(242, 242, 242, 0.9);" class="table table-striped table-bordered table-hover no-border-top scrolltable">
			</table>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
<!-- 房屋鉴定~房屋处置 -->
  <div class="modal fade" id="account-Manager-add-dialog-fwcz" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog" style="width:360px;margin-top:68px;margin-left:0px">
		<div class="modal-content">
			<div class="modal-header" style="text-align:center;font-size:12px">
				<button type="button" class="close" data-dismiss="modal" id="fwcz-close" aria-hidden="true">&times;</button> 
				<h5 class="modal-title" id="">危房处置</h5>
			</div>
			<div class="modal-body" style="height: 100%;margin-right:10px">
				<form class="form-horizontal" role="form" id ="form-fwcz">
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">编号:</label>
						<input class="col-sm-6" style="height:26px" type="text" name = "bh" class="form-control" readonly="readonly"> 
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">住房类型:</label>
						<input class="col-sm-6" style="height:26px" name = "zflb" type="text" class="form-control" readonly="readonly">
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">层数:</label>
						<input class="col-sm-6" style="height:26px" type="text" name = "cs" class="form-control" readonly="readonly">
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">建筑面积（㎡）:</label>
						<input class="col-sm-6" style="height:26px" type="text" name = "jzmj" class="form-control" readonly="readonly">
					</div>
				  
				    <div style="text-align: right;" class="form-group">
						<label class="col-sm-5">间数:</label>
						<input class="col-sm-6" style="height:26px" type="text" name = "js" class="form-control" readonly="readonly">
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">占地面积（㎡）:</label>
						<input class="col-sm-6" style="height:26px" type="text" name = "zdmj" class="form-control" readonly="readonly">
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">住房使用情况:</label>
						<input class="col-sm-6" style="height:26px" type="text" name = "zfsyqk" class="form-control" readonly="readonly"> 
					</div>
					
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">乡镇街道:</label>
						<input class="col-sm-6" style="height:26px" name = "xzjd" type="text" class="form-control" readonly="readonly">
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5">所属村:</label>
						<input class="col-sm-6" style="height:26px" name = "ssc" type="text" class="form-control" readonly="readonly">
					</div> 
				</form>
				<form class="form-horizontal" role="form" id ="form-fwcz1">
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5 field-required">拆除时间:</label>
					    <input class="col-sm-6 date-picker" required name="dismantleTime" id="dismantle_time" type="text" data-date-format="yyyy-mm-dd" style="height:26px;" placeholder="请输入拆除日期" />
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5 field-required">改造时间:</label>
						<input class="col-sm-6 date-picker" required name="reformTime" id="reform_time" type="text" data-date-format="yyyy-mm-dd" style="height:26px;" placeholder="请输入改造日期" />
					</div>
					<div style="text-align: right;" class="form-group">
						<label class="col-sm-5 field-required">验收日期:</label>
						<input class="col-sm-6 date-picker" required name="completeTime" id="complete_time" type="text" data-date-format="yyyy-mm-dd" style="height:26px;" placeholder="请输入验收日期" />
					</div>
<!-- 					<div style="text-align: center;" class="form-group">
						<label class="col-sm-6">改&nbsp;&nbsp;&nbsp;造&nbsp;&nbsp;&nbsp;类&nbsp;&nbsp;&nbsp;型:</label>
						<input class="col-sm-6" style="height:26px" name = "reform_type" type="text" class="form-control">
				    </div> -->
				    
				    <div style="text-align: right;" class="form-group">
						<label class="col-sm-5 field-required">改造情况:</label>
						<select name="reformType" id="reformType" required style="height: 26px;width:171px" class="form-control">
						    <option value="0">原拆原建</option>
						    <option value="1">修缮加固</option>
						    <option value="2">拆除</option>
				   		</select>
					</div>
				   <!--  <div style="text-align: center;" class="form-group">
						<label class="col-sm-6">上&nbsp;&nbsp;&nbsp;传&nbsp;&nbsp;&nbsp;照&nbsp;&nbsp;&nbsp;片:</label>
						<input class="col-sm-6" style="height:26px" id="fileupload" name="fileupload" size="30"  multiple="multiple" type="file" class="form-control">
					</div>	 -->
					<div class="modal-footer" style="text-align: center;margin-left:30px;background:white;">
						<button type="submit" id="submit-fwcz-save" class="btn btn-primary ">确定</button>	
					</div>
				</form>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>
<!--  -->


 <!-- 添加的模态框(照片展示) -->
  <div class="modal fade" id="account-Manager-add-dialog-photos"  aria-hidden="true" >
	<div class="modal-dialog" style="margin-right:4px;">
		<div class="modal-content">
		<div class="modal-header" style="text-align:center;font-size:12px">
				<button type="button" class="close" data-dismiss="modal" id="photos-close" aria-hidden="true">&times;</button> 
				<h5 class="modal-title" id="">照片预览</h5>
			</div>
			<div >
				<img id="viewers" src="" alt="" style="width:590px;margin-top:4px;margin-left:4px;height:608px">
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
</div>

	<!-- basic scripts -->
	<!-- 页面底部js¨ -->
	<%@ include file="../index/foot.jsp"%>
	<script type="text/javascript" src="static/ace/js/jquery.js"></script>
	<!-- 删除时确认窗口 -->
	<%--<script src="static/ace/js/jquery.form.min.js"></script>--%>
	<script src="static/ace/js/bootbox.js"></script>
	<script src="static/ace/js/bootstrap.js"></script>
	<!-- ace scripts -->
	<script src="static/ace/js/ace/ace.js"></script>
	<!-- 日期框 -->
	<script src="static/ace/js/date-time/bootstrap-datepicker.js"></script>
	<!-- 下拉框 -->
	<script src="static/ace/js/chosen.jquery.js"></script>
	
	<script src="static/ace/js/fuelux/fuelux.tree.js"></script>
    <script src="static/ace/js/ace/elements.treeview.js"></script>
	<script type="text/javascript" src="static/js/jquery.tips.js"></script>
	<!--工具栏-->
	
	<script src="static/ace/js/ace/elements.scroller.js"></script>
	<script src="static/ace/js/ace/ace.widget-box.js"></script>
	<script src="static/ace/js/ace/ace.sidebar.js"></script>
	<script src="static/ace/js/ace/elements.aside.js"></script>
	<script src="static/ace/js/ace/ace.sidebar-scroll-1.js"></script>
	<script src="static/ace/js/ace/ace.submenu-hover.js"></script>
	<script src="static/ace/js/ace/elements.wizard.js"></script>
	<script src="static/ace/js/ace/elements.typeahead.js"></script>
	<script src="static/ace/js/ace/elements.wysiwyg.js"></script>

	<!-- 弹出提示消息 -->
	<script src="static/html_UI/assets/js/jquery.gritter.js"></script>
	<script src="static/bootstrap-growl/jquery.bootstrap-growl.js"></script>
	<!-- jquery验证 -->
	<script src="static/ace/js/jquery.validate.js"></script>

	<!-- 表格 -->	
	<script src="static/ace/js/dataTables/bootstrap-table.js"></script>
	<script src="static/ace/js/dataTables/bootstrap-table-zh-CN.js"></script>
	<!--提示框-->
	<!-- 天地图API -->
	<script src=" http://api.tianditu.com/api?v=4.0" type="text/javascript"></script>
	
	<script type="text/javascript" src="static/js/dist/echarts.js"></script>
	<script src="static/js/common/commonUtils.js" type="text/javascript"></script>
	<script src="static/js/ReportManager/Config.js" type="text/javascript"></script>
	<%--js文件--%>
    <script src="static/js/map/map.js" type="text/javascript"></script>
	<script src="static/js/map/addHouse.js" type="text/javascript"></script>
	<script src="static/js/map/conditionSearch.js" type="text/javascript"></script>
	<script src="static/js/map/monitor.js" type="text/javascript"></script>	
	<!-- 上传文件插件 -->
	<script type="text/javascript" src="plugins/uploadify/ajaxfileupload.js"></script>
	</body>
 	<script type="text/javascript">
		$(top.hangge());
		$(function() {
			//日期框
			$('.date-picker').datepicker({autoclose: true,todayHighlight: true});
			//下拉框
			if(!ace.vars['touch']) {
				$('.chosen-select').chosen({allow_single_deselect:true}); 
				$(window)
				.off('resize.chosen')
				.on('resize.chosen', function() {
					$('.chosen-select').each(function() {
						 var $this = $(this);
						 $this.next().css({'width': $this.parent().width()});
					});
				}).trigger('resize.chosen');
				$(document).on('settings.ace.chosen', function(e, event_name, event_val) {
					if(event_name != 'sidebar_collapsed') return;
					$('.chosen-select').each(function() {
						 var $this = $(this);
						 $this.next().css({'width': $this.parent().width()});
					});
				});
				$('#chosen-multiple-style .btn').on('click', function(e){
					var target = $(this).find('input[type=radio]');
					var which = parseInt(target.val());
					if(which == 2) $('#form-field-select-4').addClass('tag-input-style');
					 else $('#form-field-select-4').removeClass('tag-input-style');
				});
			}

			
			//复选框全选控制
			var active_class = 'active';
			$('#simple-table > thead > tr > th input[type=checkbox]').eq(0).on('click', function(){
				var th_checked = this.checked;//checkbox inside "TH" table header
				$(this).closest('table').find('tbody > tr').each(function(){
					var row = this;
					if(th_checked) $(row).addClass(active_class).find('input[type=checkbox]').eq(0).prop('checked', true);
					else $(row).removeClass(active_class).find('input[type=checkbox]').eq(0).prop('checked', false);
				});
			});
		});
	</script>
</html>
