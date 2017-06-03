package com.wdkj.wf.service.street;

import java.util.List;

import com.fh.util.PageData;
import com.wdkj.wf.house.entity.VillageEntity;

public interface VillageManager {
	List<VillageEntity> findById(VillageEntity streetcode)throws Exception;

	List<PageData> listAll(VillageEntity v) throws Exception;

	/**
	 * 获取一个实体
	 * @param villageEntity
	 * @return
	 */
	VillageEntity getOne(VillageEntity villageEntity) throws Exception;

	/**
	 * 更新
	 * @param entity
	 */
	void update(VillageEntity entity);

	/**
	 * 列表
	 * @param v
	 * @return
	 * @throws Exception
	 */
	List<VillageEntity> list(VillageEntity v) throws Exception;

	/**
	 * 获取唯一的房屋编号
	 * @param params
	 * @return
	 */
	public String getUniqueHouseNo(VillageEntity params) throws Exception;
}
