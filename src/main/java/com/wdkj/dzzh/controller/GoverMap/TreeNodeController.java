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
		String geotype = new String(request.getParameter("geotype").getBytes("ISO-8859-1"),"UTF-8");//��Ŀ����ʲô��� 
		String id = request.getParameter("id"); //��һ����Ŀ��id
		ArrayList<TreeRoot> filelist=new ArrayList<TreeRoot>();//�����ļ��б�
		ArrayList<TreeRoot> basicfile=getfilelist(geotype,id ,1);//�����ļ��б�
		ArrayList<TreeRoot> preventfile=getfilelist(geotype,id ,2);//�����ļ��б�
		ArrayList<TreeRoot> progressfile=getfilelist(geotype,id ,3);//�����ļ��б�
		ArrayList<String> tags=new ArrayList<String>();
		TreeRoot basic=new TreeRoot();
		ArrayList<String> tags1=new ArrayList<String>();
		ArrayList<String> tags2=new ArrayList<String>();
		ArrayList<String> tags3=new ArrayList<String>();
		basic.setText("治理前");
		basic.setNodes(basicfile);
		tags.add("3");
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
		f.setGovertype(geotype);
		f.setGoverid(Integer.parseInt(id));
		f.setGoverstage(goverstage);
		f.setType("photo");
		ArrayList<TreeRoot> list1 =(ArrayList<TreeRoot>) fileService.F_list_by_goverid(f);
		f.setType("doc");
		ArrayList<TreeRoot> list2 =(ArrayList<TreeRoot>) fileService.F_list_by_goverid(f);
		f.setType("other");
		ArrayList<TreeRoot> list3 =(ArrayList<TreeRoot>) fileService.F_list_by_goverid(f);
		ArrayList<TreeRoot> filelist=new ArrayList<TreeRoot>();
		TreeRoot n1=new TreeRoot();
		ArrayList<String> tags1=new ArrayList<String>();
		ArrayList<String> tags2=new ArrayList<String>();
		ArrayList<String> tags3=new ArrayList<String>();
		n1.setText("照片");
		n1.setId((-goverstage)*10-1);
		n1.setNodes(list1);
		tags1.add(String.valueOf(list1.size()));
		n1.setTags(tags1);
		TreeRoot n2=new TreeRoot();
		n2.setText("文件");
		n2.setId((-goverstage)*10-2);
		n2.setNodes(list2);
		tags2.add(String.valueOf(list2.size()));
		n2.setTags(tags2);
		TreeRoot n3=new TreeRoot();
		n3.setText("其他");
		n3.setId((-goverstage)*10-3);
		n3.setNodes(list3);
		tags3.add(String.valueOf(list3.size()));
		n3.setTags(tags3);
		filelist.add(n1);
		filelist.add(n2);		
		filelist.add(n3);
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
