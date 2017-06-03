package com.wdkj.wf.service.monitor.impl;

import com.fh.dao.DaoSupport;
import com.fh.util.PageData;
import com.wdkj.wf.constraints.HouseConst;
import com.wdkj.wf.entity.monitor.SettlementObHistory;
import com.wdkj.wf.entity.monitor.SettlementObPoint;
import com.wdkj.wf.house.entity.WarnEntity;
import com.wdkj.wf.service.house_warn.WarnManager;
import com.wdkj.wf.service.monitor.SettlementHistoryService;
import com.wdkj.wf.service.monitor.SettlementPointService;
import com.weidekeji.common.util.DateUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author tianwenjian
 * @create 2017-04-17 15:19
 **/
@Service
public class SettlementHistoryServiceImpl implements SettlementHistoryService {
    private static final Log log = LogFactory.getLog(SettlementHistoryServiceImpl.class);

    @Resource(name = "daoSupport")
    DaoSupport daoSupport;

    @Autowired
    SettlementPointService settlementPointService;

    @Autowired
    WarnManager warnManager;

    @Override
    public SettlementObHistory getOne(SettlementObHistory params) {
        return daoSupport.getOne(SettlementObHistory.NAME_SPACE + ".getOne", params);
    }

    @Override
    public List<SettlementObHistory> list(SettlementObHistory params) {
        return daoSupport.list(SettlementObHistory.NAME_SPACE + ".list", params);
    }

    @Override
    public List<SettlementObHistory> page(SettlementObHistory params) {
        return null;
    }

    @Override
    public SettlementObHistory insert(SettlementObHistory params) {
        daoSupport.insert(SettlementObHistory.NAME_SPACE + ".insert", params);
        return params;
    }

    @Override
    public void update(SettlementObHistory params) {

    }

    @Override
    public void delete(SettlementObHistory params) {

    }

    @Override
    @Transactional
    public void recordHistory(SettlementObHistory params) {
        //判断是否危险状态
        try {
            Double slip_threshold = 0D;
            Double settlement_threshold = 0D;
            boolean isSettDanger = false;   //沉降危险
            boolean slipDanger = false;   //滑移危险

            //获取阈值
            List<PageData> warn_threshold = warnManager.list(new WarnEntity());
            for(PageData pageData : warn_threshold){
                if (pageData.get("type").equals(WarnEntity.THRESHOLD_TYPE_SLIP)){
                    slip_threshold = (Double) pageData.get("thresholdvalue");
                }else if(pageData.get("type").equals(WarnEntity.THRESHOLD_TYPE_SETTLEMENT)){
                    settlement_threshold = (Double) pageData.get("thresholdvalue");
                }
            }

            //获取前面的数据，判断是否已经危险了
            SettlementObHistory last = new SettlementObHistory();
            last.setPointId(params.getPointId());
            last = this.getLastTimeOne(last);
            Double timeDiff = DateUtils.getMonthDiff(params.getRecordTime(), last.getRecordTime());  //时间差 月

            //如果时间差不足以计算，则跳过
            if(timeDiff == null || timeDiff <= 0){
                return;
            }

            //保存这条数据，不能在获取上条数据之前保存, 如果同一天保存，则不计算速率和判断危险性
            this.insert(params);
            if (params.getRecordTime().compareTo(last.getRecordTime()) == 0){
                return;
            }

            //计算月滑移率
            Double diff = Math.sqrt(Math.pow((params.getPositionX() - last.getPositionX()), 2) + Math.pow((params.getPositionY() - last.getPositionY()), 2));
            Double slipRatio = diff / timeDiff;
            if( slipRatio > slip_threshold){
                slipDanger = true;
            }

            //计算高程沉降
            Double settDiff = Math.abs(params.getElevation() - params.getElevation());
            Double settRatio = settDiff / timeDiff;
            if (settRatio > settlement_threshold){
                isSettDanger = true;
            }

            //更新一下点信息
            if (isSettDanger || slipDanger){
                SettlementObPoint point = new SettlementObPoint();
                point.setId(params.getPointId());
                point = settlementPointService.getOne(point);
                point.setStatus(SettlementObPoint.STATUS_DANGER);
                point.setSlipSpeed(slipRatio);
                point.setSedimentationSpeed(settRatio);
                settlementPointService.update(point);
            }

        } catch (Exception e) {
            log.error("错误", e);
            throw new RuntimeException(e);
        }
    }

    @Override
    public SettlementObHistory getLastTimeOne(SettlementObHistory params) {
        return daoSupport.getOne(SettlementObHistory.NAME_SPACE + ".getLastTimeOne", params);
    }

	@Override
	public Integer countHistories(SettlementObHistory params) {
		// TODO Auto-generated method stub
		return daoSupport.getOne(SettlementObHistory.NAME_SPACE + ".countHistories", params);
	}


}
