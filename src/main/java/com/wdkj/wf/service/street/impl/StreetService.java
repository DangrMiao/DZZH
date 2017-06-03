package com.wdkj.wf.service.street.impl;

import java.util.List;

import javax.annotation.Resource;

import com.wdkj.wf.house.entity.StreetEntity;
import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.fh.util.PageData;
import com.wdkj.wf.service.street.StreetManager;
@SuppressWarnings("all")
@Service("streetService")
public class StreetService implements StreetManager{
	@Resource(name = "daoSupport")
	private DaoSupport dao;
	/* (non-Javadoc)根据
	 * @see com.wf.service.street.StreetManager#findById(com.wdkj.wf.house.entity.StreetEntity)
	 */
	@Override
	public List<StreetEntity> findById(StreetEntity str) throws Exception {

		return (List<StreetEntity>) dao.findForList("StreetMapper.findById", str);
	}
	@Override
	public List<PageData> listAll(StreetEntity str) throws Exception {
		return (List<PageData>)dao.findForList("StreetMapper.listHouse", str);
	}
	@Override
	public void update(StreetEntity str) throws Exception {
		dao.update("StreetMapper.edit", str);
		
	}

}
