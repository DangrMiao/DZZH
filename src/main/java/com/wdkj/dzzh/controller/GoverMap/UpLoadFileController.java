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
		ModelAndView mv = new ModelAndView();
		/*System.out.println("------------------------------------------------");
		System.out.println(id);
		System.out.println("------------------------------------------------");
		System.out.println(geotype);
		System.out.println("------------------------------------------------");*/
		mv.setViewName("dzzh/uploadfile");
		mv.addObject("geotype", geotype);
		mv.addObject("id", id);
		return mv;
	}	
	
	@RequestMapping(value = "/upload1")  
	 @ResponseBody
	    public Map<String, Object> update1(HttpServletRequest request,HttpServletResponse response,@RequestParam("basicSituation") MultipartFile[] File) throws UnsupportedEncodingException{
		
		String geotype = new String(request.getParameter("geotype").getBytes("ISO-8859-1"),"UTF-8");//��Ŀ����ʲô��� 
			String id = request.getParameter("id"); //��һ����Ŀ��id
			String goverstage = request.getParameter("goverstage"); //һ����Ŀ����һ���׶�
			
			System.out.println("------------------------------------------------");
			System.out.println(geotype);
			System.out.println("------------------------------------------------");
			System.out.println(id);
			System.out.println("------------------------------------------------");
			System.out.println(goverstage);
			System.out.println("------------------------------------------------");
			
	        Map<String, Object> json = new HashMap<String, Object>();//�ϴ���ķ�����Ϣ
	        for(int k=0;k<File.length;k++){
	        MultipartFile myFile=File[k];
	        try {
//1	        	 //�ļ���׺����
	            String ext = FilenameUtils.getExtension(myFile.getOriginalFilename());
	            String type;//�ļ����ͣ�Ӧ�÷�����һ���ļ���
	            if(ext.equals("jpg")||ext.equals("png")||ext.equals("gif")){
	            	type="photo";
	            }else if(ext.equals("doc")||ext.equals("pdf")||ext.equals("docx")||ext.equals("xlsx")||ext.equals("xls")){
	            	type="doc";
	            }else{
	            	type="other";
	            }
	            //����ļ�����
	            String realname=myFile.getOriginalFilename();
	            //System.out.println(realname);
//2	            
	            //ͼƬ�洢��������
	            DateFormat df = new SimpleDateFormat("yyyyMMddHHmmssSSS");
	            String name = df.format(new Date());
	            Random r = new Random();
	            for(int i = 0 ;i<3 ;i++){
	                name += r.nextInt(10);//10���������
	            }
//3	            
	            //���� Fileλ�� ��ȫ·����   c:/DisasterFile/��Ǩ����/1/1/photo/201704161533121121.jpg
	            String url = "c:/DisasterFile/"+geotype+"/"+id+"/"+goverstage+"/"+type;
	            //�����tomcat���� Fileλ�� ��ȫ·���� upload/��Ǩ����/1/1/photo/201704161533121121.jpg
	            String url2 = "upload/"+geotype+"/"+id+"/"+goverstage+"/"+type;
	            //���·��
	            String path = "/"+name + "." + ext;
	            File file = new File(url);
	            if(!file.exists()){
	                file.mkdirs();//�����ļ���
	            }
	            myFile.transferTo(new File(url+path));
//4	            
	            file f=new file();
	            f.setText(realname);//����ʱ�ļ�����
	            f.setRealname(name);//�洢ʱ�ļ�����
	            f.setLocation(url+path);
	            f.setVirtuallocation(url2+path);
	            f.setType(type);
	            f.setGovertype(geotype);
	            f.setGoverid(Integer.parseInt(id));
	            f.setGoverstage(Integer.parseInt(goverstage));
	            fileServiceImpl.F_add_file(f);
	            json.put("success", ""+myFile.getOriginalFilename());
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	        }
	        return json ;
	    }
	
	@RequestMapping(value = "/upload2")  
	 @ResponseBody
	    public Map<String, Object> update2(HttpServletRequest request,HttpServletResponse response,@RequestParam("preventSituation") MultipartFile[] File) throws UnsupportedEncodingException{
			String geotype = new String(request.getParameter("geotype").getBytes("ISO-8859-1"),"UTF-8");//��Ŀ����ʲô��� 
			String id = request.getParameter("id"); //��һ����Ŀ��id
			String goverstage = request.getParameter("goverstage"); //һ����Ŀ����һ���׶�
			//System.out.println(id);
			//System.out.println(geotype);
	        Map<String, Object> json = new HashMap<String, Object>();//�ϴ���ķ�����Ϣ
	        for(int k=0;k<File.length;k++){
	        MultipartFile myFile=File[k];
	        try {
//1	        	 //�ļ���׺����
	            String ext = FilenameUtils.getExtension(myFile.getOriginalFilename());
	            String type;//�ļ����ͣ�Ӧ�÷�����һ���ļ���
	            if(ext.equals("jpg")||ext.equals("png")||ext.equals("gif")){
	            	type="photo";
	            }else if(ext.equals("doc")||ext.equals("pdf")||ext.equals("docx")||ext.equals("xlsx")||ext.equals("xls")){
	            	type="doc";
	            }else{
	            	type="other";
	            }
	            //����ļ�����
	            String realname=myFile.getOriginalFilename();
	            //System.out.println(realname);
//2	            
	            //ͼƬ�洢��������
	            DateFormat df = new SimpleDateFormat("yyyyMMddHHmmssSSS");
	            String name = df.format(new Date());
	            Random r = new Random();
	            for(int i = 0 ;i<3 ;i++){
	                name += r.nextInt(10);//10���������
	            }
//3	            
	            //���� Fileλ�� ��ȫ·����   c:/DisasterupLoadFile/��Ǩ����/1/1/photo/201704161533121121.jpg
	            String url = "c:/DisasterFile/"+geotype+"/"+id+"/"+goverstage+"/"+type;
	            //�����tomcat���� Fileλ�� ��ȫ·���� upload/��Ǩ����/1/1/photo/201704161533121121.jpg
	            String url2 = "upload/"+geotype+"/"+id+"/"+goverstage+"/"+type;
	            //���·��
	            String path = "/"+name + "." + ext;
	            File file = new File(url);
	            if(!file.exists()){
	                file.mkdirs();//�����ļ���
	            }
	            myFile.transferTo(new File(url+path));
//4	            
	            file f=new file();
	            f.setText(realname);//����ʱ�ļ�����
	            f.setRealname(name);//�洢ʱ�ļ�����
	            f.setLocation(url+path);
	            f.setVirtuallocation(url2+path);
	            f.setType(type);
	            f.setGovertype(geotype);
	            f.setGoverid(Integer.parseInt(id));
	            f.setGoverstage(Integer.parseInt(goverstage));
	            fileServiceImpl.F_add_file(f);
	            
	            json.put("success", ""+myFile.getOriginalFilename());
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	        }
	        return json ;
	    }
	
	
	@RequestMapping(value = "/upload3")  
	 @ResponseBody
	    public Map<String, Object> update3(HttpServletRequest request,HttpServletResponse response,@RequestParam("progressSituation") MultipartFile[] File) throws UnsupportedEncodingException{
			String geotype = new String(request.getParameter("geotype").getBytes("ISO-8859-1"),"UTF-8");//��Ŀ����ʲô��� 
			String id = request.getParameter("id"); //��һ����Ŀ��id
			String goverstage = request.getParameter("goverstage"); //һ����Ŀ����һ���׶�
			//System.out.println(id);
			//System.out.println(geotype);
	        Map<String, Object> json = new HashMap<String, Object>();//�ϴ���ķ�����Ϣ
	        for(int k=0;k<File.length;k++){
	        MultipartFile myFile=File[k];
	        try {
//1	        	 //�ļ���׺����
	            String ext = FilenameUtils.getExtension(myFile.getOriginalFilename());
	            String type;//�ļ����ͣ�Ӧ�÷�����һ���ļ���
	            if(ext.equals("jpg")||ext.equals("png")||ext.equals("gif")){
	            	type="photo";
	            }else if(ext.equals("doc")||ext.equals("pdf")||ext.equals("docx")||ext.equals("xlsx")||ext.equals("xls")){
	            	type="doc";
	            }else{
	            	type="other";
	            }
	            //����ļ�����
	            String realname=myFile.getOriginalFilename();
	            //System.out.println(realname);
//2	            
	            //ͼƬ�洢��������
	            DateFormat df = new SimpleDateFormat("yyyyMMddHHmmssSSS");
	            String name = df.format(new Date());
	            Random r = new Random();
	            for(int i = 0 ;i<3 ;i++){
	                name += r.nextInt(10);//10���������
	            }
//3	            
	            //���� Fileλ�� ��ȫ·����   c:/DisasterupLoadFile/��Ǩ����/1/1/photo/201704161533121121.jpg
	            String url = "c:/DisasterFile/"+geotype+"/"+id+"/"+goverstage+"/"+type;
	            //�����tomcat���� Fileλ�� ��ȫ·���� upload/��Ǩ����/1/1/photo/201704161533121121.jpg
	            String url2 = "upload/"+geotype+"/"+id+"/"+goverstage+"/"+type;
	            //���·��
	            String path = "/"+name + "." + ext;
	            File file = new File(url);
	            if(!file.exists()){
	                file.mkdirs();//�����ļ���
	            }
	            myFile.transferTo(new File(url+path));
//4	            
	            file f=new file();
	            f.setText(realname);//����ʱ�ļ�����
	            f.setRealname(name);//�洢ʱ�ļ�����
	            f.setLocation(url+path);
	            f.setVirtuallocation(url2+path);
	            f.setType(type);
	            f.setGovertype(geotype);
	            f.setGoverid(Integer.parseInt(id));
	            f.setGoverstage(Integer.parseInt(goverstage));
	            fileServiceImpl.F_add_file(f);
	            
	            json.put("success", ""+myFile.getOriginalFilename());
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	        }
	        return json ;
	    }
}
