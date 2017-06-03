package com.wdkj.wf.service.GoverMap.impl;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.fh.util.PageData;
import com.wdkj.dzzh.entity.GoverMap.hiddendanger;
import com.wdkj.dzzh.service.GoverMap.MapManager;
import com.wdkj.wf.house.entity.BulltetinEntity;
import com.wdkj.wf.house.entity.TaskEntity;
import com.wdkj.wf.service.bulltetin.BulltetinService;
@Service("mapService")
@SuppressWarnings("all")
public class MapService implements MapManager{
	@Resource(name = "daoSupport")
	private DaoSupport dao;

	/**
	  * 度分秒的字符串表示形式转换为数值格式
	  * @param angle
	  * @return
	  */
	 public static double convertToAngle(String angle,hiddendanger h)
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
	
	
	@Override
	public List<hiddendanger> list(hiddendanger params) throws Exception {
		List<hiddendanger> datalist= (List<hiddendanger> )dao.findForList("goverMapDao.list", params);		
		hiddendanger c=new hiddendanger();
		SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd");
		 for(int i=0;i<datalist.size();i++){
			 c=datalist.get(i);
			 try {
					c.setStrplancompletiontime(fmt.format(fmt.parse(c.getStrplancompletiontime())));//最小单位为秒
				} catch (java.text.ParseException e) {
					e.printStackTrace();
				}
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
			 
			 
			 int color =c.getPlancompletiontime().compareTo(new Date());
			 if(c.getCompletion()>=100){c.setColor(1);}////蓝色代表任务已完成1
			 else{
				 if(color<=0){c.setColor(-1);}//红色代表任务未完成，期限已到-1
				 else{c.setColor(0); }//黑色代表任务未完成，但期限未到0
			 }
			 } 
		
		
		return datalist;
	}

	
}
