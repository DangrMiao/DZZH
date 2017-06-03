//百度echart帮助类
/**
 * params = {
 * 		title  str 表格标题
 * 		legend array  str 图例
 * 		xAxis array str x轴
 * 		data array {name: '', data: array}
 * }
 */
var EChartsHelper = {
	renderBarCharts : function(domId, params){
		require.config({
	        paths: {
	            echarts: '../../js/dist'
	        }
	    });
	    require(
	        [
	            'echarts',	            
	            'echarts/chart/bar'
	        ],
	        function (ec) {
	            // 基于准备好的dom，初始化echarts图表
	           myChart = ec.init(document.getElementById(domId));

			   //处理参数
			   var data = params.data;
			   for(var i = 0; i < data.length; i++){
					data[i].type = "bar";
			   }
	           var option = {
	       		   title : {
	       		        text: params.title,
	       		        x:'center',
	       		        textAlign:'center',
	       		    },
	       		   tooltip: {
	                   show: true
	                },
	                legend: {
	                    data: [params.legend],
	                    x:'left',
	                },
	                toolbox: {
	                    show : true,
	                    feature : {	     
	                        saveAsImage : {show: true}
	                    }
	                },
	                grid:{
	                	y:'35',
	                	y2:'30',
	                },
	                xAxis : [
	                    {
	                        type : 'category',
	                        data : params.xAxis
	                    }
	                ],
	                yAxis : [
	                    {
	                        type : 'value'
	                    }
	                ],
	                series : data
	            }; 
	    
	            // 为echarts对象加载数据 
	            myChart.setOption(option);  
	        } 
	    ); 
	},
	/**
	 * 饼图
	 * params = {
	 * 	title str 标题
	 * 	legend array[str] 图例
	 * 	data {
	 * 		name str
	 * 		data [{
	 * 			name 
	 * 			value
	 * 		}]
	 * 	}
	 * }
	 */
	renderPieCharts: function(domId, params){
		require.config({
	        paths: {
	            echarts: '../../js/dist'
	        }
	    });
	    require(
	        [
	            'echarts',	            
	            'echarts/chart/pie'
	        ],
	        function (ec) {
	            // 基于准备好的dom，初始化echarts图表
	           myChart = ec.init(document.getElementById(domId)); 
				
			    //处理参数
			   var data = params.data;
			   for(var i = 0; i < data.length; i++){
					data[i].type = "pie";
					data[i].radius = "55%";
					data[i].center = ['50%', '60%'];
			   }

	           var option = {
	       		    title : {
	       		        text: params.title,
	       		        x:'center'
	       		    },
	       		    tooltip : {
	       		        trigger: 'item',
	       		        formatter: "{a} <br/>{b} : {c} ({d}%)"
	       		    },
	       		    legend: {
	       		        orient : 'vertical',
	       		        x : 'left',
	       		        data : params.legend
	       		    },
	       		    toolbox: {
	                    show : true,
	                    feature : {	     
	                        saveAsImage : {show: true}
	                    }
	                },
	       		    calculable : true,
	       		    series : data
	       		};
		
	            // 为echarts对象加载数据 
	            myChart.setOption(option);  
	        }
	    ); 
	},

	//折线图
	renderLineCharts : function(domId, params){
		require.config({
	        paths: {
	            echarts: 'static/js/dist'
	        }
	    });
	    require(
	        [
	            'echarts',	            
	            'echarts/chart/line'
	        ],
	        function (ec) {
	            // 基于准备好的dom，初始化echarts图表
	           myChart = ec.init(document.getElementById(domId));

			   //处理参数
			   var data = params.data;
			   for(var i = 0; i < data.length; i++){
					data[i].type = "line";
			   }
	           var option = {
	       		   title : {
	       		        text: params.title,
	       		        x:'center',
	       		        textAlign:'center',
	       		    },
		       		tooltip : {
		       	        trigger: 'axis',
//		       	        show: true
		       	    },
			       	legend: {
		                    data: [params.legend],
		                    x:'left',
		                },
		       	    toolbox: {
		       	        show : false,
		       	        feature : {
		       	            saveAsImage : {show: true}
		       	        }
		       	    },
//			       	grid:{
//		             	y:'35',
//		             	y2:'30',
//		            },
		       	    calculable : true,
		       	    xAxis : [
		       	        {
		       	        	type : 'category',
	                        data : params.xAxis
		       	        }
		       	    ],
		       	    yAxis : [
		       	        {
		       	            type : 'value',
		       	        }
		       	    ],
	                series : data
		            }; 
	    
	            // 为echarts对象加载数据 
	            myChart.setOption(option);  
	        } 
	    ); 
	},
	//折线图2
	renderLineCharts2 : function(domId, params){
		require.config({
	        paths: {
	            echarts: 'static/js/dist'
	        }
	    });
	    require(
	        [
	            'echarts',	            
	            'echarts/chart/line'
	        ],
	        function (ec) {
	            // 基于准备好的dom，初始化echarts图表
	           myChart = ec.init(document.getElementById(domId));

			   //处理参数
			   var data = params.data;			   
			   for(var i = 0; i < data.length; i++){
					data[i].type = "line";
			   }			   
	           var option = {
	       		   title : {
	       		        text: params.title,
	       		        x:'center',
	       		        textAlign:'center',
	       		    },
		       		tooltip : {
		       	        trigger: 'axis',
		       	        show: true,
			       	     formatter : function (series) {
			       	    	var no=series[7]
			       	    	return series.series.time[no]+data[0].name + ":["
			                        + series.value[0] + ', ' 
			                        + series.value[1] + ' ]';;
			             }
		       	    },
			       	legend: {
		                    data: params.legend,
		                    x:'left',
		                },
		       	    toolbox: {
		       	        show : false,
		       	        feature : {
		       	            saveAsImage : {show: true}
		       	        }
		       	    },
//			       	grid:{
//		             	y:'35',
//		             	y2:'30',
//		            },
		       	    calculable : true,
		       	    xAxis : [
		       	        {
		       	        	type : 'value',
		       	        }
		       	    ],
		       	    yAxis : [
		       	        {
		       	            type : 'value',
		       	        }
		       	    ],
	                series : data
		            }; 
	    
	            // 为echarts对象加载数据 
	            myChart.setOption(option);  
	        } 
	    ); 
	},
	
}

