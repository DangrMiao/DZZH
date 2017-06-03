package com.wdkj.wf.conttoller.house_warn;

import java.util.List;

import com.weidekeji.common.constraint.ResConst;
import com.weidekeji.common.json.PagedJsonResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.fh.controller.base.BaseController;
import com.fh.util.PageData;
import com.wdkj.wf.house.entity.WarnEntity;
import com.wdkj.wf.service.house_warn.WarnManager;
import com.weidekeji.common.json.JsonResult;
import com.weidekeji.common.util.JSONUtil;

/**
 * 危房预警
 * 
 * @author mxc
 *
 */
@Controller
public class House_warnControlller extends BaseController {

	@Autowired
	private WarnManager warnService;
	/**
	 * 阀值设定
	 * @Param params
	 * @return
	 */
	@RequestMapping(value = "house_warn/threshold", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String threshold(WarnEntity params){
		List<PageData> list;
		try {
			list = warnService.list(params);
			int count = warnService.countWarn(params);
			logBefore(logger, "结果集:" + list.toString());
			return JSONUtil.toJsonString(new PagedJsonResult( list,1,"成功",count,params.getRows()));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logBefore(logger, "错误：" + e.toString());
			return JSONUtil.toJsonString(new JsonResult(-1, "失败", null));
		}	
	}
	
	/**
	 * 保存阀值
	 * 
	 * @param params
	 * @return
	 */
	@RequestMapping(value = "house_warn/save_threshold", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Object save_threshold(WarnEntity params) {
		try {
			warnService.save(params);
			return JSONUtil.toJsonString(new JsonResult(1, "成功", null));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logger.error("错误：" + e.toString(), e);
			return JSONUtil.toJsonString(new JsonResult(-1, "失败", null));
		}
	}
	
	/**
	 * 预警危房
	 * @Param params
	 * @return
	 * 数据库的写法可能有问题，有待提高。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。
	 */
	@RequestMapping(value = "house_warn/warn_house", produces = "application/json;charset=UTF-8")
	@ResponseBody
		public String warn_house(WarnEntity params){
			List<PageData> listAll;
			try {
				listAll = warnService.listHouse(params);
				int count = warnService.countForWarnHouse(params);
				return JSONUtil.toJsonString(new PagedJsonResult( listAll, ResConst.CODE_OK, ResConst.QUERY_OK, count, params.getRows()));
			} catch (Exception e) {
				logger.error("查询错误", e);
				return JSONUtil.toJsonString(new JsonResult(-1, "失败", null));
			}	
		}
}