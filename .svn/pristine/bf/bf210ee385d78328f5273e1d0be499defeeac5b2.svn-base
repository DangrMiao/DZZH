$(function(){
    $('#add-house-btn').on("click", function(){
        RegionSelector.startSelect(addHouse);
    });

    var isHousePanelShow = false;
    var onHousePanelClose = null;
    /**
     * 添加房屋
     * @param {*} data 
     */
    function addHouse(data){

        //打开面板
        if(!isHousePanelShow){
            showHosePanel(function(){
                RegionSelector.cancel();
                //debugger;
            });
        }

        //确定地址
        //经纬度
        $('#house-info-lat-lon').text("东经" + data.lon + ", 北纬" + data.lat);
        $('#house-info-lon').val(data.lon);
        $('#house-info-lat').val(data.lat);

        //村和街道
        $('#house-info-village').text(data.name);
        $('#house-info-street').text(data.street);

        $('#house-info-village-name').val(data.name);
        $('#house-info-village-id').val(data.id);
        $('#house-info-street-name').val(data.street);
        console.log(data);
    }

    /**
     * 显示面板
     * @param {*} onClose
     */
    function showHosePanel(onClose){
        if(onClose){
            onHousePanelClose = onClose;
        }

        if(!isHousePanelShow){
            isHousePanelShow = true;
            $('#house-info-panel').animate({right: 0}, "fast", function(){
                
            });
        }
    }

    /**
     * 隐藏添加房屋的面板
     * 
     */
    function hideHousePanel(){
        $('#house-info-panel').animate({right: -400}, "fast", function(){
            //清除数据
            FormUtils.clearForm("house-info-form");

            isHousePanelShow = false;
            if(onHousePanelClose){
                onHousePanelClose();
                onHousePanelClose = null;
            }
            $('#house-info-panel .house-panel-overlay').css("display", "none");
        });
    }

    //关闭
    $('#house-info-panel .close-panel-btn').on("click", function(){
        hideHousePanel();
    });
    $('#house-info-panel .panel-close-icon').on("click", function(){
        hideHousePanel();
    });


    //初始化表单的控件
    FormUtils.loadCombobox("house-info-build-year", "enum/list", "enumvalue", "enumvalue",{fieldName: "建造年代", tbName: ""}); //建筑年代
    FormUtils.loadCombobox("house-info-type", "enum/list", "enumvalue", "enumvalue", {fieldName: "住房类别", tbName: ""}); //住房类别
    FormUtils.loadCombobox("house-info-use-situation", "enum/list", "enumvalue", "enumvalue", {fieldName: "住房使用状况", tbName: ""}); //住房使用情况
    FormUtils.loadCombobox("house-info-land-nature", "enum/list", "enumvalue", "enumvalue", {fieldName: "土地性质", tbName: ""}); //土地性质
    FormUtils.loadCombobox("house-info-structure-type", "enum/list", "enumvalue", "enumvalue", {fieldName: "结构类型", tbName: ""});//结构类型
    FormUtils.loadCombobox("house-info-danger-level", "enum/list", "enumvalue", "enumvalue", {fieldName: "危险性等级", tbName: ""});//危险等级
    FormUtils.loadCombobox("house-info-cs", "enum/list", "enumvalue", "enumvalue", {fieldName: "层数", tbName: ""});//层数

    var HouseValidateOptions = {
        showErrors: function(errorMap,errorList){
            console.log("errorlist", errorList);
            //console.log("errorMap", errorMap);
            if(errorList && errorList.length && errorList.length > 0){
                var error = errorList[0];
                //debugger;
                //$('#house-info-panel .validate-tips-label').text(error.message);
            }
        },
        submitHandler: function(form){
            saveHouse();
        },
        rules: {
            jzmj: "required",
            zdmj: "required",
            js: "required",
            cs: "required"
        },
        messages: {
            jzmj: "请输入建筑面积",
            zdmj: "请输入占地面积",
            js: "请输入间数",
            cs: "请输入层数"
        }
    }
    var validator = $('#house-info-form').validate(HouseValidateOptions);

     /**
     * 保存,这里不用表单提交是为了添加自定义的数据
     */
    function saveHouse(){
        var params = FormUtils.getData("house-info-form");
        $('#house-info-panel .house-panel-overlay').css("display", "flex");
        Ajax.postJson("settlementMonitor/point/save", params, function(data){
            $('#house-info-panel .house-panel-overlay').css("display", "none");
            if(data.code > 0){
                hideHousePanel();
                $.gritter.add({
                    title: '提示',
                    text: '保存成功',
                    time: 1000,
                    class_name: 'gritter-success'
                });
            }else{
                $.gritter.add({
                    title: '提示',
                    text: '保存失败:' + data.message,
                    time: 1000,
                    class_name: 'gritter-error'
                });
            }
        });
    }
    
    // 房屋面板-基本信息
	$('#house-info-panel-base').on("click",function() {
		$('.house-info-panel-form').css('display', 'none');
		$('#house-info-form').css('display', 'block');
	});
	
	// 房屋面板-地址信息
	$('#house-info-panel-address').on("click",function() {
		$('.house-info-panel-form').css('display', 'none');
		$('#house-info-panel-form-address').css('display', 'block');
	});
	
	// 房屋面板-权利人
	$('#house-info-panel-qlr').on("click",function() {
		$('.house-info-panel-form').css('display', 'none');
		$('#house-info-panel-form-qlr').css('display', 'block');
	});
	
	// 房屋面板-房屋设施
	$('#house-info-panel-fwss').on("click",function() {
		$('.house-info-panel-form').css('display', 'none');
		$('#house-info-panel-form-fwss').css('display', 'block');
	});
	
	// 房屋面板-鉴定表单
	$('#house-info-panel-jdb').on("click",function() {
		$('.house-info-panel-form').css('display', 'none');
		$('#house-info-panel-form-jdbd').css('display', 'block');
	});
	
	// 房屋面板-资金情况
	$('#house-info-panel-fund').on("click",function() {
		$('.house-info-panel-form').css('display', 'none');
		$('#house-info-panel-form-fund').css('display', 'block');
	});
	
	// 房屋面板-其他
	$('#house-info-panel-qt').on("click",function() {
		$('.house-info-panel-form').css('display', 'none');
		$('#house-info-panel-form-qt').css('display', 'block');
	});
	
});

