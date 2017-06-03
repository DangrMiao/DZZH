package com.wdkj.wf.conttoller.sys;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.FileUtils;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.alibaba.fastjson.JSON;
import com.fh.controller.base.BaseController;
import com.fh.service.system.fhlog.FHlogManager;
import com.fh.service.system.user.UserManager;
import com.fh.service.system.userphoto.UserPhotoManager;
import com.fh.util.Const;
import com.fh.util.DelAllFile;
import com.fh.util.PageData;
import com.fh.util.PathUtil;
import com.fh.util.Tools;
import com.github.pagehelper.PageHelper;
import com.wdkj.wf.house.entity.BaseEntity;
import com.wdkj.wf.house.entity.DepartMentEntity;
import com.wdkj.wf.house.entity.SysUserEntity;
import com.wdkj.wf.house.entity.TaskEntity;
import com.wdkj.wf.house.entity.UserPhotoEntity;
import com.wdkj.wf.service.bulltetin.BulltetinService;
import com.wdkj.wf.service.user.SysUserService;
import com.weidekeji.common.json.JsonResult;
import com.weidekeji.common.json.PagedJsonResult;
import com.weidekeji.common.util.JSONUtil;
import com.weidekeji.common.util.Property;

@SuppressWarnings("all")
@RestController
public class Sys_UserController extends BaseController {
	@Autowired
	SysUserService sysUserService;
	@Autowired
	BulltetinService bulltetinService;
	@Autowired
	UserManager userService;
	@Autowired
	FHlogManager FHLOG;
	@Autowired
	UserPhotoManager userphotoService;

	/**
	 * 获取用户列表
	 * 
	 * @param sue
	 * @return
	 */
	@RequestMapping(value = "house/user_list", produces = "application/json;charset=UTF-8")
	public String sysuser(SysUserEntity sue, HttpServletRequest request) {
		List<PageData> list = null;
		List<PageData> list1 = new ArrayList();
		String path = Property.getProperty("fileUpload.path");
		List<String> l = new ArrayList<>();
		try {
			list = sysUserService.userinfo(sue);
			for (PageData page : list) {
				PageData pd = new PageData();
				pd.put("name", page.get("name"));
				pd.put("user_id", page.get("user_id"));
				pd.put("phone", page.get("phone"));
				if (page.get("PHOTO1") != null) {
					pd.put("photo1", getServerPath() + Const.PATH + page.get("PHOTO1"));
					pd.put("photo2", getServerPath() + Const.PATH + page.get("PHOTO2"));
					pd.put("photo3", getServerPath() + Const.PATH + page.get("PHOTO3"));
				} else {
					pd.put("photo1", getServerPath() + Const.PATH + "default.jpg");
					pd.put("photo2", getServerPath() + Const.PATH + "default.jpg");
					pd.put("photo3", getServerPath() + Const.PATH + "default.jpg");
				}
				list1.add(pd);
			}
			return JSONUtil.JsonString(new JsonResult(200, "成功", list1));
		} catch (Exception e) {
			// TODO: handle exception
			logger.error("错误：" + e.toString(), e);
			return JSONUtil.toJsonString(new JsonResult(400, "失败", null));
		}
	}

