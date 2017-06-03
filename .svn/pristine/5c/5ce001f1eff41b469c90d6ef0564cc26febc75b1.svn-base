package com.wdkj.wf.service.directory.impl;


import java.util.List;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;
import com.fh.dao.DaoSupport;
import com.fh.util.PageData;
import com.wdkj.wf.house.entity.BulltetinEntity;
import com.wdkj.wf.house.entity.LocationEntity;
import com.wdkj.wf.house.entity.TaskEntity;
import com.wdkj.wf.service.directory.DirectoryManager;

@SuppressWarnings("all")
@Service("directoryService")
public class DirectoryService implements DirectoryManager{
	@Resource(name = "daoSupport")
	private DaoSupport dao;
	
/*	@Override
	public void save(TaskEntity task) throws Exception {
		dao.save("TaskMapper.save", task);
		
	}*/
	/**公告内容 
	 * @param content
	 * @return
	 * @throws Exception
	 */
	@Override
	public List<PageData> listAll(BulltetinEntity content) throws Exception {
		// TODO Auto-generated method stub
		return (List<PageData>)dao.findForList("DirectoryMapper.listAll", content);
	}
	/**位置（经纬度）
	 * @param location
	 * @return
	 * @throws Exception
	 */
	@Override
	public List<PageData> listLocation(LocationEntity location) throws Exception {
		// TODO Auto-generated method stub
		return (List<PageData>)dao.findForList("DirectoryMapper.listLocation", location);
	}
}