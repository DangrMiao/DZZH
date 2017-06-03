package com.wdkj.wf.service.street;


import java.util.List;

import com.fh.util.PageData;
import com.wdkj.wf.house.entity.StreetEntity;

/**查询街道
 * @author 1
 *
 */
public interface StreetManager {
	List<StreetEntity> findById(StreetEntity str)throws Exception;
	List<PageData> listAll(StreetEntity str) throws Exception;
    void update(StreetEntity str)throws Exception;
}