	/**
	 * 获取用户详情
	 * 
	 * @param sue
	 * @return
	 */
	@RequestMapping(value = "house/user_details", produces = "application/json;charset=UTF-8")
	public String user_details(SysUserEntity sue, HttpServletRequest request) {
		PageData page = null;
		PageData p = null;
		List<PageData> list1 = null;
		List<PageData> list2 = null;
		List<PageData> list3 = null;
		List<PageData> list4 = null;
		List<PageData> list5 = null;
		logBefore(logger, "ID:" + sue.getUSER_ID());
		Map<String, Object> map = new HashMap<>();
		try {
			SysUserEntity s = new SysUserEntity();
			s.setUSER_ID(sue.getUSER_ID());
			page = sysUserService.getuserInfo(s);
			// 最近一周任务
			TaskEntity task = new TaskEntity();
			task.setName(page.get("NAME").toString());
			task.setTime_id(1);
			list1 = bulltetinService.listyesTerday1(task);
			list2 = bulltetinService.listyesTerday2(task);
			// 最近一个月任务
			TaskEntity t = new TaskEntity();
			t.setName(page.get("NAME").toString());
			t.setTime_id(2);
			list3 = bulltetinService.listyesTerday1(t);
			list4 = bulltetinService.listyesTerday2(t);
			String str = page.get("USER_ID").toString();
			p = sysUserService.getdepart(str);
			if (p != null) {
				map.put("department", p.get("name"));
			} else {
				map.put("department", "");
			}
			map.put("finish_week", list1.size());
			map.put("unfinish_week", list2.size());
			map.put("finish_month", list3.size());
			map.put("unfinish_month", list4.size());
			map.put("name", page.get("NAME"));
			map.put("user_id", page.get("USER_ID"));
			map.put("address", page.get("ADDRESS"));
			map.put("role_name", page.get("ROLE_NAME"));
			map.put("role_rights", page.get("ROLE_RIGHTS"));
			map.put("status", page.get("STATUS"));
			map.put("bz", page.get("BZ"));
			map.put("phone", page.get("PHONE"));
			map.put("last_login", page.get("LAST_LOGIN"));
			map.put("tdate", page.get("tdate"));
			map.put("number", page.get("NUMBER"));
			map.put("emall", page.get("EMAIL"));
			map.put("skin", page.get("SKIN"));
			String path = Property.getProperty("fileUpload.path");
			if (page.get("PHOTO1") != null) {
				map.put("photo1", getServerPath() + Const.PATH + page.get("PHOTO1"));
				map.put("photo2", getServerPath() + Const.PATH + page.get("PHOTO2"));
				map.put("photo3", getServerPath() + Const.PATH + page.get("PHOTO3"));
			} else {
				map.put("photo1", getServerPath() + Const.PATH + "default.jpg");
				map.put("photo2", getServerPath() + Const.PATH + "default.jpg");
				map.put("photo3", getServerPath() + Const.PATH + "default.jpg");
			}
			logBefore(logger, "结果集:" + page.toString());
			return JSONUtil.JsonString(new JsonResult(200, "成功", map));
		} catch (Exception e) {
			// TODO: handle exception
			// logBefore(logger, "错误：" + e.toString());
			logger.error("错误：" + e.toString(), e);
			return JSONUtil.toJsonString(new JsonResult(400, "失败", null));
		}
	}

	/**
	 * 我的下属
	 * 
	 * @param str
	 * @return
	 */
	@RequestMapping(value = "house/listunderling", produces = "application/json;charset=UTF-8")
	public String listunderling(String user_id, HttpServletRequest request) {
		List<PageData> list = null;
		List<PageData> list1 = new ArrayList<>();
		try {
			list = sysUserService.listunderling(user_id);
			for (PageData page : list) {
				PageData pd = new PageData();
				pd.put("name", page.get("name"));
				pd.put("phone", page.get("phone"));
				pd.put("user_id", page.get("user_id"));
				if (page.get("PHOTO1") != null) {
					pd.put("photo1", getServerPath() + Const.PATH + page.get("PHOTO1"));
					pd.put("photo2", getServerPath() + Const.PATH + page.get("PHOTO2"));
					pd.put("photo3", getServerPath() + Const.PATH + page.get("PHOTO3"));
				} else {
					pd.put("photo1", getServerPath() + Const.PATH + "default.jpg");
					pd.put("photo2", getServerPath() + Const.PATH + "default.jpg");
					pd.put("photo3", getServerPath() + Const.PATH + "default.jpg");
				}
				list1.add(pd);
			}
			return JSONUtil.JsonString(new JsonResult(200, "成功", list1));
		} catch (Exception e) {
			// TODO: handle exception
			logger.error("错误：" + e.toString(), e);
			return JSONUtil.toJsonString(new JsonResult(400, "失败", null));
		}

	}

