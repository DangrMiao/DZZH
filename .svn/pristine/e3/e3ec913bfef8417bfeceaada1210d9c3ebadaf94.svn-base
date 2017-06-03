package com.wdkj.wf.service.monitor;

import com.wdkj.wf.entity.monitor.SettlementObHistory;
import com.wdkj.wf.entity.monitor.SettlementObPoint;
import com.weidekeji.common.service.GenericService;

/**
 * @author tianwenjian
 * @create 2017-04-17 14:48
 **/
public interface SettlementPointService extends GenericService<SettlementObPoint>{

    /**
     * 添加一个观测点并加一个初始位置记录
     * @param point
     * @param history
     */
    void addPointWithHistory(SettlementObPoint point, SettlementObHistory history);
    

	Integer countPoints(SettlementObPoint params);
}
