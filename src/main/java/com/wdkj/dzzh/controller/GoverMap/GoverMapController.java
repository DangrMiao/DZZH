package com.wdkj.dzzh.controller.GoverMap;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.fh.controller.base.BaseController;
import com.fh.util.PageData;
import com.wdkj.dzzh.entity.GoverMap.hiddendanger;
import com.wdkj.dzzh.service.GoverMap.MapManager;
import com.wdkj.wf.house.entity.DepartMentEntity;
import com.wdkj.wf.house.entity.HouseEntity;
import com.wdkj.wf.service.house.HouseManager;
import com.weidekeji.common.constraint.ResConst;
import com.weidekeji.common.json.JsonResult;
import com.weidekeji.common.json.PagedJsonResult;
import com.weidekeji.common.util.JSONUtil;

/**
 * 地质灾害接口
 * 
 * @author 2
 *
 */
@Controller
@RequestMapping(value = "/map")
public class GoverMapController extends BaseController {

	@Autowired
	private MapManager mapService;

	/**
	 *搜索和展示功能
	 * @Param params
	 * @return
	 */
	@RequestMapping(value = "/list_map", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String map(hiddendanger params){
		try {
			List<hiddendanger> mapList = mapService.list(params);
			int count = mapService.countList(params);
			return JSONUtil.toJsonString(new PagedJsonResult(mapList, 1, "成功", count, params.getRows()));
		} catch (Exception e) {
			logger.error("查询发生错误", e);
			return JSONUtil.toJsonString(new JsonResult(-1, "失败：服务器内部错误!", null));
		}
	}
	
	/**
	 *搜索和展示功能
	 * @Param params
	 * @return
	 */
	@RequestMapping(value = "/search_map", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String mapSearch(hiddendanger params){
		try {
			List<hiddendanger> List = mapService.listSearch(params);
			return JSONUtil.toJsonString(new JsonResult(1, "成功", List));
		} catch (Exception e) {
			logger.error("查询发生错误", e);
			return JSONUtil.toJsonString(new JsonResult(-1, "失败：服务器内部错误!", null));
		}
	}

	
	/**
	 * 信息更新
	 * 
	 * @param params
	 * @throws Exception
	 */
	@RequestMapping(value = "/update_map", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String mapUpdate(hiddendanger params) {
		//System.out.println(params);
		try {
			mapService.updateMap(params);
			return JSONUtil.toJsonString(new JsonResult(1, "修改成功!", null));
		} catch (Exception e) {
			// TODO: handle exception
			logger.error("错误：" + e.toString(), e);
			return JSONUtil.toJsonString(new JsonResult(-1, "修改失败!", null));
			
		}
	}

	/**
	 * 添加治理方案
	 * 
	 * @param params
	 * @throws Exception
	 */
/*	@RequestMapping(value = "/add_map", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String mapAdd(hiddendanger params) {
		 
		try {
			mapService.updateMap(params);
			return JSONUtil.toJsonString(new JsonResult(1, "修改成功!", null));
		} catch (Exception e) {
			// TODO: handle exception
			logger.error("错误：" + e.toString(), e);
			return JSONUtil.toJsonString(new JsonResult(-1, "修改失败!", null));
			
		}
	}*/
}
