package com.wdkj.wf.service.monitor.impl;

import com.fh.dao.DaoSupport;
import com.wdkj.wf.constraints.HouseConst;
import com.wdkj.wf.entity.monitor.SettlementObHistory;
import com.wdkj.wf.entity.monitor.SettlementObPoint;
import com.wdkj.wf.service.monitor.SettlementHistoryService;
import com.wdkj.wf.service.monitor.SettlementPointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author tianwenjian
 * @create 2017-04-17 15:18
 **/
@Service
public class SettlementPointServiceImpl implements SettlementPointService{

    @Resource(name = "daoSupport")
    DaoSupport dao;

    @Autowired
    SettlementHistoryService settlementHistoryService;

    @Override
    public SettlementObPoint getOne(SettlementObPoint params) {
        return dao.getOne(SettlementObPoint.NAME_SPACE + ".getOne", params);
    }

    @Override
    public List<SettlementObPoint> list(SettlementObPoint params) {
        return dao.list(SettlementObPoint.NAME_SPACE + ".list", params);
    }

    @Override
    public List<SettlementObPoint> page(SettlementObPoint params) {
        //Not yet implements
        //return null;
        throw new RuntimeException("没有实现方法");
    }

    @Override
    public SettlementObPoint insert(SettlementObPoint params) {
        dao.insert(SettlementObPoint.NAME_SPACE + ".insert", params);
        return params;
    }

    @Override
    public void update(SettlementObPoint params) {
        dao.updateOne(SettlementObPoint.NAME_SPACE + ".update", params);
    }

    @Override
    public void delete(SettlementObPoint params) {
        //Not yet implements
        throw new RuntimeException("没有实现方法");
    }

    @Override
    @Transactional
    public void addPointWithHistory(SettlementObPoint point, SettlementObHistory history) {
        point.setStatus(SettlementObPoint.STATUS_NORMAL);
        this.insert(point);
        history.setPointId(point.getId());
        settlementHistoryService.insert(history);
    }
	@Override
	public Integer countPoints(SettlementObPoint params) {
		// TODO Auto-generated method stub
		return dao.getOne(SettlementObPoint.NAME_SPACE + ".countPoints", params);
	}
}
