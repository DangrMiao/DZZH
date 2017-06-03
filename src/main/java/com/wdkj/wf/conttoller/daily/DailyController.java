package com.wdkj.wf.conttoller.daily;

import java.net.URLDecoder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fh.controller.base.BaseController;
import com.wdkj.wf.house.entity.DailyEntity;
import com.wdkj.wf.house.entity.DepartMentEntity;
import com.wdkj.wf.service.daily.impl.DailyService;
import com.weidekeji.common.json.JsonResult;
import com.weidekeji.common.util.JSONUtil;

@SuppressWarnings("all")
@Controller
public class DailyController extends BaseController{
@Autowired
DailyService dailyService;
/**写日报
 * @param dmt
 * @return
 */
@RequestMapping(value = "depart/savedaily", produces = "application/json;charset=UTF-8")
@ResponseBody
public String savedaily(DailyEntity parms) {
	try {
		parms.setTitle(URLDecoder.decode(parms.getTitle(), "UTF-8"));
		parms.setContent(URLDecoder.decode(parms.getContent(), "UTF-8"));
		dailyService.savedaily(parms);
		return JSONUtil.toJsonString(new JsonResult(1, "成功", null));
	} catch (Exception e) {
		// TODO: handle exception
		logger.error("错误：" + e.toString(), e);
		return JSONUtil.toJsonString(new JsonResult(-1, "失败", null));
		
	}

}
}
