package com.wdkj.wf.service.GoverMap.impl;

import java.text.SimpleDateFormat;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.wdkj.dzzh.entity.GoverMap.hiddendanger;
import com.wdkj.dzzh.entity.GoverMap.person;
import com.wdkj.dzzh.entity.GoverMap.relocationProject;
import com.wdkj.dzzh.service.GoverMap.PersonManager;

@Service("PersonService")
@SuppressWarnings("all")
public class PersonService implements PersonManager{
	@Resource(name = "daoSupport")
	private DaoSupport dao;
	
	 public static void convertTodata(person h)
	 {
		 SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd");
		 try {
			 if( h != null && h.getRelocate_time() != null){
				h.setRelocate_time(fmt.format(fmt.parse(h.getRelocate_time())));//最小单位为秒
			 }
			} catch (java.text.ParseException e) {
				e.printStackTrace();
			}
	
	 }
	@Override
	public List<person> list(person params) throws Exception {
		List<person> datalist= (List<person> )dao.findForList("PersonDao.get_allperson_by_project_id", params);		
		person c=new person();
		 for(int i=0;i<datalist.size();i++){
			 c=datalist.get(i);
			 convertTodata(c);//日期转换为数值格式("yyyy-MM-dd");
			 } 
		return datalist;
	}
	@Override
	public Integer countList(person params) throws Exception {
		// TODO Auto-generated method stub
		return dao.getOne("PersonDao.get_countperson_by_project_id", params);
	}
	@Override
	public void addPerson(person params) throws Exception {
		dao.insert("PersonDao.add_person", params);
		
	}
	@Override
	public void updatePerson(person params) throws Exception {
		// TODO Auto-generated method stub
		dao.update("PersonDao.update_person", params);
	}
	@Override
	public void deluser(person params) throws Exception {
		// TODO Auto-generated method stub
		dao.update("PersonDao.delete_person", params);
	}

	

}
