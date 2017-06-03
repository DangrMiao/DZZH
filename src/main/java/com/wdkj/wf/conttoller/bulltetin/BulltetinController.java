package com.wdkj.wf.conttoller.bulltetin;

import java.net.URLDecoder;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fh.controller.base.BaseController;
import com.fh.util.Const;
import com.fh.util.PageData;
import com.github.pagehelper.PageHelper;
import com.wdkj.wf.house.entity.BaseEntity;
import com.wdkj.wf.house.entity.BulltetinEntity;
import com.wdkj.wf.house.entity.TaskEntity;
import com.wdkj.wf.service.bulltetin.BulltetinService;
import com.wdkj.wf.service.user.SysUserService;
import com.weidekeji.common.json.JsonResult;
import com.weidekeji.common.util.JSONUtil;

import net.sf.json.JSONArray;

/**
 * 查询所有任务
 * 
 * @author 1
 *
 */
@SuppressWarnings("all")
@Controller
@RequestMapping(value = "/bulltetin")
public class BulltetinController extends BaseController {
	@Autowired
	BulltetinService bulltetinService;
	@Autowired
	SysUserService sysUserService;

	/**
	 * 最新公告 menuid:1-最新公告，2-今日任务，3-已耽误任务，4-已完成任务
	 * 
	 * @param bull
	 * @return
	 */
	@RequestMapping(value = "/listbulltetin", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String list_bulltentin(BulltetinEntity bull, Integer menuid, TaskEntity task, Integer pagesize) {
		List<PageData> list = null;
		logger.info("菜单ID：" + menuid.toString());
		PageHelper.startPage(pagesize, 10);
		try {
			if (menuid == 1) {
				list = bulltetinService.listNew(bull);
			}
			if (menuid == 2) {
				list = bulltetinService.listToday(task);
				for (int i = 0; i < list.size(); i++) {
					PageData page = new PageData();
					if (list.get(i).get("photo2") != null && list.get(i).get("photo2").toString() != "") {
						list.get(i).put("photopath", getServerPath() + Const.PATH + list.get(i).get("photo2"));
					} else {
						list.get(i).put("photopath", getServerPath() + Const.PATH + "default.jpg");
					}
				}
			}
			if (menuid == 3) {
				list = bulltetinService.listDnc(task);
				for (int i = 0; i < list.size(); i++) {
					PageData page = new PageData();
					if (list.get(i).get("photo2") != null && list.get(i).get("photo2").toString() != "") {
						list.get(i).put("photopath", getServerPath() + Const.PATH + list.get(i).get("photo2"));
					} else {
						list.get(i).put("photopath", getServerPath() + Const.PATH + "default.jpg");
					}
				}
			}
			if (menuid == 4) {
				list = bulltetinService.listFinish(task);
				for (int i = 0; i < list.size(); i++) {
					PageData page = new PageData();
					if (list.get(i).get("photo2") != null && list.get(i).get("photo2").toString() != "") {
						list.get(i).put("photopath", getServerPath() + Const.PATH + list.get(i).get("photo2"));
					} else {
						list.get(i).put("photopath", getServerPath() + Const.PATH + "default.jpg");
					}
				}
			}
			/* PageInfo<PageData> page = new PageInfo<PageData>(list); */
			BaseEntity<PageData> page = new BaseEntity<PageData>(list);
			logBefore(logger, "结果集:" + list.toString());
			return JSONUtil.JsonString(new JsonResult(200, "成功", list));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logger.error("错误：" + e.toString(), e);
			return JSONUtil.toJsonString(new JsonResult(400, "失败", null));
		}
	}

	/**
	 * 未分配任务
	 * 
	 * @param task
	 * @return
	 */
	@RequestMapping(value = "/unlisttask", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String unlisttask(TaskEntity task, String userid, Integer pagesize) {
		List<PageData> list = null;
		PageHelper.startPage(pagesize, 10);
		try {
			if (sysUserService.judgeUser(userid) != null && sysUserService.judgeUser(userid).size() > 0) {
				list = bulltetinService.unlisttask(task);
				for (int i = 0; i < list.size(); i++) {
					PageData page = new PageData();
					if (list.get(i).get("photo2") != null && list.get(i).get("photo2").toString() != "") {
						list.get(i).put("photopath", getServerPath() + Const.PATH + list.get(i).get("photo2"));
					} else {
						list.get(i).put("photopath", getServerPath() + Const.PATH + "default.jpg");
					}
				}
				return JSONUtil.JsonString(new JsonResult(1, "成功", list));
			} else {
				return JSONUtil.JsonString(new JsonResult(0, "对不起您没有访问权限", null));
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logger.error("错误：" + e.toString(), e);
			return JSONUtil.toJsonString(new JsonResult(-1, "服务器内部错误", null));
		}
	}

	/**
	 * @param bull
	 *            填写公告
	 * @return
	 */
	@RequestMapping(value = "/savebt", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String savebt(BulltetinEntity bull) {
		try {
			bull.setFblr(URLDecoder.decode(bull.getFblr(), "UTF-8"));
			bull.setTitle(URLDecoder.decode(bull.getTitle(), "UTF-8"));
			bulltetinService.savebt(bull);
			return JSONUtil.JsonString(new JsonResult(200, "成功", null));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logger.error("错误：" + e.toString(), e);
			return JSONUtil.toJsonString(new JsonResult(400, "失败", null));
		}
	}

	/**
	 * @param bull
	 *            删除公告
	 * @return
	 */
	@RequestMapping(value = "/deletebt", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String deletebt(BulltetinEntity bull) {
		try {
			bulltetinService.deletebt(bull);
			return JSONUtil.JsonString(new JsonResult(200, "成功", null));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logger.error("错误：" + e.toString(), e);
			return JSONUtil.toJsonString(new JsonResult(400, "失败", null));
		}
	}

	/**
	 * @param bull
	 *            修改公告
	 * @return
	 */
	@RequestMapping(value = "/editbt", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String editbt(BulltetinEntity bull) {
		try {
			bulltetinService.editbt(bull);
			return JSONUtil.JsonString(new JsonResult(200, "成功", null));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logger.error("错误：" + e.toString(), e);
			return JSONUtil.toJsonString(new JsonResult(400, "失败", null));
		}
	}

	/**
	 * 下属昨日成就
	 * 
	 * @param task
	 * @param pagesize
	 * @return
	 */
	@RequestMapping(value = "/listyesTerday", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String listyesTerday(TaskEntity task, Integer pagesize) {
		List<PageData> list = null;
		List<PageData> list1 = null;
		List<PageData> list2 = null;
		JSONArray ary = new JSONArray();
		logBefore(logger, "页数：" + pagesize.toString());
		PageHelper.startPage(pagesize, 10);
		try {
			list = bulltetinService.listyesTerday(task);
			if (list != null) {
				Set<String> set = new HashSet<String>();
				for (PageData data : list) {
					set.add(data.get("user_id").toString());
				}
				Map<String, Object> map = new HashMap<>();
				for (String id : set) {
					task.setUser_id(id.toString());
					list1 = bulltetinService.listyesTerday1(task);
					list2 = bulltetinService.listyesTerday2(task);
					Integer a = list1.size();
					Integer b = list2.size();
					Double c = Double.valueOf(a) / Double.valueOf((a + b));
					DecimalFormat df = new DecimalFormat("0.00%");
					String d = df.format(c);
					map.put("user_id", id);
					map.put("progress", d);
					map.put("finish", list1.size());
					map.put("unfinished", list2.size());
					map.put("name", bulltetinService.getName(task));
					ary.add(map);
				}
			}
			return JSONUtil.JsonString(new JsonResult(200, "成功", ary));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logger.error("错误：" + e.toString(), e);
			return JSONUtil.toJsonString(new JsonResult(400, "失败", null));
		}
	}

	/**
	 * 昨日完成任务列表
	 * 
	 * @param task
	 * @param pagesize
	 * @return
	 */
	@RequestMapping(value = "/finish_yesTerday", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String finish_yesTerday(TaskEntity task, Integer pagesize) {
		List<PageData> list = null;
		logBefore(logger, "菜单ID：" + pagesize.toString());
		PageHelper.startPage(pagesize, 10);
		try {
			list = bulltetinService.listyesTerday1(task);
			return JSONUtil.JsonString(new JsonResult(200, "成功", list));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logger.error("错误：" + e.toString(), e);
			return JSONUtil.toJsonString(new JsonResult(400, "失败", null));
		}
	}

	/**
	 * 未完成任务列表
	 * 
	 * @param task
	 * @param pagesize
	 * @return
	 */
	@RequestMapping(value = "/unfinished_yesTerday", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String unfinished_yesTerday(TaskEntity task, Integer pagesize) {
		List<PageData> list = null;
		logBefore(logger, "菜单ID：" + pagesize.toString());
		PageHelper.startPage(pagesize, 10);
		try {
			list = bulltetinService.listyesTerday2(task);
			return JSONUtil.JsonString(new JsonResult(200, "成功", list));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logger.error("错误：" + e.toString(), e);
			return JSONUtil.toJsonString(new JsonResult(400, "失败", null));
		}
	}

	/**
	 * 添加任务
	 * 
	 * @param task
	 * @param pagesize
	 * @return
	 */
	@RequestMapping(value = "/savetask", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String savetask(TaskEntity task) {
		try {
			task.setContent(URLDecoder.decode(task.getContent(), "UTF-8"));
			bulltetinService.savetask(task);
			return JSONUtil.JsonString(new JsonResult(200, "成功", null));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logger.error("错误：" + e.toString(), e);
			return JSONUtil.toJsonString(new JsonResult(400, "失败", null));
		}
	}

	/**
	 * type值
	 * 
	 * 
	 * @param task
	 * @param pagesize
	 * @return
	 */
	@RequestMapping(value = "/listtype", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String listtype(Integer type) {
		try {
			List<PageData> list = bulltetinService.listtype(type);
			return JSONUtil.JsonString(new JsonResult(200, "成功", list));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logger.error("错误：" + e.toString(), e);
			return JSONUtil.toJsonString(new JsonResult(400, "失败", null));
		}
	}

	/**
	 * 删除任务
	 * 
	 * @param task
	 * @param pagesize
	 * @return
	 */
	@RequestMapping(value = "/deltask", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String deltask(Integer id) {
		try {
			bulltetinService.deltask(id);
			return JSONUtil.JsonString(new JsonResult(200, "成功", null));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logger.error("错误：" + e.toString(), e);
			return JSONUtil.toJsonString(new JsonResult(400, "失败", null));
		}
	}

	/**
	 * 获取单个任务信息
	 * 
	 * @param task
	 * @param pagesize
	 * @return
	 */
	@RequestMapping(value = "/gettask", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String gettask(Integer id) {
		try {
			bulltetinService.gettask(id);
			return JSONUtil.JsonString(new JsonResult(200, "成功", null));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logger.error("错误：" + e.toString(), e);
			return JSONUtil.toJsonString(new JsonResult(400, "失败", null));
		}
	}

	/**
	 * 修改任务
	 * 
	 * @param task
	 * @param pagesize
	 * @return
	 */
	@RequestMapping(value = "/updtask", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String updtask(TaskEntity task) {
		try {
			bulltetinService.updtask(task);
			return JSONUtil.JsonString(new JsonResult(200, "成功", null));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logger.error("错误：" + e.toString(), e);
			return JSONUtil.toJsonString(new JsonResult(400, "失败", null));
		}
	}

	/**
	 * 分配任务
	 * 
	 * @param task
	 * @return
	 */
	@RequestMapping(value = "/allottask", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String allottask(TaskEntity task) {
		try {
			List<TaskEntity> list = new ArrayList<>();
			String id[] = task.getNum().split(",");
			for (int i = 0; i < id.length; i++) {
				TaskEntity taskEntity = new TaskEntity();
				taskEntity.setSharer_id(task.getSharer_id());
				taskEntity.setPerformer_id(task.getPerformer_id());
				taskEntity.setId(Integer.parseInt(id[i]));
				list.add(taskEntity);
			}
			bulltetinService.allottask(list);
			;
			return JSONUtil.JsonString(new JsonResult(1, "成功", null));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logger.error("错误：" + e.toString(), e);
			return JSONUtil.toJsonString(new JsonResult(-1, "失败", null));
		}
	}

	/**
	 * 修改任务状态
	 * 
	 * @param task
	 * @return
	 */
	@RequestMapping(value = "/overtask", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String overtask(TaskEntity task) {
		try {
			Date end = task.getEndtime();
			Date over = task.getOvertime();
			if (end.getTime() >= over.getTime()) {
				task.setStatus(2);
			} else {
				task.setStatus(3);
			}
			bulltetinService.overtask(task);
			return JSONUtil.JsonString(new JsonResult(1, "成功", null));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			logger.error("错误：" + e.toString(), e);
			return JSONUtil.toJsonString(new JsonResult(-1, "失败", null));
		}
	}

}
