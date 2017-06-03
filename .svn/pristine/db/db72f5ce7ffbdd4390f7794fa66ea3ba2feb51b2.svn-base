package com.wdkj.wf.conttoller.directory;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.chainsaw.Main;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import com.alibaba.fastjson.JSONObject;
import com.fh.controller.base.BaseController;
import com.fh.util.PageData;
import com.wdkj.wf.house.entity.BulltetinEntity;
import com.wdkj.wf.house.entity.LocationEntity;
import com.wdkj.wf.house.entity.StreetEntity;
import com.wdkj.wf.service.directory.DirectoryManager;
import com.weidekeji.common.json.JsonResult;
import com.weidekeji.common.util.JSONUtil;

/**
 * 公告接口
 * 
 * @author mxc
 *
 */
@Controller
@RequestMapping(value = "/house/directory")
public class DirectoryController extends BaseController {

	@Autowired
	private DirectoryManager directoryService;
	/**查询公告信息
	 * @param content
	 * @return
	 */
	@RequestMapping(value = "/list_content", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Object list_content(BulltetinEntity content) {
/*		第一种传json的写法，但时间格式无法改变
        JSONObject obj = new JSONObject();
		List<PageData> list;
		try {
			
			list = directoryService.listHouse(content);
			obj.put("ec", 200);
			obj.put("code", "成功");
			obj.put("rows", list);
			logBefore(logger, "结果集:" + obj.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			
			e.printStackTrace();
			obj.put("ec", 400);
			obj.put("code", "错误：" + e.toString());
			logBefore(logger, "错误："+e.toString());
		}
		return obj;*/
	//第二种传json的写法，使时间格式改变
		List<PageData> list;
		try {
			list = directoryService.listAll(content);
			logBefore(logger, "结果集:" + list.toString());
			return JSONUtil.toJsonString(new JsonResult(200, "成功", list));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logBefore(logger, "错误：" + e.toString());
			return JSONUtil.toJsonString(new JsonResult(400, "失败", null));
		}
	}



		
	
	/**查询位置（经纬度）
	 * @param location
	 * @return
	 */
	@RequestMapping(value = "/list_location", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public Object list_location(LocationEntity location) {
		JSONObject obj = new JSONObject();
	    //obj.put(JSONUtil.JsonString("fbtime"), 11);
		List<PageData> list;
		try {		
			list = directoryService.listLocation(location);
			obj.put("ec", 200);
			obj.put("code", "成功");
			obj.put("rows", list);
			logBefore(logger, "结果集:" + obj.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			obj.put("ec", 400);
			obj.put("code", "错误：" + e.toString());
			logBefore(logger, "错误："+e.toString());
		}
		return obj;
	}
	
}