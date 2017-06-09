package com.wdkj.dzzh.controller.GoverMap;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fh.controller.base.BaseController;
import com.wdkj.dzzh.entity.GoverMap.engineerproject;
import com.wdkj.dzzh.entity.GoverMap.hiddendanger;
import com.wdkj.dzzh.entity.GoverMap.person;
import com.wdkj.dzzh.entity.GoverMap.relocationProject;
import com.wdkj.dzzh.service.GoverMap.PersonManager;
import com.weidekeji.common.json.JsonResult;
import com.weidekeji.common.json.PagedJsonResult;
import com.weidekeji.common.util.JSONUtil;
@Controller
@RequestMapping(value = "/person")
public class PersonController extends BaseController {
	@Autowired
	private PersonManager PersonService;
	/**
	 *搜索和展示功能
	 * @Param params
	 * @return
	 */
	@RequestMapping(value = "/list_person", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String map(person params){
		params.setId(1);
		try {
			List<person> houseList = PersonService.list(params);
			person a=new person();
			int count = PersonService.countList(params);
			return JSONUtil.toJsonString(new PagedJsonResult(houseList, 1, "成功", count, params.getRows()));
		} catch (Exception e) {
			logger.error("查询发生错误", e);
			return JSONUtil.toJsonString(new JsonResult(-1, "失败：服务器内部错误!", null));
		}
	}
	
	@RequestMapping(value = "/add_person", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String add_person(person params){
		try {
		
			PersonService.addPerson(params);
			return JSONUtil.toJsonString(new PagedJsonResult(params, 1, "成功", 1, params.getRows()));
		} catch (Exception e) {
			logger.error("查询发生错误", e);
			return JSONUtil.toJsonString(new JsonResult(-1, "失败：服务器内部错误!", null));
		}
	}
	
	@RequestMapping(value = "/update_person", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String update_person(person params){
		try {
			PersonService.updatePerson(params);
			return JSONUtil.toJsonString(new JsonResult(1, "修改成功!", null));
		} catch (Exception e) {
			logger.error("查询发生错误", e);
			return JSONUtil.toJsonString(new JsonResult(-1, "失败：服务器内部错误!", null));
		}
	}
}
