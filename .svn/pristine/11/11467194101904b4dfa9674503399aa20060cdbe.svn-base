package com.wdkj.wf.conttoller.house;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fh.controller.base.BaseController;
import com.fh.util.PageData;
import com.wdkj.wf.house.entity.HouseEntity;
import com.wdkj.wf.service.house.HouseManager;
import com.weidekeji.common.constraint.ResConst;
import com.weidekeji.common.json.JsonResult;
import com.weidekeji.common.json.PagedJsonResult;
import com.weidekeji.common.util.JSONUtil;

/**
 * 房屋历史接口
 * 
 * @author 2
 *
 */
@Controller
@RequestMapping(value = "/house")
public class HouseHistoryController extends BaseController {

	@Autowired
	private HouseManager houseService;

	/**
	 * 搜索功能
	 * @Param params
	 * @return
	 */
	@RequestMapping(value = "/history_search", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String history_search(HouseEntity params){
		try {
		
			List<HouseEntity> houseList = houseService.pageHistory(params);
			int count = houseService.countHistory(params);
			
			return JSONUtil.toJsonString(new PagedJsonResult(houseList, 1, "成功", count, params.getRows()));
		} catch (Exception e) {
			logger.error("查询发生错误", e);
			return JSONUtil.toJsonString(new JsonResult(-1, "失败：服务器内部错误!", null));
		}
	}
	
	/**
	 * 地图经纬度展示
	 * @Param params
	 * @return
	 */
	@RequestMapping(value = "/history_list", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String history_list(HouseEntity params){
		List<PageData> houselist;
		try {
			houselist = houseService.listHistory(params);
			logBefore(logger, "结果集:" + houselist.toString());
			return JSONUtil.toJsonString(new JsonResult(1, "成功", houselist));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logBefore(logger, "错误：" + e.toString());
			return JSONUtil.toJsonString(new JsonResult(-1, "失败", null));
		}	
	}
	
	/**
	 * 历史回溯属性更新
	 * @Param params
	 * @return
	 */
	@RequestMapping(value = "/history_update", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String history_update(HouseEntity params){
		try {  
			houseService.historyUpdate(params);
	        return JSONUtil.toJsonString(new JsonResult(1, "更新成功！", null));
		} catch (Exception e) {
			logger.error("操作失败！", e);
			return JSONUtil.toJsonString(new JsonResult(-1,"更新失败！", null));
		}	
	}
	

}
