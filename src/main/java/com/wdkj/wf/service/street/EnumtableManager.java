package com.wdkj.wf.service.street;

import java.util.List;

import com.fh.util.PageData;
import com.wdkj.wf.house.entity.EnumtableEntity;


public interface EnumtableManager {
	List<PageData> listAll(EnumtableEntity e) throws Exception;

	/**
	 * 获取list
	 * @param entity
	 * @return
	 */
	List<EnumtableEntity> list(EnumtableEntity entity);
}
