package com.fh.service.menu.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.fh.entity.Page;
import com.fh.entity.system.Menu;
import com.fh.service.menu.TestManager;
import com.fh.util.PageData;
@SuppressWarnings("all")
@Service("testService")
public class TestService implements TestManager {
	@Resource(name = "daoSupport")
	private DaoSupport dao;


	/**
	 * @author 1
	 * 分页查询
	 *
	 */
	@Override
	public List<PageData> list(Page page) throws Exception {
		// TODO Auto-generated method stub
		return (List<PageData>)dao.findForList("Test_MenuMapper.datalistPage", page);
	
	}

	/* (non-Javadoc)
	 * 添加
	 * @see com.fh.service.menu.TestManager#save(com.fh.util.PageData)
	 */
	@Override
	public void save(PageData pd) throws Exception {
		dao.save("Test_MenuMapper.save", pd);
		
	}

	/* (non-Javadoc)
	 * 删除
	 * @see com.fh.service.menu.TestManager#delete(com.fh.util.PageData)
	 */
	@Override
	public void delete(PageData pd) throws Exception {
		dao.delete("Test_MenuMapper.delete", pd);
		
	}

	/* (non-Javadoc)
	 * 修改
	 * @see com.fh.service.menu.TestManager#edit(com.fh.util.PageData)
	 */
	@Override
	public void edit(PageData pd) throws Exception {
		dao.update("Test_MenuMapper.edit", pd);
		
	}

	@Override
	public PageData findById(PageData pd) throws Exception {
		// TODO Auto-generated method stub
		return (PageData)dao.findForObject("Test_MenuMapper.findById", pd);
	}
}
