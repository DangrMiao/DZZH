package com.wdkj.wf.service.house_warn.impl;

import com.wdkj.wf.service.house_warn.WarnManager;

import java.util.List;
import javax.annotation.Resource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;
import com.fh.dao.DaoSupport;
import com.fh.util.PageData;
import com.wdkj.wf.house.entity.HouseEntity;
import com.wdkj.wf.house.entity.WarnEntity;
import com.wdkj.wf.service.house.HouseManager;
@SuppressWarnings("all")
@Service("warnService")
public class WarnService implements WarnManager{
	@Resource(name = "daoSupport")
	private DaoSupport dao;
 
	@Override
	public List<PageData> list(WarnEntity params) throws Exception {

		return (List<PageData>)dao.findForList("WarnMapper.listWarn", params);
	}

	@Override
	public void save(WarnEntity params) throws Exception {
		dao.save("WarnMapper.save", params);
	}

	@Override
	public List<PageData> listHouse(WarnEntity params) throws Exception {
		return (List<PageData>)dao.findForList("WarnMapper.listWarnHouse", params);
	}

	@Override
	public Integer countForWarnHouse(WarnEntity params) {
		return dao.count("WarnMapper.countForWarnHouse", params);
	}

	@Override
	public Integer countWarn(WarnEntity params) {
		// TODO Auto-generated method stub
		return dao.count("WarnMapper.countWarn", params);
	}
}