var UI = {
		loadBootstrapTable: function(id, params, toolBar){
			var par = {
					method: 'get',                      //请求方式（*）
				    toolbar: toolBar,                //工具按钮用哪个容器
				    striped: true,                      //是否显示行间隔色
				    cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
				    pagination: true,                   //是否显示分页（*）
				    sortable: false,                     //是否启用排序
				    sortOrder: "asc",                   //排序方式
				    sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
				    pageNumber: 1,                       //初始化加载第一页，默认第一页
				    pageSize: 10,                       //每页的记录行数（*）
				    paginationHAlign: 'left',
				    paginationDetailHAlign: "right",
				    //pageList: [10, 20, 50],        //可供选择的每页的行数（*）
				    //showPaginationSwitch: true,
				    singleSelect: true,
				    minimumCountColumns: 2,             //最少允许的列数
				    clickToSelect: true,                //是否启用点击选中行
				    uniqueId: "id",                     //每一行的唯一标识，一般为主键列
				    cardView: false,                    //是否显示详细视图
				    detailView: false,                   //是否显示父子表    
				    height:300,
				    dataType: 'json',
				    queryParams: function(params){
				        if(params){
				            params.start = params.offset;
				            params.rows = params.limit;
				        }
				        return params;
				    },
				    responseHandler: function(res){
				        if(res.code > 0){
				            return res;
				        }else{
				            return [];
				        }
				    }
			}
			if(!params){
				return;
			}
//			if(params.onSelect){
//				par.onSelect = params.onSelect;
//			}
			if(params.data){
				par.data = params.data;
			}
			if(params.url){
				par.url = params.url;
			}
			if(params.pagination==false){
				par.pagination = params.pagination;
			}
			if(params.singleSelect==false){
				par.singleSelect = params.singleSelect;
			}
			if(params.height){
				par.height = params.height;
			}
			if(params.columns){
				par.columns = params.columns;
			}
			if(params.toolbarAlign){
				par.toolbarAlign = params.toolbarAlign;
			}
			
			$(id).bootstrapTable(par);
		}
}