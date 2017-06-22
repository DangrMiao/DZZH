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
<!doctype html>
<html lang="zh">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<link href="../static/lkk/bootstrap.min.css" rel="stylesheet">
    <link href="../static/lkk/ma5gallery.css" rel="stylesheet" type="text/css">
    <script src="../static/lkk/jquery.min.js"></script>
	<script src="../static/lkk/bootstrap-treeview.js"></script>
	<script src="../static/lkk/bootstrap.min.js"></script>
	<script src="../static/lkk/ma5gallery.js"></script>
	
	
	<style type="text/css">
		.jq22-header{margin-bottom: 15px;font-family: "Segoe UI", "Lucida Grande", Helvetica, Arial, "Microsoft YaHei", FreeSans, Arimo, "Droid Sans", "wenquanyi micro hei", "Hiragino Sans GB", "Hiragino Sans GB W3", "FontAwesome", sans-serif;}
		.jq22-icon{color: #fff;}
	</style>

</head>
<body>
 <div class="row" style="margin-left: 10px;width: 92%;">
  <input type="hidden" value="${id}" name="id" id="id" />
  <input type="hidden" value="${geotype}" name="geotype" id="geotype" />
  
  
  <!-- 资料上传(搬迁避让) -->
  <div class="modal fade" id="account-Manager-add-dialog-bqbr-zlsc" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	<div class="modal-dialog"  style="width:720px;height:150px;margin-top:60px;text-align:center">
		<div class="modal-content" id="zlsc-bqbr-tz" >
			<div class="modal-header" style="text-align:center;font-size:12px">
				<button type="button" class="close" data-dismiss="modal" id="bqbr-zlsc-close" aria-hidden="true">&times;</button> 
				<h5 class="modal-title" id="">上传文件</h5>
			</div>
			<div class="modal-body" style="width:720px;height:150px;">
				<iframe name="fileConframe"  style="width:700px;height:100%;"class="Conframe" id="fileConframe" frameborder=0 src="<%=basePath%>UpLoadFile">
				 </iframe>
			</div>
		</div><!-- /.modal-content -->
	</div><!-- /.modal -->
  </div>
  
 	<div class="form-group row">
  		<div class="col-sm-12">
  		  <button type="button" class="btn btn-primary" onclick="uploadFile()">上传文件</button> 
          <button type="button" class="btn btn-primary" onclick="downloadFile()">下载文件</button> 
          <button type="button" class="btn btn-primary" onclick="deleteFile()">删除文件</button> 
  		</div>
 	</div>
  	<div class="form-group row">
  		<div class="col-sm-6">
          <h5>项目文件列表</h5>
          <div id="treeview-checkable" class=""></div>
          <!-- <div id="tree"></div>  -->
    	</div>
    	<div class="col-sm-6">
          <h5>图片预览</h5>
          <div id="checkable-output" class="ma5-gallery" style="margin-top: 0px;">           
          </div>
 		</div>
 	</div>
 </div> 
</body>
<script type="text/javascript">
//console.log('${datalist}');
function goto_treenode_by_projectid(id,protype){
	window.location.href="<%=basePath%>TreeNode/treenodelist?geotype="+protype+"&id="+id;
}
function reloadtree(){
	var geotype=$("#geotype").val();
	var id=$("#id").val();
	var url=encodeURI("id="+id+"&geotype="+geotype);
	window.location.reload('<%=basePath%>TreeNode?'+url);
}

function uploadFile(){
	console.log("--------------"+"uploadFile"+"----------------");
	//治理前
 	var file1=$('#treeview-checkable').treeview('search', [ '治理前', {
 		  ignoreCase: true,     // case insensitive
 		  exactMatch: true,    // like or equals
 		  revealResults: false,  // reveal matching nodes
 		}]);
 	//治理中
 	var file2=$('#treeview-checkable').treeview('search', [ '治理中', {
		  ignoreCase: true,     // case insensitive
		  exactMatch: true,    // like or equals
		  revealResults: false,  // reveal matching nodes
		}]);

 	
 	
 	//治理后
 	var file3=$('#treeview-checkable').treeview('search', [ '治理后', {
		  ignoreCase: true,     // case insensitive
		  exactMatch: true,    // like or equals
		  revealResults: false,  // reveal matching nodes
		}]);
 
	var ids=[];
	getNodeidArr(file1[0],ids);
	getNodeidArr(file2[0],ids);
	getNodeidArr(file3[0],ids);
 	
 	console.log(ids);
 	if(ids.length==0){alert("请选择一个文件夹上传");}
 	if(ids.length>1){alert("最多选择一个文件夹上传");}
 	if(ids.length==1){
 		//console.log(file);
 		var stage=1;
		var type=ids[0];
		//搬迁避让
		if(type==-1)stage=1;
		if(type==-2||type==-3||type==-4||type==-5)stage=2;
		if(type==-6||type==-7||type==-8)stage=3;
		
		//工程治理
		if(type==-21)stage=1;
		if(type==-22||type==-23||type==-24)stage=2;
		if(type==-25||type==-26)stage=3;
		
		fileConframe.window.goto_uploadfile_by_projectid('${id}',"${geotype}",stage,type);
		$('#account-Manager-add-dialog-bqbr-zlsc').modal('show');
 	}

	
}
function downloadFile(){
   var govertype="${geotype}";
   if(govertype=="1"){
	//治理前
	 	var file1=$('#treeview-checkable').treeview('search', [ '基本情况', {
	 		  ignoreCase: true,     // case insensitive
	 		  exactMatch: true,    // like or equals
	 		  revealResults: false,  // reveal matching nodes
	 		}]);
	 	//治理中
	 	var file2=$('#treeview-checkable').treeview('search', [ '搬迁协议', {
			  ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	var file3=$('#treeview-checkable').treeview('search', [ '思想工作', {
			   ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	var file4=$('#treeview-checkable').treeview('search', [ '腾空', {
			  ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	var file5=$('#treeview-checkable').treeview('search', [ '拆迁', {
			  ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	
	 	
	 	//治理后
	 	var file6=$('#treeview-checkable').treeview('search', [ '复垦', {
			  ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	var file7=$('#treeview-checkable').treeview('search', [ '安置地', {
			  ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	
	 	var file8=$('#treeview-checkable').treeview('search', [ '安置新房', {
			  ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	
	 	
	 	var Location=[];
	 	getNodelocationArr(file1[0],Location);
	 	getNodelocationArr(file2[0],Location);
	 	getNodelocationArr(file3[0],Location);
	 	getNodelocationArr(file4[0],Location);
	 	getNodelocationArr(file5[0],Location);
	 	getNodelocationArr(file6[0],Location);
	 	getNodelocationArr(file7[0],Location);
	 	getNodelocationArr(file8[0],Location);
	 	if(Location.length>0){
			window.location.href='<%=basePath%>DownloadFile/download?location='+Location;
	 	}else{
	 		alert("沒有选中任何选项");
	 	}
   } 
   if(govertype=="2"){//
	   console.log("工程治理");
		//治理前
	 	var file1=$('#treeview-checkable').treeview('search', [ '基本情况', {
	 		  ignoreCase: true,     // case insensitive
	 		  exactMatch: true,    // like or equals
	 		  revealResults: false,  // reveal matching nodes
	 		}]);
	 	//治理中
	 	var file2=$('#treeview-checkable').treeview('search', [ '招投标', {
			  ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	var file3=$('#treeview-checkable').treeview('search', [ '合同', {
			   ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	var file4=$('#treeview-checkable').treeview('search', [ '进度', {
			  ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	
	 	//治理后
	 	var file5=$('#treeview-checkable').treeview('search', [ '竣工报告', {
			  ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	var file6=$('#treeview-checkable').treeview('search', [ '验收意见', {
			  ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	
	 	
	 	var Location=[];
	 	getNodelocationArr(file1[0],Location);
	 	getNodelocationArr(file2[0],Location);
	 	getNodelocationArr(file3[0],Location);
	 	getNodelocationArr(file4[0],Location);
	 	getNodelocationArr(file5[0],Location);
	 	getNodelocationArr(file6[0],Location);
	 	if(Location.length>0){
			window.location.href='<%=basePath%>DownloadFile/download?location='+Location;
	 	}else{
	 		alert("沒有选中任何选项");
	 	}
  }
	
}


function deleteFile(){
	var govertype="${geotype}";
	if(govertype=="1"){
		var file1=$('#treeview-checkable').treeview('search', [ '基本情况', {
	 		  ignoreCase: true,     // case insensitive
	 		  exactMatch: true,    // like or equals
	 		  revealResults: false,  // reveal matching nodes
	 		}]);
	
	 	//治理中
	 	var file2=$('#treeview-checkable').treeview('search', [ '搬迁协议', {
			  ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	var file3=$('#treeview-checkable').treeview('search', [ '思想工作', {
			  ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	var file4=$('#treeview-checkable').treeview('search', [ '腾空', {
			  ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	var file5=$('#treeview-checkable').treeview('search', [ '拆迁', {
			  ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	
	 	
	 	//治理后
	 	var file6=$('#treeview-checkable').treeview('search', [ '复垦', {
			  ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	var file7=$('#treeview-checkable').treeview('search', [ '安置地', {
			  ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	
	 	var file8=$('#treeview-checkable').treeview('search', [ '安置新房', {
			  ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	
	 	
	 	var ids=[];
	 	getNodeidArr(file1[0],ids);
	 	getNodeidArr(file2[0],ids);
	 	getNodeidArr(file3[0],ids);
	 	getNodeidArr(file4[0],ids);
	 	getNodeidArr(file5[0],ids);
	 	getNodeidArr(file6[0],ids);
	 	getNodeidArr(file7[0],ids);
	 	getNodeidArr(file8[0],ids);
	 	if(ids.length>0){
	 		var geotype=$("#geotype").val();
			var id=$("#id").val();
			var url=encodeURI("id="+id+"&geotype="+geotype+"&ids="+ids);
			$.ajax({
				url : "<%=basePath%>TreeNode/deletenode",
				type : "POST",
				contentType : "application/json; charset=UTF-8",
				data : JSON.stringify(ids),
				dataType : "json",
				success : function(data) {	
					alert("删除成功");
					window.location.reload('<%=basePath%>TreeNode?'+url);
				},
				error : function() {
					alert("删除失败");
				}
			});	
	 	}else{alert("沒有选中任何选项");}
	}
	if(govertype=="2"){
		console.log("工程治理");
		//治理前
	 	var file1=$('#treeview-checkable').treeview('search', [ '基本情况', {
	 		  ignoreCase: true,     // case insensitive
	 		  exactMatch: true,    // like or equals
	 		  revealResults: false,  // reveal matching nodes
	 		}]);
	 	//治理中
	 	var file2=$('#treeview-checkable').treeview('search', [ '招投标', {
			  ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	var file3=$('#treeview-checkable').treeview('search', [ '合同', {
			   ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	var file4=$('#treeview-checkable').treeview('search', [ '进度', {
			  ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	
	 	//治理后
	 	var file5=$('#treeview-checkable').treeview('search', [ '竣工报告', {
			  ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	var file6=$('#treeview-checkable').treeview('search', [ '验收意见', {
			  ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	
	 	
	 	var ids=[];
	 	getNodeidArr(file1[0],ids);
	 	getNodeidArr(file2[0],ids);
	 	getNodeidArr(file3[0],ids);
	 	getNodeidArr(file4[0],ids);
	 	getNodeidArr(file5[0],ids);
	 	getNodeidArr(file6[0],ids);
	 	if(ids.length>0)
	 	{
	 		var geotype=$("#geotype").val();
			var id=$("#id").val();
			var url=encodeURI("id="+id+"&geotype="+geotype+"&ids="+ids);
			$.ajax({
				url : "<%=basePath%>TreeNode/deletenode",
				type : "POST",
				contentType : "application/json; charset=UTF-8",
				data : JSON.stringify(ids),
				dataType : "json",
				success : function(data) {	
					alert("删除成功");
					window.location.reload('<%=basePath%>TreeNode?'+url);
				},
				error : function() {
					alert("删除失败");
				}
			});
	 	}else{alert("沒有选中任何选项");}
	}
}








function showpicture(){	
	var govertype="${geotype}";
	if(govertype=="1"){
		//治理前
	 	var file1=$('#treeview-checkable').treeview('search', [ '基本情况', {
	 		  ignoreCase: true,     // case insensitive
	 		  exactMatch: true,    // like or equals
	 		  revealResults: false,  // reveal matching nodes
	 		}]);
	 	
	 	
	 	
	 	//治理中
	 	var file2=$('#treeview-checkable').treeview('search', [ '搬迁协议', {
			  ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	var file3=$('#treeview-checkable').treeview('search', [ '思想工作', {
			  ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	var file4=$('#treeview-checkable').treeview('search', [ '腾空', {
			  ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	var file5=$('#treeview-checkable').treeview('search', [ '拆迁', {
			  ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	
	 	
	 	//治理后
	 	var file6=$('#treeview-checkable').treeview('search', [ '复垦', {
			  ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	var file7=$('#treeview-checkable').treeview('search', [ '安置地', {
			  ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	
	 	var file8=$('#treeview-checkable').treeview('search', [ '安置新房', {
			  ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	
		var virLocation=[];
		getNodevirLocationArr(file1[0],virLocation);
		getNodevirLocationArr(file2[0],virLocation);
		getNodevirLocationArr(file3[0],virLocation);
		getNodevirLocationArr(file4[0],virLocation);
		getNodevirLocationArr(file5[0],virLocation);
		getNodevirLocationArr(file6[0],virLocation);
		getNodevirLocationArr(file7[0],virLocation);
		getNodevirLocationArr(file8[0],virLocation);
	
		if(virLocation.length>0){
			//console.log(virLocation);
			$("#checkable-output").empty();
			for(var i=0;i<virLocation.length;i++){
				$("#checkable-output").append("<figure class='gallery-item'><img src=/"+virLocation[i]+" alt=''></figure>");	
			}
			 $('.gallery-item').ma5gallery({ preload:true,fullscreen:false});
		}else{
			$("#checkable-output").empty();
		}
	}
	if(govertype=="2"){
		console.log("工程治理");
		//治理前
	 	var file1=$('#treeview-checkable').treeview('search', [ '基本情况', {
	 		  ignoreCase: true,     // case insensitive
	 		  exactMatch: true,    // like or equals
	 		  revealResults: false,  // reveal matching nodes
	 		}]);
	 	//治理中
	 	var file2=$('#treeview-checkable').treeview('search', [ '招投标', {
			  ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	var file3=$('#treeview-checkable').treeview('search', [ '合同', {
			   ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	var file4=$('#treeview-checkable').treeview('search', [ '进度', {
			  ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	
	 	//治理后
	 	var file5=$('#treeview-checkable').treeview('search', [ '竣工报告', {
			  ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	var file6=$('#treeview-checkable').treeview('search', [ '验收意见', {
			  ignoreCase: true,     // case insensitive
			  exactMatch: true,    // like or equals
			  revealResults: false,  // reveal matching nodes
			}]);
	 	
	 	
	 	
		var virLocation=[];
		getNodevirLocationArr(file1[0],virLocation);
		getNodevirLocationArr(file2[0],virLocation);
		getNodevirLocationArr(file3[0],virLocation);
		getNodevirLocationArr(file4[0],virLocation);
		getNodevirLocationArr(file5[0],virLocation);
		getNodevirLocationArr(file6[0],virLocation);
		if(virLocation.length>0){
			//console.log(virLocation);
			$("#checkable-output").empty();
			for(var i=0;i<virLocation.length;i++){
				$("#checkable-output").append("<figure class='gallery-item'><img src=/"+virLocation[i]+" alt=''></figure>");	
			}
			 $('.gallery-item').ma5gallery({ preload:true,fullscreen:false});
		}else{
			$("#checkable-output").empty();
		}
	}
	
}

//结点接口实现
var $checkableTree = $('#treeview-checkable').treeview({
        data: '${datalist}',//数据
        showIcon: false,
        levels:0,
        showTags:true,
        highlightSearchResults:false,
        showCheckbox: true,
        onNodeChecked: function(event, node) { //选中节点
        	 showpicture();
        	
        	/* var selectNodes = getNodeIdArr(node);//获取所有子节点
            if(selectNodes){ //子节点不为空，则选中所有子节点
               // $('#treeview-checkable').treeview('checkNode', [ selectNodes,{ silent: true }]);
                showpicture();
                //$('#tree').treeview('getSelected', nodeId);
            } */
        },
        onNodeUnchecked: function (event, node) { //取消选中节点
        	 showpicture();
        	
        	
           /*  var selectNodes = getNodeIdArr(node);//获取所有子节点
            if(selectNodes){ //子节点不为空，则取消选中所有子节点
               // $('#treeview-checkable').treeview('uncheckNode', [ selectNodes,{ silent: true }]);
                showpicture();
            }*/
        }
});
//递归获取所有的子结点id
function getNodeIdArr( node ){
	//console.log(node);
    var ts = [];
    if(node.nodes){
        for(x in node.nodes){
            ts.push(node.nodes[x].nodeId)
            
            if(node.nodes[x].nodes){
            var getNodeDieDai = getNodeIdArr(node.nodes[x]);
                for(j in getNodeDieDai){
                    ts.push(getNodeDieDai[j]);
                }
            }
        }
    }else{
        ts.push(node.nodeId);
   }
return ts;
}


//得到所选节点的真实路径
function getNodelocationArr( node ,Location){
        //var ts = [];
        if(node.nodes.length!=0){
            for(var i=0;i<node.nodes.length;i++){
            	var x=node.nodes[i];
            	//console.log(x);
            	if(x.state.checked)
            		Location.push(x.location)
            }
        }
}


//得到所选节点的id
function getNodeidArr( node ,ids){
    if(node.nodes.length!=0){
        for(var i=0;i<node.nodes.length;i++){
        	var x=node.nodes[i];
        	if(x.state.checked)
        		ids.push(x.id)
        }
    }
}

//得到所选为图片的节点的虚拟路径
function getNodevirLocationArr( node ,virLocation){
    if(node.nodes.length!=0){
        for(var i=0;i<node.nodes.length;i++){
        	var x=node.nodes[i];
        	//console.log(x);
        	if(x.state.checked&&(x.text.indexOf("jpg") >= 0||x.text.indexOf("png") >= 0||x.text.indexOf("gif") >= 0))
        		virLocation.push(x.virtuallocation)
        }
    }
}
                 
</script>

<script type="text/javascript">
 $(document).ready(function(){
    $('.gallery-item').ma5gallery({
        preload:true,
        fullscreen:false
    });
}); 
 $('#account-Manager-add-dialog-bqbr-zlsc').modal({
	    keyboard: true,
	    backdrop: "static",
	    show:false
	});
 
  $(function () { $('#account-Manager-add-dialog-bqbr-zlsc').on('hidden.bs.modal', function () {
	// console.log("hide");
	 reloadtree();
	 })
});
</script>
</html>