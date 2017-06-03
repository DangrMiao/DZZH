package com.wdkj.wf.service.daily.impl;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.wdkj.wf.house.entity.DailyEntity;

@Service()
@SuppressWarnings("all")
public class DailyServiceImpl implements DailyService{
	@Autowired
	private DaoSupport dao;
	@Override
	public void savedaily(DailyEntity parms) throws Exception {
dao.save("DailyMapper.savedaily", parms);
		
	}

}
