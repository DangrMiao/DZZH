package com.wdkj.wf.service.street.impl;

import java.util.List;

import javax.annotation.Resource;
import com.wf.common.MyStringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.fh.util.PageData;
import com.wdkj.wf.house.entity.VillageEntity;
import com.wdkj.wf.service.street.VillageManager;

@SuppressWarnings("all")
@Service("villageService")
public class VillageService implements VillageManager {
	private static Log log = LogFactory.getLog(VillageService.class);

	@Resource(name = "daoSupport")
	private DaoSupport dao;

	@Override
	public List<VillageEntity> findById(VillageEntity v) throws Exception {
		// TODO Auto-generated method stub
		return (List<VillageEntity>)dao.findForList("VillageMapper.findById", v);
	}

	@Override
	public List<PageData> listAll(VillageEntity v) throws Exception {
		// TODO Auto-generated method stub
		return (List<PageData>)dao.findForList("VillageMapper.listHouse", v);
	}

	@Override
	public VillageEntity getOne(VillageEntity villageEntity) throws Exception {
		return (VillageEntity) dao.findForObject("VillageMapper.findById", villageEntity);
	}

	@Override
	public void update(VillageEntity entity){
		try {
			dao.update("VillageMapper.update", entity);
		} catch (Exception e) {
			log.error("更新数据时发生错误", e);
			throw new RuntimeException(e);
		}
	}

	@Override
	public List<VillageEntity> list(VillageEntity v) throws Exception {
		return dao.list("VillageMapper.list", v);
	}

	/**
	 * y因为是单机部署的且性能要求不高，直接同步了事,如果有需求，换其他实现,如存储过程
	 * 也可以考虑数据库乐观锁，具体实现是，尝试以之前拿到的最大code为条件更新数据，如果更新行数为1，则获取成功，否则为失败，在来一遍
	 */
	@Override
	public synchronized String getUniqueHouseNo(VillageEntity params) throws Exception {
		if (params.getId() == null){
			throw new RuntimeException("参数不合法");
		}
		params = this.getOne(params);

		StringBuilder no = new StringBuilder();
		no.append(params.getStreetcode());
		no.append(params.getCode());
		String max = MyStringUtils.getFixedLengthNo(params.getMaxRecord() + 1, 5);
		no.append(max);

		//更新
		params.setMaxRecord(params.getMaxRecord() + 1);
		this.update(params);
		if (log.isDebugEnabled()) {
			log.debug("生成新的危房编号：maxrecord is " + params.getMaxRecord() + " ; No is" + no.toString());
		}
		return no.toString();
	}
}
