package com.wdkj.wf.service.GoverMap.impl;

import java.text.SimpleDateFormat;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.fh.dao.DaoSupport;
import com.wdkj.dzzh.entity.GoverMap.hiddendanger;
import com.wdkj.dzzh.entity.GoverMap.relocationProject;
import com.wdkj.dzzh.service.GoverMap.MapManager;
import com.wdkj.dzzh.service.GoverMap.RelocationManager;
@Service("RelocationService")
@SuppressWarnings("all")
public class RelocationService  implements RelocationManager{
	@Resource(name = "daoSupport")
	private DaoSupport dao;
	
	 public  void convertTodata(relocationProject h)
	 {
		 SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd");
		 try {
				h.setCreate_time(fmt.format(fmt.parse(h.getCreate_time())));//最小单位为秒
			} catch (java.text.ParseException e) {
				e.printStackTrace();
			}
	
	 }
	 
	 
	@Override
	public List<relocationProject> list(relocationProject params) throws Exception {
		List<relocationProject> datalist= (List<relocationProject> )dao.findForList("RelocationProjectDao.get_all_rp", params);		
		relocationProject c=new relocationProject();
		 for(int i=0;i<datalist.size();i++){
			 c=datalist.get(i);
			 convertTodata(c);//日期转换为数值格式("yyyy-MM-dd");
			 } 
		return datalist;
	}

	@Override
	public Integer countList(relocationProject params) throws Exception {
		return dao.getOne("RelocationProjectDao.get_all_rpcount", params);
	}


	@Override
	public void addRelocation(relocationProject params) throws Exception {
		dao.insert("RelocationProjectDao.add_rp", params);
		
	}


	@Override
	public void updatehdgovertype(hiddendanger params) throws Exception {
		dao.update("goverMapDao.updateHDgid", params);
	}

}
