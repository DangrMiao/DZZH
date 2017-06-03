package com.wdkj.wf.conttoller.department;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fh.controller.base.BaseController;
import com.fh.util.PageData;
import com.github.pagehelper.PageHelper;
import com.wdkj.wf.house.entity.BaseEntity;
import com.wdkj.wf.house.entity.DepartMentEntity;
import com.wdkj.wf.service.department.DepartMentService;
import com.weidekeji.common.json.JsonResult;
import com.weidekeji.common.json.PagedJsonResult;
import com.weidekeji.common.util.JSONUtil;

@SuppressWarnings("all")
@Controller
public class DepartMentController extends BaseController {
	@Autowired
	DepartMentService departMentService;

	/**
	 * 获取部门列表
	 * 
	 * @return
	 */
	@RequestMapping(value = "depart/listdepartment", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String listdepartment(DepartMentEntity parms) {
		List<PageData> list = null;
		if(parms.getStart()==0){
			PageHelper.startPage(1, parms.getRows());
		}else{
			PageHelper.startPage(parms.getStart()/parms.getRows()+1, parms.getRows());
		}
		try {
			list = departMentService.listAll(parms);
			BaseEntity<List<PageData>> base = new BaseEntity(list);
			return JSONUtil.toJsonString(new PagedJsonResult(base.getBaseEntity(), 1, "成功", base.getCount(), parms.getRows()));
		} catch (Exception e) {
			// TODO: handle exception
			logger.error("错误：" + e.toString(), e);
			return JSONUtil.toJsonString(new JsonResult(-1, "失败：服务器内部错误!", null));
		}
	}

	/**
	 * 修改部门信息
	 * 
	 * @param dme
	 * @throws Exception
	 */
	@RequestMapping(value = "depart/upddepartment", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String upddepartment(DepartMentEntity dmt) {
		try {
			departMentService.upddepartment(dmt);
			return JSONUtil.toJsonString(new JsonResult(1, "修改成功!", null));
		} catch (Exception e) {
			// TODO: handle exception
			logger.error("错误：" + e.toString(), e);
			return JSONUtil.toJsonString(new JsonResult(-1, "失败：服务器内部错误!", null));
			
		}

	}

	/**
	 * 部门任务统计
	 * 
	 * @param dme
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "depart/listdptask", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String listdptask(DepartMentEntity dmt) {
		List<PageData> list = null;
		if (dmt.getPageNo() != null && dmt.getRows() != null) {
			PageHelper.startPage(dmt.getPageNo(), dmt.getRows());
		}

		try {
			list = departMentService.listdptask(dmt);
			BaseEntity<List<PageData>> base = new BaseEntity(list);
			return JSONUtil
					.toJsonString(new PagedJsonResult(base.getBaseEntity(), 1, "成功", base.getCount(), dmt.getRows()));
		} catch (Exception e) {
			// TODO: handle exception
			logger.error("错误：" + e.toString(), e);
			return JSONUtil.toJsonString(new JsonResult(-1, "失败：服务器内部错误!", null));
		}
	}
	/**
	 * web部门下拉列表
	 * 
	 * @param dme
	 * @throws Exception
	 */
	@RequestMapping(value = "depart/listdpm", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String listdpm() {
		PageData pd=new PageData();
		pd=this.getPageData();	
		try {
			List<PageData>list=departMentService.listdpm(pd);
			return JSONUtil.toJsonString(new JsonResult(1, "成功", list));
		} catch (Exception e) {
			// TODO: handle exception
			logger.error("错误：" + e.toString(), e);
			return JSONUtil.toJsonString(new JsonResult(-1, "失败：服务器内部错误!", null));
			
		}

	}
}
