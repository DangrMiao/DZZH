package com.wdkj.wf.service.GoverMap.impl;

import java.text.SimpleDateFormat;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.wdkj.dzzh.entity.GoverMap.engineerproject;
import com.wdkj.dzzh.service.GoverMap.EngineerManager;
@Service("EngineerService")
@SuppressWarnings("all")

public class EngineerService implements EngineerManager{
	@Resource(name = "daoSupport")
	private DaoSupport dao;
	
	 public  void convertTodata(engineerproject h)
	 {
		 SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd");
		 try {
				h.setCreate_time(fmt.format(fmt.parse(h.getCreate_time())));//最小单位为秒
			} catch (java.text.ParseException e) {
				e.printStackTrace();
			}
	
	 }
	 
	 
	@Override
	public List<engineerproject> list(engineerproject params) throws Exception {
		List<engineerproject> datalist= (List<engineerproject> )dao.findForList("EngineerprojectDao.get_all_eng", params);		
		engineerproject c=new engineerproject();
		 for(int i=0;i<datalist.size();i++){
			 c=datalist.get(i);
			 convertTodata(c);//日期转换为数值格式("yyyy-MM-dd");
			 } 
		return datalist;
	}

	@Override
	public Integer countList(engineerproject params) throws Exception {
		return dao.getOne("EngineerprojectDao.get_all_engcount", params);
	}

}

