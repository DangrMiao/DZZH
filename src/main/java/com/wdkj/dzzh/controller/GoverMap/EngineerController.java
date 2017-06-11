package com.wdkj.dzzh.controller.GoverMap;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fh.controller.base.BaseController;
import com.wdkj.dzzh.entity.GoverMap.relocationProject;
import com.wdkj.dzzh.service.GoverMap.EngineerManager;
import com.wdkj.dzzh.service.GoverMap.RelocationManager;
import com.weidekeji.common.json.JsonResult;
import com.weidekeji.common.json.PagedJsonResult;
import com.weidekeji.common.util.JSONUtil;

import com.wdkj.dzzh.entity.GoverMap.engineerproject;
import com.wdkj.dzzh.entity.GoverMap.hiddendanger;
@Controller
@RequestMapping(value = "/engineer")
public class EngineerController  extends BaseController {
	@Autowired
	private EngineerManager EngineerService;

	/**
	 *搜索和展示功能
	 * @Param params
	 * @return
	 */
	@RequestMapping(value = "/list_engineerproject", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String engineerproject(engineerproject params){
		try {
		System.out.println(params.getRows());
		System.out.println(params.getStart());
			List<engineerproject> houseList = EngineerService.list(params);
			int count = EngineerService.countList(params);
			return JSONUtil.toJsonString(new PagedJsonResult(houseList, 1, "成功", count, params.getRows()));
		} catch (Exception e) {
			logger.error("查询发生错误", e);
			return JSONUtil.toJsonString(new JsonResult(-1, "失败：服务器内部错误!", null));
		}
	}
	
	@RequestMapping(value = "/add_engineerproject", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String add_engineerproject(engineerproject params){
		try {
			EngineerService.addEngineer(params);
			hiddendanger h=new hiddendanger();
			h.setId(params.getHiddendanger_id());
			h.setGovernancetype("2");
			EngineerService.updatehdgovertype(h);
			return JSONUtil.toJsonString(new JsonResult(1, "修改成功!", null));
		} catch (Exception e) {
			logger.error("查询发生错误", e);
			return JSONUtil.toJsonString(new JsonResult(-1, "失败：服务器内部错误!", null));
		}
	}
	
	@RequestMapping(value = "/update_engineerproject", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String update_engineerproject(engineerproject params){
		try {
			EngineerService.updateEngineer(params);
			return JSONUtil.toJsonString(new JsonResult(1, "修改成功!", null));
		} catch (Exception e) {
			logger.error("查询发生错误", e);
			return JSONUtil.toJsonString(new JsonResult(-1, "失败：服务器内部错误!", null));
		}
	}
	
	/**
	 *搜索
	 * @Param params
	 * @return
	 */
	@RequestMapping(value = "/search_engineer", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String engineerSearch(engineerproject params){
		try {
			List<engineerproject> List = EngineerService.listEngineer(params);
			return JSONUtil.toJsonString(new JsonResult(1, "鎴愬姛", List));
		} catch (Exception e) {
			logger.error("鏌ヨ鍙戠敓閿欒", e);
			return JSONUtil.toJsonString(new JsonResult(-1, "澶辫触锛氭湇鍔″櫒鍐呴儴閿欒!", null));
		}
	}

}

