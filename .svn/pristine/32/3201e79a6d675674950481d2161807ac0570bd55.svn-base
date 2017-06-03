package com.wdkj.wf.service.street.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.fh.util.PageData;
import com.wdkj.wf.house.entity.EnumtableEntity;
import com.wdkj.wf.service.street.EnumtableManager;

@SuppressWarnings("all")
@Service("enumtableService")
public class EnumbleService implements EnumtableManager {
	@Resource(name = "daoSupport")
	private DaoSupport dao;
	@Override
	public List<PageData> listAll(EnumtableEntity e) throws Exception {
		// TODO Auto-generated method stub
		return (List<PageData>)dao.findForList("EnumtableMapper.listAll", e);
	}

	@Override
	public List<EnumtableEntity> list(EnumtableEntity entity) {
		return dao.list("EnumtableMapper.list", entity);
	}

}
