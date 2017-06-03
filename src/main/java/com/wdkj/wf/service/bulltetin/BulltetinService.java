package com.wdkj.wf.service.bulltetin;

import java.util.List;

import com.fh.util.PageData;
import com.wdkj.wf.house.entity.BulltetinEntity;
import com.wdkj.wf.house.entity.TaskEntity;

/**任务和公告接口
 * @author 1
 *
 */
public interface BulltetinService {
	/**最新公告
	 * @param bull
	 * @return
	 * @throws Exception
	 */
	List<PageData> listNew(BulltetinEntity bull) throws Exception;
	/**添加公告
	 * @param bull
	 * @throws Exception
	 */
	void savebt(BulltetinEntity bull)throws Exception;
	/**删除公告
	 * @param bull
	 * @throws Exception
	 */
	void deletebt(BulltetinEntity bull)throws Exception;
	/**编辑公告
	 * @param bull
	 * @throws Exception
	 */
	void editbt(BulltetinEntity bull)throws Exception;
	/**今日任务
	 * @param task
	 * @return
	 * @throws Exception
	 */
	List<PageData> listToday(TaskEntity task) throws Exception;
	/**已耽误任务
	 * @param task
	 * @return
	 * @throws Exception
	 */
	List<PageData> listDnc(TaskEntity task) throws Exception;
	/**已完成任务
	 * @param task
	 * @return
	 * @throws Exception
	 */
	List<PageData> listFinish(TaskEntity task) throws Exception;
	/**昨日任务列表
	 * @param task
	 * @return
	 * @throws Exception
	 */
	List<PageData> listyesTerday(TaskEntity task) throws Exception;
	/**昨日完成任务
	 * @param task
	 * @return
	 * @throws Exception
	 */
	List<PageData> listyesTerday1(TaskEntity task) throws Exception;
	/**昨日未完成任务
	 * @param task
	 * @return
	 * @throws Exception
	 */
	List<PageData> listyesTerday2(TaskEntity task) throws Exception;
	int pageCount(TaskEntity task) throws Exception;
	/**发布任务
	 * @throws Exception
	 */
	void savetask(TaskEntity task)throws Exception;
	/**任务类型
	 * @param id
	 * @return
	 * @throws Exception
	 */
	List<PageData>listtype(Integer id)throws Exception;
	/**删除任务
	 * @param id
	 * @throws Exception
	 */
	void deltask(Integer id)throws Exception;
	/**获取单个任务信息
	 * @param id
	 * @return
	 * @throws Exception
	 */
	PageData gettask(Integer id)throws Exception;
	/**修改任务
	 * @param task
	 * @throws Exception
	 */
	void updtask(TaskEntity task)throws Exception;
	/**分配任务
	 * @param task
	 * @throws Exception
	 */
	void allottask(List list)throws Exception;
	/**完成任务
	 * @param task
	 */
	void overtask(TaskEntity task)throws Exception;
	/**未分配任务
	 * @param task
	 * @return
	 * @throws Exception
	 */
	List<PageData>unlisttask(TaskEntity task)throws Exception;
	/**获取名字
	 * @param task
	 * @return
	 * @throws Exception
	 */
	String getName(TaskEntity task)throws Exception;
}
