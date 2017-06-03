package com.wdkj.wf.conttoller.house;

import com.fh.controller.base.BaseController;
import com.fh.entity.system.User;
import com.fh.util.Const;
import com.fh.util.Jurisdiction;
import com.wdkj.wf.entity.monitor.SettlementObHistory;
import com.wdkj.wf.entity.monitor.SettlementObPoint;
import com.wdkj.wf.service.monitor.SettlementHistoryService;
import com.wdkj.wf.service.monitor.SettlementPointService;
import com.weidekeji.common.json.JsonResult;
import com.weidekeji.common.json.PagedJsonResult;
import com.weidekeji.common.util.JSONUtil;
import org.apache.shiro.session.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

/**
 * 沉降观测
 * @author tianwenjian
 * @create 2017-04-17 16:20
 **/
@RestController
public class SettlementMonitorController extends BaseController{

    @Autowired
    SettlementPointService settlementPointService;

    @Autowired
    SettlementHistoryService settlementHistoryService;

    /**
     * 观测点保存
     * @param params
     * @return
     */
    @RequestMapping(value = "settlementMonitor/point/save", produces="application/json;charset=UTF-8")
    public String saveObPoint(SettlementObPoint params, SettlementObHistory history){
        try {
            Session session = Jurisdiction.getSession();
            String userId = ((User)session.getAttribute(Const.SESSION_USER)).getUSER_ID();
            history.setUserId(userId);
            history.setRecordTime(new Date());
            settlementPointService.addPointWithHistory(params, history);
            return JSONUtil.toJsonString(new JsonResult(1, "保存成功！", null));
        }catch (Exception e){
            logger.error("保存时发生错误", e);
            return JSONUtil.toJsonString(new JsonResult(-1, "保存失败！", null));
        }
    }

    /**
     * 历史记录保存
     * @param params
     * @return
     */
    @RequestMapping(value = "settlementMonitor/history/save", produces="application/json;charset=UTF-8")
    public String saveObHistory(SettlementObHistory params){
        try {
        	 params.setRecordTime(new Date());
            settlementHistoryService.recordHistory(params);
            return JSONUtil.toJsonString(new JsonResult(1, "保存成功！", null));
        }catch (Exception e){
        	logger.error("错误", e);
            return JSONUtil.toJsonString(new JsonResult(-1, "保存失败！", null));
        }
    }

    /**
     * 监测点历史记录列表
     * @param params
     * @return
     */
    @RequestMapping(value = "settlementMonitor/history/list", produces="application/json;charset=UTF-8")
    public String listHistory(SettlementObHistory params){

        try {
            //settlementHistoryService.insert(params);
            List<SettlementObHistory> histories = settlementHistoryService.list(params);
			int count = settlementHistoryService.countHistories(params);
			return JSONUtil.toJsonString(new PagedJsonResult(histories, 1, "成功", count, params.getRows()));
        }catch (Exception e){
            logger.error("查询出错", e);
            return JSONUtil.toJsonString(new JsonResult(-1, "失败！", null));
        }
    }

    /**
     * 观测点列表
     * @param params
     * @return
     */
    @RequestMapping(value = "settlementMonitor/points/list", produces="application/json;charset=UTF-8")
    public String listPoints(SettlementObPoint params){

        try {
            List<SettlementObPoint> points = settlementPointService.list(params);
			int count = settlementPointService.countPoints(params);
			return JSONUtil.toJsonString(new PagedJsonResult(points, 1, "成功", count, params.getRows()));
        }catch (Exception e){
            logger.error("查询出错", e);
            return JSONUtil.toJsonString(new JsonResult(-1, "失败！", null));
        }
    }
}