	/**
	 * 修改密码
	 * 
	 * @param sue
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "sys/editU", produces = "application/json;charset=UTF-8")
	public String editU(SysUserEntity sue) throws Exception {
		PageData pd = new PageData();
		PageData p = new PageData();
		PageData p1 = new PageData();
		PageData p2 = new PageData();
		try {
			String pwd = new Md5Hash("SHA-1", sue.getPASSWORD()).toString();
			p2.put("PASSWORD", pwd);
			p2.put("USER_ID", sue.getUSER_ID());
			p1 = userService.getUser(p2);
			if (p1 == null) {
				return JSONUtil.toJsonString(new JsonResult(400, "原始密码错误", null));
			} else {
				pd.put("USER_ID", sue.getUSER_ID());
				pd.put("NEWPASSWORD", new Md5Hash("SHA-1", sue.getNEWPASSWORD()).toString());
				userService.updUser(pd); // 执行修改
				FHLOG.save(pd.getString("USERNAME"), "修改系统用户：" + pd.getString("USERNAME"));// 系统日志
				return JSONUtil.toJsonString(new JsonResult(200, "成功", null));
			}
		} catch (Exception e) {
			// TODO: handle exception
			logger.error("错误：" + e.toString(), e);
			return JSONUtil.toJsonString(new JsonResult(400, "失败", null));
		}
	}

	/**
	 * 保存照片
	 * 
	 * @param
	 * @throws Exception
	 */
	@RequestMapping(value = "sys/file", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String userphoto(UserPhotoEntity up,
			@RequestParam(value = "fileupload", required = false) CommonsMultipartFile[] files,
			HttpServletRequest request) throws Exception {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmmssS");
		String time = simpleDateFormat.format(new Date());
		String path = Property.getProperty("fileUpload.path");// 附件存放服务器的路径
		logger.info("保存路径："+path);
		Map<String, Object> m = null;
		String filename=null;
		try {
			for (int i = 0; i < files.length; i++) {
				if (!files[i].isEmpty()) {
					filename=time+files[i].getOriginalFilename();
					files[i].transferTo(new File(path+filename));//复制文件
				}
				Map<String, Object> map = new HashMap<String, Object>();
				PageData p = new PageData();
				p.put("USERPHOTO_ID", this.get32UUID());
				p.put("PHOTO0", null);
				p.put("PHOTO1", filename);
				p.put("PHOTO2", filename);
				p.put("PHOTO3", filename);
				p.put("USERNAME", up.getUSERNAME());
				logger.info("名字"+p.get("USERNAME"));
				if(p.get("USERNAME")!=null&&!p.get("USERNAME").equals("")){
					PageData ypd = userphotoService.findById(p);
					if (ypd == null) {
						userphotoService.save(p);
					} else {
						userphotoService.edit(p);
						String PHOTO0 = ypd.getString("PHOTO0");
						String PHOTO1 = ypd.getString("PHOTO1");
						String PHOTO2 = ypd.getString("PHOTO2");
						String PHOTO3 = ypd.getString("PHOTO3");
						if (Tools.notEmpty(PHOTO0)) {
							DelAllFile.delFolder(PathUtil.getClasspath() + PHOTO0); // 删除原图
						}
						DelAllFile.delFolder(PathUtil.getClasspath() + PHOTO1); // 删除图1
						DelAllFile.delFolder(PathUtil.getClasspath() + PHOTO2); // 删除图2
						DelAllFile.delFolder(PathUtil.getClasspath() + PHOTO3); // 删除图3
					}
				}
				
				m=new HashMap<>();
				m.put("path", (getServerPath() + Const.PATH + filename));
			}		
			logger.info("照片虚拟路径" + JSON.toJSONString(m));
			return JSONUtil.toJsonString(new JsonResult(1, "保存成功", m));
		} catch (Exception e) {
			logger.error("保存失败", e);
			return JSONUtil.toJsonString(new JsonResult(-1, "保存失败", null));
		}
	}

	/**
	 * 照片查看器
	 * 
	 * @param session
	 * @param filename
	 * @return
	 * @throws IOException
	 */
	@RequestMapping(value = "sys/fileDownload")
	public ResponseEntity<byte[]> download(HttpSession session, String filename) throws IOException {
		String path = Property.getProperty("fileUpload.path");
		String filepath = path + filename;
		logBefore(logger, "路径：" + path);
		File file = new File(filepath);
		if (!file.exists()) {
			// return JSONUtil.toJsonString(new JsonResult(-1, "文件未找到！", null));
			logger.error("文件没有找到！    " + filepath);
			throw new RuntimeException("文件没有找到！");
		}
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.IMAGE_JPEG);
		return new ResponseEntity<byte[]>(FileUtils.readFileToByteArray(file), headers, HttpStatus.OK);
	}

