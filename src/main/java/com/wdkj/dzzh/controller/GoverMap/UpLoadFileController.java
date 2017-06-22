package com.wdkj.dzzh.controller.GoverMap;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.wdkj.dzzh.entity.GoverMap.file;
import com.wdkj.dzzh.service.GoverMap.FileManager;

import net.sf.json.JSONObject;

@Controller
@RequestMapping(value = "/UpLoadFile")
public class UpLoadFileController {
	
	@Autowired
	private FileManager fileServiceImpl;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public ModelAndView gofileupload_route( HttpServletRequest request) throws UnsupportedEncodingException {
	
		ModelAndView mv = new ModelAndView();
		mv.setViewName("dzzh/fileupload_route");
		return mv;
	}
	
	@RequestMapping(value = "upfile", method = RequestMethod.GET)
	public ModelAndView gouploadfile( HttpServletRequest request) throws UnsupportedEncodingException {
		String geotype = new String(request.getParameter("geotype").getBytes("ISO-8859-1"),"UTF-8"); 
		String id = request.getParameter("id"); 
		String stage = request.getParameter("stage"); 
		String type = request.getParameter("type"); 
		ModelAndView mv = new ModelAndView();
		System.out.println("-----------------------id-------------------------");
		System.out.println(id);
		System.out.println("----------------------geotype--------------------------");
		System.out.println(geotype);
		System.out.println("---------------------stage---------------------------");
		System.out.println(stage);
		System.out.println("--------------------type----------------------------");
		System.out.println(type);
		System.out.println("------------------------------------------------");
		mv.setViewName("dzzh/uploadfile2");
		mv.addObject("geotype", geotype);
		mv.addObject("id", id);
		mv.addObject("stage", stage);
		mv.addObject("type", type);
		return mv;
	}	
	
	
	
	
	
	@RequestMapping(value = "/uploadfilelist")  
	 @ResponseBody
	    public Map<String, Object> uploadfilelist(HttpServletRequest request,HttpServletResponse response,@RequestParam("uploadfilelist") MultipartFile[] File) throws UnsupportedEncodingException{
			String geotype = new String(request.getParameter("geotype").getBytes("ISO-8859-1"),"UTF-8"); 
			String id = request.getParameter("id"); 
			String stage = request.getParameter("stage"); 
			String type = request.getParameter("type"); 
			ModelAndView mv = new ModelAndView();
			System.out.println("-----------------------id-------------------------");
			System.out.println(id);
			System.out.println("----------------------geotype--------------------------");
			System.out.println(geotype);
			System.out.println("---------------------stage---------------------------");
			System.out.println(stage);
			System.out.println("--------------------type----------------------------");
			System.out.println(type);
			System.out.println("---------------------uploadfilelist---------------------------");
			
	        Map<String, Object> json = new HashMap<String, Object>();
	        for(int k=0;k<File.length;k++){
	        MultipartFile myFile=File[k];
	        try {
	            //文件上传时的名字
	            String realname=myFile.getOriginalFilename();
	            String ext = FilenameUtils.getExtension(myFile.getOriginalFilename());
//2	            
	            //存储时按时间戳命名
	            DateFormat df = new SimpleDateFormat("yyyyMMddHHmmssSSS");
	            String name = df.format(new Date());
	            Random r = new Random();
	            for(int i = 0 ;i<3 ;i++){
	                name += r.nextInt(10);//10 
	            }
//3	            
	            //File存储   c:/DisasterFile/1/1/1/1/201704161533121121.jpg
	            String url = "c:/DisasterFile/"+geotype+"/"+id+"/"+stage+"/"+type;
	            //tomcat的File虚拟路径  upload/1/1/1/1/201704161533121121.jpg
	            String url2 = "upload/"+geotype+"/"+id+"/"+stage+"/"+type;
	            // 
	            File file = new File(url);
	            if(!file.exists()){
	                file.mkdirs();//新建文件夹
	            }
	            String path = "/"+name + "." + ext;
	            myFile.transferTo(new File(url+path));
//4	存入数据库            
	            file f=new file();
	            f.setText(realname);// 
	            f.setRealname(name);// 
	            f.setLocation(url+path);
	            f.setVirtuallocation(url2+path);
	            f.setGovertype(geotype);
	            f.setGoverid(Integer.parseInt(id));
	            f.setGoverstage(Integer.parseInt(stage));
	            f.setType(type);
	            fileServiceImpl.F_add_file(f);
	            json.put("success", ""+myFile.getOriginalFilename());
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	        }
	        return json ;
	    }
	
	
}
