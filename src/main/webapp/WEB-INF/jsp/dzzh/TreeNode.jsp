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
 	<div class="form-group row">
  		<div class="col-sm-12">
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
function downloadFile(){
 	var photo=$('#treeview-checkable').treeview('search', [ 'A文件', {
 		  ignoreCase: true,     // case insensitive
 		  exactMatch: true,    // like or equals
 		  revealResults: false,  // reveal matching nodes
 		}]);
 	var doc=$('#treeview-checkable').treeview('search', [ 'B文件', {
		  ignoreCase: true,     // case insensitive
		  exactMatch: true,    // like or equals
		  revealResults: false,  // reveal matching nodes
		}]);
 	var other=$('#treeview-checkable').treeview('search', [ 'C文件', {
		  ignoreCase: true,     // case insensitive
		  exactMatch: true,    // like or equals
		  revealResults: false,  // reveal matching nodes
		}]);
 	//console.log(photo);
 	var Location=[];
 	getNodelocationArr(photo[0],Location);
 	getNodelocationArr(doc[0],Location);
 	getNodelocationArr(other[0],Location);
 	getNodelocationArr(photo[1],Location);
 	getNodelocationArr(doc[1],Location);
 	getNodelocationArr(other[1],Location);
 	getNodelocationArr(photo[2],Location);
 	getNodelocationArr(doc[2],Location);
 	getNodelocationArr(other[2],Location);
 	if(Location.length>0){
 		//console.log(Location);
		window.location.href='<%=basePath%>DownloadFile/download?location='+Location;
 	}else{
 		alert("沒有选中任何选项");
 	}
	
}


function deleteFile(){
 	var photo=$('#treeview-checkable').treeview('search', [ 'A文件', {
 		  ignoreCase: true,     // case insensitive
 		  exactMatch: true,    // like or equals
 		  revealResults: false,  // reveal matching nodes
 		}]);
 	var doc=$('#treeview-checkable').treeview('search', [ 'B文件', {
		  ignoreCase: true,     // case insensitive
		  exactMatch: true,    // like or equals
		  revealResults: false,  // reveal matching nodes
		}]);
 	var other=$('#treeview-checkable').treeview('search', [ 'C文件', {
		  ignoreCase: true,     // case insensitive
		  exactMatch: true,    // like or equals
		  revealResults: false,  // reveal matching nodes
		}]);
 	//console.log(photo);
 	var ids=[];
 	getNodeidArr(photo[0],ids);
 	getNodeidArr(doc[0],ids);
 	getNodeidArr(other[0],ids);
 	getNodeidArr(photo[1],ids);
 	getNodeidArr(doc[1],ids);
 	getNodeidArr(other[1],ids);
 	getNodeidArr(photo[2],ids);
 	getNodeidArr(doc[2],ids);
 	getNodeidArr(other[2],ids);
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
 	}else{
 		alert("沒有选中任何选项");
 	}
 	<%-- window.location.href='<%=basePath%>GovernanceAttr/ShowList'; --%>
}








function showpicture(){
	
	var photo=$('#treeview-checkable').treeview('search', [ '照片', {
		  ignoreCase: true,     // case insensitive
		  exactMatch: true,    // like or equals
		  revealResults: false,  // reveal matching nodes
		}]);
	var virLocation=[];
	getNodevirLocationArr(photo[0],virLocation);
	getNodevirLocationArr(photo[1],virLocation);
	getNodevirLocationArr(photo[2],virLocation);

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

//结点接口实现
var $checkableTree = $('#treeview-checkable').treeview({
        data: '${datalist}',//数据
        showIcon: false,
        levels:0,
        showTags:true,
        highlightSearchResults:false,
        showCheckbox: true,
        onNodeChecked: function(event, node) { //选中节点
        	var selectNodes = getNodeIdArr(node);//获取所有子节点
            if(selectNodes){ //子节点不为空，则选中所有子节点
                $('#treeview-checkable').treeview('checkNode', [ selectNodes,{ silent: true }]);
                showpicture();
                //$('#tree').treeview('getSelected', nodeId);
            }
        },
        onNodeUnchecked: function (event, node) { //取消选中节点
            var selectNodes = getNodeIdArr(node);//获取所有子节点
            if(selectNodes){ //子节点不为空，则取消选中所有子节点
                $('#treeview-checkable').treeview('uncheckNode', [ selectNodes,{ silent: true }]);
                showpicture();
            }
            
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



function getNodeidArr( node ,ids){
    if(node.nodes.length!=0){
        for(var i=0;i<node.nodes.length;i++){
        	var x=node.nodes[i];
        	if(x.state.checked)
        		ids.push(x.id)
        }
    }
}


function getNodevirLocationArr( node ,virLocation){
    //var ts = [];
    if(node.nodes.length!=0){
        for(var i=0;i<node.nodes.length;i++){
        	var x=node.nodes[i];
        	//console.log(x);
        	if(x.state.checked)
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
</script>
</html>