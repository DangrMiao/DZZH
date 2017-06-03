package com.wdkj.wf.service.house_warn;

import java.util.List;

import com.fh.util.PageData;
import com.wdkj.wf.house.entity.WarnEntity;

public interface WarnManager {
	
    /**
     * 展示
     * @param params
     * @return
     */
	List<PageData> list(WarnEntity params) throws Exception;

	 /**
     * 保存
     * @param params
     * @return
     */
	void save(WarnEntity params) throws Exception;

    /**
     * 预警危房
     * @param params
     * @return
     */
	List<PageData> listHouse(WarnEntity params) throws Exception;

	/**
	 * 房屋数量
	 * @param params
	 * @return
	 */
	Integer countForWarnHouse(WarnEntity params);

	/**
	 * 阀值数量
	 * @param params
	 * @return
	 */
	Integer countWarn(WarnEntity params);

}
