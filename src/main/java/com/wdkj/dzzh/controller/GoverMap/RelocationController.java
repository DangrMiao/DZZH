package com.wdkj.dzzh.controller.GoverMap;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fh.controller.base.BaseController;
import com.wdkj.dzzh.entity.GoverMap.engineerproject;
import com.wdkj.dzzh.entity.GoverMap.hiddendanger;
import com.wdkj.dzzh.service.GoverMap.RelocationManager;
import com.weidekeji.common.json.JsonResult;
import com.weidekeji.common.json.PagedJsonResult;
import com.weidekeji.common.util.JSONUtil;
import com.wdkj.dzzh.entity.GoverMap.relocationProject;

@Controller
@RequestMapping(value = "/relocation")
public class RelocationController  extends BaseController {
	@Autowired
	private RelocationManager RelocationService;

	/**
	 *搜索和展示功能
	 * @Param params
	 * @return
	 */
	@RequestMapping(value = "/list_relocationProject", produces = "application/json;charset=UTF-8")
	@ResponseBody
	
	public String relocationProject(relocationProject params){
		try {
			List<relocationProject> houseList = RelocationService.list(params);
			int count = RelocationService.countList(params);
			return JSONUtil.toJsonString(new PagedJsonResult(houseList, 1, "成功", count, params.getRows()));
		} catch (Exception e) {
			logger.error("查询发生错误", e);
			return JSONUtil.toJsonString(new JsonResult(-1, "失败：服务器内部错误!", null));
		}
	}
	/**
	 *鎼滅储鏌愪釜鐐圭殑淇℃伅
	 * @Param params
	 * @return
	 */
	@RequestMapping(value = "/search_relocation", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String relocationSearch(relocationProject params){
		try {
			List<relocationProject> List = RelocationService.listRelocation(params);
			return JSONUtil.toJsonString(new JsonResult(1, "成功", List));
		} catch (Exception e) {
			logger.error("查询发生错误", e);
			return JSONUtil.toJsonString(new JsonResult(-1, "失败：服务器内部错误!", null));
		}
	}
	
	@RequestMapping(value = "/add_relocationProject", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String add_relocationProject(relocationProject params){
		try {
			RelocationService.addRelocation(params);
			/*hiddendanger h=new hiddendanger();
			h.setId(params.getHiddendanger_id());
			h.setGovernancetype("1");
			RelocationService.updatehdgovertype(h);*/
			
			return JSONUtil.toJsonString(new JsonResult(1, "修改成功!", null));
		} catch (Exception e) {
			logger.error("查询发生错误", e);
			return JSONUtil.toJsonString(new JsonResult(-1, "失败：服务器内部错误!", null));
		}
	}
	
	@RequestMapping(value = "/update_relocationProject", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String update_relocationProject(relocationProject params){
		try {
			RelocationService.updateRelocation(params);
			
			hiddendanger h = new hiddendanger();
			h.setId(params.getHiddendanger_id());
			h.setHandle(params.getHandle());
			RelocationService.updatehdRPhandle(h);
			
			
			return JSONUtil.toJsonString(new JsonResult(1, "修改成功!", null));
		} catch (Exception e) {
			logger.error("查询发生错误", e);
			return JSONUtil.toJsonString(new JsonResult(-1, "失败：服务器内部错误!", null));
		}
	}
	
	
	@RequestMapping(value = "/add_RP", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String add_RP(relocationProject params){
		try {
			RelocationService.addRelocation(params);
			return JSONUtil.toJsonString(new JsonResult(1, "添加成功!", null));
		} catch (Exception e) {
			logger.error("查询发生错误", e);
			return JSONUtil.toJsonString(new JsonResult(-1, "失败：服务器内部错误!", null));
		}
	}
}
