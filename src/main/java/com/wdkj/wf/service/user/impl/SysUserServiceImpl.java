package com.wdkj.wf.service.user.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.fh.util.PageData;
import com.wdkj.wf.house.entity.SysUserEntity;
import com.wdkj.wf.service.user.SysUserService;
@Service("sysUserService")
@SuppressWarnings("all")
public class SysUserServiceImpl implements SysUserService {
	@Resource(name = "daoSupport")
	private DaoSupport dao;
	@Override
	public List<PageData> userinfo(SysUserEntity sue) throws Exception {
		// TODO Auto-generated method stub
		return (List<PageData>)dao.findForList("SysUserMapper.userinfo", sue);
	}
	@Override
	public PageData getuserInfo(SysUserEntity sue) throws Exception {
		// TODO Auto-generated method stub
		return (PageData) dao.findForObject("SysUserMapper.getUserInfo", sue);
	}
	@Override
	public PageData getdepart(String str) throws Exception {
		// TODO Auto-generated method stub
		return (PageData) dao.findForObject("SysUserMapper.findbyid", str);
	}
	@Override
	public List<PageData> listunderling(String headman) throws Exception {
		// TODO Auto-generated method stub
		return (List<PageData>) dao.findForList("SysUserMapper.listunderling", headman);
	}
	@Override
	public void editU(PageData pd) throws Exception {
		// TODO Auto-generated method stub
		
	}
	@Override
	public List<PageData> listuser(PageData pd) throws Exception {
		// TODO Auto-generated method stub
		return (List<PageData>) dao.findForList("SysUserMapper.listuser", pd);
	}
	@Override
	public List<PageData> listrole(PageData pd) throws Exception {
		// TODO Auto-generated method stub
		return (List<PageData>) dao.findForList("SysUserMapper.listrole", pd);
	}
	@Override
	public void upduser(PageData pd) throws Exception {
		// TODO Auto-generated method stub
		dao.update("SysUserMapper.upduser", pd);
	}
	@Override
	public void deluser(PageData pd) throws Exception {
		// TODO Auto-generated method stub
		dao.update("SysUserMapper.deluser", pd);
	}
	@Override
	public List<PageData> judgeUser(String userid) throws Exception {
		// TODO Auto-generated method stub
		return (List<PageData>) dao.findForList("SysUserMapper.judgeUser", userid);
	}
	
}
