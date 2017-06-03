package com.fh.controller.menu.qinwei;

import java.io.File;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.fh.controller.base.BaseController;
import com.fh.entity.Page;
import com.fh.service.menu.TestManager;
import com.fh.util.AppUtil;
import com.fh.util.Jurisdiction;
import com.fh.util.PageData;
import com.wdkj.wf.entity.house.HouseIdentifyEntity;
import com.wdkj.wf.house.entity.HouseEntity;
import com.wdkj.wf.service.house.HouseDisposesService;
import com.wdkj.wf.service.house.HouseIdentifyService;
import com.weidekeji.common.json.JsonResult;
import com.weidekeji.common.util.JSONUtil;
import com.weidekeji.common.util.Property;

@Controller
@RequestMapping(value = "/test")
public class Test_MenuConller extends BaseController {

	@Autowired
	private TestManager testService;
    @Autowired
    HouseDisposesService houseDisposesService;
    @Autowired
    HouseIdentifyService houseIdentifyService;
	/**
	 * 显示所有
	 * 
	 * @param page
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/show_page")
	public ModelAndView listpage(Page page) throws Exception {
		ModelAndView mv = this.getModelAndView();
		List<PageData> listmenu = testService.list(page);
		mv.addObject("listmenu", listmenu);
		mv.addObject("msg", "show_page");
		mv.setViewName("weifang/test/test_list");
		return mv;
	}

	/**
	 * 去修改页面
	 * 
	 * @param
	 * @throws Exception
	 */
	@RequestMapping(value = "/goEdit")
	public ModelAndView goEdit() throws Exception {
		logger.info("开始进行修改");
		ModelAndView mv = this.getModelAndView();
		PageData pd = new PageData();
		pd = this.getPageData();
		String MENU_ID = pd.getString("MENU_ID");
		logger.info( MENU_ID + "ID");

		pd = testService.findById(pd); // 根据ID读取
		logger.info("查询结果集:" + pd);
		mv.addObject("pd", pd); // 放入视图容器
		mv.addObject("msg", "edit");
		mv.setViewName("weifang/test/test_edit");
		return mv;
	}

	@InitBinder
	public void initBinder(WebDataBinder binder) {
		DateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		binder.registerCustomEditor(Date.class, new CustomDateEditor(format, true));
	}

	/**
	 * 修改
	 * 
	 * @param
	 * @throws Exception
	 */
	@RequestMapping(value = "/edit")
	public ModelAndView edit() throws Exception {
		logger.info("开始修改test");

		ModelAndView mv = this.getModelAndView();
		PageData pd = new PageData();
		pd = this.getPageData();
		testService.edit(pd);
		mv.addObject("msg", "success");
		mv.setViewName("save_result");
		return mv;
	}

	/**
	 * 去新增页面
	 * 
	 * @param
	 * @throws Exception
	 */
	@RequestMapping(value = "/goAdd")
	public ModelAndView goAdd() throws Exception {
		ModelAndView mv = this.getModelAndView();
		PageData pd = new PageData();
		mv.setViewName("weifang/test/test_edit");
		mv.addObject("msg", "save");
		return mv;
	}

	/**
	 * 保存
	 * 
	 * @param
	 * @throws Exception
	 */
	@RequestMapping(value = "/save")
	public ModelAndView save() throws Exception {
		logger.info(Jurisdiction.getUsername() + "test");
		ModelAndView mv = this.getModelAndView();
		PageData pd = new PageData();
		pd = this.getPageData();
		testService.save(pd);
		mv.addObject("msg", "success");
		mv.setViewName("save_result");
		return mv;
	}

	/**
	 * 删除
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/delete")
	@ResponseBody
	public Object delete() throws Exception {
		logBefore(logger, Jurisdiction.getUsername() + "开始删除");
		Map<String, String> map = new HashMap<String, String>();
		PageData pd = new PageData();
		pd = this.getPageData();
		String errInfo = "success";
		testService.delete(pd); // 执行删除
		map.put("result", errInfo);
		return AppUtil.returnObject(new PageData(), map);
	}

	@RequestMapping(value = "/gofile")
	public ModelAndView gofile() throws Exception {
		ModelAndView mv = this.getModelAndView();
		PageData pd = new PageData();
		pd = this.getPageData();
		mv.setViewName("weifang/test/fhfile_edit");
		mv.addObject("msg", "file");
		mv.addObject("pd", pd);
		return mv;
	}

	@RequestMapping(value = "/file", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String uploadify(@RequestParam(value = "fileupload", required = false) MultipartFile[] files, HttpServletRequest request,
			HttpServletResponse response,HouseIdentifyEntity identifyEntity,HouseEntity houseEntity) throws IOException {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmmssS");
		String time = simpleDateFormat.format(new Date());
		String path = Property.getProperty("file.dir")+"/";// 附件存放服务器的路径
		logger.info("文件保存路径："+path);
        List<String>listphoto=new ArrayList<>();//存照片
        List<String>listelse=new ArrayList<>();//其他
		try {
			for (int i = 0; i < files.length; i++) {	
				if (!files[i].isEmpty()) {
					String filename=time+files[i].getOriginalFilename();
					logger.info("文件名：" + filename);
					String postfix=filename.substring(filename.indexOf("."));
					files[i].transferTo(new File(path+filename));//复制文件
					if(postfix.equals(".jpg")||postfix.equals(".png")){
						listphoto.add(filename);
					}
					else{
						listelse.add(filename);
					}
				}	
			}
			if(listphoto.size()>0){
				String photoname="";
				for (int i = 0; i < listphoto.size(); i++) {
					photoname+=listphoto.get(i)+";";
				}
				identifyEntity.setPhotos(photoname);
			}
			if(listelse.size()>0){
				String elsename="";
				for (int i = 0; i < listelse.size(); i++) {
					elsename+=listelse.get(i)+";";
				}
				identifyEntity.setFile(elsename);
			}
			if(identifyEntity.getType()!=null&&identifyEntity.getType()==1){
				identifyEntity.setDate(getDate());
			}
			houseIdentifyService.insert(identifyEntity);
			houseIdentifyService.update1(houseEntity);
			return JSONUtil.toJsonString(new JsonResult(1, "保存成功", null));
		}
		catch (Exception e) {
				e.printStackTrace();
				logger.error("错误："+e.toString(), e);
				return JSONUtil.toJsonString(new JsonResult(-1, "保存失败", null));	
		}	
	}	
}
