package com.fh.service.menu;

import java.util.List;

import com.fh.entity.Page;
import com.fh.util.PageData;

public interface TestManager {
	
	/**根据ID查询
	 * @param pd
	 * @return
	 * @throws Exception
	 */
	PageData findById(PageData pd)throws Exception;
	
	/**
	 * @param page分页查询
	 * @return
	 * @throws Exception
	 */
	List<PageData> list(Page page) throws Exception;
	/**新增
	 * @param pd
	 * @return 
	 * @throws Exception
	 */
	void save(PageData pd)throws Exception;
	
	/**删除
	 * @param pd
	 * @return 
	 * @throws Exception
	 */
	void delete(PageData pd)throws Exception;
	/**修改
	 * @param pd
	 * @return 
	 * @throws Exception
	 */
	void edit(PageData pd)throws Exception;
	
}
