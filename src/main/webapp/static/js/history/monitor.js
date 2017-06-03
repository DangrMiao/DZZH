$(function(){
    //点击地基监测按钮
    $('#map-search-data-toorbar-djjc').on('click', function(){
        var selections = $('#map-search-data').bootstrapTable('getSelections');
        console.log(selections);
        if(!selections || selections.length < 1){
            return;
        }

        //show 监测地基的dialog
        $('#settlement-monitor-dialog').modal('show');
    });

    $('#settlement-monitor-dialog').modal({
        keyboard: true,
        backdrop: "static",
        show:false
    });

    //初始化沉降监测的tab
    var settTable = new CloseableTable("settlement-monitor-tab");
    settTable.add('新建观察点', "static/html/monitor/settlement/addPoints.html", "addPoints");
    // settTable.add('垃圾观察点', "static/html/monitor/settlement/addPoints.html", "addPoints233");
});