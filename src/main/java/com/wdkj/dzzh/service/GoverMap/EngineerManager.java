package com.wdkj.dzzh.service.GoverMap;

import java.util.List;

import com.wdkj.dzzh.entity.GoverMap.engineerproject;
import com.wdkj.dzzh.entity.GoverMap.hiddendanger;
import com.wdkj.dzzh.entity.GoverMap.relocationProject;

public interface EngineerManager {
	List<engineerproject> list(engineerproject params) throws Exception;

	Integer countList(engineerproject params) throws Exception;
	
	void addEngineer(engineerproject params) throws Exception;
	
	void updatehdgovertype(hiddendanger params) throws Exception;

}
