package com.wdkj.wf.service.department.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.fh.util.PageData;
import com.wdkj.wf.house.entity.DepartMentEntity;
import com.wdkj.wf.service.department.DepartMentService;
@Service()
@SuppressWarnings("all")
public class DeparmMentServiceImpl implements DepartMentService{
	@Resource(name = "daoSupport")
	private DaoSupport dao;
	@Override
	public List<PageData> listAll(DepartMentEntity dme) throws Exception {
		// TODO Auto-generated method stub
		return (List<PageData>)dao.findForList("DepartMentMapper.listdepartment", dme);
	}
	@Override
	public void upddepartment(DepartMentEntity dme) throws Exception {
		// TODO Auto-generated method stub
		dao.update("DepartMentMapper.upddepartment", dme);
	}
	@Override
	public List<PageData> listdptask(DepartMentEntity dme) throws Exception {
		// TODO Auto-generated method stub
		return (List<PageData>)dao.findForList("DepartMentMapper.listdptask", dme);
	}
	@Override
	public List<PageData> listdpm(PageData pd) throws Exception {
		// TODO Auto-generated method stub
		return (List<PageData>)dao.findForList("DepartMentMapper.listdpm",pd);
	}
}
