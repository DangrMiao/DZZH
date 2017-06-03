package com.wdkj.wf.service.monitor;

import com.wdkj.wf.entity.monitor.SettlementObHistory;
import com.wdkj.wf.entity.monitor.SettlementObPoint;
import com.weidekeji.common.service.GenericService;

/**
 * @author tianwenjian
 * @create 2017-04-17 14:49
 **/
public interface SettlementHistoryService extends GenericService<SettlementObHistory> {

    /**
     * 记录历史记录,这里实现了判断观察点是否到了危险状态
     * @param params
     */
    void recordHistory(SettlementObHistory params);

    /**
     * 获取该point 的最后一次记录
     * @param params
     */
    SettlementObHistory getLastTimeOne(SettlementObHistory params);

    /**
     * 获取数量
     * @param params
     */
	Integer countHistories(SettlementObHistory params);

}
