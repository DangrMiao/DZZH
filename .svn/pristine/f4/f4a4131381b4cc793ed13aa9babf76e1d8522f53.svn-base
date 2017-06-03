package com.wdkj.wf.service.user;

import java.util.List;



import com.fh.util.PageData;
import com.wdkj.wf.house.entity.SysUserEntity;
public interface SysUserService {
	/**查询通讯录列表
	 * @param sue
	 * @return
	 * @throws Exception
	 */
	List<PageData> userinfo(SysUserEntity sue) throws Exception;
	/**查询列表详细信息
	 * @param sue
	 * @return
	 * @throws Exception
	 */
	PageData getuserInfo(SysUserEntity sue) throws Exception;
	/**获取部门信息
	 * @param str
	 * @return
	 * @throws Exception
	 */
	PageData getdepart(String str)throws Exception;
	/**获取我的下属信息
	 * @param str
	 * @return
	 * @throws Exception
	 */
	List<PageData> listunderling(String headman) throws Exception;
	/**修改密码
	 * @param pd
	 * @throws Exception
	 */
	void editU(PageData pd)throws Exception;
	/**web用户就接口查询
	 * @param pd
	 * @return
	 * @throws Exception
	 */
	List<PageData>listuser(PageData pd)throws Exception;
	/**web角色下拉框
	 * @param pd
	 * @return
	 * @throws Exception
	 */
	List<PageData>listrole(PageData pd)throws Exception;
	/**修改用户信息
	 * @param pd
	 * @throws Exception
	 */
	void upduser(PageData pd)throws Exception;
	/**删除用户
	 * @param pd
	 * @throws Exception
	 */
	void deluser(PageData pd)throws Exception;
	/**判断用户是否是领导
	 * @param user_id
	 * @return
	 * @throws Exception
	 */
	List<PageData>judgeUser(String userid)throws Exception;
}