	/**
	 * web用户接口查询
	 * 
	 * @return
	 */
	@RequestMapping(value = "sys/listuser", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String listuser() {
		List<PageData> list = null;
		PageData pd = new PageData();
		pd = this.getPageData();
		if (Integer.valueOf(pd.get("start").toString()) == 0) {
			PageHelper.startPage(1, Integer.valueOf(pd.get("rows").toString()));
		} else {
			PageHelper.startPage(
					Integer.valueOf(pd.get("start").toString()) / Integer.valueOf(pd.get("rows").toString()) + 1,
					Integer.valueOf(pd.get("rows").toString()));
		}
		try {
			list = sysUserService.listuser(pd);
			BaseEntity<List<PageData>> base = new BaseEntity(list);
			return JSONUtil.toJsonString(new PagedJsonResult(base.getBaseEntity(), 1, "成功", base.getCount(),
					Integer.valueOf(pd.get("rows").toString())));
		} catch (Exception e) {
			// TODO: handle exception
			logger.error("错误：" + e.toString(), e);
			return JSONUtil.toJsonString(new JsonResult(-1, "失败：服务器内部错误!", null));
		}
	}

	/**web角色下拉列表
	 * @return
	 */
	@RequestMapping(value = "sys/listrole", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String listrole() {
		PageData pd = new PageData();
		pd = this.getPageData();
		try {
			List<PageData> list = sysUserService.listrole(pd);
			return JSONUtil.toJsonString(new JsonResult(1, "成功", list));
		} catch (Exception e) {
			// TODO: handle exception
			logger.error("错误：" + e.toString(), e);
			return JSONUtil.toJsonString(new JsonResult(-1, "失败：服务器内部错误!", null));

		}
	}
	/**web用户密码修改
	 * @return
	 */
	@RequestMapping(value = "sys/upduser", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String upduser() {
		PageData pd = new PageData();
		pd = this.getPageData();
		try {
			sysUserService.upduser(pd);
			return JSONUtil.toJsonString(new JsonResult(1, "成功",null));
		} catch (Exception e) {
			// TODO: handle exception
			logger.error("错误：" + e.toString(), e);
			return JSONUtil.toJsonString(new JsonResult(-1, "失败：服务器内部错误!", null));

		}
	}
	/**web用户删除
	 * @return
	 */
	@RequestMapping(value = "sys/deluser", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String deluser() {
		PageData pd = new PageData();
		pd = this.getPageData();
		try {
			sysUserService.deluser(pd);
			return JSONUtil.toJsonString(new JsonResult(1, "成功",null));
		} catch (Exception e) {
			// TODO: handle exception
			logger.error("错误：" + e.toString(), e);
			return JSONUtil.toJsonString(new JsonResult(-1, "失败：服务器内部错误!", null));

		}
	}
}
