//初始化路径
var baseUrl = CommonUtils.getBasePath();

var label;
//绘制多个marker。
var marker;
var iconMarkers=[];

//初始化Table
$('#map-search-data').bootstrapTable({
    url: 'map/list_map',         //请求后台的URL（*）
    method: 'get',                      //请求方式（*）
    toolbar: '#map-search-data-toorbar',                //工具按钮用哪个容器
    striped: true,                      //是否显示行间隔色
    cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
    pagination: true,                   //是否显示分页（*）
    sortable: false,                     //是否启用排序
    sortOrder: "asc",                   //排序方式
    sidePagination: "server",           //分页方式：client客户端分页，server服务端分页（*）
    pageNumber: 1,                       //初始化加载第一页，默认第一页
    pageSize: 6,                       //每页的记录行数（*）
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
    height: 200,
    //经纬度点击事件
 /*   onClickRow:function(row,tr){
    	var map, zoom = 12;
    	//初始化地图对象 
    	map = new T.Map("mapDiv"); 
        
    	var icon1 = new T.Icon({ 
            iconUrl: "static/images/location.gif", 
            iconSize: new T.Point(40, 40), 
            iconAnchor: new T.Point(20, 32) 
        }); 
        //向地图上添加自定义标注 
        var marker = new T.Marker(new T.LngLat(row.x, row.y), {icon: icon1}); 
        map.addOverLay(marker); 
    },*/
    columns: [
    	{checkbox: true},
    	{field: 'id',title: 'id'}, 
        {field: 'name',title: '名称'}, 
        {field: 'location',title: '地址'}, 
        {field: 'governancetype',title: '治理类型'},
        {field: 'govertype',title: '灾害类型'}, 
        {field: 'scale',title: '规模'}, 
        {field: 'scalegrad',title: '规模等级'}, 
        {field: 'thisstage',title: '稳定性'}, 
        {field: 'strplancompletiontime',title: '计划时间'},
        //{field: 'level',title: '鉴定等级'},
        //{field: 'jznd',title: '建造年代'},
        //{field: 'zflb',title: '住房类别'}, 
        //{field: 'cs',title: '层数'}, 
        //{field: 'jzmj',title: '建筑面积'},
        //{field: 'js',title: '间数'}, 
        //{field: 'zdmj',title: '占地面积'}, 
        //{field: 'zfsyqk',title: '房屋使用情况'}, 
        //{field: 'wxdj',title: '危险性等级'}, 
       // {field: 'zt',title: '状态'},
        //{field: 'fcz',title: '房产证'}, 
        //{field: 'dismantle_time',title: '拆除时间'},
        //{field: 'reform_time',title: '改造时间'},  
        //{field: 'complete_time',title: '验收时间'},
        //{field: 'reform_type',title: '改造类型',formatter:type},
        
        //{field: 'tdxz',title: '土地性质'}, 
       
        //{field: 'x',title: 'X'},
        //{field: 'y',title: 'Y'}

    ],
    dataType: 'json',
    //传给后台的数据
    queryParams: function(params){
        if(params){
        	var res = FormUtils.getData("search-form-group-condition");
    		
            params.start = params.offset;
            params.rows = params.limit;
           
			// 查询条件		
			/*params.zdmj1 = (res.zdmj1 == '') ? "" : res.zdmj1;
			params.zdmj2 = (res.zdmj2 == '') ? "" : res.zdmj2;
			params.cs= res.cs;
			params.js1 = (res.js1 == '') ? "" : res.js1;
			params.js2 = (res.js2 == '') ? "" : res.js2;
			params.reform_type = res.reform_type;
			params.xzjd = res.xzjd;
			params.ssc = res.ssc;
			params.mph = res.mph;
			params.zflb = res.zflb;
			params.Startime=res.Startime;
			params.Endtime=res.Endtime;
			params.zt=res.zt;*/
			 
            //params.bh = $("#bh").val();
            //params.startime = $("#Startime").val();
            //params.endtime = $("#Endtime").val();
            params.district = res.district;
			params.name=res.name;
			params.scalegrad=res.scalegrad;
			params.thisstage=res.thisstage;
			params.governancetype=res.governancetype;  
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
});


//$(function(){   	
//	startLoad();
	//搜索
	$('#search-form-group-search-btn').on("click", function(){
	    var params = FormUtils.getData("search-form-group-condition");
   	    map.clearOverLays();

	     $.ajax({
	         type: "POST",
	         url: "map/list_map",
	         data:params,
	         dataType: "json",
	         success: function(data){	 
	        	    drawTMakers(data.rows);
	        	    //console.log(iconMarkers)
	        	    addTEvent(iconMarkers,data.rows);  		            
	           }
	      });
	     
    	var strpoint="118.240193,28.922601,118.21372,28.911243,118.201438,28.911268,118.201105,28.920382,118.212978,28.9265,118.228673,28.942318,118.234815,28.953405,118.228565,28.956416,118.217783,28.9548,118.208048,28.959908,118.194839,28.981127,118.179536,28.991643,118.158113,28.993776,118.140677,28.989929,118.131844,29.000431,118.10449,28.997003,118.104255,29.003189,118.0978,29.012539,118.094368,29.034266,118.085752,29.043226,118.077904,29.045266,118.078145,29.050197,118.072328,29.054944,118.07324,29.060684,118.081683,29.068257,118.081503,29.080878,118.075554,29.086101,118.051713,29.094737,118.04387,29.103042,118.048687,29.115667,118.056945,29.118281,118.058853,29.12225,118.044734,29.132082,118.049169,29.144256,118.049787,29.16326,118.034255,29.174875,118.050729,29.218833,118.057218,29.223563,118.063673,29.220882,118.078188,29.222636,118.087565,29.2395,118.086849,29.2491,118.081438,29.252672,118.086131,29.27264,118.078419,29.295524,118.085827,29.296588,118.109112,29.290981,118.121726,29.299549,118.127888,29.293819,118.14474,29.289686,118.160517,29.292858,118.173935,29.302684,118.18239,29.303472,118.18187,29.311972,118.17238,29.319787,118.185537,29.327512,118.190622,29.340115,118.212194,29.351714,118.214892,29.361106,118.209696,29.37415,118.214469,29.382586,118.199997,29.394532,118.198729,29.40155,118.208546,29.400182,118.223854,29.426543,118.254389,29.436992,118.262524,29.43179,118.273685,29.433487,118.28351,29.429119,118.292004,29.432608,118.300561,29.425157,118.321827,29.428898,118.321552,29.458562,118.312051,29.496506,118.316243,29.502274,118.330103,29.503226,118.33383,29.502572,118.353369,29.479989,118.351412,29.474878,118.357322,29.460924,118.372591,29.456104,118.380256,29.44256,118.391529,29.436718,118.397031,29.429852,118.409531,29.431215,118.418276,29.427362,118.412443,29.411862,118.431679,29.404287,118.430085,29.39324,118.455652,29.380819,118.469012,29.366672,118.476444,29.366285,118.490875,29.373119,118.510313,29.365913,118.524267,29.369705,118.530611,29.364971,118.52565,29.350559,118.545297,29.350275,118.549037,29.343864,118.554377,29.342693,118.57829,29.344584,118.584937,29.339495,118.591696,29.339833,118.594861,29.334657,118.601385,29.337307,118.609862,29.331398,118.610528,29.320839,118.622638,29.31126,118.621132,29.302881,118.636988,29.284396,118.642705,29.272037,118.641435,29.267821,118.626889,29.283129,118.616213,29.28493,118.61254,29.272699,118.621623,29.256934,118.61461,29.243652,118.625645,29.226583,118.638274,29.224602,118.640051,29.212083,118.633224,29.202479,118.635253,29.197684,118.690316,29.20911,118.710137,29.196618,118.72202,29.196403,118.72752,29.204096,118.736899,29.206397,118.747141,29.218277,118.762395,29.220791,118.771969,29.227727,118.771788,29.241506,118.768113,29.247224,118.770033,29.255118,118.783853,29.25916,118.790413,29.26608,118.791633,29.272761,118.818187,29.28723,118.831137,29.285777,118.835297,29.295261,118.861096,29.308994,118.86711,29.322026,118.875773,29.328782,118.882602,29.332579,118.894473,29.329263,118.906775,29.339236,118.933692,29.316462,118.94852,29.313402,118.955572,29.306117,118.968567,29.301253,118.967316,29.296994,118.954599,29.28769,118.967955,29.27404,118.972263,29.27465,118.984847,29.264528,118.993547,29.250295,118.99127,29.23559,119.008081,29.213645,119.051259,29.228107,119.055709,29.228313,119.056023,29.225429,119.069292,29.233323,119.08125,29.229821,119.091668,29.236255,119.111855,29.233428,119.133962,29.242889,119.13795,29.241607,119.133819,29.234131,119.136291,29.227798,119.142974,29.226203,119.158252,29.23388,119.161964,29.229809,119.16155,29.22331,119.167143,29.226557,119.173287,29.22556,119.183822,29.213331,119.195277,29.212179,119.20033,29.223014,119.19608,29.234482,119.207235,29.235462,119.212309,29.228264,119.218572,29.230234,119.21687,29.246288,119.22082,29.252171,119.197518,29.26688,119.204323,29.276693,119.210739,29.280007,119.206424,29.283441,119.205203,29.295119,119.216394,29.289498,119.234951,29.289192,119.232999,29.281643,119.24489,29.264568,119.243523,29.256892,119.267143,29.254175,119.253999,29.237523,119.239873,29.227545,119.239482,29.2054,119.235219,29.199897,119.248712,29.194506,119.249818,29.177851,119.246559,29.172817,119.25956,29.159201,119.257937,29.145742,119.27147,29.142032,119.275532,29.125332,119.288379,29.12272,119.307123,29.106607,119.308965,29.092283,119.326042,29.091528,119.338818,29.022195,119.330237,29.00914,119.33198,29.000953,119.328868,28.995436,119.335807,28.989732,119.330368,28.981757,119.329562,28.971269,119.320221,28.959837,119.323416,28.943104,119.332697,28.941416,119.337522,28.91517,119.346646,28.910235,119.352257,28.901786,119.349264,28.889954,119.339029,28.886173,119.338759,28.882695,119.342584,28.880961,119.33885,28.869626,119.327208,28.875673,119.320526,28.867413,119.315302,28.86799,119.318415,28.864155,119.313175,28.825489,119.315247,28.813681,119.308401,28.809586,119.291302,28.812128,119.282189,28.808852,119.277748,28.794434,119.260813,28.781444,119.252075,28.76763,119.229001,28.770679,119.21758,28.776909,119.210643,28.773092,119.193505,28.776405,119.172423,28.752167,119.16628,28.754028,119.152741,28.747051,119.133391,28.742824,119.10881,28.748812,119.101877,28.748066,119.092926,28.741111,119.08608,28.745609,119.061152,28.734096,119.048701,28.718497,119.032872,28.714393,119.012918,28.700889,119.006592,28.689829,118.998544,28.684481,118.968904,28.647982,118.95941,28.653663,118.936963,28.647565,118.931131,28.639832,118.93138,28.630112,118.920653,28.618686,118.92224,28.606543,118.915251,28.600317,118.912742,28.582428,118.920189,28.572192,118.883004,28.526833,118.874908,28.524624,118.869142,28.537293,118.860175,28.539116,118.855429,28.547363,118.842238,28.546632,118.829584,28.55412,118.810707,28.540109,118.799968,28.540508,118.789616,28.535764,118.784066,28.523616,118.765752,28.53059,118.754934,28.527827,118.748354,28.516857,118.726385,28.499047,118.734893,28.485997,118.730053,28.469946,118.735892,28.462171,118.728313,28.421207,118.732843,28.416758,118.741632,28.423483,118.759215,28.422652,118.762713,28.415773,118.76128,28.403597,118.747675,28.384402,118.745757,28.36643,118.735375,28.352185,118.72787,28.344743,118.705739,28.332876,118.704868,28.316065,118.694369,28.294841,118.680877,28.278809,118.670056,28.276363,118.655266,28.282779,118.64673,28.28046,118.640238,28.268848,118.632082,28.267411,118.62799,28.2619,118.606887,28.260169,118.601302,28.263778,118.603466,28.275833,118.591918,28.29042,118.571615,28.292011,118.5601,28.288382,118.552689,28.293106,118.552155,28.281861,118.53484,28.276142,118.52121,28.274206,118.511485,28.285112,118.50483,28.283212,118.49994,28.268624,118.504816,28.255044,118.495243,28.244826,118.482113,28.254533,118.470352,28.251069,118.454188,28.254456,118.449245,28.260476,118.455941,28.265081,118.43911,28.279995,118.436629,28.285831,118.439554,28.297285,118.465506,28.306563,118.477981,28.323706,118.488022,28.329291,118.493546,28.339014,118.489075,28.345822,118.476713,28.349007,118.475064,28.36188,118.468874,28.367315,118.460519,28.387554,118.445962,28.399499,118.442044,28.412404,118.462636,28.435042,118.476448,28.470046,118.484325,28.480257,118.477945,28.486611,118.457874,28.486479,118.442175,28.501368,118.428396,28.500015,118.420039,28.504908,118.425425,28.509834,118.440355,28.510655,118.451938,28.518413,118.445054,28.525701,118.437668,28.524058,118.432208,28.529695,118.433918,28.533041,118.428799,28.53954,118.430646,28.544364,118.426531,28.546624,118.43208,28.553024,118.420326,28.560999,118.415089,28.575655,118.424164,28.579432,118.421178,28.586047,118.426107,28.604835,118.420169,28.606601,118.420517,28.609528,118.43033,28.61736,118.438434,28.629988,118.424609,28.651618,118.425756,28.657076,118.434962,28.659888,118.439057,28.670096,118.436981,28.684764,118.424751,28.683937,118.419711,28.699532,118.410383,28.706118,118.406194,28.717301,118.409808,28.724332,118.390708,28.767986,118.390771,28.78512,118.374187,28.813856,118.333366,28.823174,118.325195,28.829183,118.309136,28.830592,118.301658,28.838294,118.308526,28.84635,118.30408,28.851677,118.301422,28.86482,118.294132,28.871535,118.276813,28.923551,118.262551,28.930176,118.240193,28.922601";
		  //初始化地图对象
		var arrpoint=strpoint.split(",");
		    var points = [];
			 for(var i=0;i<arrpoint.length;i=i+2)
	        {
	          points.push(new T.LngLat(arrpoint[i], arrpoint[i+1]));
	        }
	          //创建面对象
	          var polygon = new T.Polygon(points,{
	              color: "blue", weight: 3, opacity: 0.5, fillColor: "#FFFFFF", fillOpacity: 0
	          });		
		    map.addOverLay(polygon);

	    	$('#map-search-data-div').css('display','block');
	        $('#map-search-data').bootstrapTable('refresh');       
	  });
	    
//	});

//坐标点定位（注意：必须是先筛选，再定位，逻辑不能错）
var Mmarker;
var selections;
$("#map-search-data").on("click",function(){
	selections = $('#map-search-data').bootstrapTable('getSelections');
	//console.log(selections[0])
    if (selections[0].governancetypeid ==0){   	
        $('#map-search-data-toorbar-xxgk').css('display','none');
        $('#map-search-data-toorbar-bqbr-xxgk').css('display','none');
        $('#map-search-data-toorbar-gczl-xxgk').css('display','none');
		$('#map-search-data-toorbar-zd-sxgx').css('display','inline-block');
		$('#map-search-data-toorbar-bqbr-sxgx').css('display','none');
		$('#map-search-data-toorbar-gczl-sxgx').css('display','none');
		$('#map-search-data-toorbar-tjzlfa').css('display','inline-block');
		$('#map-search-data-toorbar-bqry').css('display','none');
		$('#map-search-data-toorbar-bqbr-zlsc').css('display','none');
		/*$('#map-search-data-toorbar-bqbr-zlxz').css('display','none');*/
		$('#map-search-data-toorbar-gczl-zlsc').css('display','none');
		/*$('#map-search-data-toorbar-gczl-zlxz').css('display','none');*/
	}
    else if(selections[0].governancetypeid ==1){  
        $('#map-search-data-toorbar-xxgk').css('display','none');
        $('#map-search-data-toorbar-bqbr-xxgk').css('display','inline-block');
        $('#map-search-data-toorbar-gczl-xxgk').css('display','none');
        
    	$('#map-search-data-toorbar-zd-sxgx').css('display','none');
		$('#map-search-data-toorbar-bqbr-sxgx').css('display','inline-block');
		$('#map-search-data-toorbar-gczl-sxgx').css('display','none');
		$('#map-search-data-toorbar-tjzlfa').css('display','none');
		$('#map-search-data-toorbar-bqry').css('display','inline-block');
		$('#map-search-data-toorbar-bqbr-zlsc').css('display','none');
		/*$('#map-search-data-toorbar-bqbr-zlxz').css('display','inline-block');*/
		$('#map-search-data-toorbar-gczl-zlsc').css('display','none');
		/*$('#map-search-data-toorbar-gczl-zlxz').css('display','none');*/
    	}
    else if(selections[0].governancetypeid ==2){
        $('#map-search-data-toorbar-xxgk').css('display','none');
        $('#map-search-data-toorbar-bqbr-xxgk').css('display','none');
        $('#map-search-data-toorbar-gczl-xxgk').css('display','inline-block');
        
    	$('#map-search-data-toorbar-zd-sxgx').css('display','none');
		$('#map-search-data-toorbar-bqbr-sxgx').css('display','none');
		$('#map-search-data-toorbar-gczl-sxgx').css('display','inline-block');
		$('#map-search-data-toorbar-tjzlfa').css('display','none');
		$('#map-search-data-toorbar-bqry').css('display','none');
		$('#map-search-data-toorbar-bqbr-zlsc').css('display','none');
		/*$('#map-search-data-toorbar-bqbr-zlxz').css('display','none');*/
		$('#map-search-data-toorbar-gczl-zlsc').css('display','none');
		/*$('#map-search-data-toorbar-gczl-zlxz').css('display','inline-block');*/
    	} 
	if (Mmarker) {
		map.removeOverLay(Mmarker);
	}
	map.centerAndZoom(new T.LngLat(selections[0].xcoordinate, selections[0].ycoordinate), 12);
	var icon1 = new T.Icon({  
        iconUrl: "static/images/location.gif", 
        iconSize: new T.Point(40, 40), 
        iconAnchor: new T.Point(20, 32) 
    }); 
    //向地图上添加自定义标注 
	Mmarker = new T.Marker(new T.LngLat(selections[0].xcoordinate, selections[0].ycoordinate), {icon: icon1}); 
    map.addOverLay(Mmarker);  

});

//function startLoad(){
//	$.ajax({
//        type: "POST",
//        url: "map/list_map",
//       // data:data,
//        dataType: "json",
//        success: function(data){ 
//       		loadMap();
//       	    drawTMakers(data.rows);  
//       	    //console.log(data.rows)
//       	    addTEvent(iconMarkers,data.rows);  		            
//          }
//     });
//	
//	var strpoint="118.240193,28.922601,118.21372,28.911243,118.201438,28.911268,118.201105,28.920382,118.212978,28.9265,118.228673,28.942318,118.234815,28.953405,118.228565,28.956416,118.217783,28.9548,118.208048,28.959908,118.194839,28.981127,118.179536,28.991643,118.158113,28.993776,118.140677,28.989929,118.131844,29.000431,118.10449,28.997003,118.104255,29.003189,118.0978,29.012539,118.094368,29.034266,118.085752,29.043226,118.077904,29.045266,118.078145,29.050197,118.072328,29.054944,118.07324,29.060684,118.081683,29.068257,118.081503,29.080878,118.075554,29.086101,118.051713,29.094737,118.04387,29.103042,118.048687,29.115667,118.056945,29.118281,118.058853,29.12225,118.044734,29.132082,118.049169,29.144256,118.049787,29.16326,118.034255,29.174875,118.050729,29.218833,118.057218,29.223563,118.063673,29.220882,118.078188,29.222636,118.087565,29.2395,118.086849,29.2491,118.081438,29.252672,118.086131,29.27264,118.078419,29.295524,118.085827,29.296588,118.109112,29.290981,118.121726,29.299549,118.127888,29.293819,118.14474,29.289686,118.160517,29.292858,118.173935,29.302684,118.18239,29.303472,118.18187,29.311972,118.17238,29.319787,118.185537,29.327512,118.190622,29.340115,118.212194,29.351714,118.214892,29.361106,118.209696,29.37415,118.214469,29.382586,118.199997,29.394532,118.198729,29.40155,118.208546,29.400182,118.223854,29.426543,118.254389,29.436992,118.262524,29.43179,118.273685,29.433487,118.28351,29.429119,118.292004,29.432608,118.300561,29.425157,118.321827,29.428898,118.321552,29.458562,118.312051,29.496506,118.316243,29.502274,118.330103,29.503226,118.33383,29.502572,118.353369,29.479989,118.351412,29.474878,118.357322,29.460924,118.372591,29.456104,118.380256,29.44256,118.391529,29.436718,118.397031,29.429852,118.409531,29.431215,118.418276,29.427362,118.412443,29.411862,118.431679,29.404287,118.430085,29.39324,118.455652,29.380819,118.469012,29.366672,118.476444,29.366285,118.490875,29.373119,118.510313,29.365913,118.524267,29.369705,118.530611,29.364971,118.52565,29.350559,118.545297,29.350275,118.549037,29.343864,118.554377,29.342693,118.57829,29.344584,118.584937,29.339495,118.591696,29.339833,118.594861,29.334657,118.601385,29.337307,118.609862,29.331398,118.610528,29.320839,118.622638,29.31126,118.621132,29.302881,118.636988,29.284396,118.642705,29.272037,118.641435,29.267821,118.626889,29.283129,118.616213,29.28493,118.61254,29.272699,118.621623,29.256934,118.61461,29.243652,118.625645,29.226583,118.638274,29.224602,118.640051,29.212083,118.633224,29.202479,118.635253,29.197684,118.690316,29.20911,118.710137,29.196618,118.72202,29.196403,118.72752,29.204096,118.736899,29.206397,118.747141,29.218277,118.762395,29.220791,118.771969,29.227727,118.771788,29.241506,118.768113,29.247224,118.770033,29.255118,118.783853,29.25916,118.790413,29.26608,118.791633,29.272761,118.818187,29.28723,118.831137,29.285777,118.835297,29.295261,118.861096,29.308994,118.86711,29.322026,118.875773,29.328782,118.882602,29.332579,118.894473,29.329263,118.906775,29.339236,118.933692,29.316462,118.94852,29.313402,118.955572,29.306117,118.968567,29.301253,118.967316,29.296994,118.954599,29.28769,118.967955,29.27404,118.972263,29.27465,118.984847,29.264528,118.993547,29.250295,118.99127,29.23559,119.008081,29.213645,119.051259,29.228107,119.055709,29.228313,119.056023,29.225429,119.069292,29.233323,119.08125,29.229821,119.091668,29.236255,119.111855,29.233428,119.133962,29.242889,119.13795,29.241607,119.133819,29.234131,119.136291,29.227798,119.142974,29.226203,119.158252,29.23388,119.161964,29.229809,119.16155,29.22331,119.167143,29.226557,119.173287,29.22556,119.183822,29.213331,119.195277,29.212179,119.20033,29.223014,119.19608,29.234482,119.207235,29.235462,119.212309,29.228264,119.218572,29.230234,119.21687,29.246288,119.22082,29.252171,119.197518,29.26688,119.204323,29.276693,119.210739,29.280007,119.206424,29.283441,119.205203,29.295119,119.216394,29.289498,119.234951,29.289192,119.232999,29.281643,119.24489,29.264568,119.243523,29.256892,119.267143,29.254175,119.253999,29.237523,119.239873,29.227545,119.239482,29.2054,119.235219,29.199897,119.248712,29.194506,119.249818,29.177851,119.246559,29.172817,119.25956,29.159201,119.257937,29.145742,119.27147,29.142032,119.275532,29.125332,119.288379,29.12272,119.307123,29.106607,119.308965,29.092283,119.326042,29.091528,119.338818,29.022195,119.330237,29.00914,119.33198,29.000953,119.328868,28.995436,119.335807,28.989732,119.330368,28.981757,119.329562,28.971269,119.320221,28.959837,119.323416,28.943104,119.332697,28.941416,119.337522,28.91517,119.346646,28.910235,119.352257,28.901786,119.349264,28.889954,119.339029,28.886173,119.338759,28.882695,119.342584,28.880961,119.33885,28.869626,119.327208,28.875673,119.320526,28.867413,119.315302,28.86799,119.318415,28.864155,119.313175,28.825489,119.315247,28.813681,119.308401,28.809586,119.291302,28.812128,119.282189,28.808852,119.277748,28.794434,119.260813,28.781444,119.252075,28.76763,119.229001,28.770679,119.21758,28.776909,119.210643,28.773092,119.193505,28.776405,119.172423,28.752167,119.16628,28.754028,119.152741,28.747051,119.133391,28.742824,119.10881,28.748812,119.101877,28.748066,119.092926,28.741111,119.08608,28.745609,119.061152,28.734096,119.048701,28.718497,119.032872,28.714393,119.012918,28.700889,119.006592,28.689829,118.998544,28.684481,118.968904,28.647982,118.95941,28.653663,118.936963,28.647565,118.931131,28.639832,118.93138,28.630112,118.920653,28.618686,118.92224,28.606543,118.915251,28.600317,118.912742,28.582428,118.920189,28.572192,118.883004,28.526833,118.874908,28.524624,118.869142,28.537293,118.860175,28.539116,118.855429,28.547363,118.842238,28.546632,118.829584,28.55412,118.810707,28.540109,118.799968,28.540508,118.789616,28.535764,118.784066,28.523616,118.765752,28.53059,118.754934,28.527827,118.748354,28.516857,118.726385,28.499047,118.734893,28.485997,118.730053,28.469946,118.735892,28.462171,118.728313,28.421207,118.732843,28.416758,118.741632,28.423483,118.759215,28.422652,118.762713,28.415773,118.76128,28.403597,118.747675,28.384402,118.745757,28.36643,118.735375,28.352185,118.72787,28.344743,118.705739,28.332876,118.704868,28.316065,118.694369,28.294841,118.680877,28.278809,118.670056,28.276363,118.655266,28.282779,118.64673,28.28046,118.640238,28.268848,118.632082,28.267411,118.62799,28.2619,118.606887,28.260169,118.601302,28.263778,118.603466,28.275833,118.591918,28.29042,118.571615,28.292011,118.5601,28.288382,118.552689,28.293106,118.552155,28.281861,118.53484,28.276142,118.52121,28.274206,118.511485,28.285112,118.50483,28.283212,118.49994,28.268624,118.504816,28.255044,118.495243,28.244826,118.482113,28.254533,118.470352,28.251069,118.454188,28.254456,118.449245,28.260476,118.455941,28.265081,118.43911,28.279995,118.436629,28.285831,118.439554,28.297285,118.465506,28.306563,118.477981,28.323706,118.488022,28.329291,118.493546,28.339014,118.489075,28.345822,118.476713,28.349007,118.475064,28.36188,118.468874,28.367315,118.460519,28.387554,118.445962,28.399499,118.442044,28.412404,118.462636,28.435042,118.476448,28.470046,118.484325,28.480257,118.477945,28.486611,118.457874,28.486479,118.442175,28.501368,118.428396,28.500015,118.420039,28.504908,118.425425,28.509834,118.440355,28.510655,118.451938,28.518413,118.445054,28.525701,118.437668,28.524058,118.432208,28.529695,118.433918,28.533041,118.428799,28.53954,118.430646,28.544364,118.426531,28.546624,118.43208,28.553024,118.420326,28.560999,118.415089,28.575655,118.424164,28.579432,118.421178,28.586047,118.426107,28.604835,118.420169,28.606601,118.420517,28.609528,118.43033,28.61736,118.438434,28.629988,118.424609,28.651618,118.425756,28.657076,118.434962,28.659888,118.439057,28.670096,118.436981,28.684764,118.424751,28.683937,118.419711,28.699532,118.410383,28.706118,118.406194,28.717301,118.409808,28.724332,118.390708,28.767986,118.390771,28.78512,118.374187,28.813856,118.333366,28.823174,118.325195,28.829183,118.309136,28.830592,118.301658,28.838294,118.308526,28.84635,118.30408,28.851677,118.301422,28.86482,118.294132,28.871535,118.276813,28.923551,118.262551,28.930176,118.240193,28.922601";
//	  //初始化地图对象
//	var arrpoint=strpoint.split(",");
//	    var points = [];
//		for(var i=0;i<arrpoint.length;i=i+2)
//      {
//        points.push(new T.LngLat(arrpoint[i], arrpoint[i+1]));
//      }
//        //创建面对象
//        var polygon = new T.Polygon(points,{
//            color: "blue", weight: 3, opacity: 0.5, fillColor: "#FFFFFF", fillOpacity: 0.5
//        });		
//	 map.addOverLay(polygon);
//}

    //table关闭
    $('#map-search-data-toorbar-close').on("click", function(){
    	$('#map-search-data-div').css('display','none');
    });
    //切换影像          待定
/*    $('#search-form-group-btn').on("click", function(){
    	  var map;
          var zoom = 8;
          var lay;
          var onlyMapLay;
              var imageURL = "http://t0.tianditu.cn/img_w/wmts?" +
                      "SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles" +
                      "&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}";
              //创建自定义图层对象
              lay = new T.TileLayer(imageURL,{minZoom:1,maxZoom:18});
              var config = {layers: [lay]};
              //初始化地图对象
              map = new T.Map("mapDiv", config);
              //设置显示地图的中心点和级别
              map.centerAndZoom(new T.LngLat(116.40969, 39.89945), zoom);
              //允许鼠标滚轮缩放地图
              map.enableScrollWheelZoom();  
    });
    */
    
	$('#account-Manager-add-dialog').modal({
        keyboard: true,
        backdrop: "static",
        show:false
    });
    //“暂定”的概况信息
    $("#map-search-data-toorbar-xxgk").on("click",function(){
    	selections = $('#map-search-data').bootstrapTable('getSelections');
    	//$('#form-test').form('load',selections[0]); 
    	$('#account-Manager-add-dialog-sxgx').modal('show');
    	FormUtils.loadForm('form-sxgx', selections[0]);
    	$("#sxgx-close").on("click",function(){
    		$('#search-form-group').css('display','block');	
    		$('#map-search-data-div').css('display','block');
    	})
    });
    
    //“搬迁避让”的概况信息1111
    $("#map-search-data-toorbar-bqbr-xxgk").on("click",function(){
    	selections = $('#map-search-data').bootstrapTable('getSelections');
    	//$('#form-test').form('load',selections[0]); 
	   	var BqbrXxgk={};
	   	BqbrXxgk.id = selections[0].id;
	    Ajax.getJson("relocation/search_relocation",BqbrXxgk, function(data){	 
    	$('#account-Manager-add-dialog-bqbr-second').modal('show');
    	console.log(data)
    	
    	treeConframe.window.goto_treenode_by_projectid(data.rows[0].id,1);
    	FormUtils.loadForm('form-second-bqbr',data.rows[0]);
    	$("#bqbr-second-close").on("click",function(){
    		$('#search-form-group').css('display','block');	
    		$('#map-search-data-div').css('display','block');
    	});
	  })
    });
    
    //“工程治理”的概况信息1212121
    $("#map-search-data-toorbar-gczl-xxgk").on("click",function(){
    	selections = $('#map-search-data').bootstrapTable('getSelections');
    	//$('#form-test').form('load',selections[0]); 
	   	var GczlXxgk={};
	   	GczlXxgk.id = selections[0].id;
	  Ajax.getJson("engineer/search_engineer",GczlXxgk, function(data){	 
    	$('#account-Manager-add-dialog-gczl-sxgx-second').modal('show');
    	treeConframe1.window.goto_treenode_by_projectid(data.rows[0].id,2);
    	FormUtils.loadForm('form-second-gczl',data.rows[0]);
    	$("#gczl-sxgx-second-close").on("click",function(){
    		$('#search-form-group').css('display','block');	
    		$('#map-search-data-div').css('display','block');
    	});
	  })
    });
    //“暂定”的属性更新
    $("#map-search-data-toorbar-zd-sxgx").on("click",function(){
    	//$('#form-test').form('load',selections[0]); 
    	//console.log(selections[0]);
    	selections = $('#map-search-data').bootstrapTable('getSelections');
    	//console.log(selections[0])
    	FormUtils.loadForm('form-start-sxgx', selections[0]);
    	$('#account-Manager-add-dialog-start-sxgx').modal('show');
    	//$('#map-search-data-div').css('display','none');
        	$("#start-sxgx-close").on("click",function(){
        		$('#map-search-data-div').css('display','block');
        	})   	
    });
    
    
    //“暂定”的属性更新提交
    $("#start-save-submit").on("click",function(){
     	var params = FormUtils.getData("form-start-sxgx");
     	//console.log(selections[0])
     	//params.plancompletiontime=params.strplancompletiontime;
     	params.id=selections[0].id;
     	console.log(params)
     	Ajax.postJson(baseUrl+'map/update_map', params, function(data){
     		if(data.code > 0){ 
                 $.gritter.add({
 	                title: '提示',
 	                text: '保存成功',
 	                time: 1000,	                

                 }); 
             }else{                
                 	$.gritter.add({
                         title: '提示',
                         text: '保存失败:' + data.message,
                         time: 1000,
                 });
              }
     	});
     	//刷新有问题
     	$('#map-search-data').bootstrapTable('refresh');
     	$('#account-Manager-add-dialog-start-sxgx').modal('hide');
     	$('#search-form-group').css('display','block');	
     	$('#map-search-data-div').css('display','block');	 
 	});
 
    //添加治理方案
   $("#map-search-data-toorbar-tjzlfa").on("click",function(){
    	//$('#form-test').form('load',selections[0]); 
	   selections = $('#map-search-data').bootstrapTable('getSelections');
    	$('#account-Manager-add-dialog-result').modal('show');
    	//FormUtils.loadForm('form-test-result', selections[0].name);
    	//$('#map-search-data-div').css('display','none');
        	$("#ckjdjg-close").on("click",function(){
        		$('#map-search-data-div').css('display','block');
        	})
    });
   
   //添加治理方案提交
   $("#add-save-submit").on("click",function(){
	 selections = $('#map-search-data').bootstrapTable('getSelections');
   	var params = FormUtils.getData("form-test-result");
   	//params.plancompletiontime=params.strplancompletiontime;
   	params.hiddendanger_id=selections[0].id;
   	params.name = selections[0].name;
   	console.log(params)
   	if(params.governancetype=="1"){
	    		Ajax.postJson(baseUrl+'relocation/add_relocationProject', params, function(data){
	    		if(data.code > 0){ 
	                $.gritter.add({
		                title: '提示',
		                text: '保存成功',
		                time: 1000,	                
	
	                }); 
	            }else{                
	                	$.gritter.add({
	                 title: '提示',
	                        text: '保存失败:' + data.message,
	                        time: 1000,
	                });
	             }
	    	});
   	}
	    else if(params.governancetype=="2"){
	    	Ajax.postJson(baseUrl+'engineer/add_engineerproject', params, function(data){
	    		if(data.code > 0){ 
	                $.gritter.add({
		                title: '提示',
		                text: '保存成功',
		                time: 1000,	                
	
	                }); 
	            }else{                
	                	$.gritter.add({
	                 title: '提示',
	                        text: '保存失败:' + data.message,
	                        time: 1000,
	                });
	             }
	    	});
	    }
   	//刷新没问题
   	$('#map-search-data').bootstrapTable('refresh');
   	$('#account-Manager-add-dialog-result').modal('hide');
   	$('#search-form-group').css('display','block'); 
   	$('#map-search-data-div').css('display','block');
	});
   
   //搬迁避让属性更新
   $("#map-search-data-toorbar-bqbr-sxgx").on("click",function(){
   	selections = $('#map-search-data').bootstrapTable('getSelections');
   	var BqbrSxgxs={};
   	BqbrSxgxs.id = selections[0].id;
	    Ajax.getJson("relocation/search_relocation",BqbrSxgxs, function(data){
			console.log(data)
	 	$('#account-Manager-add-dialog-bqbr').modal('show');
		FormUtils.loadForm('form-bqbr',data.rows[0]);
		//$('#map-search-data-div').css('display','none');
		//$('#search-form-group').css('display','none');
		$("#bqbr-close").on("click",function(){
			$('#search-form-group').css('display','block');	
			$('#map-search-data-div').css('display','block');
		  });
	   })
   });
   
   //“搬迁避让”属性更新提交
   $("#bqbr-save-submit").on("click",function(){
    	var params = FormUtils.getData("form-bqbr");
    	Ajax.postJson(baseUrl+'relocation/update_relocationProject', params, function(data){
    		if(data.code > 0){ 
                $.gritter.add({
	                title: '提示',
	                text: '保存成功',
	                time: 1000,	                

                }); 
            }else{                
                $.gritter.add({
                   title: '提示',
                   text: '保存失败:' + data.message,
                   time: 1000,
                });
             }
    	});
    	//刷新有问题
    	$('#map-search-data').bootstrapTable('refresh');
    	$('#account-Manager-add-dialog-bqbr').modal('hide');
    	$('#search-form-group').css('display','block');	
    	$('#map-search-data-div').css('display','block');	 
	});
  
   
   
   
   
   
   var bg = function(value,row){
  	 switch (value)
  	 {
  	 case 0:
  	 	return "未搬迁";
  	 case 1:
  		return "已搬迁";
  	 }
  }
var Edit = function(value,row){
 	var html = '<a href="javascript:void(0)" class="Edit-edit" data-id="'+ row.id + '"  >修改</a>'
 	+	'&nbsp;<a href="javascript:void(0)"  class="delete" data-id="'+ row.id + '"  >删除</a>' ;
 	
 	return html;
 }
	//搬迁人员
	$("#map-search-data-toorbar-bqry").on("click",function() {
	   	selections = $('#map-search-data').bootstrapTable('getSelections');
	   	var BqbrBqry={};
	   	BqbrBqry.id = selections[0].id;
	    Ajax.getJson("relocation/search_relocation",BqbrBqry, function(data){
		//console.log(data)
		
		$('#House-Manager-bqry-dialog').modal('show');
		 Ajax.postJson("person/list_person",{project_id:data.rows[0].id}, function(data){
	            if(data.code > 0){
	            	$('#House-bqry-data').bootstrapTable('load', data);
	            	  
	            }else{                
	            	$.bootstrapGrowl(data.message, {
	                    type: 'info',
	                    align: 'center',
	                    delay: 3000,
	                    width: 'auto',
	                });
	            }
	        });	 
         })
	});
	
	$('#House-bqry-data').bootstrapTable({
	url : 'person/list_person', // 请求后台的URL（*）
	method : 'get', // 请求方式（*）
	striped : true, // 是否显示行间隔色
	cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
	pagination : false, // 是否显示分页（*）
	sortable : false, // 是否启用排序
	sortOrder : "asc", // 排序方式
	sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
	pageNumber : 1, // 初始化加载第一页，默认第一页
	pageSize : 8, // 每页的记录行数（*）
	paginationHAlign : 'left',
	paginationDetailHAlign : "right",
	// pageList: [10, 20, 50], //可供选择的每页的行数（*）
	// showPaginationSwitch: true,
	height : 300,
	singleSelect : true,
	minimumCountColumns : 2, // 最少允许的列数
	clickToSelect : true, // 是否启用点击选中行
	uniqueId : "id", // 每一行的唯一标识，一般为主键列
	cardView : false, // 是否显示详细视图
	detailView : false, // 是否显示父子表
	columns: [
		{checkbox : true},
		{field : 'id',title : '序号'}, 
		{field : 'name',title : '姓名'}, 
		{field : 'family',title : '人口'}, 
		{field : 'relocate_flag',title : '是否搬迁',formatter:bg}, 
		{field : 'relocate_time',title : '搬迁时间'},
		{field: 'cz',title: '操作', formatter:Edit},   
  ],
	dataType : 'json',
	queryParams : function(params) {
		if (params) {
			params.start = params.offset;
			params.rows = params.limit;				
		}
		return params;
	},
	responseHandler : function(res) {
		if (res.code > 0) {
			return res;
		} else {
			return [];
		}
	},
	
});	
//搬迁人员修改
$("#House-bqry-data-div").on("click",".Edit-edit",function(){
	row = $('#House-bqry-data').bootstrapTable('getSelections');
	$('#settlement-monitor-bq-dialog').modal('show');
	FormUtils.clearForm("add-settlement-form");
	FormUtils.loadForm("add-settlement-form",row[0]);
}); 
//保存
$("#settlement-add-dq-btn").on("click",function(){
	var params = FormUtils.getData("add-settlement-form");
	params.id = row[0].id;
	Ajax.postJson(baseUrl+'person/update_person', params, function(data){
		if(data.code > 0){ 
          $.gritter.add({
              title: '提示',
              text: '保存成功',
              time: 1000,	                

          });
	       
      }else{                
          	$.gritter.add({
           title: '提示',
                  text: '保存失败:' + data.message,
                  time: 1000,
          });
       }
		
       $('#settlement-monitor-bq-dialog').modal('hide');
       $('#House-Manager-bqry-dialog').modal('hide');
       //$('#House-bqry-data').bootstrapTable('refresh'); 
	});
	 
});

//添加搬迁人员
$("#settlement-monitor-toorbar-add").on("click",function(){
	$('#settlement-monitor-bq-add-dialog').modal('show');
	 
}); 
//添加搬迁人员保存
$("#settlement-add-dq-btn-add").on("click",function(){
	selections = $('#map-search-data').bootstrapTable('getSelections');
   	var BqbrBqrybc={};
   	BqbrBqrybc.id = selections[0].id;
    Ajax.getJson("relocation/search_relocation",BqbrBqrybc, function(data){
	var params = FormUtils.getData("add-bq-settlement-form");
	params.id = data.rows[0].id;
	console.log(params)
	Ajax.postJson(baseUrl+'person/add_person', params, function(data){
		if(data.code > 0){ 
          $.gritter.add({
              title: '提示',
              text: '保存成功',
              time: 1000,	                
          });
	       
      }else{                
          	$.gritter.add({
           title: '提示',
                  text: '保存失败:' + data.message,
                  time: 1000,
          });
       }
		
       $('#settlement-monitor-bq-add-dialog').modal('hide');
       $('#House-Manager-bqry-dialog').modal('hide');
       $('#House-bqry-data').bootstrapTable('refresh'); 
	 });
    });
	 
});
	
//搬迁人员删除
$("#House-bqry-data-div").on("click",".delete",function(){
	$('#account-Manager-delete-dialog').modal('show');
});
//删除
$("#account-Manager-delete-dialog-comfirm").on("click",function(){
   	var del = $('#House-bqry-data').bootstrapTable('getSelections');
	Ajax.postJson(baseUrl+'person/deluser', {id:del[0].id}, function(data){
		if(data.code > 0){
          $.gritter.add({
              title: '提示',
              text: '成功',
              time: 1000,	                
          });
      }else{                
      	$.bootstrapGrowl(""+ data.message, {
              type: 'info',
              align: 'center',
              delay: 3000,
              width: 'auto',
          });
      }
	});
 
	$('#account-Manager-delete-dialog').modal('hide');
	$('#House-Manager-bqry-dialog').modal('hide');
	$('#House-bqry-data').bootstrapTable('refresh'); 
});
   //资料上传(搬迁避让)
   $("#map-search-data-toorbar-bqbr-zlsc").on("click",function(){
	selections = $('#map-search-data').bootstrapTable('getSelections');
   	var BqbrZlsc={};
   	BqbrZlsc.id = selections[0].id;
	    Ajax.getJson("relocation/search_relocation",BqbrZlsc, function(data){
			//console.log(data.rows[0].id)
	    fileConframe.window.goto_uploadfile_by_projectid(data.rows[0].id,1);
   	   $('#account-Manager-add-dialog-bqbr-zlsc').modal('show');

   	   //FormUtils.loadForm('form-test-qlr', selections[0]);
   	   $('#map-search-data-div').css('display','none');
		$("#bqbr-zlsc-close").on("click",function(){
			$('#search-form-group').css('display','block');	
			$('#map-search-data-div').css('display','block');
		  });
	   })    	
   });
 //资料下载(搬迁避让)
  $("#map-search-data-toorbar-bqbr-zlxz").on("click",function(){       	
    	selections = $('#map-search-data').bootstrapTable('getSelections');
       	var BqbrZlxz={};
       	BqbrZlxz.id = selections[0].id;
    	 Ajax.getJson("relocation/search_relocation",BqbrZlxz, function(data){
    	    treeConframe.window.goto_treenode_by_projectid(data.rows[0].id,1);
       	   $('#account-Manager-add-dialog-bqbr-zlxz').modal('show');

       	   //FormUtils.loadForm('form-test-qlr', selections[0]);
       	   $('#map-search-data-div').css('display','none');
    		$("#bqbr-zlxz-close").on("click",function(){
    			$('#search-form-group').css('display','block');	
    			$('#map-search-data-div').css('display','block');
    		  });
    	   })  
   });
//“工程治理”属性更新
  $("#map-search-data-toorbar-gczl-sxgx").on("click",function(){
	  selections = $('#map-search-data').bootstrapTable('getSelections');
	   	var GczlSxgxs={};
	   	GczlSxgxs.id = selections[0].id;
	  Ajax.getJson("engineer/search_engineer",GczlSxgxs, function(data){
	  $('#account-Manager-add-dialog-gczl-sxgx').modal('show');
	  FormUtils.loadForm('form-gczl',data.rows[0]);
	  //$('#map-search-data-div').css('display','none');
	  //$('#search-form-group').css('display','none');
	  $("#gczl-sxgx-close").on("click",function(){
		 $('#search-form-group').css('display','block');	 
		 $('#map-search-data-div').css('display','block');
	     });
	  })	   
   });
  //“工程治理”属性更新提交
  $("#gczl-save-submit").on("click",function(){
   	var params = FormUtils.getData("form-gczl");
   	Ajax.postJson(baseUrl+'engineer/update_engineerproject', params, function(data){
   		if(data.code > 0){ 
               $.gritter.add({
	                title: '提示',
	                text: '保存成功',
	                time: 1000,	                

               }); 
           }else{                
               	$.gritter.add({
                title: '提示',
                       text: '保存失败:' + data.message,
                       time: 1000,
               });
            }
   	  });
   	//刷新有问题
   	$('#map-search-data').bootstrapTable('refresh');
   	$('#account-Manager-add-dialog-gczl-sxgx').modal('hide');
   	$('#search-form-group').css('display','block');	
   	$('#map-search-data-div').css('display','block');	 
  }); 
 
  //资料上传(工程治理)
  $("#map-search-data-toorbar-gczl-zlsc").on("click",function(){
	selections = $('#map-search-data').bootstrapTable('getSelections');
  	var GczlZlsc={};
  	GczlZlsc.id = selections[0].id;
	    Ajax.getJson("engineer/search_engineer",GczlZlsc, function(data){
			//console.log(data.rows[0].id)
	    fileConframe1.window.goto_uploadfile_by_projectid(data.rows[0].id,2);
  	   $('#account-Manager-add-dialog-gczl-zlsc').modal('show');
  	   //FormUtils.loadForm('form-test-qlr', selections[0]);
  	   $('#map-search-data-div').css('display','none');
		$("#gczl-zlsc-close").on("click",function(){
			$('#search-form-group').css('display','block');	
			$('#map-search-data-div').css('display','block');
		  });
	   })    	
  });
//资料下载(工程治理)
 $("#map-search-data-toorbar-gczl-zlxz").on("click",function(){       	
   	selections = $('#map-search-data').bootstrapTable('getSelections');
      	var GczlZlxz={};
      	GczlZlxz.id = selections[0].id;
   	 Ajax.getJson("engineer/search_engineer",GczlZlxz, function(data){
   	    treeConframe1.window.goto_treenode_by_projectid(data.rows[0].id,2);
      	   $('#account-Manager-add-dialog-gczl-zlxz').modal('show');
      	   //FormUtils.loadForm('form-test-qlr', selections[0]);
      	   $('#map-search-data-div').css('display','none');
   		$("#gczl-zlxz-close").on("click",function(){
   			$('#search-form-group').css('display','block');	
   			$('#map-search-data-div').css('display','block');
   		  });
   	   })  
  });
 
 $('#account-Manager-add-dialog-bqbr-zlsc').modal({
	    keyboard: true,
	    backdrop: "static",
	    show:false
	});
 $('#account-Manager-add-dialog-bqbr').modal({
	    keyboard: true,
	    backdrop: "static",
	    show:false
	});

 $('#account-Manager-add-dialog-bqbr-zlxz').modal({
	    keyboard: true,
	    backdrop: "static",
	    show:false
	});

$('#account-Manager-add-dialog-gczl-zlsc').modal({
    keyboard: true,
    backdrop: "static",
    show:false
});

$('#account-Manager-add-dialog-start-sxgx').modal({
    keyboard: true,
    backdrop: "static",
    show:false
}); 
$('#account-Manager-add-dialog-gczl-sxgx').modal({
    keyboard: true,
    backdrop: "static",
    show:false
}); 
$('#account-Manager-add-dialog-bqbr').modal({
    keyboard: true,
    backdrop: "static",
    show:false
}); 

$('#account-Manager-add-dialog-result').modal({
    keyboard: true,
    backdrop: "static",
    show:false
});
//禁用空白处点击关闭
$('#account-Manager-add-dialog-gczl-zlxz').modal({
    keyboard: true,
    backdrop: "static",
    show:false
});
$('#House-Manager-bqry-dialog').modal({
    keyboard: true,
    backdrop: "static",
    show:false
});

