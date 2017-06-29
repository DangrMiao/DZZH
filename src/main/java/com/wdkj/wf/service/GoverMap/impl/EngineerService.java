package com.wdkj.wf.service.GoverMap.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.wdkj.dzzh.entity.GoverMap.engineerproject;
import com.wdkj.dzzh.entity.GoverMap.hiddendanger;
import com.wdkj.dzzh.entity.GoverMap.relocationProject;
import com.wdkj.dzzh.service.GoverMap.EngineerManager;
@Service("EngineerService")
@SuppressWarnings("all")

public class EngineerService implements EngineerManager{
	@Resource(name = "daoSupport")
	private DaoSupport dao;
	/**
	  * 度分秒的字符串表示形式转换为数值格式
	  * @param angle
	  * @return
	  */
	 public static double convertToAngle(String angle,engineerproject h)
	 {
	  StringBuffer transAngle = new StringBuffer(angle);
	  //获得度分秒的字符串
	  String degreeString = transAngle.substring(0, transAngle.indexOf("°"));
	  // System.out.println(h.id);
	  //System.out.println(transAngle.indexOf("°"));
	  String minuteString = transAngle.substring(transAngle.indexOf("°")+1, 
	    transAngle.indexOf("’"));
	  String secondString = transAngle.substring(transAngle.indexOf("’")+1, 
	    transAngle.indexOf("”"));
	  //判断是否符合数值格式
	  double degree = 0;
	  double minute = 0;
	  double second = 0;
	 /* if (checkNum(degreeString)&&checkNum(minuteString)&&checkNum(secondString))
	  {*/
	   degree = Double.parseDouble(degreeString);
	   minute = Double.parseDouble(minuteString);
	   second = Double.parseDouble(secondString);
	  //}
	  return degree + (minute*60+second)/3600.0;
	 }
	 
	 
	 public  void convertTodata(engineerproject h)
	 {
		 SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd");
		 try {
			 if( h != null && h.getCreate_time() != null){
				h.setCreate_time(fmt.format(fmt.parse(h.getCreate_time())));//最小单位为秒
			 }
			} catch (java.text.ParseException e) {
				e.printStackTrace();
			}
	
	 }
	 
	 /**
	  * coordinate表示形式转换为数值格式120.22222;
	  * 
	  */
	 public static void convertcoordinate(engineerproject c)
	 {
		 String x=c.getX();
		 if(x.contains("°"))
		 {
			 c.setXcoordinate(convertToAngle(x,c));
		 }else{
			 c.setXcoordinate(Double.parseDouble(x)/10000);
		 }
		 String y=c.getY();
		 if(y.contains("°"))
		 {
			 c.setYcoordinate(convertToAngle(y,c));
		 }else{
			 c.setYcoordinate(Double.parseDouble(y)/10000);
		 }
		 
	 }
	 
	 /**
	  * coordinate表示形式转换为数值格式120.22222;
	  * 
	  */
	/* public static void setcolor(engineerproject c)
	 {
		 int color =c.getPlancompletiontime().compareTo(new Date());
		 if(c.getCompletion()>=100){c.setColor(1);}////蓝色代表任务已完成1
		 else{
			 if(color<=0){c.setColor(-1);}//红色代表任务未完成，期限已到-1
			 else{c.setColor(0); }//黑色代表任务未完成，但期限未到0
		 } 
	 }*/
	 
	 
	@Override
	public List<engineerproject> list(engineerproject params) throws Exception {
		List<engineerproject> datalist= (List<engineerproject> )dao.findForList("EngineerprojectDao.get_all_eng", params);		
		engineerproject c=new engineerproject();
		 for(int i=0;i<datalist.size();i++){
			 c=datalist.get(i);
			 convertTodata(c);//日期转换为数值格式("yyyy-MM-dd");
			 convertcoordinate(c);//坐标转换为数值格式，如120.222;
			 //setcolor(c);//设置颜色; 1蓝色已完成，    -1红色未完成，   ，0黑色正常
			 } 
		return datalist;
	}

	@Override
	public Integer countList(engineerproject params) throws Exception {
		return dao.getOne("EngineerprojectDao.get_all_engcount", params);
	}


	@Override
	public void addEngineer(engineerproject params) throws Exception {
		dao.insert("EngineerprojectDao.add_eng", params);
		
	}


	@Override
	public void updatehdgovertype(hiddendanger h) throws Exception {
		dao.update("goverMapDao.updateHDgid", h);
	}


	@Override
	public void updateEngineer(engineerproject params) throws Exception {
		// TODO Auto-generated method stub
		dao.update("EngineerprojectDao.update_eng", params);
	}

	@Override
	public List<engineerproject> listEngineer(engineerproject params) throws Exception {
		// TODO Auto-generated method stub
		List<engineerproject> datalist= (List<engineerproject> )dao.findForList("EngineerprojectDao.get_eng_by_id", params);		
		engineerproject c=new engineerproject();
		 for(int i=0;i<datalist.size();i++){
			 c=datalist.get(i);
			 convertTodata(c);//鏃ユ湡杞崲涓烘暟鍊兼牸寮�("yyyy-MM-dd");
			 } 
		return datalist;
	}


	@Override
	public void updatehdhandle(hiddendanger h) throws Exception {
		// TODO Auto-generated method stub
		dao.update("goverMapDao.updateHDhandle", h);
	}

}

