package com.wdkj.wf.service.bulltetin.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.fh.util.PageData;
import com.wdkj.wf.house.entity.BulltetinEntity;
import com.wdkj.wf.house.entity.TaskEntity;
import com.wdkj.wf.service.bulltetin.BulltetinService;
@Service("BulltetinService")
@SuppressWarnings("all")
public class BulltetinServiceIml implements BulltetinService{
	@Resource(name = "daoSupport")
	private DaoSupport dao;
	@Override
	public List<PageData> listNew(BulltetinEntity bull) throws Exception {
		// TODO Auto-generated method stub
		return (List<PageData>)dao.findForList("BulltetinMapper.listNew", bull);
	}
	@Override
	public List<PageData> listToday(TaskEntity task) throws Exception {
		// TODO Auto-generated method stub
		return (List<PageData>)dao.findForList("BulltetinMapper.listToday", task);
	}
	@Override
	public List<PageData> listDnc(TaskEntity task) throws Exception {
		// TODO Auto-generated method stub
		return (List<PageData>)dao.findForList("BulltetinMapper.listDnc", task);
	}

	@Override
	public List<PageData> listFinish(TaskEntity task) throws Exception {
		// TODO Auto-generated method stub
		return (List<PageData>)dao.findForList("BulltetinMapper.listFinish", task);
	}
	@Override
	public List<PageData> listyesTerday(TaskEntity task) throws Exception {
		// TODO Auto-generated method stub
		return (List<PageData>)dao.findForList("BulltetinMapper.listyesTerday", task);
	}

	@Override
	public int pageCount(TaskEntity task) throws Exception {
		// TODO Auto-generated method stub
		return (int) dao.findForObject("BulltetinMapper.pageCount", task);
	}

	@Override
	public List<PageData> listyesTerday1(TaskEntity task) throws Exception {
		// TODO Auto-generated method stub
		return (List<PageData>)dao.findForList("BulltetinMapper.listyesTerday1", task);
	}

	@Override
	public List<PageData> listyesTerday2(TaskEntity task) throws Exception {
		// TODO Auto-generated method stub
		return (List<PageData>)dao.findForList("BulltetinMapper.listyesTerday2", task);
	}

	@Override
	public void savebt(BulltetinEntity bull) throws Exception {
		// TODO Auto-generated method stub
		dao.save("BulltetinMapper.savebt", bull);
	}

	@Override
	public void deletebt(BulltetinEntity bull) throws Exception {
		// TODO Auto-generated method stub
		dao.delete("BulltetinMapper.deletebt", bull);
	}

	@Override
	public void editbt(BulltetinEntity bull) throws Exception {
		// TODO Auto-generated method stub
		dao.update("BulltetinMapper.editbt", bull);
	}

	@Override
	public void savetask(TaskEntity task) throws Exception {
		// TODO Auto-generated method stub
		dao.save("BulltetinMapper.savetask", task);
	}

	@Override
	public List<PageData> listtype(Integer id) throws Exception {
		// TODO Auto-generated method stub
		return (List<PageData>)dao.findForList("BulltetinMapper.listtype", id);
	}

	@Override
	public void deltask(Integer id) throws Exception {
		dao.delete("BulltetinMapper.listtype", id);
		
	}

	@Override
	public PageData gettask(Integer id) throws Exception {
		// TODO Auto-generated method stub
		return (PageData) dao.findForObject("BulltetinMapper.gettask", id);
	}
	@Override
	public void updtask(TaskEntity task) throws Exception {
		// TODO Auto-generated method stub
		dao.update("BulltetinMapper.updtask", task);
	}
	@Override
	public void allottask(List list) throws Exception {
		// TODO Auto-generated method stub
		dao.batchDelete("BulltetinMapper.allottask", list);
	}
	@Override
	public void overtask(TaskEntity task) throws Exception {
		// TODO Auto-generated method stub
		dao.update("BulltetinMapper.overtask", task);
	}
	@Override
	public List<PageData> unlisttask(TaskEntity task) throws Exception {
		// TODO Auto-generated method stub
		return (List<PageData>)dao.findForList("BulltetinMapper.unlisttask", task);
	}
	@Override
	public String getName(TaskEntity task) throws Exception {
		// TODO Auto-generated method stub
		return (String) dao.findForObject("BulltetinMapper.getName", task);
	}
	
}
