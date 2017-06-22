package com.wdkj.dzzh.controller.GoverMap;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.wdkj.dzzh.entity.GoverMap.TreeRoot;
import com.wdkj.dzzh.entity.GoverMap.file;
import com.wdkj.dzzh.service.GoverMap.FileManager;

import net.sf.json.JSONArray;
@Controller
@RequestMapping(value = "/TreeNode")
public class TreeNodeController {

	@Autowired
	private FileManager fileService;
	
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public ModelAndView gofilenode(HttpServletRequest request) throws UnsupportedEncodingException {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("dzzh/treenode_route");
		return mv;
	}
	@RequestMapping(value = "treenodelist")
	public ModelAndView gofilenodelist(HttpServletRequest request) throws Exception {
		String geotype = new String(request.getParameter("geotype").getBytes("ISO-8859-1"),"UTF-8");
		String id = request.getParameter("id");
		ArrayList<TreeRoot> filelist=new ArrayList<TreeRoot>();
		ArrayList<TreeRoot> basicfile=getfilelist(geotype,id ,1);//治理前
		ArrayList<TreeRoot> preventfile=getfilelist(geotype,id ,2);//治理中
		ArrayList<TreeRoot> progressfile=getfilelist(geotype,id ,3);//治理后
		

		ArrayList<String> tags=new ArrayList<String>();
		tags.add("3");
		
		
		
		TreeRoot basic=new TreeRoot();
		basic.setText("治理前");
		basic.setNodes(basicfile);
		basic.setTags(tags);
		
		
		TreeRoot prevent=new TreeRoot();
		prevent.setText("治理中");
		prevent.setNodes(preventfile);
		prevent.setTags(tags);
		
		
		TreeRoot progress=new TreeRoot();
		progress.setText("治理后");
		progress.setNodes(progressfile);
		progress.setTags(tags);
		
		filelist.add(basic);
		filelist.add(prevent);		
		filelist.add(progress);
		
		ModelAndView mv = new ModelAndView();
		mv.setViewName("dzzh/TreeNode");
		mv.addObject("geotype", geotype);
		mv.addObject("id", id);
		JSONArray datalist = JSONArray.fromObject(filelist);
		mv.addObject("datalist", datalist);
		return mv;
		
		
		
		
		
	}
	
	
	public ArrayList<TreeRoot> getfilelist(String geotype,String id ,int goverstage) throws Exception{
		file f=new file();
		f.setGovertype(geotype);//治理类型 搬迁 或工程 
		f.setGoverid(Integer.parseInt(id));//项目的id
		f.setGoverstage(goverstage);//哪一阶段 治理前 中 后
		
		ArrayList<TreeRoot> filelist=new ArrayList<TreeRoot>();
		
		//治理前
		if(1==goverstage){
			filelist.clear();
			f.setType("-1");//基本情况
			ArrayList<TreeRoot> list1 =(ArrayList<TreeRoot>) fileService.F_list_by_goverid(f);
			TreeRoot n1=new TreeRoot();
			ArrayList<String> tags1=new ArrayList<String>();
			n1.setText("基本情况");
			n1.setId(-1);
			n1.setNodes(list1);
			tags1.add(String.valueOf(list1.size()));
			n1.setTags(tags1);
			filelist.add(n1);
			return filelist;
		}
		//治理中
		if(2==goverstage){
			filelist.clear();
			f.setType("-2");//搬迁协议
			ArrayList<TreeRoot> list2 =(ArrayList<TreeRoot>) fileService.F_list_by_goverid(f);
			TreeRoot n2=new TreeRoot();
			ArrayList<String> tags2=new ArrayList<String>();
			n2.setText("搬迁协议");
			n2.setId(-2);
			n2.setNodes(list2);
			tags2.add(String.valueOf(list2.size()));
			n2.setTags(tags2);
			
			
			f.setType("-3");//思想工作
			ArrayList<TreeRoot> list3 =(ArrayList<TreeRoot>) fileService.F_list_by_goverid(f);
			TreeRoot n3=new TreeRoot();
			ArrayList<String> tags3=new ArrayList<String>();
			n3.setText("思想工作");
			n3.setId(-3);
			n3.setNodes(list3);
			tags3.add(String.valueOf(list3.size()));
			n3.setTags(tags3);
			
			
			
			f.setType("-4");//腾空
			ArrayList<TreeRoot> list4 =(ArrayList<TreeRoot>) fileService.F_list_by_goverid(f);
			TreeRoot n4=new TreeRoot();
			ArrayList<String> tags4=new ArrayList<String>();
			n4.setText("腾空");
			n4.setId(-4);
			n4.setNodes(list4);
			tags4.add(String.valueOf(list4.size()));
			n4.setTags(tags4);
			
			
			
			f.setType("-5");//拆迁
			ArrayList<TreeRoot> list5 =(ArrayList<TreeRoot>) fileService.F_list_by_goverid(f);
			TreeRoot n5=new TreeRoot();
			ArrayList<String> tags5=new ArrayList<String>();
			n5.setText("拆迁");
			n5.setId(-5);
			n5.setNodes(list5);
			tags5.add(String.valueOf(list5.size()));
			n5.setTags(tags5);
			
			filelist.add(n2);
			filelist.add(n3);
			filelist.add(n4);
			filelist.add(n5);
			return filelist;
			
		}
		//治理后
		if(3==goverstage){
			filelist.clear();
			f.setType("-6");//复垦
			ArrayList<TreeRoot> list6 =(ArrayList<TreeRoot>) fileService.F_list_by_goverid(f);
			TreeRoot n6=new TreeRoot();
			ArrayList<String> tags6=new ArrayList<String>();
			n6.setText("复垦");
			n6.setId(-6);
			n6.setNodes(list6);
			tags6.add(String.valueOf(list6.size()));
			n6.setTags(tags6);
			
			
			
			
			f.setType("-7");//安置地
			ArrayList<TreeRoot> list7 =(ArrayList<TreeRoot>) fileService.F_list_by_goverid(f);
			TreeRoot n7=new TreeRoot();
			ArrayList<String> tags7=new ArrayList<String>();
			n7.setText("安置地");
			n7.setId(-7);
			n7.setNodes(list7);
			tags7.add(String.valueOf(list7.size()));
			n7.setTags(tags7);
			
			
			
			
			f.setType("-8");//安置新房
			ArrayList<TreeRoot> list8 =(ArrayList<TreeRoot>) fileService.F_list_by_goverid(f);
			TreeRoot n8=new TreeRoot();
			ArrayList<String> tags8=new ArrayList<String>();
			n8.setText("安置新房");
			n8.setId(-8);
			n8.setNodes(list8);
			tags8.add(String.valueOf(list8.size()));
			n8.setTags(tags8);
			
			filelist.add(n6);
			filelist.add(n7);
			filelist.add(n8);
			return filelist;
			
		}
		return filelist;
		
	}
	
	@RequestMapping(value = "deletenode" , method = RequestMethod.POST)
	public @ResponseBody  Map<String, Object> deletegofilenode(HttpServletRequest request,@RequestBody ArrayList<Integer> ids) throws Exception {
		fileService.deletelist(ids);
		 Map<String, Object> json = new HashMap<String, Object>();
		json.put("success", ids);
		return json;
	}
}
