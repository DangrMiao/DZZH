package com.wdkj.wf.service.department;

import java.util.List;

import com.fh.util.PageData;
import com.wdkj.wf.house.entity.DepartMentEntity;

public interface DepartMentService {

	/**获取部门列表
	 * @param dme
	 * @return
	 * @throws Exception
	 */
	List<PageData> listAll(DepartMentEntity dme) throws Exception;

	/**修改部门信息
	 * @param dme
	 * @throws Exception
	 */
	void upddepartment(DepartMentEntity dme)throws Exception;

	/**部门任务统计
	 * @param dme
	 * @return
	 * @throws Exception
	 */
	List<PageData>listdptask(DepartMentEntity dme)throws Exception;
	/**web部门下拉框
	 * @return
	 * @throws Exception
	 */
	List<PageData>listdpm(PageData pd)throws Exception;
}
